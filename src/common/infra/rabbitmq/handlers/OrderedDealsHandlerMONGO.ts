import { ConsumeMessage, Channel } from 'amqplib';

import Order from '@modules/orders/infra/mongoose/models/Order';

interface IMessage {
  title: number;
  amount: string;
  value: string;
}

const OrderedDealsHandler = async (ch: Channel, msg: ConsumeMessage | null): Promise<void> => {

  const data: IMessage = msg ? JSON.parse(msg.content.toString()) : undefined;

  console.log(`Received order ${JSON.stringify(data)} from deal: ${Number(msg.properties.messageId)}`);

  const order = new Order({
    dealId: `${msg.properties.messageId}`,
    title: `${data.title}`,
    amount: data.amount,
    value: data.value,
  });

  await order.save();

  console.log(`#${new Date().toLocaleTimeString()} Created order in MongoDB`);

  ch.ack(msg);
};

export default OrderedDealsHandler;
