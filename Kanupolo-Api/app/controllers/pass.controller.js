const express = require('express');
const Pass = require('../models/pass.model');
const Op = require('sequelize').Op;

const router = express.Router();

// Create a new pass
router.post('/', async (req, res) => {
    try {
        const pass = await Pass.create(req.body);
        res.status(201).json(pass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all passes
router.get('/', async (req, res) => {
    try {
        const passes = await Pass.findAll();
        res.status(200).json(passes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all passes that belong to a verein
router.get('/verein/:vereinId', async (req, res) => {
    try {
        const passes = await Pass.findAll({
            where: {
                vereinId: req.params.vereinId
            }
        });
        res.status(200).json(passes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a single pass by id
router.get('/:id', async (req, res) => {
    try {
        const pass = await Pass.findByPk(req.params.id);
        if (pass) {
            res.status(200).json(pass);
        } else {
            res.status(404).json({ error: 'Pass not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a pass by id
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Pass.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedPass = await Pass.findByPk(req.params.id);
            res.status(200).json(updatedPass);
        } else {
            res.status(404).json({ error: 'Pass not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a pass by id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Pass.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Pass not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;