


#### Some random css code i like to start off with

#### responsive font-size bp
```
    html{/*font-size:62.5% $mp;*/}

    @media only screen and (max-width:299px)
    {
      html{/*font-size:15px !important;*/font-size:5.0vw !important;}
    }
    @media only screen and (min-width:300px) and (max-width:479px)
    {
      html{/*font-size:15px !important;*/font-size:3.9vw !important;}
    }
    @media only screen and (min-width:480px) and (max-width:768px)
    {
      html{/*font-size:15px !important;*/font-size:1.8vw !important;}
    }
    @media only screen and (min-width:769px) and (max-width:992px)
    {
      html{/*font-size:15px !important;*/font-size:1.5vw !important;}
    }
    @media only screen and (min-width:993px) and (max-width:1239px)
    {
      html{/*font-size:15px !important;*/font-size:1.4vw !important;}
    }
    @media only screen and (min-width:1240px) and (max-width:1343px)
    {
      html{/*font-size:15px !important;*/font-size:1.25vw !important;}
    }
    @media only screen and (min-width:1344px) and (max-width:1468px)
    {
      html{/*font-size:15px !important;*/font-size:1.15vw !important;}
    }
    @media only screen and (min-width:1469px)
    {
      html{ font-size:1.0vw !important;}
    }
```

```


  /*********************************/
  @media(min-width: 55em){

  }
  /***************************/

  @media only screen and (min-width:320px) and (max-width:479px){

  }

  @media only screen and (min-width:480px) and (max-width:767px){

  }

  @media only screen and (min-width:768px) and (max-width:991px)
  {

  }

  @media only screen and (min-width:992px) and (max-width:1999px)
  {

  }


  .page span {
    color: #000;
    font-weight: unset;
  }

  ul.slick-dots{
    li{
      button::before{content:"\2022"}
    }
  }


  .word_wrap{
  /* These are technically the same, but use both */
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
    }

    .ui-icon-wifi:after {
    background-image: url("../images/wifi.png");/* Make your icon fit */
    background-size: 18px 18px;
    }

    .clear,.clr{clear:both;}

    .d3-ui:after{content: "";
    height: 20px;
    width: 100%;
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    top: 10px;
    left: 0px;
    }


    .d3-btn:focus{
      outline:none;
      box-shadow: 0 0 12px #38c;
    }

  /********************************************************************************/

  /***************** test rules **********************/
  .test_yellow{border:1px solid yellow !important;}
  .test_red{border:1px solid red !important;}
  .test_blue{border:1px solid blue !important;}
  .test_green{border:1px solid green !important;}
  .test_purple{border:1px solid purple !important;}
  .test_orange{border:1px solid orange !important;}
  /***************** test rules **********************/
```


#### scss apply for only-child or first-child that isn't an only child
>otherwise item can be both a first child and an only child
```
  &:only-child{
    border:1px solid green;
  }
  &:not(:only-child):first-child{
    border:1px solid red;
  }
```
**works**

```
    // transform: scale(3,3); 
    transform: scale(3);// same as 3,3
    transform-origin: top left;
```
