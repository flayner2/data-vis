const canvas1 = document.getElementById('simulation-1');
const canvas2 = document.getElementById('simulation-2');

function getCanvasSize(canvas) {
  return {"width": canvas.clientWidth, "height": canvas.clientHeight}
}

const simulation2 = (p) => {
  let {width: canvasWidth, height: canvasHeight} = getCanvasSize(canvas2);
  let walker;
  let h, s, b;

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    p.background(globalColors.black);

    p.colorMode('HSB', 360, 100, 100);

    walker = p.createVector(p.width / 2, p.height / 2);
    p.strokeWeight(2);
  };

  p.draw = function () {
    let stepY = p.random([5, -5]);
    let stepX = p.random([5, -5]);

    h = p.map(walker.y, 0, p.height, 0, 360);
    s = 50;
    b = 50;
    //s = map(walker.y, 0, 400, 0, 100);
    //b = map(walker.y, 0, 400, 0, 100);

    p.stroke(h, s, b);
    p.line(walker.x, walker.y, walker.x + stepX, walker.y + stepY);

    walker.x += stepX;
    walker.y += stepY;

    if (walker.x > p.width) {
      walker.x = 0;
    } else if (walker.x < 0) {
      walker.x = p.width;
    }

    if (walker.y > p.height) {
      walker.y = 0;
    } else if (walker.y < 0) {
      walker.y = p.height;
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(canvas2.clientWidth, canvas2.clientHeight);
  };
};

new p5(simulation2, canvas2);
