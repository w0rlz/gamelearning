// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player object
let player = {
    x: 50,
    y: 50,
    size: 30,
    color: 'lime',
    speed: 3,
    score: 0
};

// Obstacles array
const obstacles = [
    {x: 200, y: 100, width: 50, height: 200},
    {x: 400, y: 50, width: 50, height: 300}
];

// Collectible items
const items = [
    {x: 300, y: 300, size: 20, collected: false},
    {x: 500, y: 200, size: 20, collected: false}
];

// Track pressed keys
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Game update
function update() {
    // Move player
    if(keys['w']) player.y -= player.speed;
    if(keys['s']) player.y += player.speed;
    if(keys['a']) player.x -= player.speed;
    if(keys['d']) player.x += player.speed;

    // Keep player inside canvas
    if(player.x < 0) player.x = 0;
    if(player.y < 0) player.y = 0;
    if(player.x > canvas.width - player.size) player.x = canvas.width - player.size;
    if(player.y > canvas.height - player.size) player.y = canvas.height - player.size;

    // Check collisions with obstacles
    obstacles.forEach(obs => {
        if(player.x < obs.x + obs.width && player.x + player.size > obs.x &&
           player.y < obs.y + obs.height && player.y + player.size > obs.y) {
            // Simple collision response: push back
            if(keys['w']) player.y += player.speed;
            if(keys['s']) player.y -= player.speed;
            if(keys['a']) player.x += player.speed;
            if(keys['d']) player.x -= player.speed;
        }
    });

    // Collect items
    items.forEach(item => {
        if(!item.collected &&
           player.x < item.x + item.size && player.x + player.size > item.x &&
           player.y < item.y + item.size && player.y + player.size > item.y) {
            item.collected = true;
            player.score += 1;
        }
    });
}

// Game draw
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw obstacles
    ctx.fillStyle = 'red';
    obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.width, obs.height));

    // Draw items
    ctx.fillStyle = 'yellow';
    items.forEach(item => {
        if(!item.collected) ctx.fillRect(item.x, item.y, item.size, item.size);
    });

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + player.score, 10, 25);
}

// Main game loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop); // infinite loop
}

// Start the game
loop();
