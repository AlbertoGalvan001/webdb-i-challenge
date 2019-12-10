const express = require('express');

const knex = require('../data/dbConfig');

const router = express.Router();
router.use(express.json())

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

router.get('/:id', (req, res) => {
    knex
        .select('*')
        .from('accounts')
        .where({ id: req.params.id })
        .first()
        .then(post => {
            res.status(200).json({ post })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Error getting the post." });
        });

});

router.post('/', (req, res) => {
    const accountData = req.body;
    knex('accounts')
        .insert(accountData, "id")
        .then(info => {
            const id = info[0];


            return knex('accounts')
                .select("id", "name", "budget")
                .where({ id })
                .first()
                .then(acct => {
                    res.status(200).json(acct);
                });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "Error adding account."
            });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    knex('accounts')
        .where({ id })
        .update(changes)
        .then(info => {
            if (info > 0) {
                res.status(200).json({ message: `${info} record(s) updated.` });
            } else {
                res.status(404).json({ message: "Info not found." });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Error updating info." })
        });

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    knex('accounts')
        .where({ id: id })
        .del()
        .then(info => {
            res.status(200).json(info)
        })
        .catch(error => {
            res.status(500).json({ error: "Error deleting info." })
        });
});

module.exports = router;