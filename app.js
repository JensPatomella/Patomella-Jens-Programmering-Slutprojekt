let canvas = document.querySelector("canvas")
canvas.width = 500
canvas.height = 300
let ctx = canvas.getContext('2d');

let speed = 5
let xPos = 200
let yPos = 0
const size = 30

let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
}

document.onkeydown = function (e) {
  console.log(e) 
  const key = e.key
  keys[key] = true 
}

document.onkeyup = function (e) {
  const key = e.key
  keys[key] = false
}

function animate() {
    
  // Rensar gammalt visuellt innehåll
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  

  // Sätt nya läget genom att kolla vilka knappar som är nedtryckta.
  if (keys.a && xPos !== 0) {
    xPos -= speed
  }
  if (keys.d && xPos !== canvas.width - size) {
    xPos += speed
  }
  if (keys.w && yPos !== 0) {
    yPos -= speed
  }
  if (keys.s && yPos <= groundLevel- size) {
    yPos += speed
  }

  // Den röda kvadraten ritas i sitt nya läge
  ctx.fillStyle = "red"
  ctx.fillRect(xPos, yPos, size, size)
  drawGround()
  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)

const tileWidth = 76
const tileHeight = 64
const groundLevel = canvas.height - tileHeight


const img = document.getElementById("tile")

function drawGround() {
  
  for (let index = 0; index < canvas.width / tileWidth; index++) {
    ctx.drawImage(img, index * tileWidth, groundLevel)
  }
}