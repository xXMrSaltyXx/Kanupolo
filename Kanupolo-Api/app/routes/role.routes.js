const roles = require("../controllers/role.controller.js");
var router = require("express").Router();

module.exports = app => {

    // Create a new Role
    router.post("/", roles.create);

    // Retrieve all Roles
    router.get("/", roles.findAll);
    
    // Retrieve all Roles without pagination
    router.get("/without-pagination", roles.findAllWithoutPagination);

    // Retrieve a single Role with id
    router.get("/:id", roles.findOne);

    // Update a Role with id
    router.put("/:id", roles.update);

    // Delete a Role with id
    router.delete("/:id", roles.delete);

    // Delete all Roles
    router.delete("/", roles.deleteAll);

    app.use('/api/roles', router);
}