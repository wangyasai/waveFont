var myCanvas;
var r;
let pg;
var b;
var noiseScale = 10

function setup() {
    myCanvas = createCanvas(windowWidth, windowHeight);
    background(255);
    pg = createGraphics(width,height);
}


function draw() {
    waveFont();
}


function waveFont(){
    if(options.SavePNG == true){
         clear();
     }else{
        background(options.Background);
     }

  pg.background(0);
  pg.fill(255);
  pg.stroke(255);
  var n = map(width,100,2000,6,1.5);
  pg.textSize(options.textSize/n);
  pg.strokeWeight(options.textWeight);
  pg.textAlign(CENTER);
  pg.text(options.Text,width/4,height/7);
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
}


