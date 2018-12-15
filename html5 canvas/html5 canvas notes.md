# html5 cavas notes

### drawing a circle
```
drawCircles = () => {
  let boss = this.state;

  let point_zero = 0*Math.PI;
  let half_circle = 1*Math.PI;
  let full_circle = 2*Math.PI;
  let t_qtr_circle = .5*Math.PI;
  let qtr_circle = 1.5*Math.PI;
  let clockwise = true;

  let startpoint = point_zero,
  endpoint = t_qtr_circle,// this seems to tell canvas where to start the arc
  center_w = boss.canvas.width/2,
  center_h = boss.canvas.height/2,

  x_coord = center_w,
  y_coord = center_h,

  full_size_radius = boss.RADIUS,
  smaller_radius = 100,
  medium_radius = 200,
  radius = full_size_radius;

  // circle hint
  // https://www.w3schools.com/tags/canvas_arc.asp
  boss.context.beginPath();
  boss.context.arc(x_coord, y_coord, radius, startpoint, endpoint, clockwise);
  boss.context.lineWidth=5;
  boss.context.strokeStyle="red";
  boss.context.stroke();
  boss.context.closePath();
  boss.context.fillStyle = "green";
  boss.context.fill();


  let circles = [
    {f_color:"yellow",s_color:"blue", x:center_w, y:center_h, radius:medium_radius},
    {f_color:"blue",s_color:"red" ,x:center_w, y:center_h, radius:smaller_radius}
  ]

  circles.forEach( (entry) =>{

    boss.context.beginPath();
    boss.context.arc(entry.x, entry.y, entry.radius, 0, 2*Math.PI, clockwise);
    boss.context.stroke();
    boss.context.fillStyle = entry.f_color;
    boss.context.fill();
  });

  boss.context.font="50px Courier";
  boss.context.strokeText("Big smile!",10,100);
  boss.context.stroke();
}// circles
```

### [clock sin cos tan hint](https://www.mathsisfun.com/sine-cosine-tangent.html)

### GOTCHA: componentDidMount
```
  componentDidMount = () => {
    // the state isn't set until after this componentDidMount finishes.
    // so applying anything to the state within this function will likely fail
  };// componentDidMount

  componentDidUpdate = () => {
    //this section is for executing just after first state update
    // - all init vars are set by now
    // - all state vars are set by now
  }; // componentDidUpdate
```

## github security issue
see notes in webpack.md
[similar docs](https://github.com/fuse-box/fuse-box/issues/1427)
```
	CVE-2018-16469 More information
	high severity
	Vulnerable versions: < 1.2.1
	Patched version: 1.2.1
	The merge.recursive function in the merge package in versions before 1.2.1 can be tricked into adding or modifying properties of the Object prototype. These properties will be present on all objects allowing for a denial of service attack.
```
