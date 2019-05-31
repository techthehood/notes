# [Shell Scripting Cheat Sheet](http://linuxcommand.org/lc3_wss0010.php)
[shell scripting guide](https://en.wikibooks.org/wiki/Bash_Shell_Scripting)

## other shell scripting resources
[Bash scripting cheatsheet](https://devhints.io/bash)

[good and simple bash scripting tutorial blog](https://ryanstutorials.net/bash-scripting-tutorial/)

## questions
### [should scripts be save with .sh extension?](https://askubuntu.com/questions/503127/should-i-save-my-scripts-with-the-sh-extension)
A: .sh for libraries not executables

## Intro line
```
#!/bin/bash
```

## set file permissions
```
	chmod 755 filename
```

## display file permissions
```
	ls -l
```

## run the file
```
	./filename
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

### [local variable hint](https://www.thegeekstuff.com/2010/05/bash-variables)
```
local temp_var
getMode temp_var
gm_ret="$gm_pass_temp"
```


accept user input
** the users input will be stored in the variable 'component_name' **
```
read component_name
```
**whatever value follows read becomes the name of the new variable**

### adding a prompt to user input
```
read -p "(for example test_Mod) : " component_name
```

## modifying the users input

### to lowercase - folio
**${txt,,} - ,, after the text variable creates string to lowercase**
```
component_name=${component_name,,}
```

### shortcut to component_name - still folio
```
cn=$component_name
```

### to uppercase - FOLIO
**${txt^^} - ^^ after the text variable creates string to uppercase**
```
cn_caps=${component_name^^}
```

### to initial caps - Folio
**&{txt^} - ^ after the text variable creates initial caps**
```
cn_init=${component_name^}
```

### full version with com_ added as a prefix - com_folio
**concatenate the variable with a string**
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
	function test_return ()
	>{
	> echo "return string"
	> }

	$ test_return
	return string

	$ ( i = 2 , j = 2 + i , i * j )
	bash: i: command not found

	 $ echo ( i = 2 , j = 2 + i , i * j )
	bash: syntax error near unexpected token `i'

	$ echo $(( i = 2 , j = 2 + i , i * j ))
	8

	$ echo test_return
	test_return

	$ echo $(test_return)
	return string
```

echo $() was useful in outputting the correct value

### [bash date](https://stackoverflow.com/questions/1401482/yyyy-mm-dd-format-date-in-shell-script)
```
my_year=$(date +%Y)
my_month_year=$(date +%m-%Y)
```
### [bash date formats](http://man7.org/linux/man-pages/man1/date.1.html)

### creating and adding to a file
```
echo 'desired string' > file_to_add_to.ext

echo 'desired string' >> file_to_add_to.ext

```
**the >> appends the string to the given file**

### accepts stdin (standard input) and pipes to a variable
```
 echo "hello world" | { read test; echo test=$test; }

```

### pipe contents to a new file
[pipe hint](https://superuser.com/questions/189362/how-to-pipe-command-output-to-other-commands)

```
	ls | cat
```

```
	echo "hello world" | { read test; echo "test=$test" > test.txt; }
```
added more text
```
	echo "hello world" | { read test; echo "more text" >> test.txt; }
```

### bracket technique is called:
[grouping commands](http://wiki.bash-hackers.org/syntax/ccmd/grouping_plain)
**also found** [here](http://dev.gosteven.com/2013/03/brackets-parentheses-curly-braces-in.html)

### bash find replace
[sed command stack overflow](https://stackoverflow.com/questions/525592/find-and-replace-inside-a-text-file-from-a-bash-command)
[sed command](http://tldp.org/LDP/abs/html/x23170.html)
### more sed helpful
```
	$ sed --help
	Usage: sed [OPTION]... {script-only-if-no-other-script} [input-file]...

	  -n, --quiet, --silent
					 suppress automatic printing of pattern space
	  -e script, --expression=script
					 add the script to the commands to be executed
	  -f script-file, --file=script-file
					 add the contents of script-file to the commands to be executed
	  --follow-symlinks
					 follow symlinks when processing in place
	  -i[SUFFIX], --in-place[=SUFFIX]
					 edit files in place (makes backup if SUFFIX supplied)
	  -b, --binary
					 open files in binary mode (CR+LFs are not processed specially)
	  -l N, --line-length=N
					 specify the desired line-wrap length for the `l' command
	  --posix
					 disable all GNU extensions.
	  -E, -r, --regexp-extended
					 use extended regular expressions in the script
					 (for portability use POSIX -E).
	  -s, --separate
					 consider files as separate rather than as a single,
					 continuous long stream.
		  --sandbox
					 operate in sandbox mode.
	  -u, --unbuffered
					 load minimal amounts of data from the input files and flush
					 the output buffers more often
	  -z, --null-data
					 separate lines by NUL characters
		  --help     display this help and exit
		  --version  output version information and exit

	If no -e, --expression, -f, or --file option is given, then the first
	non-option argument is taken as the sed script to interpret.  All
	remaining arguments are names of input files; if no input files are
	specified, then the standard input is read.

	GNU sed home page: <http://www.gnu.org/software/sed/>.
	General help using GNU software: <http://www.gnu.org/gethelp/>.
	E-mail bug reports to: <bug-sed@gnu.org>.

```

### find and replace example using sed
```
var1=psmod
var2=arc
sed -i -e 's/'"$var1"'/'"$var2"'/g' test\ txt.md
```

**i tried it without the -e**
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
[more find hints](https://ss64.com/bash/find.html)
*this works to save results from find command to a variable*

### find all files with the refernce to react anywhere in its name and store its results in a variable
```
	crazy="$( find -name '*react*.md' )"

	#print the results to the screen

	d3pot (master *) notes $ echo $crazy

```
	**//returns
	./learn reactjs component.md ./learn reactjs JSX.md ./react js.md ./react native eslinter setup.md ./react native notes.md**

### this worked to limit the find depth to the current directory
```
	find -type f -maxdepth 1
```

[bash file renaming - best example](http://www.peteryu.ca/tutorials/shellscripting/batch_rename)
[decent ACDC renaming example](https://serverfault.com/questions/228733/how-to-rename-multiple-files-by-replacing-word-in-file-name)

### change filenames for files in a single directory - think it writes the changes in a new file (files remain the same)
```
	for filename in *foo*; do echo mv \"$filename\" \"${filename//foo/bar}\"; done > rename.txt
```

### authors example
```
	$ for filename in IMG_*; do echo mv \"$filename\" \"${filename//IMG_/Fireworks}\"; done
```
### my test example ( this example writes to a file but doesn't make any real changes)
```
	for filename in test*txt.md; do echo mv \"$filename\" \"${filename//test/tart}\"; done > rename.txt
```

### removing the file and keeping the rest also doesn't change the file
```
	for filename in test*txt.md; do echo mv \"$filename\" \"${filename//test/tart}\"; done
```

### can i print all the files so i can see the scope of the command
```
	for filename in *.md; do echo \"$filename\"; done > rename.txt
	//the scope is limited to the current directory
```

### this version is set to execute directly - (removed back slashes)
```
	for filename in test*txt.md; do mv "$filename" "${filename//test/tart}"; done
```

### this would work to for multiple files - do some experiments
```
	find . -type f -name "ACDC*" -print0 | while read -r -d '' file; do
		mv "$file" "${file//ACDC/AC-DC}"
	done
```

[bash read command docs](https://www.computerhope.com/unix/bash/read.htm)

- print0 is used to make what is found in find available for other commands.
- print0 creates a continuous string (while read -r -d '' - needs delimiter)
```
find . -type f -print0
```
**./file1.ext./file2.ext./file3.ext**

### without print0 creates a new line per file (while read -r - no need for delimiter)
```
find . -type f
```
**./file1.ext
	./file2.ext
	./file3.ext***

### my test //this works
```
find . -type f -name "tart*.md" -print0 | while read -r -d '' file; do
    mv "$file" "${file//tart/test}"
done
```
### lets try to change the all into txt files
```
find . -type f -name "*.md" -print0 | while read -r -d '' file; do
    mv "$file" "${file//.md/.txt}"
done
```

yes its done. all the md files in all **subdirectories** are now .txt

## so here are my experiments for changing data within a file

### start by finding all the files in all the current dir and its subdirectories

```
	find . -type f -name "ACDC*" -print0 | while read -r -d '' file; do
		mv "$file" "${file//ACDC/AC-DC}"
	done

	find . -type f -print0 | while read -r -d '' file;
	do
		echo \"$file\";
	done > all_files.txt
```

### this finds all the related files and lists them on separate lines
```
	find . -type f
```

### this lists them without new lines
```
	find . -type f -print0
```

### print a list of filenames from a pipe
```
	// this doesn't work with or without brackets
	{ find . -type f | while read file;
	do
		echo "$file"
	done; }

	// this works when its all on one line - somehow on multiple lines it fails
	find . -type f |  while read file; do echo "$file";  done;
```
### try to get a list in the current directory only
```
	find . -type f -maxdepth 1 |  while read file; do echo "$file";  done;
```
**it works**

### print a list of filenames into a new file
```
	find . -type f |  while read file; do echo "$file";  done > all_files.txt
```

### parse all files find x in a filename and change it to y
```
	# for the name changes to work we first have to change the name of all directories
	find . -type d -print0 | while read -r -d '' file;
	do
		mv "$file" "${file//$current_name/$new_name}"
	done

	# then change the names of all the files
	find . -type f -print0 | while read -r -d '' file;
	do
		mv "$file" "${file//$current_name/$new_name}"
	done
```

### find files and change the data in each one
```
	var1=basetest; var2=alltest; find . -type f |  while read file; do sed -i -e 's/'"$var1"'/'"$var2"'/g' $file  done
```

### how case sensitive is the find replace?

case_test.txt
```
psmod
Psmod
PSMOD
```
test script
```
	sed -i -e 's/'"$current_name"'/'"$new_name"'/g' case_test.txt

	//returned
	cased
	Psmod
	PSMOD
```
**so the test is case sensitive - try a camelcase after lowering everything**
```
current_name=${current_name,,}
new_name=${new_name,,}


sed -i -e 's/'"${current_name^}"'/'"${new_name^}"'/g' case_test.txt
```

### try to add the filename dynamically
```
current_name=${current_name,,}
new_name=${new_name,,}


sed -i -e 's/'"${current_name^^}"'/'"${new_name^^}"'/g' $current_name"_test.txt"
```
**it works - i needed to put the add on part in quotes (i tried the whole thing in quotes, it didn't work)**

**this also worked**
```
	formed_file=$current_name"_test.txt"

	sed -i -e 's/'"${current_name^^}"'/'"${new_name^^}"'/g' $formed_file
```

### try to combine the file script with the change content script
**keep it to the top level directory only**
```
	formed_file=$current_name"_test.txt"

	find . -type f -maxdepth 1 |  while read file;
	do
	echo "$file";  
	sed -i -e 's/'"${current_name^}"'/'"${new_name^}"'/g' $formed_file
	done;
```

### now try it with the parsed files (single level)
```
	current_name=${current_name,,}
	new_name=${new_name,,}


	find . -type f -maxdepth 1 |  while read file;
	do
	echo "$file";
	sed -i -e 's/'"${current_name^}"'/'"${new_name^}"'/g' $file
	done;
```
**it worked. it took the parsed files, searched for the criteria and changed it.**

### now try to change all 3
```
current_name=${current_name,,}
new_name=${new_name,,}


find .  -maxdepth 1 -type f |  while read file;
do
# echo "$file";
sed -i -e 's/'"${current_name}"'/'"${new_name}"'/g' $file;
sed -i -e 's/'"${current_name^}"'/'"${new_name^}"'/g' $file;
sed -i -e 's/'"${current_name^^}"'/'"${new_name^^}"'/g' $file;

done;

```
**eureka it works!!!**

[if statements](https://ryanstutorials.net/bash-scripting-tutorial/bash-if-statements.php#ifelse)

GOTCHA - make sure brackets have some breathing room
```
//incorrect
if[command]

correct
if [ command ]
```
GOTCHA if statements conditions can't be wrapped in the same brackets
```
incorrect  
if [ $mode_letter == "t" || $mode_letter == "z" || $mode_letter == "b" ]

correct
  if [ $mode_letter == "t" ] || [ $mode_letter == "z" ] || [ $mode_letter == "b" ]
```
GOTCHA setting variables requires no spaces around = sign
```
incorrect
work_mode = "zip"

correct
work_mode="zip"
```

## checking filetypes in scripts
[helpful page](https://unix.stackexchange.com/questions/176157/how-to-check-the-file-type-in-a-script)

```
	echo $(file --mime-type -b "pkg_psmod_v1.1.0")
```
GOTCHA
incorrect this style doesn't work (escaped slashes)
```
echo "directory is $(file --mime-type -b  \"pkg_psmod_v1.1.0\")"
```

returns
directory is cannot open "pkg_psmod_v1.1.0"' (No such file or directory)

correct
```
echo $(file --mime-type -b  "pkg_psmod_v1.1.0")

echo "directory is $(file --mime-type -b  "pkg_psmod_v1.1.0")"

```

### [bash case statements](https://ryanstutorials.net/bash-scripting-tutorial/bash-if-statements.php#case)
[case statement article](https://www.shellhacks.com/case-statement-bash-example/)

[testing for substring](https://stackoverflow.com/questions/229551/string-contains-a-substring-in-bash)

correct
```
if [[ $(file --mime-type -b  "$template_url") = *"directory"* ]]
```

//Note that spaces in the string need to be placed between double quotes, and the * wildcards should be outside.

# [No argument supplied or empty input string](https://stackoverflow.com/questions/6482377/check-existence-of-input-argument-in-a-bash-shell-script)

no arguments supplied
```
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
fi
```

is an empty string
```
if [ -z "$1" ]
  then
    echo "No argument supplied"
fi
```

## my example (using both)
```

```

GOTCHA closing tags need space
incorrect
```
fn fname() {
}#fname
```

correct
```
fn fname() {
} #fname
//space after bracket
```
## using case
GOTCHA
case variable need a dollar sign ($)
single line variables don't need quotes

```
  case $mode in
	"destroy" | "remove" | "delete")
```

## using multiple values
better code
```
  case $mode in
	destroy | remove | delete)
```
## [add and remove directory](https://www.computerhope.com/issues/ch000798.htm)
```
	//add directory
	mkdir $my_dir_name

	//remove
	rm -rf $my_dir_name

```

## [exit a script](https://stackoverflow.com/questions/1378274/in-a-bash-script-how-can-i-exit-the-entire-script-if-a-certain-condition-occurs)
```
exit 1
```
## create default values with parameter substitution
note: the colon helps it to work even when the variable is unset(undefined)
GOTCHA

incorrect
// use {} not ()
```
	// doesn't work
	my_dir_name=$(1 := `who`)
	//returns ./test-script: line 11: 1: command not found

	my_dir_name=${1 := `who`}
	//returns bad substitution
```

correct
```
	my_dir_name=${1:-'who'}
```
**use minus sign instead of equals**

### [modify global variable in while loop](https://unix.stackexchange.com/questions/402750/modify-global-variable-in-while-loop)
[its called using a "here string"](https://stackoverflow.com/questions/16854280/a-variable-modified-inside-a-while-loop-is-not-remembered)
**i used this because the while block limited the scope of variables set inside it.**

my example
```
	while read -r file;
	do
		mod_path=$file
		ret="$mod_path"
		printf "\ncom path = \n$ret\n\n"
	done <<< $(find $pkg_path -maxdepth 1 -type d -name "mod_*")
```

its almost the same but instead of piping to while ( | while) you put the
find after (it runs in the subshell)

### [using the basename command](https://www.computerhope.com/unix/ubasenam.htm)
```
	file_path=$(pwd);
	basename $file_path;
```
gets the target/final part of a path

### [using the cut command](https://shapeshed.com/unix-cut/)
// similar to js split -f tells which result index(s) to keep
```
cut_string="me,myself,and,i";
# substr=$( cut -d ',' -f 1,3,5  $cut_string )
substr=$( echo $cut_string | cut -d ',' -f 1,3,5 )
echo $substr
```

### [using the grep command](https://serverfault.com/questions/51014/dont-need-the-whole-line-just-the-match-from-regular-expression)
```
cut_string="me,myself,and,i \n you,and,i";
substr=$( echo $cut_string | grep -o 'my[A-Za-z]*' )
# echo $cut_string | grep -o 'my[a-z]*'
echo $substr

echo "foobarbaz" | grep -o 'b[aeiou]r'
```
>note: returns the matching substring not the unmatching part

### [using if to match patterns](https://stackoverflow.com/questions/7203662/how-do-i-perform-a-simple-regular-expression-match-in-bash)

```
# my version
if [[ $cut_string =~ my[A-Za-z]* ]]
then
echo ${BASH_REMATCH[0]}
fi

# original working version
if [[ "452MATCHME" =~ ^([0-9]+).* ]]
then
    echo ${BASH_REMATCH[1]};
fi
```

### [regex hint](https://stackoverflow.com/questions/13353663/what-is-the-regular-expression-to-allow-uppercase-lowercase-alphabetical-charac)

> The regex you're looking for is ^[A-Za-z.\s_-]+$
> ^ asserts that the regular expression must match at the beginning of the subject
> [] is a character class - any character that matches inside this expression is allowed
> A-Z allows a range of uppercase characters
> a-z allows a range of lowercase characters
> . matches a period rather than a range of characters
> \s matches whitespace (spaces and tabs)
> _ matches an underscore
> - matches a dash (hyphen); we have it as the last character in the character class so it doesn't get interpreted as being part of a character range. We could also escape it (\-) instead and put it anywhere in the character class, but that's less clear
> + asserts that the preceding expression (in our case, the character class) must match one or more times
> $ Finally, this asserts that we're now at the end of the subject

[more pattern matching hints](http://wiki.bash-hackers.org/syntax/pattern)

### [using sed](http://www.grymoire.com/Unix/Sed.html#uh-17)

```
cut_string="me,myself,and,i \n you,and,i";

echo $cut_string | sed 's/\(my[A-Za-z]*\).*/\1/'
echo $cut_string | sed 's/my\([A-Za-z]*\).*/\1/'
echo $cut_string | sed 's/.*\(my[A-Za-z]*\).*/\1/'
```
**the 1 is a call to repeat the txt found in the 1st group of parentheses**
**i find that the trick here is to put the all other text reference on the outside of
the parentheses - my error was i was ignoring the back slash that is technically joined \(**

### copy File to the current directory
```
	 $ cp "../pkg_"$cn"_v1.0.0/pkg_"$cn".xml" .
```

### copy directories and subdirectories
```

```
[also follow this rsync hint for another way](https://unix.stackexchange.com/questions/293976/cp-directory-with-permissions-but-not-recursively/293981)

### [update an xml file](https://stackoverflow.com/questions/13369933/replace-dynamic-content-in-xml-file)
```
	sed -i "s/\(<author.*>\)[^<>]*\(<\/author.*\)/\1$new_name\2/" $file

```

### full script
```
	find $xml_file_path -type f |  while read file;
	do
	printf "\nfind/replace file = $file\n\n";
	current_name="inspectaTech"
	new_name="inspectaTech2"
	sed -i "s/\(<author.*>\)[^<>]*\(<\/author.*\)/\1$new_name\2/" $file
	done;
```

### update naming
**updates file system naming conventions - my actual script**
update_names.sh
```
	# update the directory

	# enter the target directory - helps prevent naming conflicts - helps me not change the name of the
	# target folder itself
	cd $dir_path

	# from the current dir change the names of all the dir/subdir
	find . -type d | while read -r file;
	do
		mv "$file" "${file//$temp_title/$new_template_name}"
	done

	# then change the names of all the files - while ur at it change target the file contents too.
	find . -type f | while read -r file;
	do
		# rename the contents first
		sed -i -e 's/'"${temp_title}"'/'"${new_template_name}"'/g' $file;
		sed -i -e 's/'"${temp_title^}"'/'"${new_template_name^}"'/g' $file;
		sed -i -e 's/'"${temp_title^^}"'/'"${new_template_name^^}"'/g' $file;

		# then change the file name
		mv "$file" "${file//$temp_title/$new_template_name}"
		# echo "$file";
	done

	# back out to the temporary folder
	cd ..

	# find "temp_component" -maxdepth 1  -type d -print0 | while read -r file;
	find . -maxdepth 1  -type d | while read -r file;
	do
		mv "$file" "${file//$temp_title/$new_template_name}"
	done
```

### [text finder hint](https://stackoverflow.com/questions/12144158/how-to-check-if-sed-has-changed-a-file)
### [sed docs](http://www.grymoire.com/Unix/Sed.html)
### [a nice sed article doc](https://likegeeks.com/sed-linux/)
find_txt
```

```
### [-n is for not empty string -z is for emtpy string](https://serverfault.com/questions/7503/how-to-determine-if-a-bash-variable-is-empty)

### [parameter substitution patterns](https://www.cyberciti.biz/tips/bash-shell-parameter-substitution-2.html)
[another hint](https://unix.stackexchange.com/questions/426831/is-there-a-way-to-replace-last-occurrence-of-match-using-a-shell-variable-substi)
```
${}
```
[more on parameter expansion](http://wiki.bash-hackers.org/syntax/pe)

### [exit a script ] (https://stackoverflow.com/questions/1378274/in-a-bash-script-how-can-i-exit-the-entire-script-if-a-certain-condition-occurs)
```
exit 1
```

# GOTCHA
**if statements have a hard time making comparisons when i use quotes around the sub word**
```
# doesn't work with if
type="${3:-'dir'}"

# works
type="${3:-dir}"
```

# GOTCHA
**piped the wrong direction**
this is correct
```
while read -r file;
do
	com_path=$file
	ret="$com_path"
	printf "\n$prefix path = \n$ret\n\n"
done <<< $(find $packages_dir -maxdepth 1 -type d -name $prefix)
```
i spent all night doing this
```
done >>> $(find $packages_dir -maxdepth 1 -type d -name $prefix)
```

some other unused name experiments
```
# find -depth ! -name . -name "*$temp_title*" -execdir bash -c| while read -r file;
# do
#   mv "$file" "${file//$temp_title/$new_template_name}"
# done

# find . -depth -type d -iname "*$temp_title*" -exec rename 's@'"$temp_title"'@'"$new_template_name"'@gi' {} +
```
### is it a file
```
source ./src/print_ef.sh
file="find_txt"

file="$1"
if [[ -e "$file" ]] && [[ ! -d $file ]]
then
  pf "its a file"
else
  pf "its not a file"
fi
```
**triggers on files and directories**
**both versions work**
### filters out folders
```
 && [ ! -d $file ]
```

### try to use a filter to avoid moving the same file
```
new_file_name="${file//$temp_title/$new_template_name}"
# make sure we arent moving the same exact file
if [[ $file != $new_file_name ]]
then
	mv "$file" "$new_file_name"
fi
```

### rerunning a function prompt with a dependency injection value
```
	# new pattern for re-running a function
	pf "invalid entry"
	local temp_var
	getMode temp_var
	gm_ret="$temp_var"
	# get_mode results = template111
```
**passing the original referenced variable produces circular reference error**
```
	declare -n gm_ret=$1

	get_mode gm_ret
```

### [for and while loop](https://www.cyberciti.biz/faq/bash-for-loop/)
### while loop
```
	counter=0
	n_range=${1:-0}
	n_str=""

	while [ $counter -lt $n_range ]
	do
		pf $counter
		((counter++))
		# n_str="$n_str\n"
		n_str="$n_str extra"
	done

	pf "the final counter is $counter"
	pf "n string = $n_str"
```
**both work and returned an external variable**

### for loop
```
	n_range=${1:-0}
	n_str=""

	for (( c=0; c<$n_range; c++ ))
	do
		pf "$c"
		# n_str="$n_str\n"
		 n_str="$n_str extra"
	done

	pf "the final counter is $counter"
	pf "n string = $n_str"
```

### [bash comparison operators](http://tldp.org/LDP/abs/html/comparison-ops.html)

### [multiline prompts](https://stackoverflow.com/questions/4296108/how-do-i-add-a-line-break-for-read-command/4296147)
```
	cr=`echo $'\n.'`
	cr=${cr%.}

	# Use it
	read -p "Please Enter a Message: $cr" message
```

if filter
filters: empty, type, type is a number, imput is a number, number limit
```
	if [ -z "$sure_input" ] ||
	[[ $type != "txt" ]] &&
	[[ $type =~ $re ]] && ! [[ "$sure_input" =~ $re ]] ||
	[[ "$sure_input" -gt "$type" ]]
	then
		mode="rerun"
		pf "$(get_input "$sure_txt" "$type" "$skip" "$def_val" "$mode" )"
	fi
```

GOTCHA - local vars fail when passing to function params
```
    # local temp_var=""

		get_main temp_var "input" "$my_file_nbr"
		pf "temp_var = $temp_var"
		g_main="$temp_var"
```
**works without the local var**

### [test for empty directory](https://superuser.com/questions/352289/bash-scripting-test-for-empty-directory)
```
	if [ -z "$(ls -A /path/to/dir)" ]; then
	   echo "Empty"
	else
	   echo "Not Empty"
	fi
```
### modifying a string
```
	temp_title=$(echo "$dir_path" | sed 's/.*\(com\|mod\|pkg\)_\([A-Za-z0-9]*\)_v.*/\2/')

	local new_title=$(echo "$dir_path" | sed 's/\(.*\)\(com\|mod\|pkg\)_\([A-Za-z0-9]*\)_\(v.*\)/\1\2_'"$new_template_name"'_\4/')

	console.log "new title = $new_title"
	dir_path="$new_title"
```

### making  zip Files
```
zip -r $zip_pkg_dir".zip" "temp_zip"
```
**the zip files do not replace the original files**
### [using zip](https://ranxing.wordpress.com/2016/12/13/add-zip-into-git-bash-on-windows/)
### git remove multiple deleted files
```
git ls-files --deleted -z | xargs -0 git rm
```

### [bash json hint](https://medium.com/cameron-nokes/working-with-json-in-bash-using-jq-13d76d307c4)
[install on npm article](https://www.npmjs.com/package/jq-cli-wrapper)
[hint for a windows package manager](https://chocolatey.org/)
```
//install failed
	npm install --global jq-cli-wrapper
```
jq test code
```
echo '{ "foo": 123, "bar": 456 }' | jq '.foo'
```
[try jq.node](https://www.npmjs.com/package/jq.node)
```
	npm install jq.node -g
```
working test code
**this works**
```
	 echo '{ "foo": 123, "bar": 456 }' | jqn keys
	 echo '{ "foo": 123, "bar": 456 }' | jqn 'property("foo")'
	 echo '{ "foo": 123, "bar": 456 }' | jqn 'property(["foo"])'
	 echo '[{ "foo": 123, "bar": 456 },{ "foo": 789, "bar": 101112 }]' | jqn 'property("foo")'
	 echo '{ "foo": 123, "bar": 456 , "task": {"foo": 789}}' | jqn 'property("task.foo")'
	 echo '{ "foo": 123, "bar": 456 , "task": [{"foo": 789},{"foo": 101112}]}' | jqn 'property("task[1].foo")'
	 echo '{ "foo": 123, "bar": 456 , "task": [{"foo": 789},{"foo": 101112}]}' | jqn 'property("task[1]")'
	 echo '[{ "foo": 123, "bar": 456 },{ "foo": 789, "bar": 101112 }]' | jqn 'property("[1].foo")'
```
**the variable kind of/basically gets its name from an initial container property**
```
	{"objectName":[rest_of_the_data...]}
	//or
	{"objectName":{rest_of_the_data...}}
	// or - you can write as if the object has already been named
	["x"]theRest or [0].theRest - almost like your're starting with a multidimensional array
```
**this is the only way for me to call an initial array**
**the nature of the jqn object is a multidimensional array**


they all failed
```
echo '{ "foo": 123, "bar": 456 }' | jqn -j obj | obj.foo
echo '{ "foo": 123, "bar": 456 }' | jqn 'filter(has("foo")) | groupBy(function(u){return u.foo}) | csv'

echo '{ "foo": 123, "bar": 456 }' | jqn 'forEach(function(entry){console.log(entry.foo)})
echo '{ "foo": 123, "bar": 456 }' | jqn 'map(\"foo\")'
echo '{ "foo": 123, "bar": 456 }' | jqn '| groupBy( function(u){return u.foo} )'
```

### here i added a json string to a file and extracted the json data from the file using cat
```
	echo '{ "foo": 123, "bar": 456 }' > file_test
	cat file_test | jqn 'property("foo")'
```

### create auto_bundle config json file
ab.config.json
```
[
	{
		"output":"dist/bundle.js",
		"remote":"/c/xampp/apps/joomla/htdocs/plugins/system/psmod/dist/bundle.js"
	},
	{
		"output":"src/app.js",
		"remote":"/c/xampp/apps/joomla/htdocs/plugins/system/psmod/src/app.js"
	},
	{
		"output":"src/lib/test_es2015.js",
		"remote":"/c/xampp/apps/joomla/htdocs/plugins/system/psmod/src/lib/test_es2015.js"
	},
	{
		"output":"src/lib/test_common.js",
		"remote":"/c/xampp/apps/joomla/htdocs/plugins/system/psmod/src/lib/test_common.js"
	}
]
```
### [bash array hint](https://opensource.com/article/18/5/you-dont-know-bash-intro-bash-arrays)
[another iteration - while count](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_10_02.html)
```

```
how do i get the output of the file and jqn into a useable variable?
```
allkeys=$( echo '{ "foo": 123, "bar": 456 }' | jqn keys )
echo ${allkeys[0]}
```
**this works but it produces the resulting array as a single string**

try a map
```
allkeys=$( echo '{ "foo": 123, "bar": 456 }' | jqn ' keys | map( u => { console.log(u) })' )
echo ${allkeys[0]}
```
**failed - try again**
```
allkeys=$( echo '[{ "foo": 123, "bar": 456 }]' | jqn 'map("foo")')
echo ${allkeys[0]}

allkeys=$( echo '[{ "foo": 123, "bar": 456 },{ "foo": 789, "bar": 101112 }]' | jqn 'map("foo")' )
echo ${allkeys[0]}
```
**if json object starts as an array object map works**

try join
```
allkeys=$( echo '{ "foo": 123, "bar": 456 }' | jqn ' keys | join("\n")' )
echo ${allkeys[0]}

allkeys=$( echo '{ "foo": 123, "bar": 456 }' | jqn ' keys | thru(a => a.join("\n"))' )
echo ${allkeys}
```

try foreach
```
allkeys=$( echo '[{ "foo": 123, "bar": 456 }]' | jqn 'forEach(entry => { console.log(`my entry = ${entry.foo}`)})' )
echo ${allkeys[0]}

allkeys=$( echo '[{ "foo": 123, "bar": 456 },{ "foo": 789, "bar": 101112 }]' | jqn 'forEach(entry => { console.log(`my entry = ${entry.foo}`);
printf entry.foo })' )
echo ${allkeys[0]}
```
**i cant do any meaningful scripting with bash - its a js environment**
read a files contents
**this works but i need a persistent variable**
```
cat "ab_remote_location" | while read -r path_prefix;
do
	echo $path_prefix

done

printf "my path prefix = ${path_prefix}"
//my path prefix = [null]
```
try to use a [here-string ](https://unix.stackexchange.com/questions/80362/what-does-mean) **also found above**
```
while read -r path_prefix;
do
	echo $path_prefix
  bundle_path="$path_prefix"

done <<< $( cat "ab_remote_location" )

printf "my path prefix = ${bundle_path}"
```
**this works**
```
while read -r path_prefix;
```
#### [Replace one substring for another string in shell script](https://stackoverflow.com/questions/13210880/replace-one-substring-for-another-string-in-shell-script)   
```
	read svg_file_path

	error_string="file:///"

	empty_string=""

	if [[ $svg_file_path =~ file:///* ]]
	then
	  echo "file:/// was found"

	  svg_file_path="${svg_file_path/$error_string/$empty_string}"

	  echo "new file path is $svg_file_path"
	fi
```
#### color coding .bash_profile
