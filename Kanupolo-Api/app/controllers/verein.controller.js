const db = require('../models');
const Verein = db.verein;
const { getPagination, getPagingData } = require('../utils/pagination');
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
        name: req.body.name
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
exports.findAll = async (req, res) => {
    const { page, size, condition } = req.query;
    let queryCondition = {};

    if (condition) {
        try {
            queryCondition = JSON.parse(condition);
        } catch (error) {
            res.status(400).send({
                message: "Invalid condition format!"
            });
            return;
        }
    }

    const { limit, offset } = getPagination(page, size);

    try {
        const data = await Verein.findAndCountAll({ where: queryCondition, limit, offset });
        const response = getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        console.error("Error retrieving vereins:", err); // Log the detailed error
        res.status(500).send({
            message: "An error occurred while retrieving vereins."
        });
    }
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
                message: "Error retrieving Verein with id=" + id
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
                message: "Error updating Verein with id=" + id
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
                message: "Could not delete Verein with id=" + id
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