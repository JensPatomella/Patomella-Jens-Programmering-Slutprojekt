let canvas = document.querySelector("canvas")
canvas.width = 1400
canvas.height = 700
let ctx = canvas.getContext('2d');

class enemy  {
  constructor(speed, turn, xPos, yPos, size){
  this.speed = speed;
  this.turn = turn;
  this.xPos = xPos;
  this.yPos = yPos;
  this.size = size;
  }
}

arrayEnemy = []

let tower = {
  type: 0,
  xPos: 0,
  yPos: 0,
}

arrayTowers = []

for (i=0; i<10; i++){
  let nenemy = new enemy(2.5, 0, 1370+i*100, 105, 30)
  arrayEnemy.push(nenemy)
}


function pathWalk(n){
  if (n.xPos == 990 && n.yPos == 105) {
    n.turn = 1
  }
  if (n.xPos == 990 && n.yPos == 330) {
    n.turn = 2
  }
  if (n.xPos == 1230 && n.yPos == 330) {
    n.turn = 1
  }
  if (n.xPos == 1230 && n.yPos == 480) {
    n.turn = 0
  }
  if (n.xPos == 790 && n.yPos == 480) {
    n.turn = 3
  }
  if (n.xPos == 790 && n.yPos == 240) {
    n.turn = 0
  }
  if (n.xPos == 300 && n.yPos == 240) {
    n.turn = 3
  }
  if (n.xPos == 300 && n.yPos == 80) {
    n.turn = 0
  }
  if (n.xPos == 120 && n.yPos == 80) {
    n.turn = 1
  }
  if (n.xPos == 120 && n.yPos == 390) {
    n.turn = 2
  }
  if (n.xPos == 430 && n.yPos == 390) {
    n.turn = 1
  }
  return n.turn
}



class tile  {
  constructor(used, xCord, yCord, size, path){
  this.used = used;
  this.xCord = xCord;
  this.yCord = yCord;
  this.size = size;
  this.path = path;
  }
}

arrayTiles = [];

function mapcreate() {
  for (let i = 0; i<10; i++){
    for (let j = 0; j<20; j++){
      arrayTiles.push(new tile(false, j*70, i*70, 70, false))
    }
  }
  return arrayTiles
}

arrayTiles = mapcreate()

function pathCreate(){
  for (let i = 0; i<arrayTiles.length; i++){
    if (arrayTiles[i].yCord == 140 && (arrayTiles[i].xCord <= 1400 && arrayTiles[i].xCord >= 700)) {
      arrayTiles[i].used = true
      arrayTiles[i].path = true
    }
    if (arrayTiles[i].xCord == 700 && (arrayTiles[i].yCord == 210 || arrayTiles[i].yCord == 280)) {
      arrayTiles[i].used = true
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].yCord == 280 && (arrayTiles[i].xCord <= 980 && arrayTiles[i].xCord >= 770)) {
      arrayTiles[i].used = true
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].xCord == 980 && (arrayTiles[i].yCord <= 560 && arrayTiles[i].yCord >= 350)) {
      arrayTiles[i].used = true
      arrayTiles[i].path = true
    }
  } 
  return arrayTiles;
}
arrayTiles = pathCreate()
console.log(arrayTiles)


function animate() {
    
  // Rensar gammalt visuellt innehåll
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  

  arrayTiles.forEach(tile => {
    if (tile.path == false)
      ctx.fillStyle = "green"
    else 
      ctx.fillStyle = "peru"

    ctx.fillRect(tile.xCord, tile.yCord, tile.size, tile.size)
  });

  arrayEnemy.forEach(nenemy => {
    //left
    if (pathWalk(nenemy) == 0) {
      nenemy.xPos -= nenemy.speed
    }
    //down
    if (pathWalk(nenemy) == 1) {
      nenemy.yPos += nenemy.speed
    }
    //right
    if (pathWalk(nenemy) == 2) {
      nenemy.xPos += nenemy.speed
    }
    //up
    if (pathWalk(nenemy) == 3) {
      nenemy.yPos -= nenemy.speed
    }


    ctx.fillStyle = "red"
    ctx.fillRect(nenemy.xPos, nenemy.yPos, nenemy.size, nenemy.size)
  
  });

  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)