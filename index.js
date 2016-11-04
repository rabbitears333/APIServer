/**
 * Created by andy on 10/14/2016.
 */
const express= require('express');
const http= require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
//db setup
mongoose.connect('mongodb://localhost:auth/auth');
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);
//comment

const port = process.env.PORT||3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);

