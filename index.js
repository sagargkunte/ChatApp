import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io'; //! Before this run the command npm i socket.io

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);


io.on('connection',(socket) => {
    socket.on('userMessage',(msg) => {
        // console.log("A new user message",msg);
        io.emit('message',msg);
    })
})
app.use(express.static(path.resolve('./public')));

app.get('/',(req,res) => {
    res.sendFile('./public/index.html');
})

server.listen(PORT,() => {
    console.log(`Server is listning at http://localhost:${PORT}`);
})