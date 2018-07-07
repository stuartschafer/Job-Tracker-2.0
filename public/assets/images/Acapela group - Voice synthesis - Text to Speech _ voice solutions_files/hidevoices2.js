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


function hide_voices(className) {
	var testlanguage = className;
	 var elements2 = getElementsByClassName(document, 'allselects'),
       m = elements2.length;
   for (var j = 0; j < m; j++) {
     var f = elements2[j];
       f.style.display = 'none';
	   f.name = j;
	   var extension = testlanguage.substring(5);
	   
	   
  }var testname = document.getElementById(testlanguage);
  testname.setAttribute("name", "MySelectedVoice");
  testname.style.display = 'block';
  testname2 = testname.name;
  var testname3 = document.getElementById("MyLanguages");
	testname3.selectedIndex = extension;
	
  
		  
		     /*alert(extension);*/
/*document.getElementById('MySelectedVoice').style.display = 'block';*/
  
}

function hide_voices2(className) {
	 if(window.onefocus != "done") {

        
	 
  }
 /* sel = document.getElementById('MySelectedVoice');
  for(var i, j = 0; i = sel.options[j]; j++) {
        if(j == 1) {
            sel.selectedIndex = j;
            break;
        }
    }*/
	onefocus="done";

}
function changevoice(voiceindex) {
	/*var testname4 = document.getElementById("jp_container_1");
	testname4.style.display = 'none';*/
	 
	testvoice = voiceindex;
sel = document.getElementById('MySelectedVoice');
           document.getElementById('MySelectedVoice').selectedIndex = testvoice;
		   document.getElementById('jp_container_1').style.display = 'none';


/*	thelevel = voiceindex;
  sel = document.getElementById('MySelectedVoice');
           document.getElementById('MySelectedVoice').selectedIndex = thelevel; */
  
}
function hideplayer(playernamea) {
	document.getElementById('jp_container_1').style.display = 'none';
	/*document.getElementById('report-demo').style.display = 'none';*/
}
function showplayer(playernameb) {
document.getElementById('report-demo').style.display = 'block';
}
function showdiv(id){
document.getElementById(id).style.display = "block";
}
function hidediv(id){
document.getElementById(id).style.display = "none";
}