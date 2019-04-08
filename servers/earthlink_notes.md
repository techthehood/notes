[earthlink cpanel](https://control.earthlink.net/portal/#)   

##### GOTCHA - Joomla v 3.4.8 not working in earthlink but 3.9.2 is
>solution: update the live site to 3.6.? then again to 3.9.2. once the db is updated i can transfer the db to the new site without worrying about new version table differences.

*_the db has all extension installations and module creations so all i have to do is add the folders. (not install)._*

**Not Found [CFN #0005]**   
[error not found joomla forum](https://forum.joomla.org/viewtopic.php?t=953968)    
**actually adding index.php does solve the display issue but i don't want index.php in the links so more research**
>and as the writer suggested it was the old .htaccess i just had to use the one supplied with the new installation of Joomla and the links work without needing 'index.php'

##### GOTCHA - i need an ssl certificate

[ssl for free site](https://www.sslforfree.com/)   



##### Joomla 3.8.2 file manager display breaks

init.js add script
```
//joomla media/file mngr has a fade in display issue
  let displayBtn = document.querySelector('.btn.button-select');
  displayBtn.addEventListener("click",function(){

    let mediaWindow = document.querySelector("#imageModal_jform_imageurl");
    mediaWindow.classList.remove("d3-hide");
    mediaWindow.classList.add("in","d3-show");

  }/*,{once : true}*/);

  let media_window_footer = document.querySelector(".modal-footer");
  let media_window_cancel_btn = media_window_footer.querySelector(".btn");
  media_window_cancel_btn.addEventListener("click",function(e){

    let mediaWindow = document.querySelector("#imageModal_jform_imageurl");
    mediaWindow.classList.remove("in","d3-show");
    mediaWindow.classList.add("d3-hide");

  }/*,{once : true}*/);
```
##### [capture iframe click events](https://stackoverflow.com/questions/13439303/detect-click-event-inside-iframe)   
```
  $('#filecontainer').load(function(){

          var iframe = $('#filecontainer').contents();

          iframe.find("#choose_pics").click(function(){
                 alert("test");
          });
  });
```

##### change to WWW
>i used earthlinks redirection module to change global redirection to
jakeelconsulting.com -> www.jakeelconsulting.com
