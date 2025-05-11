const { kafka } = require("../user-registration-system/client");

async function registerUser(user) {
  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: "user-registered",
    messages: [{ value: JSON.stringify(user) }],
  });

  console.log(`✅ User registered: ${user.email}`);
  await producer.disconnect();
}

// Simulate registration
const user = {
  name: "Ajay Vishwakarma",
  email: "ajay@example.com",
  registeredAt: new Date().toISOString(),
};

registerUser(user);
