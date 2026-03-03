import { JobsController, Define, Every, Job } from 'agenda';
import { nodemailerFunction } from '../provider/nodemailer';
import { welcomeTemplate } from './templates/welcome.template';

@JobsController({ namespace: 'email' })
export class EmailJobs {

     @Define({ concurrency: 5 })
     async sendEmail(job: Job<{ to: string; subject: string; html: string }>) {
          const { to, subject, html } = job.attrs.data;
          try {
               await nodemailerFunction(to, subject, html);
          } catch (err) {
               console.error(`❌ Failed to send email to ${to}:`, err);
               throw err;
          }
     }

     @Define({ concurrency: 5 })
     async sendWelcome(job: Job<{ to: string; name: string }>) {
          const { to, name } = job.attrs.data;
          const html = welcomeTemplate(name);
          try {
               await nodemailerFunction(to, html, 'Welcome to KeepITs 🎉');
          } catch (err) {
               console.error(`❌ Failed to send welcome email to ${to}:`, err);
               throw err;
          }
     }

     @Every('1 hour')
     async cleanupBounced(job: Job) {
          console.log('🧹 Cleaning up bounced emails...', job.attrs._id);
     }
}
