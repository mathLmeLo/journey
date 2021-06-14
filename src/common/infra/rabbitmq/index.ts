import amqplib, { ConsumeMessage, Connection, Channel, Options } from 'amqplib';

import MessageBrokerConfig from '@config/MessageBrokerConfig';

// import OrderedDealsHandler from '@common/infra/rabbitmq/handlers/OrderedDealsHandler'

import ConnectionInfoResponse from '@common/infra/rabbitmq/responses/IConnectionInfoResponse';

class RabbitMQServer {

  private connection: Connection;

  private channel: Channel;

  public async init(): Promise<void> {
    this.connection = await amqplib.connect(MessageBrokerConfig.rabbitmq.hostname);
    this.channel = await this.connection.createChannel();

    // Exchanges
    await this.channel.assertExchange(MessageBrokerConfig.rabbitmq.journey.exchanges.primary, 'direct', { durable: false });
    await this.channel.assertExchange(MessageBrokerConfig.rabbitmq.default.exchanges.hold, 'direct', { durable: false });
    await this.channel.assertExchange(MessageBrokerConfig.rabbitmq.default.exchanges.retry, 'direct', { durable: false });
    await this.channel.assertExchange(MessageBrokerConfig.rabbitmq.journey.exchanges.done, 'direct', { durable: false });

    // Queues
    const retryQueue = await this.channel.assertQueue(MessageBrokerConfig.rabbitmq.default.queues.wait, { deadLetterExchange: MessageBrokerConfig.rabbitmq.default.exchanges.retry }); // delay queue
    const won = await this.channel.assertQueue(MessageBrokerConfig.rabbitmq.journey.queues.won, { durable: false });
    const ordered = await this.channel.assertQueue(MessageBrokerConfig.rabbitmq.journey.queues.ordered, { durable: false });

    // Bindings
    await this.channel.bindQueue(retryQueue.queue, MessageBrokerConfig.rabbitmq.default.exchanges.hold, MessageBrokerConfig.rabbitmq.journey.queues.won);
    await this.channel.bindQueue(won.queue, MessageBrokerConfig.rabbitmq.journey.exchanges.primary, MessageBrokerConfig.rabbitmq.journey.routingKeys.won);
    await this.channel.bindQueue(won.queue, MessageBrokerConfig.rabbitmq.default.exchanges.retry, MessageBrokerConfig.rabbitmq.journey.queues.won);
    await this.channel.bindQueue(ordered.queue, MessageBrokerConfig.rabbitmq.journey.exchanges.done, MessageBrokerConfig.rabbitmq.journey.routingKeys.ordered);

    // Consumer
    // this.channel.consume(createPrescription.queue, (msg: ConsumeMessage) => {
    //   WonDealsHandler(this.channel, msg);
    // }, { noAck: false });

    // this.channel.consume(ordered.queue, (msg: ConsumeMessage) => {
    //   OrderedDealsHandler(this.channel, msg);
    // }, { noAck: false });
  }

  public async publish(exchange: string, key: string, data: Buffer, options?: Options.Publish): Promise<void> {
    this.channel.publish(exchange, key, data, options);
  }

  public async send(messageId: string, sendToQueue: string, replyToQueue: string, data: Buffer): Promise<void> {
    await this.channel.assertQueue(sendToQueue, { durable: false });
    this.channel.sendToQueue(sendToQueue, data, { messageId, replyTo: replyToQueue });
  }

  public async information(): Promise<ConnectionInfoResponse> {
    return ({
      connected: !!this.connection,
      host: MessageBrokerConfig.rabbitmq.hostname,
    });
  }

}

export default new RabbitMQServer();
