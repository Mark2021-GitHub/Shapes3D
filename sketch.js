var x, y, z;
var rx, ry, rz;
let slider1, slider2, slider3, slider4;
let div1, div2, div3, div4;
var sc;
let Material;
var materialColor, lightColor;
let pV, dV;
var font, img;
var d1, d2;
var tx, ty;

function preload() {
  font = loadFont("Inconsolata.ttf");
  img = loadImage("cat.jpeg");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  //var canvas =  createCanvas(windowWidth, windowHeight, WEBGL);

  textFont(font);
  textSize(20);

  x = width / 2 - 20;
  y = height / 2 - 20;
  z = width / 2 - 20;

  rx = 0;
  ry = 0;
  rz = 0;
  sc = 1;

  slider1 = createSlider(3, 48, 24, 1);
