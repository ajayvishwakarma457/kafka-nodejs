const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      { topic: "ride-requests", numPartitions: 1 },
      { topic: "ride-assignments", numPartitions: 1 },
    ],
  });
  await admin.disconnect();
}

init();
