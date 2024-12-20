const { where } = require('sequelize');
const db = require('../models');
const { getPagination, getPagingData } = require('../utils/pagination');
const Op = require('sequelize').Op;
const crypto = require('crypto');

const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.roleId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        username: req.body.username,
        password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
        roleId: req.body.roleId,
        passId: req.body.passId
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error("Error creating user:", err)
            res.status(500).send({
                message: "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    try {
        const data = await User.findAndCountAll({
            include: [{ model: db.role, as: 'role', attributes: ['id','name'] }],
            include: [{ model: db.pass, as: 'pass', attributes: ['id','passNumber'] }],
            limit,
            offset
        });
        const response = getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).send({
            message: "An error occurred while retrieving users."
        });
    }
};

exports.findAllWithoutPagination = async (req, res) => {
    try {
        const data = await User.findAll({
            include: [{ model: db.role, as: 'role', attributes: ['id','name'] }],
            include: [{ model: db.pass, as: 'pass', attributes: ['id','passNumber'] }]
        });
        res.send(data);
    } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).send({
            message: "An error occurred while retrieving users."
        });
    }
};

// Retrieve all Users with their roles and passnumber from the database.
exports.findAllWithRolesAndPassnumber = async (req, res) => {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    try {
        const data = await User.findAndCountAll({
            include: [
                {
                    model: db.role,
                    as: 'role',
                    attributes: ['name']
                },
                {
                    model: db.pass,
                    as: 'pass',
                    attributes: ['passNumber']
                }
            ],
            limit,
            offset
        });
        const response = getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        console.error("Error retrieving users with roles and passnumber:", err);
        res.status(500).send({
            message: "An error occurred while retrieving users with roles and passnumber."
        });
    }
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {
        include: [
            {
                model: db.role,
                as: 'role',
                attributes: ['name']
            },
            {
                model: db.pass,
                as: 'pass'
            }
        ],
        attributes: { exclude: ['password'] }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    if (req.body.password) {
        req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    }

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating User with id=" + id
            });
        });
};

exports.getUserData = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {
        include: [
            {
                model: db.role,
                as: 'role',
                attributes: ['name']
            },
            {
                model: db.pass,
                as: 'pass',
                include: [
                    {
                        model: db.verein,
                        as: 'verein',
                        attributes: ['name'],
                        include: [
                            {
                                model: db.verband,
                                as: 'verband',
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            }
        ],
        attributes: { exclude: ['password'] }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving User with id=" + id
            });
        });
}

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all users."
            });
        });
};