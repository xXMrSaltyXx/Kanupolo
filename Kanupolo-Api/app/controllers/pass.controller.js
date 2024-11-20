const db = require('../models');
const Pass = db.pass;
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

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: passes } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, passes, totalPages, currentPage };
}; 

// Retrieve all Passes from the database.
exports.findAll = (req, res) => {
    const { page, size, firstname, lastname, birthdate, passNumber, approvalDate, joinDate, vereinId } = req.query;
    let condition = {};
    
    const conditionsMap = {
        firstname: { [Op.iLike]: `%${firstname}%` },
        lastname: { [Op.iLike]: `%${lastname}%` },
        birthdate: { [Op.eq]: birthdate },
        passNumber: { [Op.iLike]: `%${passNumber}%` },
        approvalDate: { [Op.eq]: approvalDate },
        joinDate: { [Op.eq]: joinDate },
        vereinId: { [Op.eq]: vereinId }
    };
    
    Object.entries(conditionsMap).forEach(([key, value]) => {
        if (req.query[key]) {
            condition[key] = value;
        }
    });

    const { limit, offset } = getPagination(page, size);

    Pass.findAndCountAll({ limit, offset, where: condition })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
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