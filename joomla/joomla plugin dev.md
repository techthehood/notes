# Joomla plugin development

## [plugin development directory](https://docs.joomla.org/Plugin/Events/System)
### [joomla plugin docs](https://docs.joomla.org/J3.x:Creating_a_content_plugin)
### [plugin content events?](https://docs.joomla.org/Plugin/Events/Content)
### [custom plugin groups](https://docs.joomla.org/Supporting_plugins_in_your_component#Load_The_Right_Plugin_Group)
### [creating a plugin for joomla](https://docs.joomla.org/J3.x:Creating_a_Plugin_for_Joomla)
### [list of plugin events](https://docs.joomla.org/Plugin/Events/System)

[a good plugin article](https://webhostingmedia.net/start-joomla-plugin-development/)

### [Plugin Events](https://docs.joomla.org/Plugin/Events)
plugins have events that are called before and after certain triggers
- [i think for my purposes i want to use this system] trigger(https://docs.joomla.org/Plugin/Events/System#onAfterInitialise)

### [adding juri_root](https://stackoverflow.com/questions/39794805/get-site-root-url-in-javascript)
```
  window[\'ROOT_URL\'] =  "' . JUri::root() . '";
```

### [get menu item id](https://stackoverflow.com/questions/19067435/joomla-get-menu-item-id)
```
  $app = JFactory::getApplication();
  $menu = $app->getMenu()->getActive()->id;
  echo $menu;
```
my example
```
  public function onBeforeCompileHead()
  {
    $app = JFactory::getApplication();
    $menu = $app->getMenu()->getActive()->id;

    $scriptLink = JFactory::getDocument();
    // this is the last thing that runs since i can't get onAfterRender running
    $scriptLink->addScriptDeclaration('

      console.log("rich page menu id = ' . $menu . '");

    ');
  }
```
