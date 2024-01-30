const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.json());

app.use(express.static(path.join(__dirname, "view")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.get("/terminal", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "terminal.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login", "login.html"));
});

app.get("/inscription", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "inscription.html"));
});

app.get("/stat", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "stat.html"));
});

app.get("/profil", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "profil.html"));
});

app.post("/execute-command", (req, res) => {
  const { command } = req.body;
  let output = "";
  let correct = false; // Track if the command was correct

  // Execute specific commands
  switch (command.trim()) {
    case "help":
      output =
        "Available commands:\n- help: Display available commands\n- date: Show current date and time";
      break;
    case "date":
      const currentDate = new Date().toLocaleString();
      output = `Current date and time: ${currentDate}`;
      break;
    case "true":
      // Here, you can define the behavior for the "true" command
      output = "You have chosen to continue.";
      correct = true; // Set correct to true for this command
      break;
    case "false":
      // Here, you can define the behavior for the "true" command
      output = "You have chose to fail.";
      correct = false; // Set correct to true for this command
      break;
    case "restart":
      // Send a specific response to indicate page reload
      res.json({ reload: true });
      return; // Stop further execution
    default:
      output = `Command not found: ${command}`;
      break;
  }

  // Log the command and send back the output along with correct flag
  console.log("Command received:", command);
  res.json({ message: output, correct });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
