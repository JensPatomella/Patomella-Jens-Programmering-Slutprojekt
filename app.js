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
  arrayEnemy.push(new enemy(2.5, 0, 1400+i*100, 140, 30))
  
}

//destination kommer vara index av en tile i arrayTiles

function pathWalk(ent, destination){
  destMidY = destination.yCord + destination.size/2
  destMidX = destination.xCord + destination.size/2
  entMidY =  ent.yPos + ent.size/2
  entMidX = ent.xPos + ent.size/2
  yDif = (destMidY) - (entMidY)
  xDif = (destMidX) - (entMidX)
  angle = Math.atan2(yDif, xDif)
  ent.yPos = ent.yPos + (ent.speed * (Math.sin(angle)))
  ent.xPos = ent.xPos + (ent.speed * (Math.cos(angle)))
  if ((entMidY <= destMidY+5 && entMidY >= destMidY-5) && (entMidX <= destMidX+5 && entMidX >= destMidX-5)){
    ent.turn = ent.turn + 1
  }
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

  arrayEnemy.forEach(enemy => {
    if (enemy.turn == 0)
      pathWalk(enemy, arrayTiles[50])
    if (enemy.turn == 1)
      pathWalk(enemy, arrayTiles[90])
    if (enemy.turn == 2)
      pathWalk(enemy, arrayTiles[94])
    if (enemy.turn == 3)
      pathWalk(enemy, arrayTiles[174])
    if (enemy.turn == 4)
      pathWalk(enemy, arrayTiles[166])
    if (enemy.turn == 5)
      pathWalk(enemy, arrayTiles[26])
    if (enemy.turn == 6)
      pathWalk(enemy, arrayTiles[21])
    if (enemy.turn == 7)
      pathWalk(enemy, arrayTiles[181])

    ctx.fillStyle = "red"
    ctx.fillRect(enemy.xPos, enemy.yPos, enemy.size, enemy.size)
  
  });

  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
