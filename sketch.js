function setup() {
	createCanvas(400, 400);
}

function draw() {
	if (mouseIsPressed){
		stroke(0);
		strokeWeight(2);
		line(pmouseX, pmouseY, mouseX, mouseY);
	}
}
