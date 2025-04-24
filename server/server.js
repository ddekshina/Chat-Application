const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

app.get('/', (req,res) => {
    res.send('Chat Server is running');
})


io.on('connection', (socket) =>{
    console.log('New client connected:', socket.id);

    //messages received
    socket.on('sendMessage', (message) =>{
        console.log('Message received:', message);
        io.emit('message', message);
    });

    //disconnect
    socket.on('disconnect', () =>{
        console.log('Client disconnected', socket.id);
    });
});

const PORT= process.env.PORT || 5000;
server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
});

