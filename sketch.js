//Canvas settings
const canWidth = 1300;
const canHeight = 700;

//Vector vars
let vectors = [];
const vectorLength = ((canWidth ** 2) + (canHeight ** 2)) ** 0.5;

//Wall vars
let walls = [];
const numWalls = 5;
const wallWidth = 4;


let running = false;



class Vectors {
    constructor(angle, len) {
        this.angle = angle;
        this.len = len;
        this.v = p5.Vector.fromAngle(radians(this.angle), this.len)
        this.x2 = this.v.x;
        this.y2 = this.v.y;
    }

    getIntersection(x1, y1, x3, y3, x4, y4) {

        //Formula stuff
        this.x2 = this.v.x + mouseX;
        this.y2 = this.v.y + mouseY;
        const t = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / (((x1 - this.x2) * (y3 - y4)) - ((y1 - this.y2) * (x3 - x4)))
        const u = (((this.x2 - x1) * (y1 - y3)) - ((this.y2 - y1) * (x1 - x3))) / (((y4 - y3) * (this.x2 - x1)) - ((x4 - x3) * (this.y2 - y1)))

        //More formula stuff
        let intersectX = (x1 + (t * (this.x2 - x1)));
        let intersectY = (y1 + (t * (this.y2 - y1)));

        //Light ray interescts wall when t and u are within these ranges
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return { x: intersectX, y: intersectY };
        } else {
            return false;
        }
    }

    show(endX, endY) {
        line(mouseX, mouseY, endX, endY);
    }

    update() {
        //Find wall that ray intersects that it is closest to and draw to intersection point with that wall
        let intersectDistances = {};
        for (wall of walls) {
            let intersect = this.getIntersection(mouseX, mouseY, wall.x1, wall.y1, wall.x2, wall.y2);
            if (intersect != false) {
                intersectDistances[dist(mouseX, mouseY, intersect.x, intersect.y)] = { x: intersect.x, y: intersect.y };
            }
        }
        let minDistance = min(Object.keys(intersectDistances));
        let minCoords = intersectDistances[minDistance];
        if (Object.keys(intersectDistances).length != 0) {
            this.show(minCoords.x, minCoords.y)
        } else {
            this.show(this.v.x + mouseX, this.v.y + mouseY);
        }
        // this.show(minCoords.x, minCoords.y)

    }
}


class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    show() {
        strokeWeight(wallWidth);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}


function getVectors(len) {
    for (let i = 0; i < 360; i += 0.5) {
        vectors.push(new Vectors(i, len));
    }
}

// let canvasBorders = [new Wall(0, 0, canWidth, 0), new Wall(canWidth, 0, canWidth, canHeight), new Wall(canWidth, canHeight, 0, canHeight), new Wall(0, canHeight, 0, 0)];
function getWalls(numWalls) {
    for (let i = 0; i < numWalls; i++) {
        walls.push(new Wall(random(0, 200), random(0, canHeight), random(0, canWidth), random(0, canHeight)));
    }
    // walls = walls.concat(canvasBorders);
    // console.log(canvasBorders)
}


function startOrStop() {
    if (mouseX <= 50 && mouseY <= 50) {
        running = !running;
    }
}


function setup() {
    createCanvas(canWidth + 100, canHeight + 100)
    background(50);
    getWalls(0);
    getVectors(vectorLength);
}


function draw() {
    background(50);

    fill(255, 0 ,0)
    clearWalls();
    drawTempUserLine();
    
    //Start Button
    fill(220);
    rect(0, 0, 50, 50);
    
    //Draw each computer-generated wall
    stroke(255);
    for (wall of walls) {
        wall.show();
    }

    //Draw correct vectors
    if (running) {
        strokeWeight(1);
        stroke(255, 255, 255, 60);
        for (vector of vectors) {
            vector.update();
        }
    }
    
}

let userWallState = "startPoint";
let userWallPts = [];
let userPoint = [];
function mousePressed() {
    userPoint = [];
    startOrStop();
    
    //Conditional to make sure wall is not put into on/off button
    if (mouseX > 50 || mouseY > 50) {
        if (userWallState == "startPoint") {
            userWallPts.push(mouseX, mouseY);
            userPoint.push(mouseX, mouseY)
            userWallState = "endPoint";
        } else if (userWallState == "endPoint") {
            userWallPts.push(mouseX, mouseY);
            userWallState = "startPoint";
        }

        //Add wall to wall array when completed, clear temporary user wall points
        if (userWallPts.length == 4) {
            walls.push(new Wall(userWallPts[0], userWallPts[1], userWallPts[2], userWallPts[3]));
            userWallPts = [];
        }
    }
}


function drawTempUserLine() {
    stroke(255, 50);
    strokeWeight(wallWidth);
    ellipse(userPoint[0], userPoint[1], 20);
    line(userPoint[0], userPoint[1], mouseX, mouseY);
}

function clearWalls() {
    if (keyIsDown(67)) {
        walls = [];
        // console.log(canvasBorders);
    }

    if (keyIsDown(32)) {
        running = !running;
        console.log(";asjdf")
    }
}