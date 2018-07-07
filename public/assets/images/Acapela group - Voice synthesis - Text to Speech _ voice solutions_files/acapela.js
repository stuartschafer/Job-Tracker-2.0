$(document).ready(function(){
$('.bxslider').bxSlider({
  auto: true,
  speed: 2000,
  pause: 4000,
  preloadImages: 'all',
  touchEnabled: true
  // video: true
});
$('.bxslider').show()({
      });
// Target your .container, .wrapper, .post, etc.
    //$("#thing-with-videos").fitVids();
});

animatedcollapse.addDiv('voicesnav', 'fade=0,speed=800,group=secondarynav')
animatedcollapse.addDiv('productsnav', 'fade=0,speed=800,group=secondarynav')
animatedcollapse.addDiv('usagesnav', 'fade=0,speed=800,group=secondarynav')
animatedcollapse.addDiv('companynav', 'fade=0,speed=800,group=secondarynav')
animatedcollapse.ontoggle=function($, divobj, state){ //fires each time a DIV is expanded/contracted
	//$: Access to jQuery
	//divobj: DOM reference to DIV being expanded/ collapsed. Use "divobj.id" to get its ID
	//state: "block" or "none", depending on state
}

animatedcollapse.init()

function getElementsByClassName(node,classname) {
  if (node.getElementsByClassName) { // use native implementation if available
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}
function toggle_visibility(className) {
	
	var sel = document.getElementById('list-market'); 
	var thesel = sel.value;
	var elements2 = getElementsByClassName(document, 'gallery-display'),
	m = elements2.length;
	for (var j = 0; j < m; j++) {
		var f = elements2[j];
		f.style.display = 'none';
		var r=document.getElementById(j) ;
		var theclass = r.className;
		var thetest = theclass.toLowerCase().indexOf(thesel.toLowerCase()); 
		if( thetest > -1) {
			f.style.display = 'block'; 
		}
	}
	themarket = className;
}
// OLD FUNCTION WITH 2 FIELDS : MARKET + PRODUCT
/* function toggle_visibility(className) {
	
	var sel = document.getElementById('list-market'); 
	var thesel = sel.value;
	
	var sel2 = document.getElementById('list-product'); 
	var thesel2 = sel2.value;
	
	 var elements2 = getElementsByClassName(document, 'gallery-display'),
       m = elements2.length;
   for (var j = 0; j < m; j++) {
	 var f = elements2[j];
     f.style.display = 'none';
	 var r=document.getElementById(j) ;
	 var theclass = r.className;
	var thetest = theclass.toLowerCase().indexOf(thesel.toLowerCase()); 
	var thetest2 = theclass.toLowerCase().indexOf(thesel2.toLowerCase()); 
	
	if( thetest > -1) {
 	 if( thetest2 > -1) {
 	 f.style.display = 'block'; 
	}
	}
    
  }
  
  	 themarket = className;
}*/
function toggle_visibility2(className) {
		 var elements2 = getElementsByClassName(document, 'gallery-display'),
       m = elements2.length;
   for (var j = 0; j < m; j++) {
     var f = elements2[j];

     if(f.style.display == 'none') {
       f.style.display = 'none';
     } else {
       f.style.display = 'block';
     }
  }
   var elements = getElementsByClassName(document, className),
       n = elements.length;
   for (var i = 0; i < n; i++) {
     var e = elements[i];
 if(e.style.display == 'none') {
       e.style.display = 'none';
     } else {
       e.style.display = 'block';
     }
  }
}
function toggle_visibility3(className) {
   var elements = getElementsByClassName(document, className),
       n = elements.length;
   for (var i = 0; i < n; i++) {
     var e = elements[i];
 if(e.style.display == 'none') {
       e.style.display = 'none';
     } else {
       e.style.display = 'block';
     }
  }
}
function toggle_visibility4(className) {
	 var elements2 = getElementsByClassName(document, className),
       m = elements2.length;
   for (var j = 0; j < m; j++) {
     var f = elements2[j];
       f.style.display = 'block';
  }
  	  alert(window.themarket);
}

function toggle_visibility5(className) {
	 var elements2 = getElementsByClassName(document, 'gallery-display'),
       m = elements2.length;
   for (var j = 0; j < m; j++) {
     var f = elements2[j];
       f.style.display = 'none';
  }
   var elements = getElementsByClassName(document, className);
       n = elements.length;
   for (var i = 0; i < n; i++) {
     var e = elements[i];
	 test = className;
	 
	  if(test == 'gallery-display') {
       e.style.display = 'block';
     }
		else {
			document.getElementById('list-market').selectedIndex=0;
			document.getElementById('list-product').selectedIndex=0;
     if(e.style.display == 'block') {
       e.style.display = 'none';
     } else {
       e.style.display = 'block';
     }
	 
		}
	 
  }
  
  	 theusage = className;
}

function toggle_visibility6(className) {
	 var elements2 = getElementsByClassName(document, 'gallery-display'),
       m = elements2.length;
   for (var j = 0; j < m; j++) {
     var f = elements2[j];
       f.style.display = 'none';
  }
   var elements = getElementsByClassName(document, className);
       n = elements.length;
   for (var i = 0; i < n; i++) {
     var e = elements[i];
	 test = className;
	 
	  if(test == 'gallery-display') {
       e.style.display = 'block';
     }
		else {
			document.getElementById('list-market').selectedIndex=0;
			document.getElementById('list-usage').selectedIndex=0;
			document.getElementById('list-product').selectedIndex=0;
     if(e.style.display == 'block') {
       e.style.display = 'none';
     } else {
       e.style.display = 'block';
     }
	 
		}
	 
  }
  
  	 theos = className;
}

function toggle_visibility7(className) {
	 var elements2 = getElementsByClassName(document, 'gallery-display'),
       m = elements2.length;
   for (var j = 0; j < m; j++) {
     var f = elements2[j];
       f.style.display = 'none';
  }
   var elements = getElementsByClassName(document, className);
       n = elements.length;
   for (var i = 0; i < n; i++) {
     var e = elements[i];
	 test = className;
	 
	  if(test == 'gallery-display') {
       e.style.display = 'block';
     }
		else {
			document.getElementById('list-market').selectedIndex=0;

     if(e.style.display == 'block') {
       e.style.display = 'none';
     } else {
       e.style.display = 'block';
     }
	 
		}
	 
  }
  
  	 theproduct = className;
}