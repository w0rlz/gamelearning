let score = 0;
let playerX = 50;
let playerY = 50;
const img = new Image();
img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='green'/></svg>";
document.body.appendChild(img);
function update() {
  ctx.drawImage(img, playerX, playerY,32,32);
  playerX += 1;
  requestAnimationFrame(update);
}
function draw() {
  ctx.drawImage(img, playerX, playerY,32,32);
}

function loop() {
    update();    // Update game state
    draw();      // Draw the new frame
    requestAnimationFrame(loop); // Call loop again for next frame
}

loop(); // Start the infinite loop
