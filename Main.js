//Leo Rosenbaum
//FLOOR IN PHYS CLASS FOR JUMPING ON OBJ
const gravity = 9.81 / 60
const groundY = 500 - 50
const extraNudge = 0.01

let taylor
let timer = 0
let counter = 1
let physObj = []

let player

function preload() {

}

function startScreen() {
	
}

function gameScreen() {

}

function winScreen() {

}

function loseScreen() {

}

function setup() {
	createCanvas(1080, 500)
	background(100)
	//                width      height       rad  isCon stat, bouncy, AABB
	//phys objects
	player = new Phys(width / 2, height/2, 10, 10, true, false, true, false)
	physObj.push(player)
}

function draw() {
	if (counter == 2 && frameCount % 60 == 0){
		timer++
	}
	background(100)
	rectMode(CENTER)

	//screens
	if (counter = 1) {
		startScreen()
	} else if (counter = 2) {
		gameScreen()
	} else if (counter = 3) {
		winScreen()
	} else if (counter = 4) {
		loseScreen()
	}

	//floor
	push()
	stroke(0)
	fill(0)
	rect(width/2, groundY+25, width, 50)
	pop()
	//display and update phys objects
	for (let otherObj of physObj){
		otherObj.update()
		otherObj.display()
	}

	console.log(timer)
}

function mouseClicked() {
	if (counter = 2) {
		let xvel = random(-10, 10)
		let yvel = random(-10, 10)
		let n = new Phys(width / 2, height/2, 5, 5, false, false, true, false)
		physObj.push(n)
		n.vel.x = xvel
		n.vel.y = yvel
	}
}

function keyPressed() {
	if (key = 'r') {
		counter++
	}
}