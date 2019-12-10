const express = require('express');

const AccountsRouter = require('./accounts/AccountsRouter.js');


const server = express();

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) =>
    res.send('<h2>DB HELPERS WITH KNEX</h2>'));

module.exports = server;