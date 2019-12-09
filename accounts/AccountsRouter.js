const express = require('express');

const knex = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    knex
        .select('*')
        .from('accounts')
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error getting accounts from database.' });
        });
});