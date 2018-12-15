
GETTING THE TEXT EDITOR VALUE:

var iframe = document.getElementById('jform_tedit_ifr');
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
var currentText = innerDoc.body.innerHTML;
var pureText = innerDoc.body.innerText;