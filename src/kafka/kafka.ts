import { connectProducer } from "./Emails/producer.emails";
import { startConsumer } from "./Emails/consumer.emails";

async function bootstrap() {
     await connectProducer();
     await startConsumer();
}

bootstrap()
