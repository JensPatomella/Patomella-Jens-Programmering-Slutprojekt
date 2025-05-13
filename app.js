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

//destination kommer vara index av en tile i arrayTiles

function pathWalk(ent, destination){
  yDif = destination.yCord - ent.yPos
  xDif = destination.xCord - ent.xPos
  angle = Math.atan2(xDif, yDif)

  ent.yPos = ent.yPos + ent.speed * Math.sin(angle)
  ent.xPos = ent.xPos + ent.speed * Math.cos(angle)
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
    if  (arrayTiles[i].yCord == 560 && (arrayTiles[i].xCord <= 910 && arrayTiles[i].xCord >= 420)) {
      arrayTiles[i].used = true
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].xCord == 420 && (arrayTiles[i].yCord <= 560 && arrayTiles[i].yCord >= 70)) {
      arrayTiles[i].used = true
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].yCord == 70 && (arrayTiles[i].xCord <= 350 && arrayTiles[i].xCord >= 70)) {
      arrayTiles[i].used = true
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].xCord == 70 && (arrayTiles[i].yCord <= 630 && arrayTiles[i].yCord >= 140)) {
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