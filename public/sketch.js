var socket;
var sketchCanvas;

function setup(){
    createCanvas(windowWidth-20,windowHeight-40);
    background(51);
    sliders = [];
    sketchCanvas = createInput('Canvas');
    sketchCanvas.size(80,40);   
    sketchCanvas.position(width-sketchCanvas.width,height-sketchCanvas.height);
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
        ellipse(mouse.x,mouse.y,map(dist(px,py,x,y),0,100,10,60));
        stroke(mouse.colorId[0],mouse.colorId[1],mouse.colorId[2]);
        strokeWeight(map(dist(px,py,x,y),0,100,10,60));
        line(mouse.px,mouse.py,mouse.x,mouse.y);
    }
}

function mousePressed(){
    if(mouseY <= height || (mouseX < width - 90 && mouseY < height-50)){
        fill(clientId[0],clientId[1],clientId[2]);
        noStroke();
        ellipse(mouseX,mouseY,map(dist(pmouseX,pmouseY,mouseX,mouseY),0,100,60,10));
        stroke(clientId[0],clientId[1],clientId[2]);
        strokeWeight(map(dist(pmouseX,pmouseY,mouseX,mouseY),0,100,60,10));
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
    if(mouseY <= height || (mouseX < width - 90 && mouseY < height-50)){
        fill(clientId[0],clientId[1],clientId[2]);
        noStroke();
        ellipse(mouseX,mouseY,map(dist(pmouseX,pmouseY,mouseX,mouseY),0,100,60,10));
        stroke(clientId[0],clientId[1],clientId[2]);
        strokeWeight(map(dist(pmouseX,pmouseY,mouseX,mouseY),0,100,60,10));
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
    strokeWeight(10);
    for (i in sliders){
        clientId[i] = sliders[i].value();
    }
    stroke(clientId[0],clientId[1],clientId[2]);

    line(0,3,width,3);
}
