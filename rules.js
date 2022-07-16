
const gameboard = ( () => {
    const board = ["", "", "", "", "", "", "", "", ""];
    
    const setCell = (index, marker) => {
        if(index > board.length) return;
        board[index] = marker;
    };

    const getCell = (index) => {
        if (index >board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {
        setCell, getCell, reset
    };
})();


const player = (marker) => {
    this.marker = marker;

    const getMarker = () => {
        return marker;
    };
    
    return {
        getMarker,
    }
}

const displayController = (() => {
    const cellElements = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restart-button");

    cellElements.forEach((cell) => 
        cell.addEventListener('click', (e) => {
            if (gameplay.getGameOver() || e.target.textContent !== "") return;
            gameplay.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        }));

    restartButton.addEventListener('click', (e) => {
        gameboard.reset();
        gameplay.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
    });

    const updateGameboard = () => {
        for (let i = 0; i <cellElements.length; i++) {
            cellElements[i].textContent = gameboard.getCell(i);
        };
    };

    const setResultMessage = (winner) => {
        if (winner === "Draw") {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`player ${winner} has won!`);
        };
    };

    const setMessageElement = (message) => {
        messageElement.textContent = message;
    }

    return{
        setResultMessage, setMessageElement,
    };
})();

const gameplay = (() => {
    const playerX = player('X');
    const playerO = player('O');
    let round = 1;
    let gameOver = false;

    const playRound = (cellIndex) => {
        gameboard.setCell(cellIndex, getCurrentPlayerMark());
        if(checkWinner(cellIndex)) {
            displayController.setResultMessage(getCurrentPlayerMark());
            gameOver = true;
            return;
        }
        if (round === 9){
            displayController.setResultMessage("Draw");
            gameOver = true;
            return;
        }
        round++;
        displayController.setMessageElement(
            `player ${getCurrentPlayerMark()}'s turn`
        );
    };

    const getCurrentPlayerMark = () => {
        return round % 2 === 1 ? playerX.getMarker() : playerO.getMarker();
    };

    const checkWinner = (cellIndex) => {
        winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],   
        ];

        return winConditions
            .filter((combination) => combination.includes(cellIndex))
            .some((possibleCombination) => possibleCombination.every(
                (index) => gameboard.getCell(index) === getCurrentPlayerMark()
            ));
    };

    const getGameOver = () => {
        return gameOver;
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    }

    return {
        playRound, getGameOver, reset,
    };
})();