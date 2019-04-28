let pg,img,pgnoise;
var noiseScale = 1000;
var red,green,blue,c,value;
var w, h;
var loc;
let myCanvas;
var num;

function setup(){
  w = windowWidth;
  h = windowHeight;

  if(options.Type == 'PNG' || options.Type == 'JPG'){
    myCanvas = createCanvas(w,h);
  }else if(options.Type == 'SVG'){
    myCanvas = createCanvas(w, h, SVG);
  }
  
  pg = createGraphics(w,h);

  myCanvas.class("myCanvas");
  pg.class("graphic");

  pgnoise = createGraphics(w,h);
  pixelDensity(1);
  for(var i = 0; i < 60000; i++){
    pgnoise.stroke(options.NoiseColor[0],options.NoiseColor[1],options.NoiseColor[2],random(options.NoiseAlpha));
    pgnoise.point(random(w),random(h));
  }
}


function p5LoadImage(dataURL){
  img = loadImage(dataURL);
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


function draw(){
  pixelDensity(1);
  if(options.Type == 'JPG'){
   noStroke();
   for(var y = 0; y < h; y+=options.WaveY){
    if(options.BgColorMode == "SolidColor"){
      fill(options.BgColor1);
      noStroke();
    }else{
      var percent2 = norm(y, 0, pg.height);
      var between2 = lerpColor(color(options.BgColor1), color(options.BgColor2), percent2);
      fill(between2);
    }
    rect(-20,y,width+60,options.WaveY);
  }
}else if(options.Type == 'PNG'){
  background(0,0,0,0);
}else if(options.Type == 'SVG'){
  background(0,0,0,0);
}

pg.background(0);
pg.fill(255);
pg.stroke(255);
var n = map(w,300,2000,0,170);
pg.textSize(int(options.textSize+n));
pg.strokeWeight(options.textWeight); 


if(type == "image"){
  push();
  pg.imageMode(CENTER);
  pg.image(img,w/2, h/2);
  pop();
}else if(type ="text") {
  pg.textAlign(CENTER);
  pg.text(options.Text,w/2,h/2);
  rectMode(CORNER);
}
smooth();
push();
drawLine(); 
pop();

if(options.Noise == true){
  image(pgnoise,0,0);  
}
}



function drawLine(){
  pg.loadPixels();
  pg.pixelDensity(pixelDensity());

  for(var y = 0; y < pg.height; y+=int(options.WaveY)){
    if(options.StrokeMode == 'SolidColor'){
      stroke(options.Stroke1);
    }else if(options.StrokeMode == 'Gradient'){
      var percent = norm(y, 0, pg.height);
      var between = lerpColor(color(options.Stroke1), color(options.Stroke2), percent);
      stroke(between);
    }


    beginShape();
    for(var x = -20 ; x < pg.width+50; x+=int(options.WaveX)){
      loc = (x + y *pg.width)*4;
      var angle = noise(y/1000, x/10000, x)*TWO_PI*0.001;

      red =  pg.pixels[loc];
      green =  pg.pixels[loc+1];
      blue = pg.pixels[loc+2];
      c = color(red, green, blue);
      value = brightness(c);


      strokeWeight(options.StrokeWeight*0.6);
      if(options.FillMode == 'SolidColor'){
        fill(options.Fill1);
      }else if(options.FillMode == 'Gradient'){
        var percent2 = norm(y, pg.height*0.3, pg.height*0.7);
        var between2 = lerpColor(color(options.Fill1), color(options.Fill2), percent2);
        fill(between2);
      }else{
        noFill();
      }

      if(value > options.Brightness){
        var speed = map(options.Speed,0,10,200,1)
        if(options.Smooth == true){       
          curveVertex(x, y+sin((frameCount/(speed)+x/20+y/50))*10-20);
        }else if(options.Smooth == false){
          vertex(x, y+sin((frameCount/(speed)+x/20+y/50))*10-20);
        }
      }else{
        vertex(x, y); 
      }
    }
    endShape();


    if(options.FillMode != 'None'){
      strokeWeight(options.StrokeWeight*0.9);
      if(options.StrokeMode == 'SolidColor'){
        stroke(options.Stroke1);
      }else{
        var percent = norm(y, 0, pg.height);
        var between = lerpColor(color(options.Stroke1), color(options.Stroke2), percent);
        stroke(between);
      } 
      if(options.BgColorMode == "SolidColor"){
        fill(options.BgColor1);
      }else{
        var percent1 = norm(y, 0, pg.height);
        var between1 = lerpColor(color(options.BgColor1), color(options.BgColor2), percent1);
        fill(between1);
      }
      rect(-20,y,width+60,options.WaveY);
    }else{
      strokeWeight(options.StrokeWeight);
      noFill();
    }
  }
  pg.updatePixels();
}
