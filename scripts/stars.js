var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

function updateCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Add an event listener for window resize
window.addEventListener("resize", function () {
  updateCanvas();
});

// Initialize the canvas size
updateCanvas();

// Rest of the code...

var stars = [];
var numStars = Math.floor((canvas.width * canvas.height) / 10000); // Adjust the division factor as desired

var mouseX = -1; // Initial cursor position outside the canvas
var mouseY = -1;
var thresholdDistance = 100; // Adjust this value as needed

function createStars() {
  stars = [];
  for (var i = 0; i < numStars; i++) {
    var color =
      "rgb(" +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      ")";
    var size = Math.random() * (15 - 5) + 5;
    var targetSize = size; // Set the initial target size to the generated size
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var speed = 1; // Set the speed to a fixed value of 2
    var velocity = {
      x: 0,
      y: 0,
    };
    var star = {
      x: x,
      y: y,
      originalX: x, // Store the original positions
      originalY: y,
      speed: speed,
      velocity: velocity,
      color: color,
      size: size,
      targetSize: targetSize, // Add the target size property
    };
    stars.push(star);
  }
}

function updateStars() {
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    var dx = mouseX - star.x;
    var dy = mouseY - star.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < thresholdDistance && mouseX !== -1 && mouseY !== -1) {
      star.velocity.x += (star.speed * dx) / distance;
      star.velocity.y += (star.speed * dy) / distance;

      // Add a small random velocity when star reaches the cursor
      if (distance < 5) {
        star.velocity.x += Math.random() * 0.2 - 0.1;
        star.velocity.y += Math.random() * 0.2 - 0.1;
      }
    }

    if (
      star.originalX + 200 < star.x ||
      star.originalY + 200 < star.y ||
      distance > thresholdDistance
    ) {
      star.velocity.x += (star.originalX - star.x) / 100;
      star.velocity.y += (star.originalY - star.y) / 100;
    }

    star.x += star.velocity.x;
    star.y += star.velocity.y;

    star.velocity.x *= 0.9; // Damping factor for smoother transitions
    star.velocity.y *= 0.9;

    // Update target size randomly
    if (Math.random() < 0.05) {
      // Adjust the probability as desired
      star.targetSize = Math.random() * (15 - 5) + 5;
    }
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    var size = lerp(star.size, star.targetSize, 0.1); // Smoothly interpolate the size
    var halfSize = size * 0.5; // Calculate half size
    
    ctx.shadowBlur = size; // Set the shadow blur size based on the star size
    ctx.shadowColor = star.color; // Set the shadow color to the star's color

    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x + halfSize, star.y + halfSize, halfSize, 0, Math.PI * 2); // Use arc to draw a circle at the center
    ctx.fill();

    star.size = size; // Update the current size of the star
  }
}

// ...

var shootingStars = []; // Array to store shooting stars

// Function to create shooting stars
function createShootingStars(numStars) {
  for (var i = 0; i < numStars; i++) {
    var color = "rgba(255, 255, 255, " + (Math.random() / 2 + 0.5) + ")";
    var size = Math.random() * 10;
    if (Math.random() < 0.5) {
      var x = 0;
      var y = Math.random() * canvas.height;
    } else {
      var x = Math.random() * canvas.width;
      var y = 0;
    }

    var speed = Math.random() * 5;
    var shootingStar = {
      x: x,
      y: y,
      size: size,
      color: color,
      speed: speed,
    };
    shootingStars.push(shootingStar);
  }
}

// Function to update shooting stars
function updateShootingStars() {
  for (var i = 0; i < shootingStars.length; i++) {
    var shootingStar = shootingStars[i];
    shootingStar.x += shootingStar.speed;
    shootingStar.y += shootingStar.speed * 0.5;
  }
  // Remove shooting stars that have gone off the screen
  shootingStars = shootingStars.filter(function (star) {
    return star.x < canvas.width + 200 && star.y < canvas.height + 200;
  });
}

// Function to draw shooting stars
function drawShootingStars() {
  for (var i = 0; i < shootingStars.length; i++) {
    var shootingStar = shootingStars[i];

    // Calculate trail position
    var trailLength = 50; // Adjust the length of the trail as desired
    var trailWidth = shootingStar.size; // Adjust the width of the trail as desired
    var trailEndX = shootingStar.x - shootingStar.speed * trailLength;
    var trailEndY = shootingStar.y - shootingStar.speed * 0.5 * trailLength;

    // Draw the comet trail
    var trailGradient = ctx.createLinearGradient(
      trailEndX,
      trailEndY,
      shootingStar.x,
      shootingStar.y
    );
    trailGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    trailGradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
    ctx.strokeStyle = trailGradient;
    ctx.lineWidth = trailWidth;
    ctx.beginPath();
    ctx.moveTo(trailEndX, trailEndY);
    ctx.lineTo(
      shootingStar.x + shootingStar.size / 2,
      shootingStar.y + shootingStar.size / 2
    );
    ctx.stroke();

    // Draw the shooting star
    ctx.fillStyle = shootingStar.color;
    ctx.fillRect(
      shootingStar.x,
      shootingStar.y,
      shootingStar.size,
      shootingStar.size
    );
  }
}

function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  numStars = Math.floor((canvas.width * canvas.height) / 10000);
  createStars();
}

function updateCursorPosition(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function resetCursorPosition() {
  mouseX = -1;
  mouseY = -1;
}

window.addEventListener("resize", function () {
  updateCanvasSize();
  resetCursorPosition();
});

window.addEventListener("mousemove", updateCursorPosition);

window.addEventListener("mouseout", resetCursorPosition);

createStars();
animate();

function animate() {
  updateStars();
  drawStars();
  if (Math.random() < 0.01) {
    // Adjust the probability as desired
    createShootingStars(1);
  }
  updateShootingStars();
  drawShootingStars();

  requestAnimationFrame(animate);
}