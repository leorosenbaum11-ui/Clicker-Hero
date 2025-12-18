//Leo Rosenbaum
const gravity = 9.81 / 60
const groundY = 500 - 50
const extraNudge = 0.01

let startImg, gameImg, myFont, sphere, hue, offset = 0, dist1 = 135
let timer, counter, otherside, clicks = 130, health = 3
let physObj = []

let player

function preload() {
	startImg = loadImage("ball.webp")
	gameImg = loadImage("bouncyball.png")
	gameBckrnd = loadImage("balls.webp")
	myFont = loadFont("Sekuya-Regular.ttf")
	winImg = loadImage("bouncies.jpg")
	bouncy1 = loadImage("bouncy1.png")
	sphere = loadImage("sphereical.png")
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

	push()
	translate(width/2, height/2 + width/7)
	imageMode(CENTER)
	image(bouncy1, 0, 0)
	pop()

	stroke(0)
	
	if (counter == 1 && mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 2 - 50 && mouseY < height / 2 + 50) {
		fill(hue, 100, 50)
		rect(width / 2, height / 2, 187, 75)
		fill(0)
		textSize(15)
		text("Click to Start", width / 2, height / 2)
		dist1 = 93.5
	} else {
		fill(hue, 100, 100)
		rect(width / 2, height / 2, 250, 100)
		fill(0)
		textSize(20)
		text("Click to Start", width / 2, height / 2)
		dist1 = 135
	}
	
	textSize(20)
	text("Bouncy Ball Clicker", width / 2, height / 4)
	pop()
	
}

function gameScreen() {
	if (frameCount % 60 == 0) {
		timer--
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
	text("Health: ", width * 4/5, height/5)
	text("Clicks Needed: " + clicks, width * 3/5, height/5)
	rectMode(CORNER)
	noStroke()
	rect(width * 4/5 + 70, height/5 - 20, map(health, 0, 3, 0, 100), 20)
	noFill()
	stroke(0)
	rect(width * 4/5 + 70, height/5 - 20, 100, 20)
	pop()

	//display and update phys objects
	for (let otherObj of physObj){
		otherObj.update()
		otherObj.display()
	}

	if (health <= 0 || timer <= 0 && clicks > 0) {
		counter = 4
	}
	if (clicks <= 0 && health > 0) {
		counter = 3
	}

	//ball
	push()
	imageMode(CENTER)
	translate(width/2, height/2)
	scale(1)
	if (dist(width/2, height/2, mouseX, mouseY) <= 23) {
		image(gameImg, 0, 0)
	} else if (dist(width/2, height/2, mouseX, mouseY) > 23) {
		scale(0.5)
		image(gameImg, 0, 0)
	}
	pop()
}

function winScreen() {
	push()
	hue = map(noise(offset), 0, 1, 0, 360)
	colorMode(HSB)
	textAlign(CENTER)
	fill(255)
	push()
	scale(1)
	image(winImg, 0, 0)
	pop()
	textSize(30)
	stroke(0)
	fill(hue, 100, 100)
	fill(0)
	text("You Won The Game!!!", width / 2, height / 5)
	pop()

	push()
	if (counter == 3 && mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 1.3 - 50 && mouseY < height / 1.3 + 50) {
		fill(hue, 100, 50)
		rect(width / 2, height / 1.3, 225, 75)
		fill(0)
		textSize(15)
		textAlign(CENTER)
		text("Click to Restart", width / 2, height / 1.3)
		dist1 = 93.5
	} else {
		fill(hue, 100, 100)
		rect(width / 2, height / 1.3, 300, 100)
		fill(0)
		textSize(20)
		textAlign(CENTER)
		text("Click to Restart", width / 2, height / 1.3)
		dist1 = 135
	}
	pop()
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
	text("You Lost The Game!!!", width / 2, height / 5)
	pop()

	push()
	if (counter == 4 && mouseX > width / 2 - 100 && mouseX < width / 2 + 150 && mouseY > height / 1.3 - 50 && mouseY < height / 1.3 + 50) {
		fill(hue, 100, 50)
		rect(width / 2, height / 1.3, 225, 75)
		fill(0)
		textSize(15)
		textAlign(CENTER)
		text("Click to Restart", width / 2, height / 1.3)
		dist1 = 93.5
	} else {
		fill(hue, 100, 100)
		rect(width / 2, height / 1.3, 300, 100)
		fill(0)
		textSize(20)
		textAlign(CENTER)
		text("Click to Restart", width / 2, height / 1.3)
		dist1 = 135
	}
	pop()
}

function setup() {
	counter = 1
	timer = 45
	createCanvas(1080, 500)
	background(100)
	//                width      height       rad  isCon stat, bouncy, AABB
	//phys objects
	player = new Phys(width / 2, height/2, 10, 10, true, false, true, false)
	physObj.push(player)
	otherside = createAudio("otherside303exe.mp3")
	otherside.loop()
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
		clicks --
		if (clicks <= 0) {
			clicks = 0
		}
	}
	if (counter == 1 && mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 2 - 50 && mouseY < height / 2 + 50) {
		counter = 2
	} else if (counter == 3 && mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 1.3 - 50 && mouseY < height / 1.3 + 50) {
		counter = 1
		timer = 45
		clicks = 130
		health = 3
		physObj = []
		player = new Phys(width / 2, height/2, 10, 10, true, false, true, false)
		physObj.push(player)
	} else if (counter == 4 && mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > height / 1.3 - 50 && mouseY < height / 1.3 + 50) {
		counter = 1
		timer = 45
		clicks = 130
		health = 3
		physObj = []
		player = new Phys(width / 2, height/2, 10, 10, true, false, true, false)
		physObj.push(player)
	}
}

function keyPressed() {
	if (key == 'r' || key == 'R') {
		save("clickerhero.png")
	}
}