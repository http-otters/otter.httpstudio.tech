const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('views'))

app.get('/', (req, res) => {
  res.send('index');
});


//status codes
app.get('/100', function (req, res) {
res.sendFile(path.resolve('./img/100.png'));
}) ;

app.get('/200', function (req, res) {
res.sendFile(path.resolve('./img/200.png'));
}); 

app.get("/404", (req, res) => {
  res.redirect('');
});

app.listen(80, () => {
  console.clear()
  console.log(`[APP] Iniciado com sucesso.`)
});
