let gameSeq = [];
let userSeq = [];
GameOver = new Audio("gameover.mp3");
let btns = ["green" , "red", "orange", "blue"];

let started = false;
let level = 0;


let h3 = document.createElement("h3");
let h2 = document.querySelector("h2");
let h2new = document.createElement("h2");
let higthestScore = 0;
document.querySelector("body").appendChild(h2new);
h2new.append(`Higest Score : ${higthestScore}`);

document.addEventListener("keypress", function() {
    if(started==false) {
        document.querySelector("body").appendChild(h3);
        h3.append("Game started");
        started = true;

        levelUp();
    }
});

// Flashing Buttons
function gameFlash(btn) {
   btn.classList.add("flash");
   setTimeout(function() {
     btn.classList.remove("flash");
   }, 550);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
      btn.classList.remove("userflash");
    }, 300);
 }

// Leveling Up
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);

}

function checkAns(idx) {

   if(userSeq[idx]=== gameSeq[idx]) {
       if(userSeq.length == gameSeq.length) {
          setTimeout(levelUp(), 1000);
       }
   } else {
    document.querySelector(".btn-container").style.backgroundColor = "red";
    let score = level*10;
    h2.innerHTML = `Game Over , Your score was <b>${level*10}</b> Press any key to start`;
    GameOver.play();
    setTimeout(function() {
        document.querySelector(".btn-container").style.backgroundColor = "#3E5879";
    }, 200);
    reset(score);
   }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset(score) {
    if(higthestScore<score) {
        higthestScore = score
    }
    updateScore(higthestScore);
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h3.innerText = "";
}

function updateScore(hscore) {
    h2new.innerText = `Highest Score : ${higthestScore}`;
}