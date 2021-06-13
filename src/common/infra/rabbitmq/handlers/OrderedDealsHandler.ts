// import { ConsumeMessage, Channel } from 'amqplib';

// import Container from '@common/container';
// import Types from '@common/container/Types';

// import IPrescriptionRepository from '@modules/prescription/repositories/IPrescriptionRepository';
// import RabbitMQServer from '@common/infra/rabbitmq/server';

// interface IMessage {
//   id: number;
//   dataToSign?: string;
//   signed?: boolean;
// }

// const SignedPrescriptionHandler = async (ch: Channel, msg: ConsumeMessage | null): Promise<void> => {

//   const PrescriptionRepository = Container.get<IPrescriptionRepository>(Types.PrescriptionRepository);

//   const data: IMessage = msg ? JSON.parse(msg.content.toString()) : undefined;

//   console.log(`Received ${JSON.stringify(data)} from prescription: ${Number(msg.properties.messageId)}`);

//   const prescriptionId = Number(msg.properties.messageId);

//   const prescription = await PrescriptionRepository.find({ id: prescriptionId });
//   if (!prescription) {
//     console.log(`#${new Date().toLocaleTimeString()} Could not change prescription: ${prescriptionId} status to \'SIGNED\' - and removed it from the queue`);
//     ch.nack(msg, false, false);
//   } else {
//     console.log(`#${new Date().toLocaleTimeString()} Changed prescription: ${prescriptionId} status to \'SIGNED\' - and removed it from the queue`);
//     await PrescriptionRepository.update(prescription, { status: 'SIGNED' });
//     const task = Buffer.from(JSON.stringify({ task: 'UPDATE', payload: { status: 'SIGNED', token: prescription.id } }));
//     // TODO Remove hard coded variables
//     RabbitMQServer.publish('ATENDIMENTO', 'PRESCRIPTION', task);

//     ch.ack(msg);
//   }
// };

// export default SignedPrescriptionHandler;
