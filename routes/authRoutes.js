var authController = require('../controllers/authController.js');
let db = require("../models");
let bCrypt = require('bcrypt-nodejs');

// ROUTES INVOLVING USER AUTHENTICATION 
module.exports = function(app, passport) {
	// These bring us to the main login page
  	app.get('/signup', authController.signup);

  	app.get('/signin', authController.signin);

    // When new user signs up (redirect to form if fails)
    app.post('/signup', passport.authenticate('local-signup', 
        {
	        successRedirect: '/menu',	 
	        failureRedirect: '/signup'
        }
	));

  	// Only authenticated users will be able to view other pages
    app.get('/menu', isLoggedIn, authController.menu);
    app.get('/add', isLoggedIn, authController.add);
    app.get('/jobs', isLoggedIn, authController.jobs);
    app.get('/edit', isLoggedIn, authController.edit);
    app.get('/settings', isLoggedIn, authController.settings);
    app.get('/logout',authController.logout);

    // Existing user signs in (redirect to form if fails)
    app.post('/signin', passport.authenticate('local-signin', 
            {
            successRedirect: '/menu',	 
            failureRedirect: '/signin'
        }
    ));

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({
                name: "User",
            });
        } else {
            res.json({
                name: req.user.name,
                email: req.user.email,
                settings: req.user.settings,
                id: req.user.id
            });
        }
    });

    // Route for updating a User
    app.put("/api/user", function(req, res) {
        
        // This hashes the password of the user to the database
        if (req.body.password != null) {
            req.body.password = bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null);
        }
        
        db.User.update(
        req.body,
            {
                where: {
                id: req.body.id
            }
        });
    });

     // route for saving a new job
     app.post("/api/new_user", function(req, res) {
        req.body.password = bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null);
        db.User.create(req.body)
    });

    // This route gets the user for the email that was entered
    app.get("/api/users", function(req, res) {
        db.User.findAll({
            where: {
                email: req.query.email
            } 

        }).then(function(results) {
            res.json(results);
        });
    });

    //custom middleware to protect menu route
    function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated()) return next();
	    else res.redirect('/signin');
	}
}