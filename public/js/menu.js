$(function() { 
    // GET request to get current user info and display name
    $.get("/api/user_data").then(function(data) {
        $(".showName").text(data.name + "\'s");
    });

    // Event listeners to route user to corresponding page
    $("#jobButton").click(function () {
        location.href = "/jobs";
    });

    $("#addButton").click (function () {
        location.href = "/add";
    });

    $("#settingsButton").click(function () {
        location.href = "/settings";
    });

    $("#logoutButton").click (function () {
        location.href = "/logout";
    });

});

// Shine.js for the Job Tracker word
var shine = new Shine(document.getElementById('landingPageHeader2'));

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