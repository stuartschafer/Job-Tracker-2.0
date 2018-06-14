// Requiring our models
let db = require("../models");
const nodemailer = require('nodemailer');

module.exports = function(app) {

    //route for retrieving all jobs for the user logged in
    app.get("/api/jobs", function(req, res) {
        db.Job.findAll({
            where: {
                Userid: req.user.id
            }
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
        console.log(req.body);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jobtrackercareer@gmail.com',
                pass: 'JobTrackerCareer2018'
            }
        });
        
        let userIssue = "EMAIL FROM: " + req.body.email + "\n\nPRIORITY: " + (req.body.priority).toUpperCase() + "\n\nIssue:\n" + req.body.issue;
        
        let mailOptions = {
            headers: {
                priority: (req.body.priority).toLowerCase()
            },
            from: req.body.email,
            to: 'jobtrackercareer@gmail.com',
            subject: req.body.subject,
            text: userIssue
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.redirect('/menu');
        
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
    // Not used now, but might later on
    app.delete("/api/jobs/:id", function(req, res) {
        db.Job.destroy({
        where: {
            id: req.params.id
        }
        });
    });
};