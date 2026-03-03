import { Kafka } from "kafkajs";

export const kafka = new Kafka({
     clientId: "keepits-api",
     brokers: process.env.NODE_ENV === "development" ? ["kafka:9092"] : ["localhost:9092"],
})
