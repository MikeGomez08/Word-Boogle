// list of dice
var dice = [
    "aaafrs",
    "aaeeee",
    "aafirs",
    "adennn",
    "aeeeem",
    "aeegmu",
    "aegmnn",
    "afirsy",
    "bjkqxz",
    "ccenst",
    "ceiilt",
    "ceilpt",
    "ceipst",
    "ddhnot",
    "dhhlor",
    "dhlnor",
    "dhlnor",
    "eiiitt",
    "emottt",
    "ensssu",
    "fiprsy",
    "gorrvw",
    "iprrry",
    "nootuw",
    "ooottu"
];

// variable for total points
var totalPoints = 0;
var totalPointHolder = document.querySelector('#total-points');

// get the entire dice grid
var diceGrid = document.querySelector('.dice');

// empty var for current word
var currentWord = [];

// index of latest die clicked
var currentLetter = -1;
// indices of valid dice that can folle the current letter
var nextLetters = [];
// valid submitted words
var foundWords = [];

// table reference 
var table = document.querySelector('#score-table');

// var for the submit button
var submitBtn = document.querySelector('#submit-btn');

// get HTML buttons for placement
var allDie = document.querySelectorAll('.dice button');

// get div for current word display
var showCurrentWord = document.querySelector('#current-word');

// build random dice generator
(function randomizer() {
    for (var i = 0; i < dice.length; i++) {
        // get each die
        var currentDie = dice[i].split('');
        // random die side
        var diceRoll = Math.floor(Math.random() * 6);
        // set die innerHTML to current character
        allDie[i].innerHTML = currentDie[diceRoll];
    }
})();

// toggle class and add current letter to word
function selectDie() {
    // toggle selected class for letters

    // get index of clicked die
    let place = [...allDie].indexOf(this);

    if (place == currentLetter) {
        // remove latest letter if clicked again
        this.classList.remove('selected');
        currentWord.splice(-1, 1);
        if (currentWord.length > 0) {
            let prevDie = [...allDie].findIndex(
                (die, i) => nextLetters.includes(i) && die.classList.contains('selected') && die.textContent == currentWord[currentWord.length - 1]
            );
            updateWord(prevDie);
        } else {
            resetWord();
        }

        var wordDisplay = currentWord.join('');
        showCurrentWord.innerHTML = wordDisplay;
    } else if (!this.classList.contains('selected') && (nextLetters.includes(place) || currentLetter == -1)) {
        // push letter to currentWord array
        this.setAttribute("class", "selected");
        currentWord.push(this.innerHTML);
        updateWord(place);
    } else {
        // reset currentWord with new starting letter
        resetWord();
        this.setAttribute("class", "selected");
        currentWord.push(this.innerHTML);
        updateWord(place);
    }

}

// apply click event for selection
for (var i = 0; i < allDie.length; i++) {
    allDie[i].addEventListener('click', selectDie);
}

function updateWord(diePosition) {
    currentLetter = diePosition;
    nextLetters = [
        // up, down, right, left
        diePosition - 5, diePosition + 5, diePosition + 1, diePosition - 1,
        // upper-left, upper-right, lower-right, lower-left
        diePosition - 6, diePosition - 4, diePosition + 4, diePosition + 6
    ].map(place => place < 0 ? Math.max(0, place) : Math.min(24, place));

    var wordDisplay = currentWord.join('');
    showCurrentWord.innerHTML = wordDisplay;
}

// reset word after submit
function resetWord() {
    currentWord = [];
    showCurrentWord.innerHTML = '';
    for (var i = 0; i < allDie.length; i++) {
        allDie[i].removeAttribute("class", "selected");
    }
    currentLetter = -1;
    nextLetters.length = 0;
};

// adds validated word with score
function addWord(points) {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = currentWord.join('');
    cell2.innerHTML = points;
    totalPointHolder.innerHTML = totalPoints;
}

// add points
function addPoints() {
    var x = currentWord.length;
    const submittedWord = currentWord.join('');
    let points = 0;

    switch (true) {
        case (x < 3):
            alert('Your word must be more at least 3 charactors!');
            return;
        case (x === 3 || x === 4):
            points = 1;
            break;
        case (x === 5):
            points = 2;
            break;
        case (x === 6):
            points = 3;
            break;
        case (x === 7):
            points = 5;
            break;
        case (x > 7):
            points = 11;
            break;
        default:
            points = 0;
    }
    if (foundWords.includes(submittedWord)) {
        // cannot accept word that's already entered
        alert("Duplicate word found. Find a different word.");
    } else if (!isValidWord(submittedWord)) {
        // link "valid-words.js" file
        // cannot accept word not a real english word
        // doesn't work yet
        alert(`'${submittedWord}' is not a valid english word.`);
    } else {
        // add submitted word in tally board
        foundWords.push(submittedWord);
        totalPoints += points;
        addWord(points);
    }

    if (currentWord.length > 2) {
        // unselect dice in the playing board
        resetWord();
    }
}

submitBtn.addEventListener('click', addPoints);

// Variable for timer
var timer;

// Variable for game duration (in seconds)
var gameDuration = 2 * 60; // 5 minutes

// Variable for remaining time
var remainingTime = gameDuration;

// Variable to check if game is running
var gameRunning = false;

// Function to start the game
function startGame() {
    if (!gameRunning) {
        // Hide the start section
        document.getElementById('start').style.display = 'none';

        // Show the game section
        document.getElementById('game').style.display = 'block';

        // Start the timer
        timer = setInterval(updateTimer, 1000);

        // Set gameRunning to true
        gameRunning = true;
    }
}

// Function to check if viewport width is less than or equal to 1037px
function isViewportMobile() {
    return window.innerWidth <= 1037;
  }
  
  // Function to toggle between click and touch events based on viewport width
  function toggleControlEvents() {
    var controlEvent = isViewportMobile() ? 'touchstart' : 'click';
  
    // Remove previous event listeners
    submitBtn.removeEventListener('click', addPoints);
    document.removeEventListener('keydown', startGame);
  
    // Add new event listeners
    submitBtn.addEventListener(controlEvent, addPoints);
    document.addEventListener(controlEvent, startGame);
  }
  
  // Add event listener for window resize to toggle control events
  window.addEventListener('resize', toggleControlEvents);
  
  // Initial call to toggle control events
  toggleControlEvents();
  
// Function to update the timer
function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        var minutes = Math.floor(remainingTime / 60);
        var seconds = remainingTime % 60;
        document.getElementById('timer').innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    } else {
        endGame();
    }
}

// Function to end the game
function endGame() {
    clearInterval(timer);
    alert('Game Over');

    // Retrieve table words
    var tableWords = [];
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        var word = rows[i].cells[0].innerHTML;
        tableWords.push(word);
    }

    // Store the current word, table words, my words, score, and remaining time in local storage
    localStorage.setItem('currentWord', currentWord.join(''));
    localStorage.setItem('tableWords', JSON.stringify(tableWords));
    localStorage.setItem('myWords', JSON.stringify(foundWords));
    localStorage.setItem('score', totalPoints);
    localStorage.setItem('remainingTime', remainingTime);

    // Redirect to the next page
    window.location.href = 'next-page.html';
}

// Event listener for key press to start the game
document.addEventListener('keydown', startGame);