module.exports = app => {
    const vereins = require("../controllers/verein.controller.js");

    var router = require("express").Router();

    // Create a new Verein
    router.post("/", vereins.create);

    // Retrieve all Vereins
    router.get("/", vereins.findAll);

    // Retrieve a single Verein with id
    router.get("/:id", vereins.findOne);

    // Update a Verein with id
    router.put("/:id", vereins.update);

    // Delete a Verein with id
    router.delete("/:id", vereins.delete);

    // Delete all Vereins
    router.delete("/", vereins.deleteAll);

    app.use('/api/vereins', router);
}