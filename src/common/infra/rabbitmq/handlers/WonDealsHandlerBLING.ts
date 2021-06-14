import { ConsumeMessage, Channel } from 'amqplib';

import Container from '@common/container';

import RabbitMQServer from '@common/infra/rabbitmq';
import MessageBrokerConfig from '@config/MessageBrokerConfig';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ICreateOrderMessage from '@common/infra/rabbitmq/dtos/ICreateOrderMessage';

const WonDealsHandler = async (ch: Channel, msg: ConsumeMessage): Promise<void> => {
  const CreateOrder = Container.resolve<CreateOrderService>(CreateOrderService);

  const data: ICreateOrderMessage = JSON.parse(msg.content.toString());

  await CreateOrder.execute({ data: { cliente: data.org, item: data.title, valor: data.value } })
    .then((orderRes) => {
      const res = Buffer.from(JSON.stringify({
        title: orderRes.retorno.pedidos[0].pedido.idPedido,
        amount: 1,
        value: data.value,
      }));
      console.log(`#${new Date().toLocaleTimeString()} Successfully created a order for deal: ${msg.properties.messageId}`);
      RabbitMQServer.publish(
        MessageBrokerConfig.rabbitmq.journey.exchanges.done,
        MessageBrokerConfig.rabbitmq.journey.routingKeys.ordered,
        res,
        { messageId: msg.properties.messageId },
      );
    }).catch(() => {
      const retry = Buffer.from(JSON.stringify(data));
      const retryCount = msg.properties.headers['x-retries'] ? msg.properties.headers['x-retries'] : 0;
      if (retryCount < MessageBrokerConfig.rabbitmq.maxRetries) {
        console.log(`#${new Date().toLocaleTimeString()} Failed to create order for deal: ${msg.properties.messageId} | retryCount ${retryCount + 1}`);
        const retryDelay = MessageBrokerConfig.rabbitmq.retryDelay * (retryCount + 1);
        console.log(`#${new Date().toLocaleTimeString()} Republishing: ${msg.properties.messageId} with ${retryDelay / 1000}s delay`);
        RabbitMQServer.publish(
          MessageBrokerConfig.rabbitmq.default.exchanges.hold,
          MessageBrokerConfig.rabbitmq.journey.queues.won,
          retry,
          {
            messageId: msg.properties.messageId,
            headers: { 'x-retries': retryCount + 1 },
            expiration: retryDelay,
          },
        );
      } else {
        console.log(`#${new Date().toLocaleTimeString()} Max retries reached - could not create order for deal: ${msg.properties.messageId}`);
      }
    });

  ch.ack(msg);
};

export default WonDealsHandler;
