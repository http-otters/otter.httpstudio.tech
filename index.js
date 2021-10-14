const express = require('express');
const { join } = require('path');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.readFile('./views/index.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Route not found!');
    } else {
      res.write(data);
    }
    res.end();
  });
});


//status codes
app.get('/100', function (req, res) {
res.sendFile(__dirname + '/img/100.png');
}) 

app.get('/200', function (req, res) {
res.sendFile(__dirname + '/img/200.png');
}) 

app.get("/404", (req, res) => {
  res.redirect('');
})

app.listen(80, () => {
  console.clear()
  console.log(`[APP] Iniciado com sucesso.`)
})