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

const FPS = 60;

class DrawObject{
    x = 50;
    y = 50;
    width = 50;
    height = 100;
    color = 'red';
    draw() {
        //set the draw color of my canvas to my color
        context.fillStyle = this.color;

         // draw a rectangle
        context.fillRect(this.x, this.y, this.width, this.height);

        this.x += 3;
    }
}

class Mario extends DrawObject{

}

const mario = new Mario();
const mario2 = new Mario();
mario2.y = 200;
mario2.x = 13;
mario2.color = 'yellow';

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    console.log('mario was drawn');
    mario.draw();
    mario2.draw();
    setTimeout(draw, 1000 / FPS);
}

draw();