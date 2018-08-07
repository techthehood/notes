

# using babel-standalone with es6 modules
[fix for require is not defined](https://github.com/babel/babel-standalone/issues/60)
```
//add data-plugins="transform-es2015-modules-umd"
<script data-plugins="transform-es2015-modules-umd" type="text/babel">
```