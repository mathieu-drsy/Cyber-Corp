const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'view')));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/terminal', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'terminal.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});