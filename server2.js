// server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.use(express.static('public')); // 'public' 폴더에 index.html 파일을 넣습니다.

server.listen(3000, () => {
    console.log('Listening on port 3000');
});
