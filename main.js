const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const timeEl = document.querySelector('#time-left'); // Select the timer element
let score = 0;
const gameDuration = 100000; // Game duration in milliseconds (e.g., 100 seconds)
let timeLeft = gameDuration / 1000; // Convert milliseconds to seconds

const sound = new Audio("assets/smash.mp3");

function run() {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'assets/cs.png';

    img.addEventListener('click', () => {
        score += 10;
        sound.play();
        scoreEl.textContent = score;
        img.src = 'assets/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 500);
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        hole.removeChild(img);
        run();
    }, 1500);
}

// Start the game and timer
function startGame() {

    run(); // Start the mole-appearing function

    // Update the time left every second
    const countdownTimer = setInterval(() => {
        timeLeft--; // Decrease time by 1 second
        timeEl.textContent = timeLeft; // Update the displayed time

        if (timeLeft <= 0) {
            clearInterval(countdownTimer); // Stop the countdown
        }
    }, 1000); // Update every 1 second

    gameTimer = setTimeout(() => {
        clearInterval(countdownTimer); // Stop the countdown when the game ends
        alert("Time's up! Your final score is: " + score);
    }, gameDuration); // Stop the game after the specified duration
}

startGame();

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});
window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});
