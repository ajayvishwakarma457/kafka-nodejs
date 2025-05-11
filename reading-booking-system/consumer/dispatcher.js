const { kafka } = require("../client");
const { assignDriver } = require("../../services/driverService");

async function init() {
  const consumer = kafka.consumer({ groupId: "dispatchers" });
  const producer = kafka.producer();

  await consumer.connect();
  await producer.connect();

  await consumer.subscribe({ topic: "ride-requests", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const ride = JSON.parse(message.value.toString());
      console.log("Dispatching ride for:", ride.user);

      const driver = assignDriver(ride.location);
      const assignment = { ...ride, driver };

      await producer.send({
        topic: "ride-assignments",
        messages: [{ value: JSON.stringify(assignment) }],
      });

      console.log(`Driver ${driver} assigned to ${ride.user}`);
    },
  });
}

init();
