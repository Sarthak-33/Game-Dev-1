const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
hs =0;

startScreen.addEventListener('click', start);
let player = {
  speed : 5,
  score : 0,
};

let keys = {
  ArrowUp : false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
  e.preventDefault();
  keys[e.key] = true;
        //console.log(e.key);
  console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  //console.log(e.key);
  console.log(keys);
}

function collide(a,b){
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines() {
  let movingLines = document.querySelectorAll('.lines');
  movingLines.forEach(function(item){
    if(item.y >= 800){
      item.y = item.y - 750;
    }
    item.y = item.y + player.speed;
    item.style.top = item.y + "px";
  })
}

function endGame(){
  player.start = false;
  startScreen.classList.remove('hide');
  if(player.score>hs){
    startScreen.innerHTML = "Congratulations! You have the highest score!<br> Your score:" + player.score + "<br>Click here to try again";
    hs = player.score;
  }
  else{
    startScreen.innerHTML = "High score:" + hs + "<br> Your score:" + player.score + "<br>Click here to try again";
  }
}

function moveEnemy(car) {
  let movingEnemy = document.querySelectorAll('.enemy');
  movingEnemy.forEach(function (item) {
    if(collide(car, item)){
      endGame();
    }
    if (item.y >= 900) {
      item.y = - 300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y = item.y + player.speed;
    item.style.top = item.y + "px";
  })
}

function gamePlay(){
  console.log("I am clicked");
  let car = document.querySelector('.car');
  let road = gameArea.getBoundingClientRect();
  
  if(player.start){
    moveLines();
    moveEnemy(car);
  
    if(keys.ArrowUp && (player.y > (road.top + 100))){
      player.y = player.y - player.speed;
    }
    if (keys.ArrowDown && (player.y < (road.bottom - 70))) {
      player.y = player.y + player.speed;
    }
    if (keys.ArrowLeft && (player.x > 0)) {
      player.x = player.x - player.speed;
    }
    if (keys.ArrowRight && player.x < (road.width - 65)) {
      player.x = player.x + player.speed;
    }
    
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    
    window.requestAnimationFrame(gamePlay);
    player.score++;
    score.innerText = "Score: " + player.score;
  }
}
    
function start(){
  //gameArea.classList.remove('hide');
  startScreen.classList.add('hide');
  gameArea.innerHTML = "";
  
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);
  
  for(x=0; x<10; x++){
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'lines');
    roadLine.y = (x*150);
    roadLine.style.top = (x*150) + "px";
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  
  gameArea.appendChild(car);

  for (x = 0; x < 5; x++) {
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class', 'enemy');
    enemyCar.y = ((x+1) * 350) * -1;
    enemyCar.style.top = (x * 150) + "px";
    let url_car = carModelling();
    if(url_car.includes("truck"))  {
      enemyCar.style.width = 65 + "px";
      enemyCar.style.height = 120 + "px";
    }
    enemyCar.style.backgroundImage = url_car;

    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);
  }

  player.x = car.offsetLeft;
  player.y = car.offsetTop;
}

function carModelling(){
  const car_models = [
    'url("/images/car0.png")',
    'url("/images/car1.png")',
    'url("/images/car2.png")',
    'url("/images/truck0.png")',
    'url("/images/truck1.png")',
  ];
  
  const mod = document.querySelector('.enemy');
  const bg = car_models[Math.floor(Math.random() * car_models.length)];
  return bg;
}