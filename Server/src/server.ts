import express from "express";
import http from 'http'
import path from 'path'
import {formatMessage} from './utils/messages'
import {getCurrentUser,getRoomUsers,userJoin,userLeave} from './utils/users'
import {Server} from 'socket.io'



const app = express()
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:'*'
  }
})

app.use(express.static(path.join(__dirname, '../public')))

const botName = 'Chat BOT';

// Run when a client connects
io.on('connection', (socket) => {
console.log('A User Connected', socket.id)
  socket.on('joinRoom', ({ username, room }:{username:string, room:string}) => {
   console.log(username, "joined", room, 'room')
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // to the single client
    socket.emit('message', formatMessage(botName, 'Welcome to Chat'));

    // Broadcast when a user connects
    // It will emit to everyone except the connected user
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send user and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    console.log(msg)
    const user = getCurrentUser(socket.id);
    if(!user) return
    io.to(user.room).emit('message', formatMessage(user.username, msg));
    console.log(user)
  });

  // Runs when the client disconnect
  socket.on('disconnect', () => {
    console.log('disconnected')
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // / Send user and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = 5000




server.listen(PORT,()=> console.log(`Server is up and running on ${PORT}`))

