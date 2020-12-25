# css notes

### [css nth child](https://www.w3schools.com/CSSref/sel_nth-child.asp)
```
p:nth-child(odd) {
    background: red;
}
```
[Animating from display block to display none](https://www.impressivewebs.com/animate-display-block-none/)

###### not precision   
I executed a display none after a fade animation - fade does not actually trigger the display:none i have to estimate when to change the display using the animations duration (hoping for not animation delays)

react.js
 ```
  timer = "";
  timer2 = "";

    prep_vars = (sd_obj) => {
      let state = sd_obj.state;//arc's state

      this.setState({
        message:sd_obj.message,
        prefix:sd_obj.prefix
      });//setState

      if(sd_obj.auto){
        // clearTimeout(this.timer);
        let hold_time = (sd_obj.seconds) ? sd_obj.seconds * 1000 : (sd_obj.sec) ? sd_obj.sec * 1000 : 3000;// 1000 = 1s
        let container_str = `.${sd_obj.prefix}action_cont`;

        //apply the fade out

        //clear any previous timers - just in case re-implemented
        clearTimeout(this.timer);
        clearTimeout(this.timer2);

        this.timer = setTimeout(function()
        {
          clearTimeout(this.timer);
          let targ_el = document.querySelector(container_str);
          targ_el.classList.add("d3-fade-out-quick");

          this.timer2 = setTimeout(function () {
            clearTimeout(this.timer2);
            targ_el.classList.remove("d3-fade-out-quick");
            action_msg({state,mode:"hide"});
          }, 1000);

          //i can use a fade delay that will do the same thing as a timer - do both?

        }, hold_time);//timer


      }//if

    }// prep_vars

 ```


react.scss
```
  @keyframes fadeInOpacity {
  	0% {
  		opacity: 0;
  	}
  	100% {
  		opacity: 1;
  	}
  }

  @keyframes fadeOutOpacity {
  	0% {
  		opacity: 1;
  	}
  	100% {
  		opacity: 0;
  	}
  }

  .d3-fade-in-quick {
  	opacity: 1;
  	animation-name: fadeInOpacity;
  	animation-iteration-count: 1;
  	animation-timing-function: ease-in;
  	animation-duration: .5s;
  }

  .d3-fade-out-quick {
    opacity:0;
  	animation-name: fadeOutOpacity;
  	animation-iteration-count: 1;
  	animation-timing-function: ease-in;
  	animation-duration: .5s;
  }
```

pseudo styles
[Enable CSS active pseudo styles in Mobile Safari](https://alxgbsn.co.uk/2011/10/17/enable-css-active-pseudo-styles-in-mobile-safari/)   
[hover comes after link & visited. active comes after hover](https://www.w3schools.com/css/css_pseudo_classes.asp)   


remove btn highlight outline
```
.buttonClass:focus {
  outline: 0;
}
```
remove chrome tap highlight outline
```
  -webkit-tap-highlight-color: transparent;/*removes chrome tap hightlight color*/
```
