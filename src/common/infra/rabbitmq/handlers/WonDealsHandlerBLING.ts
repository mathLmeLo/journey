// import { ConsumeMessage, Channel } from 'amqplib';

// import Container from '@common/container';

// import RabbitMQServer from '@common/infra/rabbitmq';
// import MessageBrokerConfig from '@config/MessageBrokerConfig';

// import SignPrescriptionService from '@modules/prescription/services/SignPrescriptionService';
// import ISignMessage from '@common/infra/rabbitmq/dtos/ISignMessage';

// const WonDealsHandler = async (ch: Channel, msg: ConsumeMessage): Promise<void> => {
//   const SignPrescription = Container.resolve<SignPrescriptionService>(SignPrescriptionService);

//   const data: ISignMessage = JSON.parse(msg.content.toString());

//   await SignPrescription.execute({ prescriptionId: (data).prescriptionId, data })
//     .then(() => {
//       const res = Buffer.from(JSON.stringify({ signed: true }));
//       console.log(`#${new Date().toLocaleTimeString()} Successfully signed prescription: ${msg.properties.messageId}`);
//       RabbitMQServer.publish(
//         MessageBrokerConfig.rabbitmq.prescription.exchanges.done,
//         MessageBrokerConfig.rabbitmq.prescription.routingKeys.signed,
//         res,
//         { messageId: msg.properties.messageId },
//       );
//     }).catch(() => {
//       const retry = Buffer.from(JSON.stringify(data));
//       const retryCount = msg.properties.headers['x-retries'] ? msg.properties.headers['x-retries'] : 0;
//       if (retryCount < MessageBrokerConfig.rabbitmq.maxRetries) {
//         console.log(`#${new Date().toLocaleTimeString()} Failed to sign prescription: ${msg.properties.messageId} | retryCount ${retryCount + 1}`);
//         const retryDelay = MessageBrokerConfig.rabbitmq.retryDelay * (retryCount + 1);
//         console.log(`#${new Date().toLocaleTimeString()} Republishing: ${msg.properties.messageId} with ${retryDelay / 1000}s delay`);
//         RabbitMQServer.publish(
//           MessageBrokerConfig.rabbitmq.default.exchanges.hold,
//           MessageBrokerConfig.rabbitmq.prescription.queues.sign,
//           retry,
//           {
//             messageId: msg.properties.messageId,
//             headers: { 'x-retries': retryCount + 1 },
//             expiration: retryDelay,
//           },
//         );
//       } else {
//         console.log(`#${new Date().toLocaleTimeString()} Max retries reached - could not sign prescription: ${msg.properties.messageId}`);
//       }
//     });

//   ch.ack(msg);
// };

// export default WonDealsHandler;
