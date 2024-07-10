document.addEventListener('DOMContentLoaded', () => {
    // const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const restartButton = document.getElementById("restart");
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let userChoice;
    let computerChoice;
    let currentPlayer;
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function getUserChoice() {
        let choice = prompt("Enter Your Choice (X / O)").toUpperCase();
        while (choice !== 'X' && choice !== 'O') {
            alert("Invalid choice. Please enter 'X' or 'O'.");
            choice = prompt("Enter Your Choice (X / O)").toUpperCase();
        }
        return choice;
    }

    function initializeGame() {
        userChoice = getUserChoice();
        computerChoice = userChoice === 'X' ? 'O' : 'X';
        currentPlayer = userChoice;
        message.innerText = `You are ${userChoice}. Computer is ${computerChoice}.`;
        
    }

    function handleCellPlayed(cell, index) {
        gameState[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.classList.add('disabled');
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            if(currentPlayer === userChoice) {
                message.innerText = "Hey! You Won";
                message.style.backgroundColor = "green";
                message.style.color = "white";
                restartButton.style.visibility = "visible";
            } else {
                message.innerText = "You Lost ! :(";
                message.style.backgroundColor = "red";
                message.style.color = "white";
                restartButton.style.visibility = "visible";
            }

            isGameActive = false;
            return;
        }

        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            message.innerText = 'Game ended in a draw!';
            message.style.backgroundColor = "white";
            message.style.color = "black";
            restartButton.style.visibility = "visible";
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === computerChoice && isGameActive) {
            computerMove();
        }
    }

    function computerMove() {
        let availableCells = [];
        gameState.forEach((cell, index) => {
            if (cell === '') {
                availableCells.push(index);
            }
        });

        if (availableCells.length === 0) return;

        let randomIndex = Math.floor(Math.random() * availableCells.length);
        let cellIndex = availableCells[randomIndex];
        let cell = cells[cellIndex];

        handleCellPlayed(cell, cellIndex);
        handleResultValidation();
    }

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !isGameActive || currentPlayer !== userChoice) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    function restartGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('disabled');
        });
        message.innerText = '';
        message.style.backgroundColor = "white";
        message.style.color = "black";
        initializeGame();
    }

    restartButton.addEventListener('click',() => {
        restartGame();
        restartButton.style.visibility = "hidden";
    });


    initializeGame();
});
