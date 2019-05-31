# .bash_profile

>my sample
```
  # Enable tab completion
  source ~/git-completion.bash

  #PS1='\n\W\n[\h][\u]->'

  # colors!
  green="\[\033[0;32m\]"
  blue="\[\033[0;34m\]"
  purple="\[\033[0;35m\]"
  red="\e[0;31m"
  yellow='\e[0;33m'
  reset="\[\033[0m\]"

  # other colors
  txtblk='\e[0;30m' # Black - Regular
  txtred='\e[0;31m' # Red
  txtgrn='\e[0;32m' # Green
  txtylw='\e[0;33m' # Yellow
  txtblu='\e[0;34m' # Blue
  txtpur='\e[0;35m' # Purple
  txtcyn='\e[0;36m' # Cyan
  txtwht='\e[0;37m' # White

  bldblk='\e[1;30m' # Black - Bold
  bldred='\e[1;31m' # Red
  bldgrn='\e[1;32m' # Green
  bldylw='\e[1;33m' # Yellow
  bldblu='\e[1;34m' # Blue
  bldpur='\e[1;35m' # Purple
  bldcyn='\e[1;36m' # Cyan
  bldwht='\e[1;37m' # White

  unkblk='\e[4;30m' # Black - Underline
  undred='\e[4;31m' # Red
  undgrn='\e[4;32m' # Green
  undylw='\e[4;33m' # Yellow
  undblu='\e[4;34m' # Blue
  undpur='\e[4;35m' # Purple
  undcyn='\e[4;36m' # Cyan
  undwht='\e[4;37m' # White

  bakblk='\e[40m'   # Black - Background
  bakred='\e[41m'   # Red
  badgrn='\e[42m'   # Green
  bakylw='\e[43m'   # Yellow
  bakblu='\e[44m'   # Blue
  bakpur='\e[45m'   # Purple
  bakcyn='\e[46m'   # Cyan
  bakwht='\e[47m'   # White

  txtrst='\e[0m'    # Text Reset


  print_before_the_prompt () {
      printf "\n$yellow%s\n" "$PWD"
  }
  PROMPT_COMMAND=print_before_the_prompt

  # Change command prompt
  source ~/git-prompt.sh
  export GIT_PS1_SHOWDIRTYSTATE=1
  # '\u' adds the name of the current user to the prompt
  # '\$(__git_ps1)' adds git-related stuff
  # '\W' adds the name of the current directory
  export PS1="$purple\u$green\$(__git_ps1)$blue \W $ $reset"

  alias cl='clear
  clear'
  alias np='start notepad++'
  alias cd-uw='cd /c/Users/d3pot/version-control/bash_scripting/joomla_component_maker'
  alias cd-htdocs='cd /c/xampp/apps/joomla/htdocs'
  alias cd-htdocs-itk='cd /c/xampp/apps/joomla/htdocs/d3po_ITK'
  alias cd-htdocs-btk='cd /c/xampp/apps/joomla/htdocs/d3po_BTK'
  alias cd-htdocs-tools='cd /c/xampp/apps/joomla/htdocs/tool_templates'
  alias cd-arc='cd /c/xampp/apps/joomla/htdocs/components/com_arc/xfiles'
  alias cd-notes='cd /c/Users/d3pot/version-control/bash_scripting/notes'
  alias cd-html5='cd /c/Users/d3pot/version-control/html5-canvas'
  alias cd-ws='cd /c/Users/d3pot/version-control/workspace'
  alias cd-psmod='cd /c/xampp/apps/joomla/htdocs/administrator/components/com_psmod/xfiles'
  alias cd-psmod-tools='cd /c/xampp/apps/joomla/htdocs/administrator/components/com_psmod/xfiles/core/subs/tool_templates'
  alias cd-psmod-itk='cd /c/xampp/apps/joomla/htdocs/administrator/components/com_psmod/xfiles/core/subs/d3po_ITK'
  alias cd-ppro='cd /c/xampp/apps/joomla/htdocs/modules/mod_panelprofile/xfiles'
  alias cd-itk='cd /c/xampp/apps/joomla/htdocs/d3po_ITK'
  alias cd-btk='cd /c/xampp/apps/joomla/htdocs/d3po_BTK'
  alias nrd='npm run dev'
  alias nrb='npm run build'
  alias cd-core='cd /c/xampp/apps/joomla/htdocs/core'
  alias cd-mpsmod='cd /c/xampp/apps/joomla/htdocs/modules/mod_psmod/xfiles'
  alias cd-mpsmod-tools='cd /c/xampp/apps/joomla/htdocs/modules/mod_psmod/xfiles/core/subs/tool_templates'
  alias cd-mpsmod-itk='cd /c/xampp/apps/joomla/htdocs/modules/mod_psmod/xfiles/core/subs/d3po_ITK'
  alias cd-tool='cd /c/xampp/apps/joomla/htdocs/tool_templates'
  alias cd-tools='cd-tool'
  alias devtools='start winscp.exe; start atom; start chrome; np'
  alias cd-desk='cd /c/Users/d3pot/OneDrive/desktop'
  alias cd-icons='cd /c/xampp/apps/joomla/htdocs/icon_collection'
  alias cd-svg='cd /c/Users/d3pot/version-control/bash_scripting/svg2base64'
  alias cd-node='cd /c/Users/d3pot/version-control/nodejs'
  alias d3po='ssh d3po@sunzao.us'
```
#### server variation
>to make sure i recognize when im on the server i made an additional red [server] label
```
  print_before_the_prompt () {
      printf "\n$red[server] $yellow%s\n" "$PWD"
  }
  PROMPT_COMMAND=print_before_the_prompt

```
[server] with black text and a red Background
```
   printf "\n$txtblk$bakred[server] $yellow%s\n" "$PWD"
```

### setting up an alias for a new program Install

1. navigate to the icon's target (rt click properties)
2. goto cortana and search system (Control Panel\System and Security\System)
3. goto advanced system settings
4. goto environment variables
5. select/highlight user or system variables 'Path'
6. choose 'edit...' btn
7. select New
8. paste in the directory's path (without the executable - filename.exe)

9. edit the .bash_profile
10. add your executable name (without .exe)
```
  alias newIns='newexecutable'
```
11. close the bash terminal and reopen it - resourcing the bash_profile only activates the alias but it doesn't update the Path variable
