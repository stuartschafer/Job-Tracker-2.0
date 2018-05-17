// Requiring our models
var db = require("../models");

module.exports = function(app) {
    //route for retrieving all jobs
    app.get("/api/inventory", function(req, res) {
        var query = {};
        if (req.query.UserId) {
            query.UserId = req.query.UserId;
        }

        db.Job.findAll({
            where: query,
            include: [db.User]
        }).then(function(results) { 
            res.json(results);
        });
    });

    // route for retrieving a single job
    app.get("/api/inventory/:id", function(req, res) {
        db.Job.findOne({
            where: {
            id: req.params.id
        }
        }).then(function(result) {
            res.json(result);
        });
    });

    // route for saving a new job
    app.post("/api/inventory", function(req, res) {
        console.log("~~~~~~~~~~~~HERE~~~~~~~~~~~~");
        console.log(req.body);
        console.log("~~~~~~~~~~~~HERE~~~~~~~~~~~~");
        db.Job.create(req.body)
    });

    // route for updating a job
    app.put("/api/inventory", function(req, res) {
        db.Job.update(
        req.body,
        {
            where: {
            id: req.body.id
            }
        });
    });

    // route for deleting a job
    app.delete("/api/inventory/:id", function(req, res) {
        db.Job.destroy({
        where: {
            id: req.params.id
        }
        });
    });
};