//require das rotas e do express
const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikesController');


const routes = express.Router();

//rotas de criação e listagem de usuarios 
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

//rotas de likes e dislikes
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);


//exportação das rotas 
module.exports = routes;
