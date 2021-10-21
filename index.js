const express = require('express');
const {resolve} = require('path');
const app = express();

app.use(express.static('views'))


const slowDown = require("express-slow-down");


const speedLimiter = slowDown({
  windowMs: 2 * 60 * 1000, // 1 minutes
  delayAfter: 70, // allow 70 requests per 2 minutes, then...
  delayMs: 200 // begin adding 200ms of delay per request above 30:
});

//  apply to all requests
app.use(speedLimiter);

// set up rate limiter
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.use(apiLimiter);

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
