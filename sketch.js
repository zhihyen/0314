let inputText = "🐹";
let inputBox;
let colorPicker;
let textSizeSlider;
let bounceButton;
let bouncing = false;
let dropdown;
let iframe;

function setup() { //這是一個設定函數，只會執行一次
  //產生一個畫布，充滿整個視窗，背景顏色為be95c4
  createCanvas(windowWidth, windowHeight);
  background('#ffe5d9');
  //createCanvas(400, 400);

  // 產生一個輸入文字框，位置在(10, 10)，寬度為300，高度為40
  inputBox = createInput(inputText);
  inputBox.position(10, 10);
  inputBox.size(300, 40);
  inputBox.input(updateText);
  inputBox.style('background-color', '#ffe5d9');
  inputBox.value('🐹');

  // 產生一個滑桿物件，位置在(380, 10)，寬度為100
  textSizeSlider = createSlider(12, 40, 20);
  textSizeSlider.position(390, 20);
  textSizeSlider.style('width', '200px');

  // 產生一個按鈕物件，位置在(600, 10)，文字為"跳動"
  bounceButton = createButton('跳動');
  bounceButton.position(600, 10);
  bounceButton.mousePressed(toggleBounce);

  // 產生一個下拉式選單，位置在(800, 100)，寬度為100
  dropdown = createSelect();
  dropdown.position(650, 10);
  dropdown.size(100);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(updateIframe);
}

function updateText() {
  inputText = this.value();
}

function toggleBounce() {
  bouncing = !bouncing;
}

function updateIframe() {
  let selected = dropdown.value();
  if (iframe) {
    iframe.remove();
  }
  iframe = createElement('iframe');
  iframe.position(50, 50);
  iframe.size(windowWidth - 100, windowHeight - 100);
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  }
}

function draw() { //這是一個繪製函數，會一直執行
  // background(220);
  background('#ffe5d9'); // 清除之前的繪製
  textSize(16); // 固定 "文字大小" 的字體大小
  text("文字大小 ", 325, 25); //顯示文字  
  let textSizevalue = textSizeSlider.value();
  textAlign(LEFT, TOP); //設定文字對齊方式 
  textSize(textSizevalue); //設定字體大小
  fill("#432818"); //設定字體顏色
  stroke("#9c6644"); //設定字體邊框顏色
  strokeWeight(1); //設定字體邊框寬度

  let textString = inputText + " ";
  let x = 0;
  let y = 100;

  while (y <= height) {
    x = 0;
    let bounceOffset = bouncing ? random(-5, 5) : 0;
    while (x <= width) {
      text(textString, x, y + bounceOffset); //顯示文字
      x += textWidth(textString); // 更新 x 位置
    }
    y += textAscent() + textDescent(); // 更新 y 位置
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (iframe) {
    iframe.size(windowWidth - 100, windowHeight - 100);
  }
}
