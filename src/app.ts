import './core/dotenv.core'
import express, { Application } from 'express'
import { mongoDBConnection } from './core/mongoDB.core';
import appConfig from './app.config';
import appModule from './app.module';

const app: Application = express()

appConfig(app)
appModule(app);

const main = async () => {
     try {
          const port: number = Number(process.env.PORT) || 9999
          await Promise.all([
               mongoDBConnection(),
          ]);
          app.listen(port, () => {
               console.log("🌐 Server is running on:", process.env.NODE_ENV === "development" ? String(process.env.SITE_API_Local_URL) : String(process.env.SITE_API_URL))
          });
     }
     catch (err) {
          console.error(err)
          process.exit(1);
     }
}

main()
