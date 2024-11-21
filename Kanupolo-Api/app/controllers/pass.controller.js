const db = require('../models');
const Pass = db.pass;
const { getPagination, getPagingData } = require('../utils/pagination');
const Op = require('sequelize').Op;

// Create and Save a new Pass
exports.create = (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.birthdate || !req.body.passNumber || !req.body.approvalDate || !req.body.joinDate) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const pass = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        passNumber: req.body.passNumber,
        approvalDate: req.body.approvalDate,
        joinDate: req.body.joinDate
    }

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

// Connect a Pass to a User
exports.connectToUser = (req, res) => {
    const passId = req.params.id;
    const userId = req.body.userId;

    if (!userId) {
        res.status(400).send({
            message: "User ID can not be empty!"
        });
        return;
    }

    Pass.findByPk(passId)
        .then(pass => {
            if (!pass) {
                res.status(404).send({
                    message: `Cannot find Pass with id=${passId}.`
                });
                return;
            }

            pass.setUser(userId)
                .then(() => {
                    res.send({
                        message: `Pass was connected to User with id=${userId} successfully.`
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Error connecting Pass to User."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Pass with id=" + passId
            });
        });
};

// Retrieve all Passes from the database.
exports.findAll = async (req, res) => {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    try {
        const data = await Pass.findAndCountAll({ 
            include: [{ model: db.verein, as: 'verein' }],
            limit, 
            offset 
        });
        const response = getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        console.error("Error retrieving passes:", err); // Log the detailed error
        res.status(500).send({
            message: "An error occurred while retrieving passes."
        });
    }
};

exports.findAllUnconnected = async (req, res) => {
    try {
        const data = await Pass.findAll({ 
            include: [{ model: db.user, as: 'user', required: false }],
            where: { '$user.id$': { [Op.is]: null } }
        });
        res.send(data);
    } catch (err) {
        console.error("Error retrieving passes:", err); // Log the detailed error
        res.status(500).send({
            message: "An error occurred while retrieving passes."
        });
    }
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