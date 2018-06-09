/////**********SHINE**********/////
var shine = new Shine(document.getElementById('landingPageHeader'));
//var shine1 = new Shine(document.getElementById('logoshadow'));

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
    //$("#signupbutton").on("click", function() {
        //let name = $("#newUserName").val().trim();
        //if (name.length > 10) {
            //console.log("TOO LONG"); 
        //}
    //});
    $("#signupbutton").on("click", function() {
        let securityInfo = {};

        if ($("#newUserPassword").val().trim() != $("#newUserPasswordConfirm").val().trim()) {
            $("#errors").html("Please make sure both passwords match");
            $("#newUserPassword").val("");
            $("#newUserPasswordConfirm").val("");
            return;
        }

        if ($("#secQues1").val() == $("#secQues2").val()) {
            $("#errors").html("Please select 2 different questions.")
            return;
        }

        securityInfo.one = generateHash($("#secQues1").val(), $("#ansQues1").val().trim());
        securityInfo.two = generateHash($("#secQues2").val(), $("#ansQues2").val().trim());
 

        function generateHash(question, answer) {
            let allChars = ["%", "J", "V", "(", "O", "f", "N", "z", "r", "y", "1", "R", "l", "Z", "0", "H", "u", " ", "T", "@", "v", "e", ">", "k", "]", "2", "n", "C", "g", "`", "5", "L", "{", "?", "~", "d", "x", "4", "j", "&", "<", "o", "c", "Q", "B", "K", "E", "w", "h", "i", "b", "Y", "3", "W", "U", "7", ")", "F", "p", "}", "$", "*", "#", "M", "9", "m", "a", "8", "X", "i", "A", "q", "S", "t", "s", "I", "6", "[", "P", "^", ":", ";", "G", "D", ",", "%", "J", "V", "(", "O", "f", "N", "z", "r", "y", "1", "R", "l", "Z", "0", "H", "u", "T", "@", "v", "e", ">", "k", "]", "2", "n", "C", "g", "`", "5", "L", "{", "?", "~", "d", "x", "4", "j", "&", "<", "o", "c", "Q", "B", "K", "E", "w", "h", "i", "b", "Y", "3", "W", "U", "7", ")", "F", "p", "}", "$", "*", "#", "M", "9", "m", "a", "8", "X", "i", "A", "q", "S", "t", "s", "I", "6", "[", "P", "^", ":", ";", "G", "D", ","];
            let hashedAnswer = "";
            let num = Math.floor(Math.random() * 9) + 1;
            let count = "";
            if (answer.length < 10) {
                count = String(question) + "0" + String(answer.length);
            } else {
                count = String(question) + String(answer.length);
            }
            // Some random char
            hashedAnswer = allChars[Math.floor(Math.random() * 82) + 1] + String(num) + count;

            for (var x=0; x<30; x++) {
                let char;
                if (x > answer.length) {
                    char = Math.floor(Math.random() * 75) + 1
                } else {
                    char = allChars.indexOf(answer[x]);
                }
                hashedAnswer = hashedAnswer + allChars[char + num];
            }
            console.log(hashedAnswer);
            //getAnswer(hashedAnswer);
            //return hashedAnswer;
        }

        
        
        //console.log(securityInfo);
        
    });
});