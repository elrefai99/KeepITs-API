import { mongoDBConnection } from '../src/core/mongoDB.core';
import { logger } from '../src/utils/logger';
import { seedAdmin } from './admin.seed';
import mongoose from 'mongoose';

const runSeeds = async (): Promise<void> => {
     try {
          await mongoDBConnection();
          logger.info('Running seeds...');

          await seedAdmin();

          logger.info('All seeds completed.');
          await mongoose.connection.close();
          process.exit(0);
     } catch (error) {
          logger.error('Seed error:', error);
          await mongoose.connection.close();
          process.exit(1);
     }
};

runSeeds();
