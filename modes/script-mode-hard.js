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
    if (!this.classList.contains('selected')) {
        // push letter to array
        this.setAttribute('class', 'selected');
        currentWord.push(this.innerHTML);
    } else {
        // function to search for already selected letter and remove it
        for (var i = currentWord.length; i >= 0; i--) {
            if (currentWord[i] === this.innerHTML) {
                // unselect button css
                //this.removeAttribute("class","selected");
                // remove item
                currentWord.splice(i, 1);
            }
        }
    }
    var wordDisplay = currentWord.join('');
    showCurrentWord.innerHTML = wordDisplay;
}

// apply click event for selection
for (var i = 0; i < allDie.length; i++) {
    allDie[i].addEventListener('click', selectDie);
}

// Variable for my words
var myWords = [];

// reset word after submit
function resetWord() {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = currentWord.join('');
    cell2.innerHTML = points;
    totalPointHolder.innerHTML = totalPoints;

    // Store current word in myWords array
    myWords.push(currentWord.join(''));

    currentWord = [];
    showCurrentWord.innerHTML = '';
    for (var i = 0; i < allDie.length; i++) {
        allDie[i].removeAttribute('class', 'selected');
    }

    // Check if the maximum number of words is reached
    if (myWords.length >= 10) {
        submitBtn.removeEventListener('click', addPoints);
        submitBtn.disabled = true;
        endGame();
    }
}

// add points
function addPoints() {
    var x = currentWord.length;
    switch (true) {
        case x < 3:
            alert('Your word must be at least 3 characters!');
            break;
        case x === 3 || x === 4:
            points = 1;
            totalPoints += points;
            break;
        case x === 5:
            points = 2;
            totalPoints += points;
            break;
        case x === 6:
            points = 3;
            totalPoints += points;
            break;
        case x === 7:
            points = 5;
            totalPoints += points;
            break;
        case x > 7:
            points = 11;
            totalPoints += points;
            break;
        default:
            points = 0;
    }
    if (currentWord.length > 2) {
        resetWord();
    }
}

submitBtn.addEventListener('click', addPoints);

// Variable for timer
var timer;

// Variable for game duration (in seconds)
var gameDuration = 1 * 60; // 5 minutes

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
    localStorage.setItem('myWords', JSON.stringify(myWords));
    localStorage.setItem('score', totalPoints);
    localStorage.setItem('remainingTime', remainingTime);

    // Redirect to the next page
    window.location.href = 'next-page.html';
}

// Event listener for key press to start the game
document.addEventListener('keydown', startGame);
