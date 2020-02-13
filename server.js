const express = require('express');

const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

const server = express();

server.use(logger)
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

function logger(req, res, next){
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}



module.exports = server;
