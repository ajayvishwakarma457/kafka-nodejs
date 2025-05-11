const { kafka } = require("./client");

const group = process.argv[2]; // run like: node kafka/consumer.js group1

async function init() {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `${group} | ${topic} | Partition ${partition} | ${message.value.toString()}`
      );
    },
  });
}

init();


