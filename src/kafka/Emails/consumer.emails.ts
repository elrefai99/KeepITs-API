import { kafka } from "../../core/kafka.core";

const consumer = kafka.consumer({ groupId: "keepits-group" });

export async function startConsumer() {
     await consumer.connect();

     await consumer.subscribe({
          topic: "test-topic",
          fromBeginning: true,
     });

     await consumer.run({
          eachMessage: async ({ message }) => {
               const data = JSON.parse(message.value?.toString() || "{}");
               console.log("event:", data);
          },
     });
}
