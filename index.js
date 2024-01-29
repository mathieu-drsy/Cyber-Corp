const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'view')));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/terminal', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'terminal.html'));
});

app.post('/execute-command', (req, res) => {
  const { command } = req.body;
  let output = '';

  // Execute specific commands
  switch (command.trim()) {
    case 'help':
      output = 'Available commands:\n- help: Display available commands\n- date: Show current date and time';
      break;
    case 'date':
      const currentDate = new Date().toLocaleString();
      output = `Current date and time: ${currentDate}`;
      break;
    default:
      output = `Command not found: ${command}`;
      break;
  }

  // Log the command and send back the output
  console.log('Command received:', command);
  res.json({ message: output });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});