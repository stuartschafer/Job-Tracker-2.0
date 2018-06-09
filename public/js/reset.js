$( document ).ready(function() {
    $("#resetSection").hide();
    $("#enterNewPassword").hide();
    $("#submitEmailCheck").hide();
    $("#submitNewPassword").hide();
    
    let idNum = 0;
    let securityQuestions = "";
    let questionNumber = 1;
    let security1;
    let security2;
    let userEmail = "";
    let answer1 = "";
    let answer2 = "";
    let userAnswer1 = "";
    let userAnswer2 = "";
    let userInfo;

    
    $(".showNameJobs").text("Reset password");

    
    $("#submitEmail").on("click", function() {
        $.get("/api/users", findUser);

        //$("#enterNewPassword").show();

        userEmail = $("#recoverEmail").val().trim();
        
        function findUser(data) {
            for (var x=0; x<data.length; x++) {
                if (data[x].email == userEmail) {
                    idNum = data[x].id;
                    $("#emailMessage").html("Email found.  Please answer the security questions below to reset your password.");
                    $("#resetSection").show();
                    $("#submitEmailCheck").show();

                    let securityQuestions = JSON.parse(data[x].security_questions);
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
            $("#securityAnswers").text("Those answers do not match. Please make sure you spelled them correctly. This is not case sensitive.");
        }
    
    });


    $("#submitNewPassword").on("click", function() {
        //let id = userInfo.id;
        
        
        let newPW = $("#newPassword").val().trim();
        let newPWConfirm = $("#newPasswordConfirm").val().trim();

        if (newPW != newPWConfirm) {
            $("#passwords").html("Those passwords do not match.  Pleasd re-enter.");
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
        //return user to the login page so they can login using the new password
        location.href = "/index.html";
    }


    function getAnswer(hashedAnswer) {
        let allChars = ["%", "J", "V", "(", "O", "f", "N", "z", "r", "y", "1", "R", "l", "Z", "0", "H", "u", " ", "T", "@", "v", "e", ">", "k", "]", "2", "n", "C", "g", "`", "5", "L", "{", "?", "~", "d", "x", "4", "j", "&", "<", "o", "c", "Q", "B", "K", "E", "w", "h", "i", "b", "Y", "3", "W", "U", "7", ")", "F", "p", "}", "$", "*", "#", "M", "9", "m", "a", "8", "X", "i", "A", "q", "S", "t", "s", "I", "6", "[", "P", "^", ":", ";", "G", "D", ",", "%", "J", "V", "(", "O", "f", "N", "z", "r", "y", "1", "R", "l", "Z", "0", "H", "u", "T", "@", "v", "e", ">", "k", "]", "2", "n", "C", "g", "`", "5", "L", "{", "?", "~", "d", "x", "4", "j", "&", "<", "o", "c", "Q", "B", "K", "E", "w", "h", "i", "b", "Y", "3", "W", "U", "7", ")", "F", "p", "}", "$", "*", "#", "M", "9", "m", "a", "8", "X", "i", "A", "q", "S", "t", "s", "I", "6", "[", "P", "^", ":", ";", "G", "D", ","];
        let questions = ["", "What city were you born in?", "What is your father's middle name?", "What was your high school's mascot?", "Who was your best childhood friend?", "What street did you grow up on?", "What was the name of your very first pet?"];
        let key = hashedAnswer[1];
        let qNum = hashedAnswer[2];
        if (hashedAnswer[3] = 0) {
            number = Number(hashedAnswer[4]);
        } else {
            number = Number(hashedAnswer[3] + hashedAnswer[4]);
        }
        
        let answer = "";

        for (var x=5; x<number + 5; x++) {
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