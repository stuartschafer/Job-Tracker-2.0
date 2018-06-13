// Requiring our models
let db = require("../models");
const nodemailer = require('nodemailer');

module.exports = function(app) {
    //route for retrieving all jobs
    app.get("/api/jobs", function(req, res) {
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
        db.Job.findOne({
            where: {
            id: req.params.id
        }
        }).then(function(result) {
            res.json(result);
        });
    });

    // This will send emails
    app.post("/send", function(req, res) {





        

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jobtrackercareer@gmail.com',
                pass: 'jobtrackercareer2018'
            }
        });
          
        let mailOptions = {
            from: 'jobtrackercareer@gmail.com',
            to: 'jobtrackercareer@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        
    });

    // route for saving a new job
    app.post("/api/jobs", function(req, res) {
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