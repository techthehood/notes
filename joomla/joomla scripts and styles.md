

##### [add custom tags](https://docs.joomla.org/J3.x:Adding_JavaScript_and_CSS_to_the_page)   
```
  $stylelink = '<!--[if lte IE 6]>' ."\n";
  $stylelink .= '<link rel="stylesheet" href="../css/IEonly.css" />' ."\n";
  $stylelink .= '<![endif]-->' ."\n";

  $document = JFactory::getDocument();
  $document->addCustomTag($stylelink);
```
