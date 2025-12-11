class Phys {
	constructor(startX, startY, x, y, isCon, stat, bouncy, AABB) {
		this.pos = createVector(startX, startY)
		this.vel = createVector(0, 0)
		this.acc = createVector(0, 0)
		this.isGrounded = false
		this.x = x
		this.y = y
		this.isCon = isCon
		this.startX = startX
		this.startY = startY
		this.stat = stat
		this.onObject = false
		this.bouncy = bouncy
		this.AABB = AABB
	}
	
	update() {
		
		this.acc.set(0, 0)

		//vertical movement
		if ((keyIsDown(87) && this.isGrounded && this.isCon) || (keyIsDown(87) && this.onObject && this.isCon)) {
			this.acc.y = -6
		}

		//gravity
		if (!this.isGrounded && !this.stat && !this.onObject) {
			this.acc.y = gravity 
		}

		//horizontal movement
		if (keyIsDown(68) && this.isCon) {
			this.acc.x = 1 //d right
		} else if (keyIsDown(65) && this.isCon) {
			this.acc.x = -1 //a left
		} else {
			//friction
			if (abs(this.vel.x) < 0.5) {
				this.acc.x = 0
				this.vel.x = 0
			} else if (this.vel.x < 0) {
				this.acc.x = 1
			} else if (this.vel.x > 0) {
				this.acc.x = -1
			}
		}

		//update physics
		this.pos.add(this.vel) //add vel to pos
		this.vel.add(this.acc) //add acc to vel
		this.vel.limit(10)
		this.acc.set(0, 0) //reset acc

		//boundary
		if (this.pos.y - extraNudge >= groundY - this.x) {
			this.pos.y = groundY - this.x
			this.vel.y = 0
			this.acc.y = 0
			this.isGrounded = true
		} else {
			this.isGrounded = false
		}

		if (this.pos.x > width) {
			this.pos.x = width
			this.vel.x = 0
		} else if (this.pos.x < 0) {
			this.pos.x = 0
			this.vel.x = 0
		}
		this.collisions(physObj) //call method to check collisions
		console.log(this.onObject)
	}

	collisions(allObjects) {
		if (!this.stat){
			let isOnObjectThisCheck = false;
		for (let other of allObjects) {
			if (!this.AABB){
				let radius = this.x / 2
			}
			let distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
			if (other == this) {
				continue
			} else if (!this.AABB && distance <= this.x + other.x) {
				this.onObject = true
				isOnObjectThisCheck = true;
				this.acc.set(0, 0)
				
				if(!this.bouncy || !other.bouncy) {
					if (!keyIsDown(87)) {
						this.vel.set(0, 0)
					}
				}

				if(this.bouncy && other.bouncy) {
					this.vel.mult(-0.7, -0.7)
				}

				let overlap = (this.x + other.x) - distance
				let separation = overlap + extraNudge

				let direction = p5.Vector.sub(this.pos, other.pos)

				if (distance === 0) {
					direction.set(1, 0)
				} else {
					direction.normalize()
				}
				this.pos.add(direction.mult(separation))
			} else if (this.AABB &&
						this.pos.x - this.x/2 <= other.pos.x + other.x/2 &&
						this.pos.x + this.x/2 >= other.pos.x - other.x/2 &&
						this.pos.y - this.y/2 <= other.pos.y + other.y/2 &&
						this.pos.y + this.y/2 >= other.pos.y - other.y/2
					) {
						this.onObject = true
				isOnObjectThisCheck = true;
				this.acc.set(0, 0)
				
				if(!this.bouncy || !other.bouncy) {
					if (!keyIsDown(87)) {
						this.vel.set(0, 0)
					}
				}

				if(this.bouncy && other.bouncy) {
					this.vel.mult(-0.7, -0.7)
				}

				let overlap = (this.x + other.x) - distance
				let separation = overlap + extraNudge

				let direction = p5.Vector.sub(this.pos, other.pos)

				if (distance === 0) {
					direction.set(1, 0)
				} else {
					direction.normalize()
				}
				this.pos.add(direction.mult(separation))
			}
		}
			if (isOnObjectThisCheck === false) {
				this.onObject = false
			}
		}
	}

	reset() {
		this.pos.x = this.startX
		this.pos.y = this.startY
	}

	display() {
		if(!this.AABB) {
			push()
			fill(255)
			noStroke()
			circle(this.pos.x, this.pos.y, this.x * 2)
			pop()
		}
		if(this.AABB) {
			push()
			fill(255)
			noStroke()
			rect(this.pos.x, this.pos.y, this.x * 2, this.y * 2)
			pop()
		}
	}
}