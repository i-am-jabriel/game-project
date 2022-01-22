// RAM = Random Access Memory = variables
// CPU = Central Proccesing Unit = logic execution
// GPU = Graphics Proccsing Unit = logic for images and relates

// FPS = Frames Per Second = how fast our game runs

const debug = document.querySelector('.debug');
debug.innerText = 'hello world';

const canvas = document.querySelector('canvas');
// get the functions for 2d rendering on our canvas
const context = canvas.getContext('2d');



let x = 50;
let score = 0;
debug.innerText = `score: ${score}`;

const FPS = 60;

class DrawObject{
    x = 50;
    y = 50;
    width = 50;
    height = 100;
    color = 'red';
    draw() {
        this.move();
        //set the draw color of my canvas to my color
        context.fillStyle = this.color;

         // draw a rectangle
        if(!this.isCircle){
            context.fillRect(this.x, this.y, this.width, this.height);
        } else {
            context.beginPath();
            context.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }

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
    move(){
        DrawObject.prototype.move.apply(this);
        if(this.isCollding(obstacle) && this !== obstacle){
            this.color = 'purple';
            obstacle.x = Math.random() * canvas.width;
            obstacle.y = Math.random() * canvas.height;
            score++;
            debug.innerText = `score: ${score}`;

        } else {
            this.color = 'red'
        }
    }
}

class Obstacle extends DrawObject{
    width = 25;
    height = 25;
    isCircle = true;
    color = 'green';
    x = 500;
    y = 400;
}

const mario = new Mario();
const mario2 = new DrawObject();
mario2.y = 200;
mario2.x = 13;
mario2.color = 'yellow';
const obstacle = new Obstacle();
// listen for input
window.addEventListener('keydown', e => {
    console.log(e);
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
    console.log(e);
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


function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    console.log('mario was drawn');
    mario.draw();
    mario2.draw();
    obstacle.draw();
    setTimeout(draw, 1000 / FPS);
}

draw();