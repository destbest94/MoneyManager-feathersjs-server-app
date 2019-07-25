const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const calculate = require('./Calculate');

const app = express(feathers());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.configure(socketio());

app.on('connection', connection => app.channel('everybody').join(connection));

app.publish(() => app.channel('everybody'));

app.use('messages', calculate);

app.use(express.errorHandler());

const server = app.listen(3030);

server.on('listening', () => console.log('Feathers API started at localhost:3030'));