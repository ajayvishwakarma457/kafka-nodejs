const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Connected!");

  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });

  console.log("Topic created.");
  await admin.disconnect();
}

init();
