// Shine.js for the Job Tracker word
var shine = new Shine(document.getElementById('landingPageHeader'));

var config = new shinejs.Config({
    numSteps: 20,
    opacity: 0.5,
    offset: 0.8,
    offsetPow: 2,
    shadowRGB: new shinejs.Color(50, 205, 50)
});

window.addEventListener('mousemove', function(event) {
    shine.light.position.x = event.clientX * 1.5;
    shine.light.position.y = event.clientY * 1.5;
    shine.config = config;
    shine.draw();
}, false);

$("#resetPW").on("click", function() {
    location.href = "/reset.html";
});

$( document ).ready(function() {
    $("#submitButton").hide();

    $("#signupbutton").on("click", function() {

        // This checks to make sure the email isn't already being used
        $.get("/api/users", findUser);
        function findUser(data) {
            for (var x=0; x<data.length; x++) {
                if (data[x].email == $("#newUserEmail").val().trim()) {
                    $("#errors").html("That email is already being used. Please sign in using that one or enter a new email.");
                    return;
                }
            }
        }

        if ($("#newUserName").val().trim() === "") {
            $("#errors").html("Please enter your name.");
            return;
        }

        if ($("#newUserEmail").val().trim() === "") {
            $("#errors").html("Please enter your email.");
            return;
        }

        if ($("#newUserPassword").val().trim() != $("#newUserPasswordConfirm").val().trim()) {
            $("#errors").html("Please make sure both passwords match");
            $("#newUserPassword").val("");
            $("#newUserPasswordConfirm").val("");
            return;
        } 

        if ($("#newUserPassword").val().trim() === "" || $("#newUserPasswordConfirm").val().trim() === "") {
            $("#errors").html("Please enter a password and confirm it");
            $("#newUserPassword").val("");
            $("#newUserPasswordConfirm").val("");
            return;
        } 

        if ($("#secQues1").val() === $("#secQues2").val() || $("#secQues1").val() === "" || $("#secQues2").val() === "") {
            $("#errors").html("Please select 2 different questions.");
            return;
        }

        if ($("#ansQues1").val() === "" || $("#ansQues2").val() === "") {
            $("#errors").html("Please enter an answer for both questions.");
            return;
        }

        $("#errors").html("Information is acceptable.<br>Press the 'SUBMIT' button to begin your journey!");
        $("#submitButton").show();

    });
});