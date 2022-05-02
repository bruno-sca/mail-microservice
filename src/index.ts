import { mailWorker } from "./workers/mail";

mailWorker.on("completed", (job) =>
  console.log(
    `Completed job ${job.id} successfully, sent email to ${job.data.to}`
  )
);

mailWorker.on("failed", (job, err) =>
  console.log(`Failed job ${job.id} with ${err}`)
);

mailWorker.on("error", console.log);
