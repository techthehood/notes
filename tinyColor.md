
#tinyColor

[tinyColor on github](https://github.com/bgrins/TinyColor)
[tinyColor demo samples](https://bgrins.github.io/TinyColor/)
[tinyColor functions docs](https://bgrins.github.io/TinyColor/docs/tinycolor.html)

#### color comparison and lighten
Narrator.js
>i want light but not white
```
  const getLightColor = () => {
    // break into 2 values because i don't want to lighten a dark color
    // if i lighten a dark color it will be light but not as light because i started dark
    let test_color = Color.random();
    // let try_color = test_color.lighten(25);// failed
    // let try_color = Color(test_color).lighten(25);// failed
    let try_color = Color(test_color.toHex8()).lighten(25);// worked

    let white = Color("white");
    while(!test_color.isLight() || Color.equals(try_color, white)){
      test_color = Color.random();
      try_color = Color(test_color.toHex8()).lighten(25);
    }
    // return `#${try_color.lighten().saturate(20).toHex8()}`;
    return `#${try_color.toHex8()}`;
  }// getLightColor
```

**GOTCHA: there was no way to copy a new color using old_color.lighten(25); the color remained the same**
**i had to completely de-reference the original object by turning it into a hex**
