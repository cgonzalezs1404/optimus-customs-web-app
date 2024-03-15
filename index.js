const http = require('http');
const express = require('express');

let app = express();

app.get('/cesar', (req, res) => {
    res.send('<h1>PERRAS</h1>')
});

app.use(express.static('test'));

app.listen(process.env.PORT, () => {
    console.log('Tu mama me ama');
});
// http.createServer((req, res) => {

//     res.redirect(200, {'Content-Type': 'application/json'});
    
//  res.end(JSON.stringify({
  
//   name: "Nodejs IIS!",
//   iisnodeV : process.env.IISNODE_VERSION,
//   nodeV : process.version,
 
//  }));
 
// }).listen(process.env.PORT);  