const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const url = require('url');

app.use(express.static(path.join(__dirname,'/../client/build')));

app.get('/', (req, res) => {
  const q = url.parse(req.url);

  res.sendFile(path.join(__dirname,'/../client/build','index.html'));
})

server.listen(8000, () => console.log("server running in port 8000.."));
