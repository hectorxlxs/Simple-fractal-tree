// This parameter is protecting your browser to crash, be careful modifying it
let MAX_SUBDIVISIONS = 100000;  

let initial_len_slider;
let min_len_slider;
let ratio_slider;
let angle_slider;

let frame_limiter = 5;
let frame_counter = frame_limiter - 1;

function setup() {
  createCanvas(700, 700);
  initial_len_slider = createSlider(20, 500, 300);
  min_len_slider = createSlider(1, 20, 10, 0.01);
  ratio_slider = createSlider(1.1, 3, 2, 0.001);
  angle_slider = createSlider(0, PI, 0.65, 0.01);
}

function draw() {
  frame_counter++;
  if (frame_counter == frame_limiter){
    if (getSubdivisions() > MAX_SUBDIVISIONS){
      textSize(32);
      fill(255);
      text('Max subdivisions reached', 10, 30);
    }
    else{
      background(50);
      translate(width/2, height);
      rotate(PI);
      stroke('whitesmoke');
      branch(initial_len_slider.value());
    }
    frame_counter = 0;
  }
}

function getSubdivisions(){

  let min_len = min_len_slider.value();
  let ratio = ratio_slider.value();
  let initial_len = initial_len_slider.value();
  
  let exponent = Math.ceil(Math.log(min_len/initial_len) / Math.log(1/ratio));  
  return 2**exponent - 1;
}

function branch(len){

  if (len < min_len_slider.value()) return;
  
  line(0, 0, 0, len);
  
  push();
  
  translate(0, len);
  
  rotate(-angle_slider.value());
  branch(len/ratio_slider.value());
  
  rotate(angle_slider.value()*2);
  branch(len/ratio_slider.value());
  
  pop();
}
