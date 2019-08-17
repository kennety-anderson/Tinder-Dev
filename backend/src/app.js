//require das dependecias necessarias
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

//montagem de servidores com os protocolos necessarios 
const app = express();
const server = http.Server(app);
const io = socketIo(server);

//setando id do usuario
const connectedUsers = {};
io.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUsers[user] = socket.id
});

//middleware para setar socket io nas requisições
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    next();
});

//middlewares 
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rotas da aplicação
app.use(routes);

//conexão com o banco de dados mongoDB
mongoose.connect('mongodb://localhost:27017/tinder-dev',
    { useNewUrlParser: true, useCreateIndex: true })


//execução do servidor na porta 3333
server.listen(3333);
