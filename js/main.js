var Container = document.getElementsByClassName('container')[0],       // which contains "memory-game" class 
    info = document.getElementsByClassName('info')[0],                 // which contains "memory-game" class 
    tries = document.getElementById('tries'),
    game = document.getElementsByClassName('memory-game')[0],          // which contains "memory-game" class 
    blocks = game.getElementsByClassName('block'),                     // which contanins "front" and "back" classes
    flips = game.getElementsByClassName('flipped'),
    Cflips = game.getElementsByClassName('Cflipped'),
    button = Container.querySelector('button'),
    index = -1,
    duration = 550;

// Function to show all images for 2s then return it Hide
function showAll() {
    for (const item of blocks) {
        item.classList.add('flipped');
    }
    duration = 3000;
    stopClicking();
    duration = 550;
    setTimeout(() => {
        for (const item of blocks) {
            item.classList.remove('flipped');
        }
    }, 3000);
}

// Name Function 
function name() {
    N = window.prompt('What is your name ?');
    if (N.length > 40) {
        N = '';
    }
    info.querySelector('span').textContent = N || 'Unknown';
}

// Button Execution after Clicking on it
button.onclick = function () {
    name();
    game.classList.remove('no-clicking');
    info.style.opacity = '1';
    game.style.opacity = '1';
    button.style.display = 'none';
    showAll();
}

// Function Stop Clicking
function stopClicking() {
    game.classList.add('no-clicking');
    setTimeout(() => {
        game.classList.remove('no-clicking');
    }, duration);
}

// Function Shuffle
function shuffle() {
    for (let block = 0; block < blocks.length; block++) {
        game.insertBefore(blocks[block], blocks[Math.floor(Math.random() * 20)]);
    }
}
shuffle();

// Function to check you flipped all the images
function checkAllFlipped() {

    if (Cflips.length == blocks.length) {
        alert('Congratulations')
    }
}

// Memory Game Rules
for (const i of blocks) {
    i.onclick = function (e) {
        if (!this.classList.contains('Cflipped')) {
            this.classList.add('flipped');
        }
        if (flips.length == 2) {

            if (flips[0].children[0].children[0].getAttribute('data-photo') == flips[1].children[0].children[0].getAttribute('data-photo')) {
                // duration = 1000;
                stopClicking();
                // duration = 550;
                Correct = document.getElementById('correct');
                // Correct.playbackRate = 2;
                Correct.play();
                for (j = 0; j < 2; j++) {
                    flips[0].classList.add('Cflipped');
                    flips[0].classList.remove('flipped');
                }
                setTimeout(() => {
                    checkAllFlipped();
                }, duration);
            }
            else {
                stopClicking();
                Wrong = document.getElementById('wrong');
                // Wrong.playbackRate = 2;
                Wrong.play();
                setTimeout(() => {
                    tries.textContent = parseInt(tries.textContent) + 1;
                    flips[0].classList.remove('flipped');
                    flips[0].classList.remove('flipped');
                }, duration);
            }
        }

    }
}
