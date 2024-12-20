const users = require("../controllers/user.controller.js");
var router = require("express").Router();

module.exports = app => {

    // Create a new User
    router.post("/", users.create);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve all Users without pagination
    router.get("/without-pagination", users.findAllWithoutPagination);

    // Retrieve all Users with their roles and passnumber
    router.get("/role-pass", users.findAllWithRolesAndPassnumber);

    router.get("/user-data/:id", users.getUserData);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // Delete all Users
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
}