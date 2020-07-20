
// let canWidth = 1800;
// let canHeight = 1000;
// let vectors = [];
// let walls = []; 




// class Wall {
//     constructor(x1, y1, x2, y2) {
//         this.x1 = x1;
//         this.y1 = y1;
//         this.x2 = x2;
//         this.y2 = y2;
//     }

//     getIntersection(x3, y3, x4, y4) {
        
//         let t = (((this.x1 - x3) * (y3 - y4)) - ((this.y1 - y3) * (x3 - x4))) / (((this.x1 - this.x2) * (y3 - y4)) - ((this.y1 - this.y2) * (x3 - x4)))
//         let u = (((this.x2 - this.x1) * (this.y1 - y3)) - ((this.y2 - this.y1) * (this.x1 - x3))) / (((y4 - y3) * (this.x2 - this.x1)) - ((x4 - x3) * (this.y2 - this.y1)))
//         // console.log(t, u)

//         let intersectX = (this.x1 + (t * (this.x2 - this.x1)));
//         let intersectY = (this.y1  + (t * (this.y2 - this.y1)));

//         if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
//             return {x: intersectX, y: intersectY};
//         } else {
//             return false;
//         }

//     }
// }


// function getWalls() {
//     for (let i = 0; i<5; i++) {
//         walls.push(new Wall(random(0, canWidth), random(0, canHeight), random(0, canWidth), random(0, canHeight)));
//     }
// }


// function distance(x1, y1, x2, y2) {
//     return (((y2 - y1) ** 2) + ((x2 - x1) ** 2)) ** 0.5;
// }

// function setup() {
//     createCanvas(canWidth, canHeight);
//     background(0);

//     for (let i = 0; i < 360; i+=0.25) {
//         vectors.push(p5.Vector.fromAngle(i, 3000));
//     }
//         // vectors.push(p5.Vector.fromAngle(0, 100));
//         // // vectors.push(p5.Vector.fromAngle(180, 100))


//     getWalls();
// }


// function draw() {
//     background(0);
//     stroke(255);
//     fill(255);
//     ellipse(mouseX, mouseY, 25, 25);

//     for (wall of walls) {
//         strokeWeight(10);
//         line(wall.x1, wall.y1, wall.x2, wall.y2);
//     }
    
//     for (vector of vectors) {

//         let intersectDistances = {};
//         for (wall of walls) {

//             let intersect = wall.getIntersection(mouseX, mouseY, mouseX + vector.x, mouseY + vector.y);

//             if (intersect != false) {
//                 intersectDistances[distance(mouseX, mouseY, intersect.x, intersect.y)] = {x: intersect.x, y: intersect.y};
//             }
//         }

//         let minDistance = min(Object.keys(intersectDistances));
//         let minCoords = intersectDistances[minDistance];
//         // console.log(minCoords)

//         strokeWeight(0.4)
//         push();
//         if (Object.keys(intersectDistances).length != 0) {
//             line(mouseX, mouseY, minCoords.x, minCoords.y)
//         } else {
//             translate(mouseX, mouseY)
//             line(0, 0, vector.x, vector.y);
//         }
//         pop();
//     }
// }




// // strokeWeight(0.4)
//             // push();
//             // if (intersect != false) {
//             //     line(mouseX, mouseY, intersect.x, intersect.y)
//             // } else {
//             //     translate(mouseX, mouseY)
//             //     line(0, 0, vector.x, vector.y);
//             // }
//             // pop();