let pg,img;
var noiseScale = 1000;
var red,green,blue,c,value;
var w, h;
var loc;


function setup(){
 createCanvas(windowWidth,windowHeight);
 w = windowWidth;
 h = windowHeight;
 pg = createGraphics(windowWidth,windowHeight);

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
  background(options.Background);
  pg.background(0);
  pg.fill(255);
  pg.stroke(255);
  var n = map(width,300,2000,3,1);
  pg.textSize(int(options.textSize/n));
  pg.strokeWeight(options.textWeight);
  pg.textAlign(CENTER);

  push();
  if(type == "image"){
    push();
    pg.imageMode(CENTER);
    pg.image(img,width/2, height/2);
    pop();
  }else if(type ="text") {
    pg.text(options.Text,width/2,height/2);
  }
  drawLine(); 
  pop();
}



function drawLine(){
  pg.loadPixels();
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
    for(var x = 0 ; x < pg.width; x+=int(options.WaveX)){
      loc = (x + y *pg.width)*4;
      var angle = noise(y/1000, x/10000, x)*TWO_PI*options.steepDegree;

      red =  pg.pixels[loc];
      green =  pg.pixels[loc+1];
      blue = pg.pixels[loc+2];
      c = color(red, green, blue);
      value = brightness(c);

      if(options.isFill == true){
        fill(options.Fill);
      }else{
        noFill();
      }

      if(value > options.Brightness){
        if(options.Smooth == true){       
          if(options.Animation == true){
            curveVertex(x, y+sin((frameCount/40+x/20+y/50))*10-20);
          }else{
            curveVertex(x, y+sin(angle)*10-20);
          }
        }else if(options.Smooth == false){
          if(options.Animation == true){
            vertex(x, y+sin((frameCount/40+x/20+y/50))*10-20);
          }else{
            vertex(x, y+sin(angle)*10-20);
          }
        }
      }else if(value<options.Brightness){
        vertex(x, y);
      }else{
        if(options.Wave == true){
          vertex(x, y);
        }else{
          vertex(x, y);
        }
      }
    }
    endShape();


    if(options.isFill == true){
      fill(options.Background);
      stroke(options.Stroke1);
      strokeWeight(options.StrokeWeight);
      rect(-10,y,width+10,int(options.WaveY));
    }else{
      noFill();
    }
  }
  pg.updatePixels();
}
