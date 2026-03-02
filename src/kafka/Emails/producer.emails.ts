import { kafka } from "../../core/kafka.core";

const producer = kafka.producer();

export async function connectProducer() {
     await producer.connect();
}

export async function sendEvent(topic: string, data: any) {
     await producer.send({
          topic,
          messages: [
               {
                    value: JSON.stringify(data),
               },
          ],
     });
}

export default producer;
