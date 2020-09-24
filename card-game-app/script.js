async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function setDecks(numberPlayers) {
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numberPlayers}`;

    return fetchData(url);
}

async function drawCards(deck_id, numberPlayers) {
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${numberPlayers}`;

    const data = await fetchData(url);
    // console.log('data: ', data);
    return data.cards;
}

function checkWinner(card1, card2) {
    const highCardValues = [];
    highCardValues['2'] = 2;
    highCardValues['3'] = 3;
    highCardValues['4'] = 4;
    highCardValues['5'] = 5;
    highCardValues['6'] = 6;
    highCardValues['7'] = 7;
    highCardValues['8'] = 8;
    highCardValues['9'] = 9;
    highCardValues['10'] = 10;
    highCardValues['JACK'] = 11;
    highCardValues['QUEEN'] = 12;
    highCardValues['KING'] = 13;
    highCardValues['ACE'] = 14;

    const winners = {
        player1 : 'player1',
        player2 : 'player2'
    }

    const card1Value = highCardValues[card1];
    const card2Value = highCardValues[card2];

    if (card1Value > card2Value) {
        return winners.player1;
    }

    return winners.player2;
}

function initBoard() {
    const cardPlayer1 = document.getElementById('player1');
    cardPlayer1.src = "cardBack.png";

    const scorePlayer1 = document.getElementById('scoreP1');
    scorePlayer1.innerText = "Score: 0";

    const cardPlayer2 = document.getElementById('player2');
    cardPlayer2.src = "cardBack.png";

    const scorePlayer2 = document.getElementById('scoreP2');
    scorePlayer2.innerText = "Score: 0";

    const drawBtn = document.getElementById('drawCard');
    drawBtn.disabled = false;

    const newGameBtn = document.getElementById('newGame');
    newGameBtn.disabled = true;

    const winner = document.getElementById('winner');
    winner.classList.remove('visible');
    winner.classList.add('invisible');
}

function updateCards(cards) {
    const cardPlayer1 = document.getElementById('player1');
    cardPlayer1.src = `${cards[0].images.png}`;

    const cardPlayer2 = document.getElementById('player2');
    cardPlayer2.src = `${cards[1].images.png}`;
}

function updateScore(winner, enfOfGame) {
    const winners = {
        player1 : 'player1',
        player2 : 'player2'
    }

    const winnerText = document.getElementById('winner');

    if (winner === winners.player1) {
        const scorePlayer1 = document.getElementById('scoreP1');
        const currentScore = scorePlayer1.innerText.substring(scorePlayer1.innerText.indexOf(":") + 1);
        scorePlayer1.innerText = `Score: ${parseInt(currentScore) + 1}`;

        if (enfOfGame) {
            winnerText.innerText = `Player 1 won!`;
        }
    } else {
        const scorePlayer2 = document.getElementById('scoreP2');
        const currentScore = scorePlayer2.innerText.substring(scorePlayer2.innerText.indexOf(":") + 1);
        scorePlayer2.innerText = `Score: ${parseInt(currentScore) + 1}`;

        if (enfOfGame) {
            winnerText.innerText = `Player 2 won!`;
        }
    }
}

async function handleDrawBtn(deck_id, numberPlayers) {
    const cards = await drawCards(deck_id, numberPlayers);
    if (cards.length > 0) {
        updateCards(cards);
    
        const winner = checkWinner(cards[0].value, cards[1].value);
        updateScore(winner, false);
    } else {
        const drawBtn = document.getElementById('drawCard');
        drawBtn.disabled = true;

        const newGameBtn = document.getElementById('newGame');
        newGameBtn.disabled = false;

        updateScore(winner, true);

        winner.classList.add('visible');
        winner.classList.remove('invisible');
    }
}

async function setupGame() {
    const decks = await setDecks(1);
    // console.log('decks: ', decks);

    initBoard();

    return decks.deck_id;
}

setupGame().then((deck_id) => {
    const drawBtn = document.getElementById('drawCard');
    drawBtn.addEventListener('click', () => handleDrawBtn(deck_id, 2));
    
    // const newGameBtn = document.getElementById('newGame');
    // newGameBtn.addEventListener('click', () => setupGame());
});
