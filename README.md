# Local Machine Deployment
1. Download or clone the repo to `project_folder` on your local machine.
2. Open Terminal and `cd` to the `project_folder`.
3. Run `npm install` to install dependencies.
4. Run `node index.js`.
5. Server will listen port 8000.

# Dependencies
1. [LevelDB 4.0.0+](https://github.com/Level/level)
2. [Crypto.js 3.1.9-1+](https://www.npmjs.com/package/crypto-js)
3. [Express.js 4.0.0+](https://expressjs.com/)

# Test using Postman
1. [Use the Postman collection in this repo](./tests/Blockchain_Nanodegree_Project_3.postman_collection.json) 
(Collection v2.1, Postman v6.2.4).
2. Import this file to your Postman application.
3. Open Collection Runner
4. Choose 'Blockchain Nanodegree' collection.
5. Click Run.

# REST API Documentation
Base Path for API is `/`.

`Content-Type` header for all requests is `application/json`.

## GET /block/{blockHeight}
### Description
Allows to read block information by its height.
### Request
#### Example
``` 
curl -X GET \
  http://localhost:8000/block/0 \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
```
#### Path parameter:`blockHeight: Number`
Provides the height of the block to be read.

### Successful Response
#### Description
Status code: 200.

Returns representation of the Block object in Response Body
#### Example
``` 
{
    "hash": "faf2db0c6bbb3bc8f4cb06684c829806a0ae8fbd08073b5152fd2fc9e0d55db6",
    "height": 4,
    "body": "test block from REST client",
    "time": "1535870846",
    "previousBlockHash": "657488d2b4ce0dbfc7ae386a243d76578e878c558741e62b284846880aaa163c"
}
```
### Error Responses
#### Bad Request
##### Description
When block height parameter, provided in request, is more than current 
Blockchain length, then Bad Request error is returned.

Status code is 400.

Response body has `error: String` property. 
##### Example
``` 
{
    "error": "Can not get Block at key = 100. Key not found in database [100]"
}
```

## POST /block
### Description
Allows to append new Block with custom data to Blockchain.
### Request
#### Example
``` 
curl -X POST \
  http://localhost:8000/block \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"body":"test block from REST client"}'
```
####  Body parameter: `body: String`
Accepts `body` parameter in request body.

`body` is `String` with any length. It is the data, that will be stored in
the new Block.

### Successful Response
#### Description
Status code: 200.

Returns representation of created Block object in Response Body.
#### Example
``` 
{
    "hash": "faf2db0c6bbb3bc8f4cb06684c829806a0ae8fbd08073b5152fd2fc9e0d55db6",
    "height": 4,
    "body": "test block from REST client",
    "time": "1535870846",
    "previousBlockHash": "657488d2b4ce0dbfc7ae386a243d76578e878c558741e62b284846880aaa163c"
}
```

### Error Responses
#### Bad Request
##### Description
When request body does not have `body` parameter, then Bad Request error is returned.

Status code is 400.

Response body has `error: String` property. 
##### Example
``` 
{
    "error": "missing 'body' key in request body."
}
```