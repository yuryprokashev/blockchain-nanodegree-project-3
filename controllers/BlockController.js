/**
 * Created by py on 01/09/2018.
 */
const Block = require('../model/Block');
const StatusCodes = require('./StatusCodes.js');

module.exports = class BlockController {
    constructor(blockchainService){
        this.blockchainService = blockchainService;
    }
    getBlockByHeight(request, response) {
        let height = request.params.blockHeight;
        let blockPromise = this.blockchainService.getBlock(height);
        blockPromise.then(block => {
            response.send(block);
        }).catch(err => {
            response.status(StatusCodes.BAD_REQUEST).json({error: err.message});
        });
    };

    postBlock(request, response) {
        let data = request.body.body;
        let block = new Block(data);
        if(data === undefined) {
            let error = new Error(`missing 'body' key in request body.`);
            response.status(StatusCodes.BAD_REQUEST).json({error: error.message});
        } else {
            let newBlockPromise = this.blockchainService.addBlock(block);
            newBlockPromise.then(block => {
                response.json(block);
            }).catch(err => {
                response.status(StatusCodes.BAD_REQUEST).json({error: err.message});
            });
        }
    }
};