import '../core/dotenv.core'
import { Agenda } from 'agenda';
import { MongoBackend } from '@agendajs/mongo-backend';

const MONGODB_URI = process.env.agenda_database as string;

const agenda = new Agenda({
     backend: new MongoBackend({
          address: MONGODB_URI,
          collection: 'agendaJobs'
     }),
     processEvery: '30 seconds',
     maxConcurrency: 20,
     defaultConcurrency: 5
});

export default agenda;
