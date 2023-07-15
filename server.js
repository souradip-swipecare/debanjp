const express = require('express');
const path = require('path');
require('dotenv').config();
_ = require('underscore');
const http = require('http');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const bodyParser = require('body-parser');

const apirouter = require('./routes/api');
const login = require('./routes/login');
app.use(express.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.urlencoded({
    extended: true
}));
const server = http.createServer(app);



app.use(apirouter);
app.use(login);

require(path.join(__dirname, '/datab', 'config'))();

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`server i sconnected to port http://127.0.0.1:${port}`);
}) 
