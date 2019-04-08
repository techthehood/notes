
GETTING THE TEXT EDITOR VALUE:

var iframe = document.getElementById('jform_tedit_ifr');
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
var currentText = innerDoc.body.innerHTML;
var pureText = innerDoc.body.innerText;

JCE GOTCHA
JCE modal window fail - i had to modifify its script
path: media/media/js/mediafield.min.js
```
//original script
$.fieldMedia.prototype.modalClose=function(){this.$modal.modal('hide');$('body').removeClass('modal-open');this.$modalBody.empty()};

$.fieldMedia.prototype.modalClose=function(){
  this.$modal.modal('hide');
  $('body').removeClass('modal-open');

  //added

  this.$modal.classList.remove("in","d3-show");
  this.$modal.classList.add("d3-hide");

  //end added

  this.$modalBody.empty()
};

//modified version
$.fieldMedia.prototype.modalClose=function(){this.$modal.modal('hide');$('body').removeClass('modal-open');this.$modal[0].classList.remove("in","d3-show");this.$modal[0].classList.add("d3-hide");this.$modalBody.empty()};
```
