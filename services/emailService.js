const { kafka } = require("../user-registration-system/client");
const { sendEmail } = require("../utils/sendEmail");

async function init() {
  const consumer = kafka.consumer({ groupId: "email-service" });

  await consumer.connect();
  await consumer.subscribe({ topic: "user-registered", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const user = JSON.parse(message.value.toString());
      console.log(`📨 Received registration: ${user.email}`);
      sendEmail(user.email, "Welcome!", "Thanks for registering with us.");
    },
  });
}

init();
