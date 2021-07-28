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

users = {};
game = {};
whichGame = {}
// socket.id => gameID

io.on('connection', (socket) => {
  console.log('user connected ')
  // save the socket object in users[socket.id] = socket
  users[socket.id] = socket
  socket.on('disconnect', () => {
    delete users[socket.id]
    IDtoDelete = whichGame[socket.id]
    delete game[IDtoDelete]
    delete whichGame[socket.id]
    // delete from user's table
    console.log('user disconnected');
  });

  socket.on('create-game', () => {
    // handle stuff -- create game?
    whichGame[socket.id] = socket.id
    game[socket.id] = {"creator":socket, "opponent":null};
    socket.emit('created-game', socket.id);
  });
  socket.on('join', (gameID) => {
    if (gameID in game && game[gameID].opponent == null){
    // if (gameID in game && gameID == game[gameID]."creator".id){
        whichGame[socket.id] = gameID
        game[gameID].opponent = socket
        socket.emit('play-game',true)
        game[gameID].creator.emit('play-game',true)
    }
    else{
      socket.emit('play-game', false)
    }

  })
  socket.on('joinedGame',()=> {
    socket.emit('opponentEntered',true)
  })
  socket.on('move',(index)=>{
    let gameID = whichGame[socket.id]
    if (gameID == socket.id){
    game[gameID].opponent.emit('opponent-played',index)
  }
    else{
      game[gameID].creator.emit('opponent-played',index)
    } 
  }
  )
});

server.listen(8000, () => console.log("server running in port 8000.."));
