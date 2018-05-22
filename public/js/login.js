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