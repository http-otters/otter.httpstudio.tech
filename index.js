const express = require('express');
const {resolve} = require('path');
const app = express();

app.use(express.static('views'))

app.get('/', (req, res) => {
  res.send('index');
});


//status codes

app.get('/100', function(req, res) {
  res.sendFile(resolve('./public/img/100.png'));
});

app.get('/200', function(req, res) {
  res.sendFile(resolve('./public/img/200.png'));
});

app.get('/413', function(req, res) {
  res.sendFile(resolve('./public/img/413.png'));
});

app.use(express.static(__dirname + "/public"), (_, res, next) => {
  res.status(404)
  res.sendFile(__dirname + "/views/404.html")
});

app.listen(80, () => {
  console.clear()
  console.log(`[APP] Iniciado com sucesso.`)
});
