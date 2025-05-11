const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  await producer.connect();

  rl.setPrompt("Enter user and pickup location (e.g., ajay Mumbai): ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [user, location] = line.split(" ");
    await producer.send({
      topic: "ride-requests",
      messages: [
        {
          value: JSON.stringify({ user, location, timestamp: new Date() }),
        },
      ],
    });
    console.log("Ride requested.");
    rl.prompt();
  });
}

init();
