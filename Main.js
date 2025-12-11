//Leo Rosenbaum
//FLOOR IN PHYS CLASS FOR JUMPING ON OBJ
const gravity = 9.81 / 60
const groundY = 500 - 50
const extraNudge = 0.01

let objNum
let physObj = []

let player

function newCircleObj() {
	let n = new Phys(width / 2, height/2, 20, 20, false, true, true, false)
		physObj.push(n)
}

function setup() {
	createCanvas(1080, 500)
	background(100)
	//                width      height       rad  isCon stat, bouncy, AABB
	//phys objects
	newObj = new Phys(width / 2, height/2, 20, 20, false, true, true, false)
	physObj.push(newObj)
}

function draw() {
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
	newCircleObj()
	newCircleObj()
	newCircleObj()
	for (let otherObj of physObj){
		otherObj.stat = false
		this.vel.set(random(0, 10), random(0, 10))
	}
}