# Multi line overflow ellipsis
[solution link](https://codepen.io/martinwolf/pen/qlFdp)
> with this solution i still had to calculate the height using a combination of font-size, line-height and nbr of lines
**actually it should be line-height and number of lines, font-size should not need to be factored in. i guess this is where my ultimate solution comes from**

my research trail
[clampin doc](https://css-tricks.com/line-clampin/)
[another pen](https://codepen.io/chriscoyier/pen/iBtep)

[another working version](http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/)   
**modify the padding-right to 1.2 so the ... has some breathing room**
> i think both versions do the same thing

## 'strict height style' && 'ellipsis overflow'
NOTE: ** strict vs flex height ***
'strict' height works best with title and body 'ellipsis overflow' turned off
it can be used with them on but it will take extra adjustments in the height to get it to look right

if you leave the height flexible and manage the overflow lines you can get a nicely uniformed look

document's example
```
	h2 {
		display: block;
		display: -webkit-box;
		max-width: 400px;
		height: 109.2px;
		margin: 0 auto;
		font-size: 26px;
		line-height: 1.4;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
```

my solution
```
	.clamp{
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		display: block;
		display: -webkit-box;
		line-height: 1.4;
	}
```
** -webkit-line-clamp, line-height, height added dynamically with js **

js script

```
	...
		let line_height = (data.line_height != undefined && data.line_height != "") ? `line-height:${data.line_height};` : "";
		let fSz = (data.font_size != undefined && data.font_size != "") ? data.font_size : "none";
		let lHt = (data.line_height != undefined && data.line_height != "") ? data.line_height : "none";
		let lNbr = (data.line_number != undefined && data.line_number != "") ? data.line_number : "none";
		let h_Calc = (fSz !== "none" && lHt !== "none" && lNbr !== "none") ? fSz * lHt * lNbr : "none";

		let height = (src == "body" && data.ellipsis === true && h_Calc !== "none") ? `height:${h_Calc}${data.font_measure};` : "";
		let line_number = (data.ellipsis != undefined && data.ellipsis === true && data.line_number != undefined
		&& data.line_number != "") ? `-webkit-line-clamp: ${data.line_number};` : "";

		let txt_style = font + font_size + font_color + line_height + line_number + height;
	...

```


full example

```

    this.getTextStyle = function(data,src)
    {

      if(data.font == 'NaN')
      {
        console.log("data.font = ",data.font + src);
      }
      let prep_font = (data.font != undefined && data.font != "") ? data.font : "Arial, Helvetica, sans-serif";
      console.log("prep_font = ",prep_font);
      console.log("prep_font is a ",typeof prep_font);
      let single_font = (prep_font.indexOf(",") != -1 || prep_font.split(",").length < 2) ? true : false;
      prep_font = (single_font == true) ? `font-family:${prep_font},Arial, sans-serif;` :`font-family:${prep_font};`;

      let font = prep_font;
      let font_size = (data.font_size != undefined && data.font_size != "") ? `font-size:${data.font_size}${data.font_measure};` : "";
      let font_color = (data.font_color != undefined && data.font_color != "") ? `color:${data.font_color};` : "";

      //sets up text ellipsis
      //let line_height = (data.line_height != undefined && data.line_height != "") ? `line-height:${data.line_height}${data.font_measure};` : "";
      let line_height = (data.line_height != undefined && data.line_height != "") ? `line-height:${data.line_height};` : "";
        let fSz = (data.font_size != undefined && data.font_size != "") ? data.font_size : "none";
        let lHt = (data.line_height != undefined && data.line_height != "") ? data.line_height : "none";
        let lNbr = (data.line_number != undefined && data.line_number != "") ? data.line_number : "none";
        let h_Calc = (fSz !== "none" && lHt !== "none" && lNbr !== "none") ? fSz * lHt * lNbr : "none";

      let height = (src == "body" && data.ellipsis === true && h_Calc !== "none") ? `height:${h_Calc}${data.font_measure};` : "";
      let line_number = (data.ellipsis != undefined && data.ellipsis === true && data.line_number != undefined
        && data.line_number != "") ? `-webkit-line-clamp: ${data.line_number};` : "";

      let txt_style = font + font_size + font_color + line_height + line_number + height;

      return txt_style;

    }//getTextStyle

```

clamp-0 can just be css default
[w3schools css text-overflow property](https://www.w3schools.com/cssref/css3_pr_text-overflow.asp)   
[w3schools text-overflow ellipsis tryit](https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_text-overflow)   
```
clamp-0{
	white-space: nowrap;
	width: 50px;
	overflow: hidden;
	text-overflow: ellipsis;
	/*border: 1px solid #000000;*/
}
```




solution using scss
```
		%clamp{
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			display: block;
			display: -webkit-box;
			line-height: 1.4;
		}
		.clamp-0{
			  white-space: nowrap;
			  width: 50px;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  /*border: 1px solid #000000;*/
		}
	  .clamp-1{
	    @extend %clamp;
	    -webkit-line-clamp: 1;
	  }
	  .clamp-2{
	    @extend %clamp;
	    -webkit-line-clamp: 2;
	  }
	  .clamp-3{
	    @extend %clamp;
	    -webkit-line-clamp: 3;
	  }
```

#### GOTCHA: ellipsis not showing. **words not wrapping**
```
	white-space: normal !important;
```
