
# Convert to zips

it helps to have a folder that was already used as a zip file to modify into
somthing to convert into a zip for the files you want to install into joomla!

these containers have 
> admin
> site
name.xml
index.html
script.php

areas of focus:
```
<version>


 <files folder="site">
 and desired folders and files
 
 <administration>
        <menu img="class:categories">COM_PSMOD_MENU</menu><!-- This is title you want to appear in the admin drop down menu -->
        <files folder="admin">
		and desired folders and files
```

note the xml file inside the outer zip container is the same one found inside the admin folder.
the site folder doesn't have an xml (install) file.

example.xml file 
```
<?xml version="1.0" encoding="utf-8"?>
    <extension type="component" version="3.0" method="upgrade">
    <name>com_psmod</name><!-- com_folio  this is used as the name on the component folder-->
    <author>inspectaTech</author>
    <creationDate>08-2017</creationDate>
    <copyright> (c) 2017 example tech llc. All rights reserved.</copyright>
    <authorEmail>inspectaTech@example.com</authorEmail>
    <authorUrl>https://example.com</authorUrl>
    <version>1.1.0</version>
    <description>COM_PSMOD_XML_DESCRIPTION</description>
    <scriptfile>script.php</scriptfile>

    <install>
        <sql>
            <file driver="mysql" charset="utf8">sql/install.mysql.utf8.sql</file>
        </sql>
    </install>
    <uninstall>
        <sql>
            <file driver="mysql" charset="utf8">sql/uninstall.mysql.utf8.sql</file>
        </sql>
    </uninstall>

    <files folder="site">
            <filename>index.html</filename>
            <filename>controller.php</filename>
            <filename>psmod.php</filename><!-- folio.php  -->
            <folder>controllers</folder>
            <folder>language</folder>
            <folder>models</folder>
            <folder>tables</folder>
            <folder>views</folder>
            <folder>xfiles</folder>
    </files>
    <languages folder="site">
        <language tag="en-GB">language/en-GB/en-GB.com_psmod.ini</language><!-- en-GB.com_folio.ini  -->
    </languages>
    <administration>
        <menu img="class:categories">COM_PSMOD_MENU</menu><!-- This is title you want to appear in the admin drop down menu -->
        <files folder="admin">
           <filename>index.html</filename>
           <filename>access.xml</filename>
           <filename>config.xml</filename>
           <filename>controller.php</filename>
           <filename>psmod.php</filename><!-- folio.php  -->
		   <filename>script.php</filename>
           <folder>controllers</folder>
           <folder>helpers</folder>
           <folder>models</folder>
		   <folder>language</folder>
           <folder>sql</folder>
           <folder>tables</folder>
           <folder>views</folder>
           <folder>xfiles</folder>
        </files>
        <languages folder="admin">
        <language tag="en-GB">language/en-GB/en-GB.com_psmod.ini</language><!-- en-GB.com_folio.ini  -->
        <language tag="en-GB">language/en-GB/en-GB.com_psmod.sys.ini</language><!-- en-GB.com_folio.sys.ini  -->
        </languages>
    </administration>
    </extension>
```

script.php

	contains php scripts to process on install/uninstall etc.
```
defined("_JEXEC") or die;

class com_psmodInstallerScript /*com_folioInstallerScript*/
{
    function install($parent)
    {
        //JFactory::getDocument()->addScriptDeclaration("alert(\" parent is ".$parent."\")");
        $parent->getParent()->setRedirectURL("index.php?option=com_psmod");
    }

    function uninstall($parent)
    {
        echo "<p>" . JText::_("COM_PSMOD_UNINSTALL_TEXT") . "</P>";
    }

    function update($parent)
    {
        echo "<p>" . JText::_("COM_PSMOD_UPDATE_TEXT") . "</P>";
    }

    function preflight($type, $parent)
    {
        echo "<p>" . JText::_("COM_PSMOD_PREFLIGHT_" . $type . "_TEXT") . "</P>";
    }

    function postflight($type, $parent)
    {
        echo "<p>" . JText::_("COM_PSMOD_POSTFLIGHT_" . $type . "_TEXT") . "</P>";
    }
}
```

# zipping templates

template zips the same
needs an update - content needs to not be inside a module position