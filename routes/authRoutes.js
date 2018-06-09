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

  	//only authenticated users should see the other pages
    app.get('/menu', isLoggedIn, authController.menu);
    app.get('/add', isLoggedIn, authController.add);
    app.get('/jobs', isLoggedIn, authController.jobs);
    app.get('/edit', isLoggedIn, authController.edit);
    app.get('/settings', isLoggedIn, authController.settings);
    app.get('/logout',authController.logout);

    //Existing user signs in (redirect to form if fails)
    app.post('/signin', passport.authenticate('local-signin', 
            {
            successRedirect: '/menu',	 
            failureRedirect: '/signin'
        }
    ));

    //Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({
                name: "User",
            });
        } else {
            //Capitalize the first letter of each name
            req.user.name = (req.user.name).toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });

            //otherwise send back the user's name
            res.json({
                name: req.user.name,
                email: req.user.email,
                settings: req.user.settings,
                id: req.user.id
            });
        }
    });

    // route for updating a User
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

    // This routes gets all the users for selecting 1 user to reset their password
    app.get("/api/users", function(req, res) {
        var query = {};

        db.User.findAll({

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