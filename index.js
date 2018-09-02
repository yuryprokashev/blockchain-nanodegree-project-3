/**
 *Created by py on 01/09/2018
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8000;

const BlockService = require('./services/BlockchainService');
const BlockDb = require('./dao/BlockchainDb');
const BlockController = require('./controllers/BlockController');
const ChainController = require('./controllers/ChainController');

let blockDb = new BlockDb("./db");
let blockService = new BlockService(blockDb);
let blockController = new BlockController(blockService);
let chainController = new ChainController(blockService);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/block/:blockHeight', blockController.getBlockByHeight.bind(blockController));
app.post('/block', blockController.postBlock.bind(blockController));

app.get('/chain', chainController.getChain.bind(chainController));

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}\n`);
});