function startGame() {
    window.location.href = "mode.html";
  }
  
  function openInstructions() {
    window.location.href = "instructions.html";
  }
  
  function openAbout() {
    window.location.href = "about.html";
  }
  
  function startGames(difficulty) {
    // Redirect the user to the appropriate mode page based on the selected difficulty level
    if (difficulty === 'easy') {
      window.location.href = './modes/mode-easy.html';
    } else if (difficulty === 'medium') {
      window.location.href = './modes/mode-medium.html';
    } else if (difficulty === 'hard') {
      window.location.href = './modes/mode-hard.html';
    } else {
      console.log('Invalid difficulty level!');
    }
  }
  