const db = require('../models');
const Verband = db.verband;
const { getPagination, getPagingData } = require('../utils/pagination');
const Op = require('sequelize').Op;

// Create and Save a new Verband
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const verband = {
        name: req.body.name
    };

    Verband.create(verband)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Verband."
            });
        });
};

// Retrieve all Verbands from the database.
exports.findAll = async (req, res) => {
    const { page, size, condition } = req.query;
    let queryCondition = {};

    if (condition) {
        try {
            queryCondition = JSON.parse(condition);
        } catch (error) {
            return res.status(400).send({
                message: "Invalid condition format!"
            });
        }
    }

    const { limit, offset } = getPagination(page, size);

    try {
        const data = await Verband.findAndCountAll({ where: queryCondition, limit, offset });
        const response = getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        console.error("Error retrieving verbands:", err); // Log the detailed error
        res.status(500).send({
            message: "An error occurred while retrieving verbands."
        });
    }
};

// Find a single Verband with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Verband.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Verband with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Verband with id=" + id
            });
        });
};

// Update a Verband by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Verband.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Verband was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Verband with id=${id}. Maybe Verband was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Verband with id=" + id
            });
        });
};

// Delete a Verband with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Verband.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Verband was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Verband with id=${id}. Maybe Verband was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Verband with id=" + id
            });
        });
};

// Delete all Verbands from the database.
exports.deleteAll = (req, res) => {
    Verband.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Verbands were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all verbands."
            });
        });
};
