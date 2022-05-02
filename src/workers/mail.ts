import { Worker } from "bullmq";
import config from "../config";
import { IMail } from "../interfaces/IMail";

import mailProcessor from "../processors/mail";

export const mailWorker = new Worker<IMail>(config.queueName, mailProcessor, {
  connection: { ...config.connection },
  concurrency: config.concurrency,
});
