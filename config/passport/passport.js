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
				//if ((req.body.name).length > 10) {
					//return done(null, false, { message: 'Name is too long. It must be under 40 characters.' });
				//}
				if (user) {
					return done(null, false, {
						message: "That email is already taken."
					});
				} else {
					let userPassword = generateHash(password);
					//console.log(req.body);
					//req.body.ques1Choice
					//req.body.ansQues1
					//req.body.ques2Choice
					//req.body.ansQues2
					let securityInfo = {};
					hashSecurityQ1();
					hashSecurityQ2();
					//generateHash(req.body.ques2Choice, req.body.ansQues2);




					function hashSecurityQ1() {
						let allChars = ["%", "J", "V", "(", "O", "f", "N", "z", "r", "y", "1", "R", "l", "Z", "0", "H", "u", " ", "T", "@", "v", "e", ">", "k", "]", "2", "n", "C", "g", "`", "5", "L", "{", "?", "~", "d", "x", "4", "j", "&", "<", "o", "c", "Q", "B", "K", "E", "w", "h", "i", "b", "Y", "3", "W", "U", "7", ")", "F", "p", "}", "$", "*", "#", "M", "9", "m", "a", "8", "X", "i", "A", "q", "S", "t", "s", "I", "6", "[", "P", "^", ":", ";", "G", "D", ",", "%", "J", "V", "(", "O", "f", "N", "z", "r", "y", "1", "R", "l", "Z", "0", "H", "u", "T", "@", "v", "e", ">", "k", "]", "2", "n", "C", "g", "`", "5", "L", "{", "?", "~", "d", "x", "4", "j", "&", "<", "o", "c", "Q", "B", "K", "E", "w", "h", "i", "b", "Y", "3", "W", "U", "7", ")", "F", "p", "}", "$", "*", "#", "M", "9", "m", "a", "8", "X", "i", "A", "q", "S", "t", "s", "I", "6", "[", "P", "^", ":", ";", "G", "D", ","];
						let hashedAnswer = "";
						let num = Math.floor(Math.random() * 9) + 1;
						let count = "";
						if ((req.body.ansQues1).length < 10) {
							count = String(req.body.ques1Choice) + "0" + String((req.body.ansQues1).length);
						} else {
							count = String(req.body.ques1Choice) + String((req.body.ansQues1).length);
						}
						// Some random char
						hashedSecQ1 = allChars[Math.floor(Math.random() * 82) + 1] + String(num) + count;
			
						for (var x=0; x<30; x++) {
							let char;
							if (x > (req.body.ansQues1).length) {
								char = Math.floor(Math.random() * 75) + 1
							} else {
								char = allChars.indexOf(req.body.ansQues1[x]);
							}
							hashedSecQ1 = hashedSecQ1 + allChars[char + num];
						}
						console.log(hashedSecQ1);
						securityInfo.q1 = hashedSecQ1;
					}

					function hashSecurityQ2() {
						let allChars = ["%", "J", "V", "(", "O", "f", "N", "z", "r", "y", "1", "R", "l", "Z", "0", "H", "u", " ", "T", "@", "v", "e", ">", "k", "]", "2", "n", "C", "g", "`", "5", "L", "{", "?", "~", "d", "x", "4", "j", "&", "<", "o", "c", "Q", "B", "K", "E", "w", "h", "i", "b", "Y", "3", "W", "U", "7", ")", "F", "p", "}", "$", "*", "#", "M", "9", "m", "a", "8", "X", "i", "A", "q", "S", "t", "s", "I", "6", "[", "P", "^", ":", ";", "G", "D", ",", "%", "J", "V", "(", "O", "f", "N", "z", "r", "y", "1", "R", "l", "Z", "0", "H", "u", "T", "@", "v", "e", ">", "k", "]", "2", "n", "C", "g", "`", "5", "L", "{", "?", "~", "d", "x", "4", "j", "&", "<", "o", "c", "Q", "B", "K", "E", "w", "h", "i", "b", "Y", "3", "W", "U", "7", ")", "F", "p", "}", "$", "*", "#", "M", "9", "m", "a", "8", "X", "i", "A", "q", "S", "t", "s", "I", "6", "[", "P", "^", ":", ";", "G", "D", ","];
						let hashedAnswer = "";
						let num = Math.floor(Math.random() * 9) + 1;
						let count = "";
						if ((req.body.ansQues2).length < 10) {
							count = String(req.body.ques2Choice) + "0" + String((req.body.ansQues2).length);
						} else {
							count = String(req.body.ques2Choice) + String((req.body.ansQues2).length);
						}
						// Some random char
						hashedSecQ2 = allChars[Math.floor(Math.random() * 82) + 1] + String(num) + count;
			
						for (var x=0; x<30; x++) {
							let char;
							if (x > (req.body.ansQues2).length) {
								char = Math.floor(Math.random() * 75) + 1
							} else {
								char = allChars.indexOf(req.body.ansQues2[x]);
							}
							hashedSecQ2 = hashedSecQ2 + allChars[char + num];
						}
						console.log(hashedSecQ2);
						
						securityInfo.q2 = hashedSecQ2;
					}

					
					let convertedSecurityInfo = JSON.stringify(securityInfo);
					
					let data = {
						email: email,
						password: userPassword,
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