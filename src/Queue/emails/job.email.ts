import agenda from '../agenda.js';

/**
 * Enqueue a welcome email job for a newly registered user.
 * This is called from the user service after successful registration.
 */
export async function enqueueWelcomeEmail(to: string, name: string) {
  await agenda.now('email.sendWelcome', { to, name });
}

/**
 * Enqueue a generic transactional email job.
 */
export async function enqueueEmail(to: string, subject: string, html: string) {
  await agenda.now('email.sendEmail', { to, subject, html });
}
