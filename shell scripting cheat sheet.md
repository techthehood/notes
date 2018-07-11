# [Shell Scripting Cheat Sheet](http://linuxcommand.org/lc3_wss0010.php)
[shell scripting guide](https://en.wikibooks.org/wiki/Bash_Shell_Scripting)

## Intro line
```
#!/bin/bash
```

## comments
```
## Joomla component_maker template
```

## print statement in the terminal

```
echo "what is the file title of your component/module (use '_' underscore no spaces)? "
echo "(for example test_Mod) : "
```

accept user input
** the users input will be stored in the variable 'component_name' **
```
read component_name
```

// ### modify the users input

// ### to lowercase - folio
//  ${txt,,} - ,, after the text variable creates string to lowercase
```
component_name=${component_name,,}
```

```
// ### shortcut to component_name - still folio
```
cn=$component_name
```

// ### to uppercase - FOLIO
//  ${txt^^} - ^^ after the text variable creates string to uppercase
```
cn_caps=${component_name^^}
```

// ### to initial caps - Folio
&{txt^} - ^ after the text variable creates initial caps
```
cn_init=${component_name^}
```

// ### full version with com_ added as a prefix - com_folio
//concatenate the variable with a string
```
cn_full="com_"$component_name
```

## Prepping Date variables
```
my_year=$(date +%Y)
my_month_year=$(date +%m-%Y)
```

## writing a function
```
	foo=bar
	function baz ()
	{
	  echo "$@"
	}
```
## executing a function
```
baz "$foo" // bar
baz '$foo' // returns $foo - the variable itself
```
## check out the dynamics of echoing these statements

```
	d3pot ~ $ function test_return ()
	> {
	> echo "return string"
	> }
	
	d3pot ~ $ test_return
	return string
	
	d3pot ~ $ ( i = 2 , j = 2 + i , i * j )
	bash: i: command not found
	
	d3pot ~ $ echo ( i = 2 , j = 2 + i , i * j )
	bash: syntax error near unexpected token `i'
	
	d3pot ~ $ echo $(( i = 2 , j = 2 + i , i * j ))
	8
	
	d3pot ~ $ echo test_return
	test_return
	
	d3pot ~ $ echo $(test_return)
	return string
```

echo $() was useful in outputting the correct value

# [bash date](https://stackoverflow.com/questions/1401482/yyyy-mm-dd-format-date-in-shell-script)
my_year=$(date +%Y)
my_month_year=$(date +%m-%Y)

# [bash date formats](http://man7.org/linux/man-pages/man1/date.1.html) 

# creating and adding to a file
```
echo 'desired string' > file_to_add_to.ext

echo 'desired string' >> file_to_add_to.ext

\\ the >> appends the string to the given file
```

#accepts stdin (standard input) and pipes to a variable
```
 echo "hello world" | { read test; echo test=$test; }
```
//bracket technique is called [grouping commands](http://wiki.bash-hackers.org/syntax/ccmd/grouping_plain)
//also found [here](http://dev.gosteven.com/2013/03/brackets-parentheses-curly-braces-in.html)

## bash find replace
[sed command stack overflow](https://stackoverflow.com/questions/525592/find-and-replace-inside-a-text-file-from-a-bash-command)
[sed command](http://tldp.org/LDP/abs/html/x23170.html)
```
var1=psmod
var2=arc
sed -i -e 's/'"$var1"'/'"$var2"'/g' test\ txt.md
```

//i tried it without the -e
```
sed -i 's/'"$var1"'/'"$var2"'/g' test\ txt.md
```
//output was the same with or without the -e

test txt.md (initial)
some other input from cat
lowercase = psmod
additional data
more strings
lowercase = 'psmod'

uppercase = 'PSMOD'
Initial Caps = 'Psmod'
camelCase = 'psMod'


test txt.md (after)
some other input from cat
lowercase = arc
additional data
more strings
lowercase = 'arc'

uppercase = 'PSMOD'
Initial Caps = 'Psmod'
camelCase = 'psMod'


//it is case sensitive

## find command
[find command docs](https://www.gnu.org/software/findutils/manual/html_mono/find.html#Deleting-Files)
[find command article](https://math2001.github.io/post/bashs-find-command/)
//this works to save results from find command to a variable
 crazy="$( find -name '*react*.md' )"
d3pot (master *) notes $ echo $crazy
./learn reactjs component.md ./learn reactjs JSX.md ./react js.md ./react native eslinter setup.md ./react native notes.md

## this worked to limit the find depth to the current directory
find -type f -maxdepth 1

[bash file renaming - best example](http://www.peteryu.ca/tutorials/shellscripting/batch_rename)
[decent ACDC renaming example](https://serverfault.com/questions/228733/how-to-rename-multiple-files-by-replacing-word-in-file-name)


for filename in *foo*; do echo mv \"$filename\" \"${filename//foo/bar}\"; done > rename.txt

authors example
$ for filename in IMG_*; do echo mv \"$filename\" \"${filename//IMG_/Fireworks}\"; done

my test example ( this example writes to a file but doesn't make any real changes)
for filename in test*txt.md; do echo mv \"$filename\" \"${filename//test/tart}\"; done > rename.txt

removing the file and keeping the rest also doesn't change the file
for filename in test*txt.md; do echo mv \"$filename\" \"${filename//test/tart}\"; done

can i print all the files so i can see the scope of the command
for filename in *.md; do echo \"$filename\"; done > rename.txt
//the scope is limited to the current directory

this version is set to execute directly
for filename in test*txt.md; do mv "$filename" "${filename//test/tart}"; done

//this would work to for multiple files - do some experiments
```
find . -type f -name "ACDC*" -print0 | while read -r -d '' file; do
    mv "$file" "${file//ACDC/AC-DC}"
done
```

-print0 is used to make what is found in find available for other commands.

my test //this works
```
find . -type f -name "tart*.md" -print0 | while read -r -d '' file; do
    mv "$file" "${file//tart/test}"
done
```
lets try to change the all into txt files
find . -type f -name "*.md" -print0 | while read -r -d '' file; do
    mv "$file" "${file//.md/.txt}"
done