//import bcrypt (which we need to secure passwords)
let bCrypt = require('bcrypt-nodejs');

// initialize the passport-local strategy, and the user model,
// which will be passed as an argument
module.exports = function(passport, user) {

	let User = user;
	let LocalStrategy = require('passport-local').Strategy;
	
	// LOCAL SIGN-UP
	passport.use('local-signup', new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			// allows us to pass back the entire request to the callback
			passReqToCallback: true
		},
		// handle storing a user's details
		function(req, email, password, done) {
			// These are the standard settings saved to the db
			req.body.settings = JSON.stringify({"sound":"on","alert":"28","order_by":"interest_level","sort_by":"desc","display_length":"25","id_column":"display","posted_from_column":"display","location_column":"display","name":"Stuart Schafer"});
			let generateHash = function(password) {
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};
			// check to see if the user already exists
			// if not, we add them
			User.findOne({
				where: {
					email: email
				}
			}).then(function(user){
				if (user) {
					return done(null, false, {
						message: "That email is already taken."
					});
				} else {
					let userPassword = generateHash(password);
					let questionNumber = 1;
					let question1 = req.body.ques1Choice;
					let answer1 = req.body.ansQues1;
					let question2 = req.body.ques2Choice;
					let answer2 = req.body.ansQues2;

					let securityInfo = {};
					hashSecurity(question1, answer1);
					questionNumber = 2;
					hashSecurity(question2, answer2);

					function hashSecurity(question, answer) {
						let num = Math.floor(Math.random() * 9) + 1;

						// This config var is set in Heroku
						// To view it, go to the settings in the Heroku app
						let allChars = process.env.allChars;
						
						let count = "";
						if (question.length < 10) {
							count = String(question) + "0" + String(answer.length);
						} else {
							count = String(question) + String(answer.length);
						}
						// Some random char
						hashedSec = allChars[Math.floor(Math.random() * 82) + 1] + String(num) + count;
			
						for (var x=0; x<30; x++) {
							let char;
							if (x > question.length) {
								char = Math.floor(Math.random() * 75) + 1
							} else {
								char = allChars.indexOf(answer[x]);
							}
							hashedSec = hashedSec + allChars[char + num];
						}

						if (questionNumber == 1) {
							securityInfo.q1 = hashedSec;
						} else {
							securityInfo.q2 = hashedSec;
						}
					}
					
					let convertedSecurityInfo = JSON.stringify(securityInfo);
					
					let data = {
						email: email,
						password: userPassword,
						settings: req.body.settings,
						security_questions: convertedSecurityInfo,
						name: req.body.name
					};
					
					User.create(data).then(function(newUser, created) {
						if (!newUser) {
							return done(null, false);
						}
						if (newUser) {
							return done(null, newUser);
						}
					});
				}
			});
		}
	));
	// serialize
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	// deserialize - get the user 
	// if successful, an instance of the Sequelize model is returned
	passport.deserializeUser(function(id, done) {
		User.findById(id).then(function(user) {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});

	// LOCAL SIGN-IN
	passport.use('local-signin', new LocalStrategy( 
	    {
	        // by default, local strategy uses username and password, we will override with email
	        usernameField: 'email',	 
	        passwordField: 'password',
 			// allows us to pass back the entire request to the callback
	        passReqToCallback: true 
	    },	 
	    function(req, email, password, done) {
	        let User = user;
	        let isValidPassword = function(userpass, password) { 
	            return bCrypt.compareSync(password, userpass);
	        }	 
	        User.findOne({
	            where: {
	                email: email
	            }
	        }).then(function(user) {
	            if (!user) { 
	                return done(null, false, {
	                    message: 'Email does not exist'
	                });
	            }
	            if (!isValidPassword(user.password, password)) {
	                return done(null, false, {
	                    message: 'Incorrect password.'
	                });
	            }
	            let userinfo = user.get();
	            return done(null, userinfo);
	        }).catch(function(err) {	 
	            console.log("Error:", err);
	            return done(null, false, {
	                message: 'Something went wrong with your Signin.'
	            });
	        }); 
	    }	 
	));
}