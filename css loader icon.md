# css loader

[loader docs](https://www.w3schools.com/howto/howto_css_loader.asp)
loader html
```
	<div ng-show="picasso.loader == 1" class="curtain col_win_edit_curtain" ng-dblclick="picasso.loader = 0">
		<div class="loader"></div>
	</div>
```

ng-show=".loader == 1"

loader is always spinning.  its just not always on display/visible
the loader icon is acuallly set in the div with the loader class.  this div is balanced by the curtain which is set to fill the space and center the loader.

loader/curtain css

```
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #17315a ;
  border-right: 16px solid #ecf1fa ;
  border-bottom: 16px solid #80a4de;
  border-left: 16px solid #275398;/*appears as the front section*/
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/*https://www.w3schools.com/howto/howto_css_loader.asp*/

```

you can also modify the loader and curtain sizes

```
	.col_win_edit_curtain{
		display: flex; justify-content: center; align-items: center;
		width:90%; height:90%;
		.loader{border-width: 10px; width:75px; height:75px;}
    }
```

here i did the same thing but added position:relative to the curtains parent
and changed the curtains height and width

```
	...
       position:relative;
      .bookmark_curtain{
        display: flex; justify-content: center; align-items: center;
        width:100%; height:19rem;
        .loader{border-width: 10px; width:75px; height:75px;}
      }
	...

```