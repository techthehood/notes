# Js es6 destructuring

```
function calcBmi({ weight, height, max = 25, callback }){
  let bmi = weight / Math.pow(height, 2);

  if(bmi > max){
    console.log("you're overweight");
  }
  if(callback){
    callback(bmi)
  }
}

calcBmi({ weight, height, max: 25 });
calcBmi({ weight, height, callback: function() {} });
```

i can also change the naming
```
function calcBmi({ weight : w, height: h, max = 25, callback }){
  let bmi = w / Math.pow(h, 2);
```
