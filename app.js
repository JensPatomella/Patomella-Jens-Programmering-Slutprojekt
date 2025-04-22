let canvas = document.querySelector("canvas")
canvas.width = 1400
canvas.height = 700
let ctx = canvas.getContext('2d');

let enemy = {
  speed: 2.5,
  turn: 0,
  xPos: 1370,
  yPos: 105,
  size: 30,
}

arrayEnemy = []

for (i=0; i<10; i++){
  enemy = {
    speed: 2.5,
    turn: 0,
    xPos: 1370 + i*100,
    yPos: 105,
    size: 30,
  }
  arrayEnemy.push(enemy)
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

function animate() {
    
  // Rensar gammalt visuellt innehåll
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  arrayEnemy.forEach(enemy => {
    
  
  //left
  if (pathWalk(enemy) == 0) {
    enemy.xPos -= enemy.speed
  }
  //down
  if (pathWalk(enemy) == 1) {
    enemy.yPos += enemy.speed
  }
  //right
  if (pathWalk(enemy) == 2) {
    enemy.xPos += enemy.speed
  }
  //up
  if (pathWalk(enemy) == 3) {
    enemy.yPos -= enemy.speed
  }


  ctx.fillStyle = "red"
  ctx.fillRect(enemy.xPos, enemy.yPos, enemy.size, enemy.size)
  
  });
  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)