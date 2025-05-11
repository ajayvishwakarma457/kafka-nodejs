const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic: "user-registered", numPartitions: 1 }],
  });
  console.log("Topic created");
  await admin.disconnect();
}

init();
