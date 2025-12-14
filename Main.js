//Leo Rosenbaum
//FLOOR IN PHYS CLASS FOR JUMPING ON OBJ
const gravity = 9.81 / 60
const groundY = 500 - 50
const extraNudge = 0.01

let startImg, gameImg, myFont, hue, offset = 0
let timer, counter, health = 3
let physObj = []

let player

function preload() {
	startImg = loadImage("ball.webp")
	gameImg = loadImage("bouncyball.png")
	gameBckrnd = loadImage("balls.webp")
	myFont = loadFont("Sekuya-Regular.ttf")
}

function startScreen() {
	push()
	hue = map(noise(offset), 0, 1, 0, 360)
	colorMode(HSB)
	textAlign(CENTER)
	fill(255)
	push()
	scale(1.35)
	image(startImg, 0, 0)
	pop()
	textSize(20)
	stroke(0)
	fill(hue, 100, 100)
	rect(width / 2, height / 2, 250, 100)
	fill(0)
	text("Click to Start", width / 2, height / 2)
	text("Bouncy Ball Clicker", width / 2, height / 4)
	pop()
	
}

function gameScreen() {
	if (frameCount % 60 == 0) {
		timer++
	}
	
	//floor and screen items
	push()
	translate(width/2, height/2)
	scale(2)
	imageMode(CENTER)
	image(gameBckrnd, 0, 0)
	pop()

	push()
	stroke(0)
	fill(0)
	rect(width/2, groundY+25, width, 50)
	fill(255)
	textSize(20)
	textAlign(CENTER)
	text("Time: " + timer, width/5, height/5)
	text("Health: " + health, width * 4/5, height/5)
	pop()

	//display and update phys objects
	for (let otherObj of physObj){
		otherObj.update()
		otherObj.display()
		if (otherObj.onObject && otherObj === player) {
			health --
		}
	}

	if (health <= 0) {
		counter = 4
	}

	//ball
	push()
	imageMode(CENTER)
	translate(width/2, height/2)
	scale(0.5)
	image(gameImg, 0, 0)
	pop()
}

function winScreen() {

}

function loseScreen() {
	push()
	hue = map(noise(offset), 0, 1, 0, 360)
	colorMode(HSB)
	textAlign(CENTER)
	fill(255)
	push()
	scale(1.35)
	image(startImg, 0, 0)
	pop()
	textSize(30)
	stroke(0)
	fill(hue, 100, 100)
	fill(0)
	text("You Lost The Game!!!", width / 2, height / 2)
	pop()
}

function setup() {
	counter = 1
	timer = 0
	createCanvas(1080, 500)
	background(100)
	//                width      height       rad  isCon stat, bouncy, AABB
	//phys objects
	player = new Phys(width / 2, height/2, 10, 10, true, false, true, false)
	physObj.push(player)
}

function draw() {
	background(100)
	rectMode(CENTER)
	textFont(myFont)

	//screens
	if (counter == 1) {
		startScreen()
	} else if (counter == 2) {
		gameScreen()
	} else if (counter == 3) {
		winScreen()
	} else if (counter == 4) {
		loseScreen()
	}

	offset += 0.01
}

function mouseClicked() {
	if (counter == 2 && dist(width/2, height/2, mouseX, mouseY) <= 23) {
		let xvel = random(-10, 10)
		let yvel = random(-10, 10)
		let n = new Phys(width / 2, height/2, 5, 5, false, false, true, false)
		physObj.push(n)
		n.vel.x = xvel
		n.vel.y = yvel
	}
	if (counter == 1 && dist(width/2, height/2, mouseX, mouseY) < 100) {
		counter = 2
	}
}