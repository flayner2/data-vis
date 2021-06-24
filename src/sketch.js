let walker;
let h, s, b;

function setup() {
  createCanvas(400, 400);
  background(102, 92, 84);

  colorMode("HSB", 360, 100, 100);

  walker = createVector(200, 200);
  strokeWeight(2);
}

function draw() {
  let stepY = random([5, -5]);
  let stepX = random([5, -5]);

  h = map(walker.y, 0, 400, 0, 360);
  s = 100;
  b = 100;
  //s = map(walker.y, 0, 400, 0, 100);
  //b = map(walker.y, 0, 400, 0, 100);
  console.log(h, s, b);

  stroke(h, s, b);
  line(walker.x, walker.y, walker.x + stepX, walker.y + stepY);

  walker.x += stepX;
  walker.y += stepY;

  if (walker.x > width) {
    walker.x = 0;
  } else if (walker.x < 0) {
    walker.x = width;
  }

  if (walker.y > height) {
    walker.y = 0;
  } else if (walker.y < 0) {
    walker.y = height;
  }
}
