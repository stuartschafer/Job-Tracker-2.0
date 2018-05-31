$( document ).ready(function() {
    //$("#resetSection").hide();
    //$("#enterNewPassword").hide();
    //$("#submitEmailCheck").hide();
    //$("#submitNewPassword").hide();
    
    let idNum = 0;
    let securityQuestions = "";
    let userEmail = "";
    let answer1 = "";
    let answer2 = "";
    let userInfo;

    
    $("#submitEmail").on("click", function() {
        $("#submitEmail").hide();
        $("#resetSection").show();
        $("#submitEmailCheck").show();

        userEmail = $("#recoverEmail").val().trim();
        
        $.get("/api/users", findUser);
        
    
        function findUser(data) {
            for (var x=0; x<data.length; x++) {
                if (data[x].email == userEmail) {
                    securityQuestions = JSON.parse(data[x].security_questions);
                    userInfo = data[x];
                    $("#secQ1").html(securityQuestions.q1);
                    $("#secQ2").html(securityQuestions.q2);
                    idNum = x;
                }
            }
        }
    });


    $("#submitEmailCheck").on("click", function() {
        $("#submitEmailCheck").hide();
        $("#alert").text("");

        $("#secQ1").html(securityQuestions.q1);
        $("#secQ2").html(securityQuestions.q2);
        answer1 = $("#ansQ1").val().trim();
        answer2 = $("#ansQ2").val().trim();

        if (answer1 == securityQuestions.a1 && answer2 == securityQuestions.a2) {
            $("#enterNewPassword").show();
            $("#submitNewPassword").show();
        } else {
            $("#alert").text("Those answers do not match");
        }
    
    });


    $("#submitNewPassword").on("click", function() {
        let id = userInfo.id;
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        
        console.log(userInfo);
        let newPW = $("#newPassword").val().trim();
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");


        let userChanged = {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            password: newPW,
            security_questions: userInfo.security_questions
        }

        //$.get("/api/users", editUser);
        
    });


    //Update the post to the database
    function editUser(userChanged) { 
        //console.log(jobChanged.UserId);
        $.ajax({
            method: "PUT",
            url: "/api/users",
            data: userChanged
        });
        //return user to the jobs page
        location.href = "/index.html";
    }


});
