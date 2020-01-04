var socket;
var data;

function setup(){
    createCanvas(1600,900);
    background(51);
    socket = io.connect("http://167.172.124.109:3000/");
    socket.on('mouse', newDraw);    
}

function newDraw(mouse){
    fill(200);
    noStroke();
    ellipse(mouse.x,mouse.y,30,30);
    stroke(200);
    strokeWeight(30);
    line(mouse.px,mouse.py,mouse.x,mouse.y);
}

function mouseDragged(){
    fill(255);
    noStroke();
    ellipse(mouseX,mouseY,30,30);
    stroke(255);
    strokeWeight(30);
    line(pmouseX,pmouseY,mouseX,mouseY);
    if (mouseIsPressed){
        mouse = {
            x : mouseX,
            y : mouseY,
            px : pmouseX,
            py : pmouseY
        }
        socket.emit('mouse', mouse);
    }
}
