//2 good sites

//GOOGLE
https://fonts.google.com/

//FONT SQUIRREL
https://www.fontsquirrel.com/

ultimately they both do the same thing.  use @font-face rule
https://www.w3schools.com/cssref/css3_pr_font-face_rule.asp

@font-face {
    font-family: myFirstFont;
    src: url(sansation_light.woff);
}

## _fonts.scss mixin
```
/* actual code */
  @font-face {
    font-family: Airstream;
    src: url("/Joomla/core/fonts/Airstream.ttf");
  }
 ```
 
 change the mixin
 change the main scss file (make a small change so it re compiles)
 upload the new compiled css file to (you can also upload the other 2 files)
 
 ** learn to use a relative path from the mixins folder **
 
 to activate font mixin in your site
 change the path to match the path of the site the font file is stored in.

//article on top 5 font places
https://www.sitepoint.com/5-of-the-best-css3-font-tools/

//it doesn't matter what you name it as long as you use the same syntax
//everywhere else


//only issue with google is they're a target and if they go down so does
//your site.


step by step process

you need to set up the font in 2 places

1. EDITOR SETUP
//NAVIGATE TO THE JCE SKINS DEFAULT FOLDER 
- paste this url into the explorer window
C:\xampp\htdocs\Joomla\components\com_jce\editor\tiny_mce\themes\advanced\skins\default

open the content.css file


//PASTE IN THE FONT-FACE
  @font-face {
    font-family: alexBrush;
    src: url("/Joomla/core/fonts/AlexBrush-Regular.ttf");
  }
  
  the relative path must be from the deeply nested folder out to joomlas root
    @font-face {
    font-family: Airstream;
    src: url("../../../../../../../../core/fonts/Airstream.ttf");
  }
  
  //there are probably other methods but this one didn't raise any CORS errors
  
  heres some relative testing
  
  ```
  
    @font-face {
    font-family: Airstream;
    src: url("../fonts/Airstream.ttf");
    /*src: url("/Joomla/core/fonts/AlexBrush-Regular.ttf");*/
  }
  
  ```
  this worked because the current css file im using is in the site's site_root/core/css folder.  the fonts are in site_root/core/fonts
  
  
  //GO TO ADMIN BACKEND
  //COMPONENTS
  //EDITOR PROFILES
  //COPY THE DEFAULT(*recommended) - FOR FIRST TIME OR CREATE A NEW ONE 
  //PLUGIN PARAMETERS TAB
  //FONT-FAMILY
  //NAVIGATE TO THE BOTTOM AND CHOOSE ADD NEW FONT
  //enter 'anyName' in the left input element
  //enter the exact name you used in font-family in the second box (ex:'alexBrush',serif) followed by a similar or default fallback font.
  //note: the name you used in the css file can also be anyname you want but
  //but it has be the same as the one you choose everywhere else.
  
2. YOUR CSS SETUP
	//GO TO YOUR CSS FILE AND PASTE IN THE NEW FONT FACE RULE
	
	IF THE FONT FACE IS ONE YOU DOWNLOADED FROM A SITE PLACE THE FONT
	IN A FOLDER YOU CAN REFER TO FROM THE URL - HERE I USED THE CORE FOLDER
	
	@font-face {
		font-family: alexBrush;
		src: url("/Joomla/core/fonts/AlexBrush-Regular.ttf");
	}
	
	IF ITS A CDN OR LINK URL - CLICK THE URL AND COPY THE FONT-FACE RULE
	FROM THE PAGE INTO YOUR CSS FILE
	
	THIS ONE CAME FROM GOOGLE
	<link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine">
		  
	@font-face {
		font-family: 'Tangerine';
		font-style: normal;
		font-weight: 400;
		src: local('Tangerine Regular'), local('Tangerine-Regular'), url(https://fonts.gstatic.com/s/tangerine/v8/HGfsyCL5WASpHOFnouG-RFtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, 	U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
	}


css fonts research


TESTS

//live copy
  @font-face {
    font-family: alexBrush;
    src: url("/Joomla/core/fonts/AlexBrush-Regular.ttf");
  }
  
TEST1 - fail
      src: url(/core/fonts/AlexBrush-Regular.ttf);//didn't work either
	  //needs quotes or folder doesn't reference the true root
	  
TEST2 - works
    src: url("/Joomla/core/fonts/AlexBrush-Regular.ttf");
	
TEST3 - works
	//try witout quotes
	src: url(/Joomla/core/fonts/AlexBrush-Regular.ttf);
	
TEST4 - aborted - it was the location
	//try again with quotes from core
	src: url("/core/fonts/AlexBrush-Regular.ttf");
	  
THE NEXT ISSUE IS THE JCE EDITOR IS IN AN IFRAME WITH ITS OWN STYLESHEET
TO SHOW UP IN THE EDITOR I WOULD HAVE TO MANIPULATE THE STYLESHEET

TEST - TEMPLATE HACK

I WENT TO THE JCE DEFAULT TEMPLATE
C:\xampp\htdocs\Joomla\components\com_jce\editor\tiny_mce\themes\advanced\skins\default

I ADDED THIS LINE OF CODE TO THE JCE DEFAULT TEMPLATE - WORKS
@font-face{font-family:alexBrush;src:url(/Joomla/core/fonts/AlexBrush-Regular.ttf);}

I WOULD LIKE TO FIND A UNIVERSAL CSS THAT WORKS OVER ALL THE JCE TEMPLATES
- DEFAULT WORKS FOR ALL THE SKINS

IN ORDER FOR GOOGLE TO WORK I HAVE TO PASTE THE CODE FROM THE GOOGLE LINK INTO THE TEMPLATE THE SAME WAY - MAKE A CSS FILE I CAN COPY AND PASTE FROM WITH ALL MY @FONT-FACE SCRIPTS IN ITS


TEST - TEMPLATE HACK2 - G TEST - works

@font-face {
  font-family: 'Tangerine';
  font-style: normal;
  font-weight: 400;
  src: local('Tangerine Regular'), local('Tangerine-Regular'), url(https://fonts.gstatic.com/s/tangerine/v8/HGfsyCL5WASpHOFnouG-RFtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}

TEST - REMOVE THE GOOGLE LINK THEN ADD THE STYLESHEET FONT-FACE
STILL SHOWING THE FONT WITHOUT THE GOOGLE LINK - MUST BE READING THE JCE CSS

//I used devtools to change the font-family to 'Tangerine' then opened
the text editor - as soon as the iframe finished loading the font style
display took effect.  so it is reading the editors stylesheet but not until
the editor is explicitly loaded.

conclusion - i still need to load the @font-face into the stylesheets

create a fonts stylesheet

shortcut was to modify uavz2_wf_profiles in the database
Default2 params

\"Airstream\":\"'Airstream',serif\",\"alexBrush\":\"'alexBrush',serif\",\"Anagram\":\"'Anagram',serif\",\"Burnstown-Dam\":\"'Burnstown-Dam',serif\",\"Codystar\":\"'Codystar',serif\",\"Comic-Zine\":\"'Comic-Zine',serif\",\"Distant-Galaxy\":\"'Distant-Galaxy',serif\",\"Dobkin\":\"'Dobkin',serif\",\"FancyPants\":\"'FancyPants',serif\",\"FontleroyBrown\":\"'FontleroyBrown',serif\",\"42ndStreet\":\"'42ndStreet',serif\",\"Headhunter\":\"'Headhunter',serif\",\"Heavy-Data\":\"'Heavy-Data',serif\",\"homemade-apple\":\"'homemade-apple',serif\",\"limelight\":\"'limelight',serif\",\"Lobster\":\"'Lobster',serif\",\"lovers-quarrel\":\"'lovers-quarrel',serif\",\"membra\":\"'membra',serif\",\"Minotaur\":\"'Minotaur',serif\",\"Mutlu\":\"'Mutlu',serif\",\"oleo-script\":\"'oleo-script',serif\",\"Plexifont\":\"'Plexifont',serif\",\"schoolbell\":\"'schoolbell',serif\",\"SeasideResort\":\"'SeasideResort',serif\",\"Wasabi\":\"'Wasabi',serif\",\"Tangerine\":\"'Tangerine',serif\"

ORIGINAL TEXT
{"editor":{"toolbar_theme":"o2k7","toolbar_align":"left"},"fontselect":{"fonts":"{\"Andale Mono\":\"andale mono,times\",\"Arial\":\"arial,helvetica,sans-serif\",\"Arial Black\":\"arial black,avant garde\",\"Book Antiqua\":\"book antiqua,palatino\",\"Comic Sans MS\":\"comic sans ms,sans-serif\",\"Courier New\":\"courier new,courier\",\"Georgia\":\"georgia,palatino\",\"Helvetica\":\"helvetica\",\"Impact\":\"impact,chicago\",\"Symbol\":\"symbol\",\"Tahoma\":\"tahoma,arial,helvetica,sans-serif\",\"Terminal\":\"terminal,monaco\",\"Times New Roman\":\"times new roman,times\",\"Trebuchet MS\":\"trebuchet ms,geneva\",\"Verdana\":\"verdana,geneva\",\"Webdings\":\"webdings\",\"Wingdings\":\"wingdings,zapf dingbats\",\"ol-Tangie\":\"'Tangerihttp:\/\/localhost\/Joomla\/administrator\/index.php?option=com_jce&view=profiles&task=edit&cid[]=6#ne', serif\",\"Airstream\":\"'Airstream',serif\",\"alexBrush\":\"'alexBrush',serif\",\"Anagram\":\"'Anagram',serif\",\"Burnstown-Dam\":\"'Burnstown-Dam',serif\",\"Codystar\":\"'Codystar',serif\",\"Comic-Zine\":\"'Comic-Zine',serif\",\"Distant-Galaxy\":\"'Distant-Galaxy',serif\",\"Dobkin\":\"'Dobkin',serif\",\"FancyPants\":\"'FancyPants',serif\",\"FontleroyBrown\":\"'FontleroyBrown',serif\",\"42ndStreet\":\"'42ndStreet',serif\",\"Headhunter\":\"'Headhunter',serif\"}"},"styleselect":{"custom_styles":"[{\"title\":\"alexBrush font\",\"styles\":\"  @font-face {     font-family: alexBrush;     src: url(\\\"\/Joomla\/core\/fonts\/AlexBrush-Regular.ttf\\\");   }\"}]"}}
