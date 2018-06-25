$(document).ready(function() {
    $("#resetSection").hide();
    $("#enterNewPassword").hide();
    $("#submitEmailCheck").hide();
    $("#submitNewPassword").hide();
    
    let idNum = 0;
    let questionNumber = 1;
    let answer1 = "";
    let answer2 = "";
    let userAnswer1 = "";
    let userAnswer2 = "";
    let allChars;
    
    $(".showNameJobs").text("Reset password");

    $("#submitEmail").on("click", function() {
        $("#emailMessage").html("");
        $("#securityAnswers").text("");
        $("#ansQ1").val("");
        $("#ansQ2").val("");
        $("#secQ1").html("");
        $("#secQ2").html("");
        $("#newPassword").val("");
        $("#newPasswordConfirm").val("");
        $("#submitNewPassword").hide();
        $("#enterNewPassword").hide();

        userEmail = $("#recoverEmail").val().trim();

        let enteredEmail = $("#recoverEmail").val().trim();

        // This calls the server and gets the info for that user, if an email matches with one in the db
        $.get("/api/users", {email: enteredEmail}, findUser);

        function findUser(data) {
            // This comes from the config vars in Heroku
            // WILL NOT WORK WHEN RUN LOCALLY   
            allChars = data[0].allChars;
            
            if (data[0] != undefined) {
                idNum = data[0].id;
                $("#emailMessage").html("Email found.  Please answer the security questions below to reset your password.");
                $("#resetSection").show();
                $("#submitEmailCheck").show();

                let securityQuestions = JSON.parse(data[0].security_questions);
                getAnswer(securityQuestions.q1);
                questionNumber = 2;
                getAnswer(securityQuestions.q2);
                return;
            } else {
                $("#emailMessage").html("That email was not used to sign up with, or it was mis-typed. Please try again.");
                $("#resetSection").hide();
                $("#submitEmailCheck").hide();
            } 
        }
    });


    $("#submitSecurityAnswers").on("click", function() {
        $("#securityAnswers").text("");

        answer1 = $("#ansQ1").val().trim();
        answer2 = $("#ansQ2").val().trim();

        if (answer1.toLowerCase() == userAnswer1.toLowerCase() && answer2.toLowerCase() == userAnswer2.toLowerCase()) {
            $("#enterNewPassword").show();
            $("#submitNewPassword").show();
            $("#emailMessage").html("");
            $("#securityAnswers").text("Correct. Now please enter a new password.");
            $("#submitSecurityAnswers").hide();
        } else {
            $("#securityAnswers").html("Those answers do not match. Please make sure you spelled them correctly.<br>They are not case sensitive.");
        }
    });


    $("#submitNewPassword").on("click", function() {
        let newPW = $("#newPassword").val().trim();
        let newPWConfirm = $("#newPasswordConfirm").val().trim();

        if (newPW != newPWConfirm) {
            $("#passwords").html("Those passwords do not match.  Please re-enter.");
            $("#newPassword").val("");
            $("#newPasswordConfirm").val("");
        } else if (newPW === "") {
            $("#passwords").html("Password cannot be left blank.  Please enter a value.");
            $("#newPassword").val("");
            $("#newPasswordConfirm").val("");
        } else {
            let userChanged = {
                id: idNum,
                password: newPW
            }
            editUser(userChanged);
        }
    });


    //Update the post to the database
    function editUser(userChanged) { 
        $.ajax({
            method: "PUT",
            url: "/api/user",
            data: userChanged
        });
        // Return user to the login page so they can login using the new password
        location.href = "/index.html";
    }


    function getAnswer(hashedAnswer) {
        let questions = ["", "What city were you born in?", "What is your father's middle name?", "What was your high school's mascot?", "Who was your best childhood friend?", "What street did you grow up on?", "What was the name of your very first pet?", "In what town or city did you meet your spouse/partner?", "What is the first name of the person you had your first kiss with?", "What is ther name of your favorite band/musician?"];
        "In what town or city did you meet your spouse/partner?", "What is the first name of the person you had your first kiss with?", "What is ther name of your favorite band/musician?"
        let key = hashedAnswer[1];
        let qNum = hashedAnswer[2];
        var direction = x < 200 ? 1 : -1;

        let number = (hashedAnswer[3] = 0) ? Number(hashedAnswer[4]) : Number(hashedAnswer[3] + hashedAnswer[4]);
        
        let answer = "";
        
        for (var x=5; x<number + 5; x++) {
            // This won't work on local, and will result in 'undefined'. The allChars string is stored in Heroku
            let ansChar = allChars.indexOf(hashedAnswer[x]);
            answer = answer + allChars[ansChar - key];
        }

        if (questionNumber == 1) {
            $("#secQ1").html(questions[qNum]);
            userAnswer1 = answer;
        } else {
            $("#secQ2").html(questions[qNum]);
            userAnswer2 = answer;
        }
    }

});