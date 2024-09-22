let direction = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameoverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let hiscoreval = 0;
let food = { x: 10, y: 15 };
// musicSound.play();

function main(ctime) {

    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x == sarr[0].x && sarr[i].y == sarr[0].y) return true;
    }
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) return true;
    return false;
}

function gameEngine() {

    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        direction = { x: 0, y: 0 };
        alert("Game Over, press any key to start again");
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr = [
            { x: 13, y: 15 }
        ];
        musicSound.play();
    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score = score + 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    box.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) snakeElement.classList.add('head');
        else snakeElement.classList.add('bodyy');
        box.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // direction = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        default:
            break;
    }
})