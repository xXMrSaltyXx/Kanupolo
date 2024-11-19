const db = require('../models/index');
const Verein = require('../models/pass.model');
const Op = require('sequelize').Op;

// Create and Save a new Verein
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const verein = {
        name: req.body.name,
        description: req.body.description
    };

    Verein.create(verein)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Verein."
            });
        });
};

// Retrieve all Vereins from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Verein.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving vereins."
            });
        });
};

// Retrive all Vereins from a specific Veband
exports.findAllFromVerband = (req, res) => {
    const verbandId = req.params.verbandId;

    Verein.findAll({ where: { verbandId: verbandId } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving vereins."
            });
        });
};

// Find a single Verein with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Verein.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Verein with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Verein with id=" + id
            });
        });
};

// Update a Verein by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Verein.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Verein was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Verein with id=${id}. Maybe Verein was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Verein with id=" + id
            });
        });
};

// Delete a Verein with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Verein.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Verein was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Verein with id=${id}. Maybe Verein was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete Verein with id=" + id
            });
        });
};

// Delete all Vereins from the database.
exports.deleteAll = (req, res) => {
    Verein.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Vereins were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all vereins."
            });
        });
};