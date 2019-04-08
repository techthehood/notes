# commonjs amd modules

[common js syntax article](http://eng.wealthfront.com/2015/06/16/an-introduction-to-commonjs/)   
[Writing Modular JavaScript With AMD, CommonJS & ES Harmony](https://addyosmani.com/writing-modular-js/)    

AMD syntax   
```
define('myModule',
    ['foo', 'bar'],
    // module definition function
    // dependencies (foo and bar) are mapped to function parameters
    function ( foo, bar ) {
      //do something
    });
```

loading AMD modules using require.js   
```
require(['app/myModule'],
    function( myModule ){
        // start the main module which in-turn
        // loads other modules
        var module = new myModule();
        module.doStuff();
});
```

Common js syntax
```
module.exports = 'This is a string';
```

loading common js
```
var foo = require('./foo');
assert.equal(foo, 'This is a string');
```
