// RAM = Random Access Memory = variables
// CPU = Central Proccesing Unit = logic execution
// GPU = Graphics Proccsing Unit = logic for images and image manipulation

// FPS = Frames Per Second = how fast our game runs
const marioImage = new Image();
marioImage.src = './img/mario.png';

const superMushroomImage = new Image();
superMushroomImage.src = './img/supermushroom.png';

const arrowImage = new Image();
arrowImage.src = './img/arrow.png';

const debug = document.querySelector('.debug');
debug.innerText = 'hello world';

const canvas = document.querySelector('canvas');
// get the functions for 2d rendering on our canvas
const context = canvas.getContext('2d');

const stageObjects = [];

let score = 0;
debug.innerText = `score: ${score}`;

// this is a global object that keeps track of the mouse position
const mouse = {
    x: 0,
    y: 0
}
// grabs a rectangle based on the dimensions of the canvas
const canvasRect = canvas.getBoundingClientRect();


//when the player moves the mouse over the canvas update the mouse object's x and y;
canvas.addEventListener('mousemove', e =>{
    mouse.x = e.clientX - canvasRect.left;
    mouse.y = e.clientY - canvasRect.top;
    // debug.innerText = `${mouse.x}, ${mouse.y}`;
});


canvas.addEventListener('mousedown', ()=>{
    mario.clicking = true;
});
canvas.addEventListener('mouseup', ()=>{
    mario.clicking = false;
});


const FPS = 60;

class DrawObject{
    x = 50;
    y = 50;
    width = 50;
    height = 100;
    rotation = 0;
    color = 'red';
    draw() {
        // if my character can move then move
        this.move();
        
        context.save();
        // shifting the center view of the canvas to the characters x and y
        context.translate(this.x, this.y);
        // if my character needs to be rotated rotate it
        if(this.rotation){
            context.rotate(-this.rotation);
        }

        //set the draw color of my canvas to my color
        context.fillStyle = this.color;
        if(this.img){
            context.drawImage(this.img, -this.width * .5,  -this.height * .5, this.width, this.height);
        } else if(!this.isCircle) {
            // draw a rectangle
            context.fillRect(-this.width * .5,  -this.height * .5, this.width, this.height);
        } else {
            context.beginPath();
            context.arc(-this.width * .5,  -this.width * .5, this.width, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
        // if(this.rotation){
            context.restore();
        // }
        /*if(this.rotation){
            context.translate(-this.x, -this.y);
            context.rotate(-this.rotation);
        }*/

        // this.x += 3;
    }
    move(){
        if(this.right){
            this.x += this.speed;
        }
        if(this.left){
            this.x -= this.speed;
        }
        if(this.up){
            this.y -= this.speed;
        }
        if(this.down){
            this.y += this.speed;
        }
    }
    isCollding(obj){
        return this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.height + this.y > obj.y
    }
}
class Mario extends DrawObject{
    speed = 3;
    img = marioImage;
    move(){
        // ???
        DrawObject.prototype.move.apply(this);
        if(this.clicking){
            this.x += 5 * Math.cos(arrow.rotation);
            this.y += 5 * Math.sin(-arrow.rotation);
        }
        stageObjects.forEach((obstacle,i) => {
            if(obstacle instanceof Obstacle && this.isCollding(obstacle) && this !== obstacle){
                // this.color = 'purple';
                /*obstacle.x = Math.random() * canvas.width;
                obstacle.y = Math.random() * canvas.height;*/
                stageObjects.splice(i, 1);
                score++;
                // this.width *= 1.1;
                // this.height *= 2;
                debug.innerText = `score: ${score}`;
            }
        });

        // } else {
        //     this.color = 'red'
        // }
    }
}
class AimArrow extends DrawObject{
    img = arrowImage;
    height = 100;
    width = 100;
    move(){
        //aim where mario is facing

        //carls code for clamping a radian between two degress
        // let radians = mod(Math.atan2(mario.y - mouse.y, mouse.x - mario.x) + Math.PI / 2, Math.PI * 2) - Math.PI / 2;
        // radians = Math.max(Math.min(Math.PI * 5 /6, radians), Math.PI / 6);
        // let degrees = 180 * radian / Math.PI;
        // debug.innerText = degrees;
        this.rotation = Math.atan2(mario.y - mouse.y, mouse.x - mario.x);

        // how far away the arrow should be from mario
        let distance = 100;
        
        this.x = mario.x + distance * Math.cos(this.rotation);
        this.y = mario.y + distance * Math.sin(-this.rotation);
    }
}

class Obstacle extends DrawObject{
    img = superMushroomImage;
    width = 25;
    height = 25;
    isCircle = true;
    color = 'green';
    constructor(){
        super();
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }
}

const mario = new Mario();
const mario2 = new DrawObject();
const arrow = new AimArrow();
mario2.y = 200;
mario2.x = 13;
mario2.color = 'yellow';
// const obstacle = new Obstacle();
stageObjects.push(mario, mario2, arrow);
// listen for input
window.addEventListener('keydown', e => {
    // console.log(e);
    e.preventDefault();
    if(e.key == 'ArrowRight'){
        mario.right = true;
    }
    if(e.key == 'ArrowLeft'){
        mario.left = true;
    }
    if(e.key == 'ArrowUp'){
        mario.up = true;
    }
    if(e.key == 'ArrowDown'){
        mario.down = true;
    }
});
window.addEventListener('keyup', e => {
    // console.log(e);
    e.preventDefault();
    if(e.key == 'ArrowRight'){
        mario.right = false;
    }
    if(e.key == 'ArrowLeft'){
        mario.left = false;
    }
    if(e.key == 'ArrowUp'){
        mario.up = false;
    }
    if(e.key == 'ArrowDown'){
        mario.down = false;
    }
});

let obstacleSpawnCount = 0;
let maxObstacleSpawnCount = 25;

function draw(){
    // clears the screen so we can redraw again
    context.clearRect(0, 0, canvas.width, canvas.height);
    stageObjects.forEach(obj => obj.draw());
    obstacleSpawnCount++
    if(obstacleSpawnCount >= maxObstacleSpawnCount){
        stageObjects.push(new Obstacle());
        obstacleSpawnCount = 0;
    }
    // mario.draw();
    // mario2.draw();
    // obstacle.draw();
    // arrow.draw();
    setTimeout(draw, 1000 / FPS);
}

const startGameButton = document.querySelector('.main-menu button');
const mainMenu = document.querySelector('.main-menu');
const gameContainer = document.querySelector('.game-container');

startGameButton.addEventListener('click', () => {    
    // hide the main menu
    mainMenu.classList.add('hidden');
    // show the game container
    gameContainer.classList.remove('hidden');
    resizeCanvas();
    draw();
});


function mod(n, m) {
    return ((n % m) + m) % m;
}

function resizeCanvas(){
    canvas.width = document.body.clientWidth;
    // canvas.width = window.outerWidth;
    canvas.height = document.body.clientHeight;
    // canvas.height = window.outerHeight;
}

window.addEventListener('resize', resizeCanvas);