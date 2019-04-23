let pg,img;
var noiseScale = 1000;
var red,green,blue,c,value;
var w, h;
var loc;
let myCanvas;


function setup(){
  w = windowWidth;
  h = windowHeight;
  myCanvas = createCanvas(w,h);
  pg = createGraphics(w,h);
  myCanvas.class("myCanvas");
  pg.class("graphic");
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
  background(options.Background);
  pg.background(0);
  pg.fill(255);
  pg.stroke(255);
  var n = map(w,300,2000,-20,140);
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
  // if(options.Svg == true){
  //     save("mySVG.svg");      // give file name
  //     print ("saved svg");
  //     noLoop(); 
  //   }
}


function drawLine(){
  pg.loadPixels();
  pg.pixelDensity(pixelDensity());
  strokeWeight(options.StrokeWeight);

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
      var angle = noise(y/1000, x/10000, x)*TWO_PI*options.steepDegree;

      red =  pg.pixels[loc];
      green =  pg.pixels[loc+1];
      blue = pg.pixels[loc+2];
      c = color(red, green, blue);
      value = brightness(c);



      if(options.isFill == true){
        fill(options.Fill);
        strokeWeight(options.strokeWeight/2);
      }else{
        noFill();
      }


      if(value > options.Brightness){
        if(options.Smooth == true){       
          if(options.Animation == true){
            curveVertex(x, y+sin((frameCount/(100-int(options.Speed))+x/20+y/50))*10-20);
          }else{
            curveVertex(x, y+sin(angle)*10-20);
          }
        }else if(options.Smooth == false){
          if(options.Animation == true){
            vertex(x, y+sin((frameCount/(100-int(options.Speed))+x/20+y/50))*10-20);
          }else{
            vertex(x, y+sin(angle)*10-20);
          }
        }
      }else{
        vertex(x, y); 
      }
    }
    endShape();

    if(options.isFill == true){
      fill(options.Background);
      rect(-20,y,width+60,options.WaveY);
    }else{
      noFill();
    }
  }
  pg.updatePixels();
}
