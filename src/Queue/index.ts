import agenda from './agenda';
import { registerJobs } from 'agenda';
import { EmailJobs } from './emails/process.email';

export async function startQueue() {
     // Register all decorator-based job classes
     registerJobs(agenda, [new EmailJobs()]);

     // Start Agenda job processing
     await agenda.start();
     console.log('📬 Agenda Queue started ✅');

     // Graceful shutdown on SIGTERM
     process.on('SIGTERM', async () => {
          console.log('🛑 Shutting down Agenda...');
          const result = await agenda.drain(30000); // wait up to 30s for running jobs
          if (result.timedOut) {
               console.warn(`⚠️  ${result.running} jobs still running after timeout`);
          }
          process.exit(0);
     });
}
startQueue()
