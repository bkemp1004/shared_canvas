var socket;
var sketchCanvas;

function setup(){
    createCanvas(windowWidth-20,windowHeight-40);
    background(51);
    sliders = [];
    sketchCanvas = createInput('Canvas');
    sketchCanvas.position(40,0);
    sketchCanvas.size(80,40);
    sketchCanvas.style('color', blue);
    clientId = [random(175),random(175),random(175)];
    for (i in clientId){
        sliders[i] = createSlider(0,255,clientId[i],1);
        sliders[i].size((width-30)/3,20);
        if (sliders[i-1]){
            sliders[i].position(sliders[i-1].x + sliders[i-1].width + 10, height + 15);
        }else{
            sliders[i].position(10,height+15);
        }
    }
    socket = io.connect("http://167.172.124.109:3000/");
    socket.on('mouse', newDraw);    
}

function newDraw(mouse){
    if(mouse.sketchId == sketchCanvas.value()){
        fill(mouse.colorId[0],mouse.colorId[1],mouse.colorId[2]);
        noStroke();
        ellipse(mouse.x,mouse.y,30,30);
        stroke(mouse.colorId[0],mouse.colorId[1],mouse.colorId[2]);
        strokeWeight(30);
        line(mouse.px,mouse.py,mouse.x,mouse.y);
    }
}

function mousePressed(){
    if(mouseY <= height){
        fill(clientId[0],clientId[1],clientId[2]);
        noStroke();
        ellipse(mouseX,mouseY,30,30);
        stroke(clientId[0],clientId[1],clientId[2]);
        strokeWeight(30);
        line(pmouseX,pmouseY,mouseX,mouseY);
        if (mouseIsPressed){
            mouse = {
                x : mouseX,
                y : mouseY,
                px : pmouseX,
                py : pmouseY,
                colorId: clientId,
                sketchId: sketchCanvas.value()
            }
            socket.emit('mouse', mouse);
        }
    }
}

function mouseDragged(){
    if(mouseY <= height){
        fill(clientId[0],clientId[1],clientId[2]);
        noStroke();
        ellipse(mouseX,mouseY,30,30);
        stroke(clientId[0],clientId[1],clientId[2]);
        strokeWeight(30);
        line(pmouseX,pmouseY,mouseX,mouseY);
        if (mouseIsPressed){
            mouse = {
                x : mouseX,
                y : mouseY,
                px : pmouseX,
                py : pmouseY,
                colorId: clientId,
                sketchId: sketchCanvas.value()
            }
            socket.emit('mouse', mouse);
        }
    }
}

function draw(){
    noStroke();
    for (i in sliders){
        clientId[i] = sliders[i].value();
    }
    fill(clientId[0],clientId[1],clientId[2])
    rect(0,0,40,30);
}
