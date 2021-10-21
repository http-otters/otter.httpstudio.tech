const express = require('express');
const {resolve} = require('path');
const app = express();

app.use(express.static('views'))



// set up rate limiter
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

// only apply to requests that begin with /api/
app.use("/api/", apiLimiter);

app.get('/', (req, res) => {
  res.send('index');
});

//api

//status codes
app.get('/api/100', function(req, res) {
  res.sendFile(resolve('./public/img/100.png'));
});

app.get('/api/200', function(req, res) {
  res.sendFile(resolve('./public/img/200.png'));
});

app.get('/api/413', function(req, res) {
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
