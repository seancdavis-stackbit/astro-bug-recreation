import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  type Transporter,
} from 'nodemailer';

type SendEmailOptions = {
  /** Email address of the recipient */
  to: string;
  /** Subject line of the email */
  subject: string;
  /** HTML string for email body */
  html: string;
};

/**
 * Instantiates an email account and transporter for sending emails with
 * Nodemailer.
 */
async function getEmailAccount(): Promise<Transporter> {
  return new Promise((resolve, reject) => {
    createTestAccount((err, account) => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      resolve(transporter);
    });
  });
}

/**
 * Sends an email with Nodemailer using the provided transporter.
 */
export async function sendEmail(
  options: SendEmailOptions,
): Promise<{ id: string; url: string | false }> {
  const transporter = await getEmailAccount();
  return new Promise(async (resolve, reject) => {
    const message = {
      from: 'Buckeye Payroll <noreply@buckeyepayroll.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      console.log('Message sent:', info.messageId);
      // TODO: Need a check here. This is only available when sending through an
      // Ethereal account.
      console.log('Preview URL:', getTestMessageUrl(info));

      resolve({ id: info.messageId, url: getTestMessageUrl(info) });
    });
  });
}
