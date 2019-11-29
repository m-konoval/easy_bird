const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");


// Add Images
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeBottom = new Image();
let pipeUp  = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeBottom.src = "img/pipeBottom.png";
pipeUp.src = "img/pipeUp.png";


// Add Audio
let aFly = new Audio();
let aScore = new Audio();
aFly.src = "audio/fly.mp3";
aScore.src = "audio/score.mp3";


// Bird action
document.addEventListener("keydown", jump);
function jump() {
  yPos -= 20;
  aFly.play();
}


// Bird position
let xPos = 10;
let yPos = 200;
let grav = 1.3;


// Game option
let gap = 90;
let score = 0;
let pipe = [{
  x: cvs.width,
  y: 0
}];


function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    if(pipe[i].x === 90) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    if(xPos + bird.width >= pipe[i].x
      && xPos <= pipe[i].x + pipeUp.width
      && (yPos <= pipe[i].y + pipeUp.height
        || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
      || yPos + bird.height >= cvs.height - fg.height) {
        alert(`Game Over ! \nYou score ${score}`);
        location.reload();
        return;
    }

    if(pipe[i].x == 5) {
      score += 10;
      aScore.play();
    }

    pipe[i].x--;
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText(`Scope: ${score}`, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

pipeUp.onload = draw;