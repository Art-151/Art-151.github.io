//set frame rate (in frames per second)
let frame_rate = 10; 
//set background, stroke, and fill
let colors = {bg: 0, stroke: 'pink', fill: [0, 255, 255]};
//set offset for center of spiral 
let offsets = {x: 100, y: 100};
//set multiplier for size of spiral
let scale = 5;
//diameter
let diam = 10; //set diameter for points on spiral
let stroke_weight = 1; //set weight of connective lines


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(frame_rate);
  strokeWeight(stroke_weight);
  //encode colors properly 
  for(let clr in colors){
    console.log(colors[clr]);
    colors[clr] = color(colors[clr]);
  }
}

function draw() {
  //set colors base don variables assigned up top
  background(colors.bg);
  stroke(colors.stroke);
  fill(colors.fill);
  var pts = []; //create an empty array to populate with point coordiantes
  
  //generate an array of points in the spiral
  //interval between points gets larger as animation progresses
  for (var i = 0; i <= 100; i += frameCount/100) {
    var x = cos(i) * i + 12;
    var y = sin(i) * i + 9;
    x = x * 5 + offsets.x;
    y = y * 5 + offsets.y;
 
    pts.push({x:x, y:y});
    //console.log(x, y);
  }
  //perform the connect the dots function on each point
  pts.map((pt, i) => {connect_the_dots(pt, pts, i)})

}

//draw a dot at each point, and a line between consecutive dots
function connect_the_dots(pt, pts, i){
  var npt; 
  if(i <= pts.length - 2){
    npt = pts[i+1];
    line(pt.x, pt.y, npt.x, npt.y);
    ellipse(pt.x, pt.y, diam);
  }
}
