const db = require('../models/index');
const Pass = require('../models/pass.model');
const Op = require('sequelize').Op;

// Create and Save a new Pass
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const pass = {
        name: req.body.name,
        description: req.body.description
    };

    Pass.create(pass)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Pass."
            });
        });
};

// Retrieve all Passes from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Pass.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving passes."
            });
        });
};

// Retrive all Passes from a specific Verein
exports.findAllFromVerein = (req, res) => {
    const vereinId = req.params.vereinId;

    Pass.findAll({ where: { vereinId: vereinId } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving passes."
            });
        });
};

// Find a single Pass with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pass.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Pass with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Pass with id=" + id
            });
        });
};

// Update a Pass by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pass.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pass was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pass with id=${id}. Maybe Pass was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Pass with id=" + id
            });
        });
};

// Delete a Pass with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pass.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pass was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pass with id=${id}. Maybe Pass was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete Pass with id=" + id
            });
        });
};

// Delete all Passes from the database.
exports.deleteAll = (req, res) => {
    Pass.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Passes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all passes."
            });
        });
};