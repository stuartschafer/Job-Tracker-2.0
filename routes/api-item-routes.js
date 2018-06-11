// Requiring our models
let db = require("../models");

module.exports = function(app) {
    //route for retrieving all jobs
    app.get("/api/jobs", function(req, res) {
        console.log("3-3-3-3-3-3-3-3-3-3-3-3-3-3");
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
    app.get("/api/jobs/:id", function(req, res) {
        console.log("2-2-2-2-2-2-2-2-2-2-2-2-2-2");
        db.Job.findOne({
            where: {
            id: req.params.id
        }
        }).then(function(result) {
            res.json(result);
        });
    });

   

    // route for saving a new job
    app.post("/api/jobs", function(req, res) {
        console.log("1-1-1-1-1-1-1-1-1-1-1-1-1-1");
        db.Job.create(req.body)
    });

    // route for updating a job
    app.put("/api/jobs", function(req, res) {
        db.Job.update(
        req.body,
        {
            where: {
            id: req.body.id
            }
        });
    });

    // route for deleting a job
    app.delete("/api/jobs/:id", function(req, res) {
        db.Job.destroy({
        where: {
            id: req.params.id
        }
        });
    });
};