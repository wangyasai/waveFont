let pg;
var b;
var noiseScale = 1000;
function setup(){
  createCanvas(windowWidth,windowHeight);
  pg = createGraphics(width,height);
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
  if(options.SavePNG == true){
    // background(0,0,0,0);
      clear();
  }else{
    background(options.Background);
  }
  pg.background(0);
  pg.fill(255);
  pg.stroke(255);
  pg.textSize(options.textSize);
  pg.strokeWeight(options.textWeight);
  pg.textAlign(CENTER);
  pg.text(options.Text,width/2,height/2);
  textLine();
}



function textLine(){
  pg.loadPixels();
  strokeWeight(0.35);

  if(options.isFill == true){
    fill(options.Fill);
  }else{
    noFill();
  }

  stroke(options.Stroke);
  for(var y = 0; y < pg.height; y+=int(options.WaveY)){
    beginShape();
    for(var x = 0 ; x < pg.width; x+=int(options.WaveX)){
      var loc = (x + y *pg.width)*4;
      b = pg.pixels[loc];
      var angle = noise(y/1000, x/10000, x)*TWO_PI*options.steepDegree;
      if(b==255){
        if(options.Wave == true){
          if(options.Animation == true){
            curveVertex(x, y+sin((frameCount/40+x/20+y/50))*10-20);
          }else{
            curveVertex(x, y+sin(angle)*10-20);
          }
        }else{
          if(options.Animation == true){
            vertex(x, y+sin((frameCount/40+x/20+y/50))*10-20);
          }else{
            vertex(x, y+sin(angle)*10-20);
          }
        }
      }else{
        if(options.Wave == true){
          curveVertex(x, y);
        }else{
          vertex(x, y);
        }
      }
    }
    endShape();
  }
  pg.updatePixels();

  // if(options.Animation == false){
  //   save("textFont.svg");
  // }
}