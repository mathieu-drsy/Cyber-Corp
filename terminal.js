const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "my-terminal> ",
});

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  switch (input) {
    case "help":
      console.log("Available commands: help, echo, exit");
      break;
    case "echo":
      console.log("Usage: echo [message]");
      break;
    case "exit":
      rl.close();
      break;
    default:
      console.log(input);
      break;
  }
  rl.prompt();
}).on("close", () => {
  console.log("Exiting terminal");
  process.exit(0);
});
