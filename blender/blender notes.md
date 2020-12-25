# blender notes

#### render process (with white bg)   

  - open program
  - choose 2D animation
  - sketch image
  - go to compositing
  - choose use nodes
    - add
      - color
        - alpha over
        - link render layers image handle to bottom image handle of alpha over
        - link right side alpha over image handle to composite node image handle
      - choose rendering
      - use fn - f12 to get a render preview

#### [move stroke to a new layer](https://docs.blender.org/manual/en/latest/grease_pencil/modes/edit/stroke_menu.html#:~:text=Move%20to%20Layer&text=A%20pop%2Dup%20menu%20to,move%20the%20selected%20stroke%20to.)   
**there is a strokes menu on the same line as the draw/edit mode dropdown menu**

|Mode:| Edit Mode|
|--|--|
|Menu: |Stroke ‣ Move to Layer|
|Hotkey: |M|

> i can highlight the strokes i want to move and press 'm' and the layer menu comes up

#### stroke selection Hotkey
- select a portion of a stroke then press 'L' to select the rest of the stroke

#### join strokes
- use the selection hotkey above to select multiple strokes then press 'ctrl - J' to join them
**even if there is a gap between them this method will bridge the gap**
