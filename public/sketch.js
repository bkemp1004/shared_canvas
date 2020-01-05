var socket;

function setup(){
    createCanvas(windowWidth-20,windowHeight-20);
    background(51);
    sliders = [];
    clientId = [random(175),random(175),random(175)];
    for (i in clientId){
        sliders[i] = createSlider(0,255,clientId[i],1);
        if (sliders[i-1]){
            sliders[i].position(sliders[i-1].x + sliders[i-1].width + 10, height + 10);
        }else{
            sliders[i].position(10,height+10);
        }
        sliders[i].input(updateColor);
    }
    socket = io.connect("http://167.172.124.109:3000/");
    socket.on('mouse', newDraw);    
}

function updateColor(){
    for (i in sliders){
        clientId[i] = sliders[i].value();
    }
}

function newDraw(mouse){
    fill(mouse.colorId[0],mouse.colorId[1],mouse.colorId[2]);
    noStroke();
    ellipse(mouse.x,mouse.y,30,30);
    stroke(mouse.colorId[0],mouse.colorId[1],mouse.colorId[2]);
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
            py : pmouseY,
            colorId: clientId
        }
        socket.emit('mouse', mouse);
    }
}
