import { Job } from "bullmq";
import {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
  Transporter,
} from "nodemailer";
// import config from "../config";
import { IMail } from "../interfaces/IMail";

let transporter: Transporter;

// transporter = nodemailer.createTransport({
//   SES: new SES({
//     apiVersion: "2010-12-01",
//     region: config.region,
//   }),
// });

createTestAccount().then((account) => {
  transporter = createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: { user: account.user, pass: account.pass },
  });
});

export default async (job: Job<IMail>) =>
  transporter.sendMail(job.data).then((message) => {
    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${getTestMessageUrl(message)}`);
  });
