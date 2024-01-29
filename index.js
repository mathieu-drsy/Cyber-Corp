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
  
  // Here you can execute the command
  // For demonstration, let's just echo back the command
  console.log('Command received:', command);
  res.json({ message: `Command received: ${command}` });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});