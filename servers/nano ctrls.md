# Nano ctrls (from nano)

```
 The nano editor is designed to emulate the functionality and ease-of-use
 of the UW Pico text editor.  There are four main sections of the editor.
 The top line shows the program version, the current filename being
 edited, and whether or not the file has been modified.  Next is the main
 editor window showing the file being edited.  The status line is the
 third line from the bottom and shows important messages.  The bottom two
 lines show the most commonly used shortcuts in the editor.

 Shortcuts are written as follows: Control-key sequences are notated with
 a '^' and can be entered either by using the Ctrl key or pressing the Esc
 key twice.  Meta-key sequences are notated with 'M-' and can be entered
 using either the Alt, Cmd, or Esc key, depending on your keyboard setup.
 Also, pressing Esc twice and then typing a three-digit decimal number
 from 000 to 255 will enter the character with the corresponding value.
 The following keystrokes are available in the main editor window.
 Alternative keys are shown in parentheses:


^G    (F1)      Display this help text
^X    (F2)      Close the current file buffer / Exit from nano
^O    (F3)      Write the current file to disk
^R    (F5)      Insert another file into the current one

^W    (F6)      Search forward for a string or a regular expression
^\    (M-R)     Replace a string or a regular expression
^K    (F9)      Cut the current line and store it in the cutbuffer
^U    (F10)     Uncut from the cutbuffer into the current line

^J    (F4)      Justify the current paragraph
^T    (F12)     Invoke the spell checker, if available
                Invoke the linter, if available
                Invoke formatter, if available

^C    (F11)     Display the position of the cursor
^_    (M-G)     Go to line and column number

M-U             Undo the last operation
M-E             Redo the last undone operation

M-A   (^6)      Mark text starting from the cursor position
M-6   (M-^)     Copy the current line and store it in the cutbuffer

M-]             Go to the matching bracket

M-W   (F16)     Repeat the last search
M-▲             Search next occurrence backward
M-▼             Search next occurrence forward

^B    (◀)       Go back one character
^F    (▶)       Go forward one character
^◀    (M-Space) Go back one word
^▶    (^Space)  Go forward one word
^A    (Home)    Go to beginning of current line
^E    (End)     Go to end of current line

^P    (▲)       Go to previous line
^N    (▼)       Go to next line
M--   (M-_)     Scroll up one line without scrolling the cursor
M-+   (M-=)     Scroll down one line without scrolling the cursor


^▲    (M-7)     Go to previous block of text
^▼    (M-8)     Go to next block of text
M-(   (M-9)     Go to beginning of paragraph; then of previous paragraph
M-)   (M-0)     Go just beyond end of paragraph; then of next paragraph

^Y    (F7)      Go one screenful up
^V    (F8)      Go one screenful down
M-\   (^Home)   Go to the first line of the file
M-/   (^End)    Go to the last line of the file

M-◀   (M-<)     Switch to the previous file buffer
M-▶   (M->)     Switch to the next file buffer

^I    (Tab)     Insert a tab at the cursor position
^M    (Enter)   Insert a newline at the cursor position

^D    (Del)     Delete the character under the cursor
^H    (Bsp)     Delete the character to the left of the cursor
                Cut backward from cursor to word start
                Cut forward from cursor to next word start
M-T             Cut from the cursor position to the end of the file

M-J             Justify the entire file
M-D             Count the number of words, lines, and characters
M-V             Insert the next keystroke verbatim

^L              Refresh (redraw) the current screen
^Z              Suspend the editor (if suspension is enabled)

M-}   (Tab)     Indent the current line (or marked lines)
M-{   (Sh-Tab)  Unindent the current line (or marked lines)


M-3             Comment/uncomment the current line (or marked lines)
^]              Try and complete the current word

M-:             Start/stop recording a macro
M-;             Run the last recorded macro

^Q              Search backward for a string or a regular expression

^S              Save file without prompting

M-X             Help mode enable/disable
M-C             Constant cursor position display enable/disable
M-O             Use of one more line for editing enable/disable
M-S             Smooth scrolling enable/disable

M-$             Soft wrapping of overlong lines enable/disable
M-#             Line numbering enable/disable
M-P             Whitespace display enable/disable
M-Y             Color syntax highlighting enable/disable

M-H             Smart home key enable/disable
M-I             Auto indent enable/disable
M-K             Cut to end enable/disable
M-L             Hard wrapping of overlong lines enable/disable
M-Q             Conversion of typed tabs to spaces enable/disable

M-B             Backup files enable/disable
M-F             Reading file into separate buffer enable/disable
M-M             Mouse support enable/disable
M-N             No conversion from DOS/Mac format enable/disable
M-Z             Suspension enable/disable
```
copy paste
alt - 6 copy line
ctrl U paste line
