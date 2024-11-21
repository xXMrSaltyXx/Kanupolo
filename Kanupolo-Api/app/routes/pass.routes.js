module.exports = app => {
    const passes = require("../controllers/pass.controller.js");

    var router = require("express").Router();

    // Create a new Pass
    router.post("/", passes.create);

    // Retrieve all unconnected Passes
    router.get("/unconnected", passes.findAllUnconnected);

    // Connect a Pass to a User
    router.post("/:id/connectToUser", passes.connectToUser);

    // Retrieve all Passes
    router.get("/", passes.findAll);

    // Retrieve a single Pass with id
    router.get("/:id", passes.findOne);

    // Update a Pass with id
    router.put("/:id", passes.update);

    // Delete a Pass with id
    router.delete("/:id", passes.delete);

    // Delete all Passes
    router.delete("/", passes.deleteAll);

    app.use('/api/passes', router);
}