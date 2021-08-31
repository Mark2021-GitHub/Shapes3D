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
let cnv;

function preload() {
  font = loadFont("Inconsolata.ttf");
  img = loadImage("cat.jpeg");
}

function setup() {
  cnv=createCanvas(400, 400, WEBGL);
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
  slider1.position(cnv.position().x, cnv.position().y+height + 10);
  slider1.style("width", "80px");
  
  slider2 = createSlider(3, 32, 16, 1);
  slider2.position(slider1.x+100, slider1.y);
  slider2.style("width", "80px");
  
  slider3 = createSlider(1, 10, 1, 1);
  slider3.position(slider2.x+100, slider1.y);
  slider3.style("width", "80px");
  
  slider4 = createSlider(0, 255, 255, 5);
  slider4.position(slider3.x+100, slider1.y);
  slider4.style("width", "100px");

  div1 = createDiv("detailX:");
  div1.style("font-size", "16px");
  div1.position(slider1.x, slider1.y + 20);
  div2 = createDiv("detailY:");
  div2.style("font-size", "16px");
  div2.position(slider2.x, slider2.y + 20);
  div3 = createDiv("Shape:");
  div3.style("font-size", "16px");
  div3.position(slider3.x, slider3.y + 20);
  div4 = createDiv("BgColor:");
  div4.style("font-size", "16px");
  div4.position(slider4.x, slider4.y + 20);

  Material = createSelect();
  Material.position(slider1.x, slider1.y + 40);
  Material.option("fill");
  Material.option("normal");
  Material.option("ambient");
  Material.option("specular");
  Material.option("texture");
  Material.selected("fill");

  check0 = createCheckbox("Default lights", false);
  check0.position(slider1.x, slider1.y + 80);
  check1 = createCheckbox("Ambient Light", false);
  check1.position(check0.x, check0.y + 20);
  check2 = createCheckbox("Directional Light", false);
  check2.position(check1.x, check1.y + 20);
  check3 = createCheckbox("Point Light", false);
  check3.position(check1.x, check2.y + 20);

  px = createSlider(-100, 100, 100, 1);
  px.position(check3.x, check3.y + 20);
  px.style("width", "80px");
  py = createSlider(-100, 100, -100, 1);
  py.position(px.x + 100, px.y);
  py.style("width", "80px");
  pz = createSlider(-100, 100, 100, 1);
  pz.position(py.x + 100, py.y);
  pz.style("width", "80px");

  materialColor = createColorPicker("#FF0000");
  materialColor.position(100, height + 50);
  materialColor.changed(eventColor);
  div5 = createDiv("Material Color: " + materialColor.value());
  div5.style("font-size", "16px");
  div5.position(materialColor.x + 60, materialColor.y);

  lightColor = createColorPicker("#808080");
  lightColor.position(slider3.x, check0.y - 10);
  lightColor.changed(eventColor);
  div6 = createDiv("Light Color: " + lightColor.value());
  div6.style("font-size", "16px");
  div6.position(lightColor.x + 60, lightColor.y);

  div7 = createDiv("<>");
  div7.style("font-size", "16px");
  div7.position(check3.x + 100, check3.y);

  pV = createVector(100, -100, 100);
  dV = createVector(1, 1, -1);
}

function eventColor() {
  div5.html("Material Color: " + materialColor.value(), false);
  div6.html("Light Color: " + lightColor.value(), false);
}

function draw() {
  background(slider4.value());
  
  fill(0);
  textSize(16);
  text("rx:"+rx+" ry:"+ry+" rz:"+rz + " sc:"+sc, 20, height/2-10);

  
   //orbitControl();

  if (touches.length >= 2) {
    d1 = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
    tx = touches[1].x;
    ty = touches[1].y;
  }
  
  cursor(ARROW);

  if (check0.checked() == true) {
    lights();
  }

  if (check1.checked() == true) {
    ambientLight(lightColor.color());
  }
  if (check2.checked() == true) {
    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    dV.set(-dirX, -dirY, -1);
    directionalLight(lightColor.color(), dV);
  }
  if (check3.checked() == true) {
    pV.set(px.value(), py.value(), pz.value());
    pointLight(lightColor.color(), pV);
    div7.html(pV.toString());
    push();
    translate(pV.x, pV.y, pV.z);
    lights();
    noStroke();
    fill(255, 255, 0);
    sphere(5);
    pop();
  }

  scale(sc);

  rotateX(radians(rx));
  rotateY(radians(ry));
  rotateZ(radians(rz));

  let sel = Material.value();

  if (sel == "fill") {
    fill(materialColor.color());
  } else if (sel == "normal") {
    normalMaterial();
  } else if (sel == "specular") {
    specularMaterial(materialColor.color());
  } else if (sel == "ambient") {
    ambientMaterial(materialColor.color());
  } else if (sel == "texture") {
    texture(img);
  }

  if (slider3.value() == 1) {
    sphere(50, slider1.value(), slider2.value());
  } else if (slider3.value() == 2) {
    cylinder(70, 70, slider1.value(), slider2.value());
  } else if (slider3.value() == 3) {
    cone(70, 70, slider1.value(), slider2.value());
  } else if (slider3.value() == 4) {
    torus(80, 20, slider1.value(), slider2.value());
  } else if (slider3.value() == 5) {
    box(100);
  } else if (slider3.value() == 6) {
    plane(100, 100);
  } else if (slider3.value() == 7) {
    ellipsoid(50, 30, 70, slider1.value(), slider2.value());
  } else if (slider3.value() == 8) {
  }

  //normalMaterial();

  
  // X -Axis
  stroke(255, 0, 0);
  line(-x, 0, 0, x, 0, 0);
  fill(255, 0, 0);
  textSize(16);
  text("+X", x, 0);
  text("-X", -x, 0);

  // Draw Y Axis
  stroke(0, 255, 0);
  line(0, -y, 0, 0, y, 0);
  fill(0, 255, 0);
  text("+Y", 0, y);
  text("-Y", 0, -y);

  // Draw Z Axis
  stroke(0, 0, 255);
  line(0, 0, -z, 0, 0, z);
  push();
  translate(0, 0, z);
  fill(0, 0, 255);
  text("+Z", 0, 0);
  pop();
  push();
  translate(0, 0, -z);
  fill(0, 0, 255);
  text("-Z", 0, 0);
  pop();

  if (keyIsPressed === true) {
    if (keyCode == LEFT_ARROW) {
      ry--;
    } else if (keyCode == RIGHT_ARROW) {
      ry++;
    } else if (keyCode == UP_ARROW) {
      rx++;
    } else if (keyCode == DOWN_ARROW) {
      rx--;
    } else if (key == "z") {
      rz--;
    } else if (key == "x") {
      rz++;
    } else if (key == "a") {
      sc -= 0.01;
      if (sc < 0.01) {
        sc = 0.01;
      }
    } else if (key == "s") {
      sc += 0.01;
      if (sc > 3) {
        sc = 3;
      }
    }
  }

  let s1 = "DetailX: " + slider1.value();
  div1.html(s1, false);
  let s2 = "DetailY: " + slider2.value();
  div2.html(s2, false);
  let s3 = "Shape: " + slider3.value();
  div3.html(s3, false);
  let s4 = "BgColor: " + slider4.value();
  div4.html(s4, false);
}

function mouseDragged() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
    return true;

  cursor(MOVE);
  if (mouseX > pmouseX) {
    ry++;
  } else if (mouseX < pmouseX) {
    ry--;
  }
  if (mouseY > pmouseY) {
    rx--;
  } else if (mouseY < pmouseY) {
    rx++;
  }

  return false;
}

function mouseWheel(event) {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
    return true;
  cursor(HAND);

  if (event.deltaY > 1) {
    rz++;
  } else if (event.deltaY < -1) {
    rz--;
  } 
  
  if (event.deltaX > 1) {
     sc += 0.01;
     if (sc > 2) sc = 2;
  } else if (event.deltaX < -1) {
     sc -= 0.01;
        if (sc < 0.1) sc = 0.1;
  } 
  
  return false;
}

function touchMoved() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
    return true;

  if (touches.length == 1) {
    if (mouseX > pmouseX+1 ) {
      ry++;
    } else if (mouseX < pmouseX-1) {
      ry--;
    }
    if (mouseY > pmouseY+1) {
      rx--;
    } else if (mouseY < pmouseY-1) {
      rx++;
    }
  } else if (touches.length == 2) {
    if (mouseX == pmouseX) {
      if (touches[1].y > ty) {
        rz++;
      } else if (touches[1].y < ty) {
        rz--;
      }
    } else {
      d2 = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
      if (d2 > d1) {
        sc += 0.01;
        if (sc > 2) sc = 2;
      } else if (d2 < d1) {
        sc -= 0.01;
        if (sc < 0.1) sc = 0.1;
      }
    }
  } else if (touches.length == 3) {
  }
  return false;
}
