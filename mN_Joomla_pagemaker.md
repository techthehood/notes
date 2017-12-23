
//module experiment
//Q? are the modules able to distinguish pages using entered alias?

-set up custom module
x - page not reading any template
- changed the menu COM_PSMOD_MENU to read mobilemenu template_style_id = 9
note: i know i set this dynamic up on purpose but i don't remember how i 
set this up on purpose.

A: i inserted this line to filter all requests except those with a post
of menu_data2
////isset($_POST["menu_data2"]) or die("nope, nothing");

Q: where is the custom_panel section?
A: ok i found it, my module didn't add custom_panel to its position 
when i saved it.  (maybe saving it then save & closing or whatever other 
human error stopped it from happening)

-so the mod test1 shows on the first psmod generated page as directed
and doesn't show on the other page as directed
