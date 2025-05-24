let canvas = document.querySelector("canvas")
canvas.width = 1400
canvas.height = 700
let ctx = canvas.getContext('2d');

const mouse = {
  x: undefined,
  y: undefined
}

class enemy  {
  constructor(speed, turn, xPos, yPos, size){
  this.speed = speed;
  this.turn = turn;
  this.xPos = xPos;
  this.yPos = yPos;
  this.size = size;
  this.health = 100; 
  }
}

arrayEnemy = []

class tower  {
  constructor(type, xCord, yCord, size){
  this.type = type;
  this.xCord = xCord;
  this.yCord = yCord;
  this.size = size;
  this.range = type === 'melee' ? 100 : 200; 
  this.fireRate = type === 'melee' ? 60 : 30; 
  this.cooldown = 0;
  }
}

arrayTowers = []

let selectedTowerType = null;

const meleeDiv = document.getElementById('melee');
const rangeDiv = document.getElementById('range');
const nextWaveBtn = document.getElementById('nextWaveBtn');
const currencyDisplay = document.getElementById('currencyDisplay');

let currency = 100;
let currentWave = -1;
let waveActive = false;

meleeDiv.addEventListener('click', () => {
  selectedTowerType = 'melee';
  meleeDiv.style.backgroundColor = 'lightblue';
  rangeDiv.style.backgroundColor = 'azure';
});

rangeDiv.addEventListener('click', () => {
  selectedTowerType = 'range';
  rangeDiv.style.backgroundColor = 'lightblue';
  meleeDiv.style.backgroundColor = 'azure';
});

window.addEventListener('click', (event) => {
  if (selectedTowerType) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    for (let tile of arrayTiles) {
      if (
        clickX >= tile.xCord &&
        clickX < tile.xCord + tile.size &&
        clickY >= tile.yCord &&
        clickY < tile.yCord + tile.size
      ) {
        if (!tile.used && !tile.path) {
          let cost = selectedTowerType === 'melee' ? 50 : 75;
          if (currency >= cost) {
            arrayTowers.push(new tower(selectedTowerType, tile.xCord, tile.yCord, tile.size));
            tile.used = true;
            currency -= cost;
            updateCurrencyDisplay();
          }
        }
        break;
      }
    }
  }
});

function updateCurrencyDisplay() {
  currencyDisplay.textContent = `Currency: ${currency}`;
}

nextWaveBtn.addEventListener('click', () => {
  if (!waveActive) {
    startNextWave();
  }
});

function startNextWave() {
  currentWave++;
  waveActive = true;
  nextWaveBtn.disabled = true;
  for (let i = 0; i < 10 + currentWave * 5; i++) {
    let enemyHealth = 100 + currentWave * 50;
    arrayEnemy.push(new enemy(2.5, 0, 1400 + i * 100, 160, 30));
    arrayEnemy[arrayEnemy.length - 1].health = enemyHealth;
  }
}

function checkWaveEnd() {
  if (waveActive && arrayEnemy.length === 0) {
    waveActive = false;
    nextWaveBtn.disabled = false;
  }
}


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
    if (destination === arrayTiles[181]) {
      alert("Game Over! An enemy reached the end of the path.");
      arrayEnemy.length = 0;
      waveActive = false;
      nextWaveBtn.disabled = false;
      currency = 100;
      updateCurrencyDisplay();
      arrayTowers.length = 0;
      currentWave = -1;
      for (i = 0;i<arrayTiles.length; i++){
        arrayTiles[i].used = false;
      }
    }
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
      arrayTiles[i].path = true
    }
    if (arrayTiles[i].xCord == 700 && (arrayTiles[i].yCord == 210 || arrayTiles[i].yCord == 280)) {
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].yCord == 280 && (arrayTiles[i].xCord <= 980 && arrayTiles[i].xCord >= 770)) {
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].xCord == 980 && (arrayTiles[i].yCord <= 560 && arrayTiles[i].yCord >= 350)) {
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].yCord == 560 && (arrayTiles[i].xCord <= 910 && arrayTiles[i].xCord >= 420)) {
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].xCord == 420 && (arrayTiles[i].yCord <= 560 && arrayTiles[i].yCord >= 70)) {
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].yCord == 70 && (arrayTiles[i].xCord <= 350 && arrayTiles[i].xCord >= 70)) {
      arrayTiles[i].path = true
    }
    if  (arrayTiles[i].xCord == 70 && (arrayTiles[i].yCord <= 630 && arrayTiles[i].yCord >= 140)) {
      arrayTiles[i].path = true
    }
  } 
  return arrayTiles;
}
arrayTiles = pathCreate()
console.log(arrayTiles)

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

class projectile {
  constructor(x, y, target, speed, damage){
    this.x = x;
    this.y = y;
    this.target = target;
    this.speed = speed;
    this.damage = damage;
    this.size = 10;
    this.active = true;
  }

  update() {
    if (!this.active) return;
    let dx = this.target.xPos - this.x;
    let dy = this.target.yPos - this.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < this.speed) {
      this.target.health -= this.damage;
      this.active = false;
      if (this.target.health <= 0) {
        let index = arrayEnemy.indexOf(this.target);
        if (index > -1) {
          arrayEnemy.splice(index, 1);
          currency += 10;
          updateCurrencyDisplay();
        }
      }
      return;
    }
    this.x += this.speed * dx / dist;
    this.y += this.speed * dy / dist;
  }

  draw() {
    if (!this.active) return;
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let arrayProjectiles = [];

function animate() {
    
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  

  arrayTiles.forEach(tile => {
    if (tile.path == false)
      ctx.fillStyle = "green"
    else 
      ctx.fillStyle = "peru"
    if (tile.used == false && tile.path == false && (mouse.y >= tile.yCord && mouse.y < tile.yCord + 70) && (mouse.x >= tile.xCord && mouse.x < tile.xCord + 70))
      ctx.fillStyle = selectedTowerType === 'melee' ? 'yellow' : 'magenta';

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

    ctx.fillStyle = 'black';
    ctx.fillRect(enemy.xPos, enemy.yPos - 10, enemy.size, 5);
    ctx.fillStyle = 'limegreen';
    let healthWidth = (enemy.health / 100) * enemy.size;
    ctx.fillRect(enemy.xPos, enemy.yPos - 10, healthWidth, 5);

    ctx.fillStyle = "red"
    ctx.fillRect(enemy.xPos, enemy.yPos, enemy.size, enemy.size)
  
  });

  arrayTowers.forEach(tower => {
    if (tower.cooldown > 0) {
      tower.cooldown--;
    } else {
      if (tower.type === 'melee') {
        arrayEnemy.forEach(enemy => {
          let dx = (enemy.xPos + enemy.size/2) - (tower.xCord + tower.size/2);
          let dy = (enemy.yPos + enemy.size/2) - (tower.yCord + tower.size/2);
          let dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < tower.range) {
            enemy.health -= 30; 
            if (enemy.health <= 0) {
              let index = arrayEnemy.indexOf(enemy);
              if (index > -1) {
                arrayEnemy.splice(index, 1);
                currency += 10;
                updateCurrencyDisplay();
              }
            }
          }
        });
        tower.cooldown = tower.fireRate;
      } else {
        let nearestEnemy = null;
        let nearestDist = Infinity;
        arrayEnemy.forEach(enemy => {
          let dx = (enemy.xPos + enemy.size/2) - (tower.xCord + tower.size/2);
          let dy = (enemy.yPos + enemy.size/2) - (tower.yCord + tower.size/2);
          let dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < tower.range && dist < nearestDist) {
            nearestDist = dist;
            nearestEnemy = enemy;
          }
        });
        if (nearestEnemy) {
          arrayProjectiles.push(new projectile(tower.xCord + tower.size/2, tower.yCord + tower.size/2, nearestEnemy, 10, 20));
          tower.cooldown = tower.fireRate;
        }
      }
    }
  });

  arrayTowers.forEach(tower => {
    ctx.fillStyle = tower.type === 'melee' ? 'orange' : 'purple';
    ctx.fillRect(tower.xCord, tower.yCord, tower.size, tower.size);
  });
  arrayProjectiles.forEach((proj, index) => {
    proj.update();
    proj.draw();
    if (!proj.active) {
      arrayProjectiles.splice(index, 1);
    }
  });

  checkWaveEnd();

  window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)