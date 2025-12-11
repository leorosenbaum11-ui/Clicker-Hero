//Leo Rosenbaum
//FLOOR IN PHYS CLASS FOR JUMPING ON OBJ
const gravity = 9.81 / 60
const groundY = 500 - 50
const extraNudge = 0.01

let counter
let physObj = []

let player

function setup() {
	createCanvas(1080, 500)
	background(100)
	//                width      height       rad  isCon stat, bouncy, AABB
	//phys objects
}

function draw() {
	if (frameCount % 60 == 0){
		counter++
	}
	background(100)
	rectMode(CENTER)

	//floor
	push()
	stroke(0)
	fill(0)
	rect(width/2, groundY+25, width, 50)
	pop()

	for (let otherObj of physObj){
		otherObj.update()
		otherObj.display()
	}

	//objects
	//player.update()
	//player.display()

	//newObj.update()
	//newObj.display()
}

function mouseClicked() {
	let xvel = random(0, 10)
	let yvel = random(0, 10)
	let n = new Phys(width / 2, height/2, 20, 20, false, false, true, false)
	physObj.push(n)
	n.vel.x = xvel
	n.vel.y = yvel
}