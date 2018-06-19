# Code Academy - learn reactjs

[learn react website](https://www.codecademy.com/courses/react-101/lessons/react-jsx-intro/exercises/attributes-in-jsx?action=lesson_resume)

What is JSX?
JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML.

A JSX attribute is written using HTML-like syntax: a name, followed by an equals sign, followed by a value. The value should be wrapped in quotes, like this:

** wrapped in quotes **

my-attribute-name="my-attribute-value"


Rendering JSX
```
import React from 'react';
import ReactDOM from 'react-dom';

// This is just an example, switch to app.js for the exercise.
ReactDOM.render(<h1>Hello world</h1>, document.getElementById('app'));
```

## cant use class="" like in html

```
In HTML, it's common to use class as an attribute name:

<h1 class="big">Hey</h1>

In JSX, you can't use the word class! You have to use className instead:

<h1 className="big">Hey</h1>
```

This is because JSX gets translated into JavaScript, and class is a reserved word in JavaScript.

## You need the slash

In JSX, you have to include the slash. If you write a self-closing tag in JSX and forget the slash, you will raise an error:
```
Fine in JSX:

  <br />

NOT FINE AT ALL in JSX:

  <br>
```

use curly braces for jSX to evaluate as javascript
```
<h1>{2 + 3}</h1>
//5
```

## Event Attributes

in JSX event attribute names are camelCased
[w3schools event attributes](https://www.w3schools.com/tags/ref_eventattributes.asp)
Note that in HTML, event listener names are written in all lowercase, such as onclick or onmouseover. In JSX, event listener names are written in camelCase, such as onClick or onMouseOver.

```
<img onClick={myFunc} />
```

## peculiar if statements

they seem to need a space between the if and the parenthesis()
```
if (coinToss() === 'heads'){
```

## The ternary operators
The ternary operator works the same way in React as it does in regular JavaScript. However, it shows up in React surprisingly often.

Recall how it works: you write x ? y : z, where x, y, and z are all JavaScript expressions.

```
const headline = (
  <h1>
    { age >= drinkingAge ? 'Buy Drink' : 'Do Teen Stuff' }
  </h1>
);
```

hows this for an operator
{!x && <element></element>}
```
      const favoriteFoods = (
	  <div>
		<h1>My Favorite Foods</h1>
		<ul>
		  <li>Sushi Burrito</li>
		  <li>Rhubarb Pie</li>
		  
		  {!judgmental && <li>Nacho Cheez Straight Out The Jar</li>}
		  
		  <li>Broiled Grapefruit</li>
		</ul>
	  </div>
);

```

## adding keys

```
const peopleLis = people.map((person,i) =>
  // expression goes here:
	<li key={"person_" + i}>{person}</li>
);
```

note even though the correct syntax without a js expression is 
```
<li key="li-01">Example1</li>
```
** notice the quotes after key= **

expressions dont need quotes when used with attributes


