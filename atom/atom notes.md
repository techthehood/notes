



#### [Enable tab completion for JSX with Emmet in Atom](https://gist.github.com/mxstbr/361ddb22057f0a01762240be209321f0)   
goto file (menu) > keymap...
```
  'atom-text-editor[data-grammar~="jsx"]:not([mini])':
    'tab': 'emmet:expand-abbreviation-with-tab'
```
**depends on emmet and language-babel**

#### try [react](https://atom.io/packages/react) plugin for atom
> i was looking for a way to autocomplete react code like emmet uses see enable tab completion solution

GOTCHA: git-sh-setup: file not found" during git submodule update
fix
```
  test_script:
  # Workaround for https://github.com/appveyor/ci/issues/2420
  - set "PATH=%PATH%;C:\Program Files\Git\mingw64\libexec\git-core"
  - npm test

  i just added to the systems environment variables the old fashioned way
  C:\Program Files\Git\mingw64\libexec\git-core
```
**ended up not using react for atom it conflicted with the more popular language-babel plugin**

[platformio ide terminal](https://atom.io/packages/platformio-ide-terminal)   
[im done](https://atom.io/packages/imdone-atom)   
[emmet](https://atom.io/packages/emmet)   
[docblockr](https://atom.io/packages/docblockr)   
[language babel](https://atom.io/packages/language-babel)   
[minimap](https://atom.io/packages/minimap)   
[minimap-bookmarks](https://atom.io/packages/minimap-bookmarks)   
[project-manager](https://atom.io/packages/project-manager)   
[wakatime](https://atom.io/packages/wakatime)   
[language-ejs](https://atom.io/packages/language-ejs)   
[language-dustjs](https://atom.io/packages/language-dustjs) **idk what this was for**   
