import { UserModel } from "../src/Module/user/Schema/User.schema";
import { logger } from "../src/utils/logger";

export const seedAdmin = async (): Promise<void> => {
     try {
          const existingAdmin = await UserModel.findOne({ role: 'admin' });
          if (existingAdmin) {
               logger.info('Admin user already exists. Skipping seed.');
               return;
          }

          await UserModel.create({
               name: 'Admin',
               email: 'admin@pharmalink.com',
               password: 'admin123456',
          });

          logger.info('Default admin user created: admin@pharmalink.com / admin123456');
     } catch (error) {
          logger.error('Admin seed error:', error);
     }
};
