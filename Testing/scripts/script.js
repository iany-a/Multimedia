const canvas = document.getElementById('launchCanvas');
const ctx = canvas.getContext('2d');

// App State
let rocketY = 610; // Starting Y for rocket body
let status = "READY FOR LAUNCH";
let statusColor = "red"; // Circle color
let textColor = "green";
let isMoving = false;

// Audio Setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playIgnitionSound() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    // Fade out slightly to avoid a "pop" at the end
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
    oscillator.stop(audioCtx.currentTime + 1);
}

// Drawing Logic
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Status Text
    ctx.font = "24px Arial";
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.fillText(status, canvas.width / 2, 50);

    // 2. Status Light (Circle)
    ctx.beginPath();
    ctx.arc(350, 50, 15, 0, Math.PI * 2);
    ctx.fillStyle = statusColor;
    ctx.fill();
    ctx.closePath();

    // 3. Launch Pad (Grey Rectangle 50x200)
    ctx.fillStyle = "grey";
    ctx.fillRect(175, 600, 50, 200);

    // 4. Rocket Body (Red Rectangle 60x150)
    // Positioned so it sits on the pad
    ctx.fillStyle = "red";
    let rocketX = 170; // (400/2) - (60/2)
    ctx.fillRect(rocketX, rocketY, 60, 150);

    // 5. Rocket Nose Cone (Red Triangle)
    ctx.beginPath();
    ctx.moveTo(rocketX, rocketY); // Left base
    ctx.lineTo(rocketX + 60, rocketY); // Right base
    ctx.lineTo(rocketX + 30, rocketY - 40); // Top tip (height 40)
    ctx.fill();

    if (isMoving && rocketY + 150 > 0) {
        rocketY -= 5; // 5 pixels per frame
    }

    requestAnimationFrame(draw);
}

// Launch Sequence Logic
function startSequence() {
    // Initial 3 second wait
    setTimeout(() => {
        // State: Ready (Status Light Red) - Already set by default

        // Wait 2 seconds -> Ignition
        setTimeout(() => {
            statusColor = "orange";
            playIgnitionSound();

            // Wait 2 seconds -> Liftoff
            setTimeout(() => {
                statusColor = "green";
                status = "LAUNCHING";
                textColor = "red";
                isMoving = true;
            }, 2000);

        }, 2000);

    }, 3000);
}

// Start everything
draw();
startSequence();