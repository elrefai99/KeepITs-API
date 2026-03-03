import './core/dotenv.core'
import express, { Application } from 'express'
import { mongoDBConnection } from './core/mongoDB.core';
import appConfig from './app.config';
import appModule from './app.module';
import { kafka } from './core/kafka.core';

const app: Application = express()

appConfig(app)
appModule(app);

const main = async () => {
     try {
          const port: number = Number(process.env.PORT) || 9999
          await Promise.all([
               mongoDBConnection(),
               kafka
          ]);
          app.listen(port, () => {
               console.log("🌐 Server is running on:", String(process.env.API_ENDPOINT_URL))
          });
     }
     catch (err) {
          console.error(err)
          process.exit(1);
     }
}

main()
