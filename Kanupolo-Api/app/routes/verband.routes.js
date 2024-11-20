module.exports = app => {
    const verbands = require("../controllers/verband.controller.js");

    var router = require("express").Router();

    // Create a new Verband
    router.post("/", verbands.create);

    // Retrieve all Verbands
    router.get("/", verbands.findAll);

    // Retrieve a single Verband with id
    router.get("/:id", verbands.findOne);

    // Update a Verband with id
    router.put("/:id", verbands.update);

    // Delete a Verband with id
    router.delete("/:id", verbands.delete);

    // Delete all Verbands
    router.delete("/", verbands.deleteAll);

    app.use('/api/verbands', router);
}