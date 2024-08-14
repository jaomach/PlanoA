const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let currentColor = 'black';
let currentSize = 2;
let countdown;
let gameStarted = false;
let phrasesFetched = false;
let lastColor;
let history = [];
let redoHistory = [];
let historyStep = -1;
let selectedWinnerId = null;

console.log('Connecting to server with roomId:', roomId);
var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('join', { room_id: roomId });
});

socket.on('message', function(data) {
    if (data.msg === 'Game started') {
        document.getElementById('drawingArea').style.display = 'flex';
        document.getElementById('waitingMessage').style.display = 'none';
        document.getElementById('round1').style.display = 'block';
        document.getElementById('userSelect').style.display = 'none'
        localStorage.setItem('drawings', 0)
        gameStarted = true;
        initializeCanvas()
    }
    if (data.msg === 'Round 1 finished') {
        document.getElementById('drawingArea').style.display = 'none';
        document.getElementById('round1').style.display = 'none';
        exportDrawing();
    }
    if (data.msg === 'Round 2 started') {
        document.getElementById('phraseInput').style.display = 'flex';
        document.getElementById('round2').style.display = 'block';
    }
    if (data.msg === 'Round 2 finished') {
        document.getElementById('phraseInput').style.display = 'none';
        document.getElementById('round2').style.display = 'none';
    }
    if (data.msg === 'Round 3 started') {
        phrasesFetched = true
        fetchDistributedPhrases()
        fetchDistributedDrawings()
        document.getElementById('combinationArea').style.display = 'flex';
        document.getElementById('round3').style.display = 'block'
    }
    if (data.msg === 'Round 3 finished') {
        document.getElementById('combinationArea').style.display = 'none';
        document.getElementById('round3').style.display = 'none'
    }
    if (data.msg === 'Round 4 started') {
        document.getElementById('round4').style.display = 'flex'
        fetchMatchups()
    }
    if (data.msg === 'Round 4 finished') {
        document.getElementById('round4').style.display = 'none'
    }
    if (data.msg === 'Round 5 started') {
        document.getElementById('round4').style.display = 'flex'
        displayMatchup()
    }
    if (data.msg === 'Round 5 finished') {
        document.getElementById('round4').style.display = 'none'
    }
    if (data.msg === 'Tournament advanced') {
        fetchMatchups()
    }
    if (data.msg === 'Last round finished') {
        document.getElementById('round4').style.display = 'none'
    }
    if (data.msg === 'Next round started') {
        document.getElementById('round4').style.display = 'flex'
    }
    if (data.msg === 'Tournament next') {
        displayMatchup()
    }
    console.log('Mensagem recebida:', data.msg);
});

function checkGameStatus() {
    fetch(`/room_status/${roomId}`)
        .then(response => response.json())
        .then(data => {
            if (data.started && !gameStarted) {
                gameStarted = true;
                document.getElementById('waitingMessage').style.display = 'none';
                document.getElementById('drawingArea').style.display = 'block';
                localStorage.setItem('drawings', 0)
                initializeCanvas();
            }
            if (data.remaining_time === 0) {
                document.getElementById('drawingArea').style.display = 'none';
            }
            if (data.current_round === 2) {
                document.getElementById('phraseInput').style.display = 'flex';
            }
            if (data.current_round === 3 && !phrasesFetched) {
                phrasesFetched = true
                fetchDistributedPhrases()
                fetchDistributedDrawings()
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.onload = () => {
    const savedPlayerId = localStorage.getItem('playerId');
    const savedUsername = localStorage.getItem('username');
    const savedCharacter = localStorage.getItem('character');
    const savedRoom = localStorage.getItem('room');
    let character = savedCharacter;
    let playerId = savedPlayerId;
    let username = savedUsername;

    checkGameStatus();

    if (savedRoom === roomId) {
        if (playerId && username) {
        joinRoom(playerId, username, character)
    } else {
        if (!playerId) {
        }
    }
    }
};

function saveUsername(){
    const username = document.getElementById('username').value;
    const playerId = localStorage.getItem('playerId');
    let characterNew
    const character = document.querySelector('.swiper-slide-active').querySelectorAll('span').forEach(element => {
        console.log(element.innerHTML)
        characterNew = element.innerHTML
    });


    localStorage.setItem('username', username);
    localStorage.setItem('character', characterNew);
    localStorage.setItem('room', roomId);
    joinRoom(playerId, username, characterNew);
}

function joinRoom(playerId, username, character) {
    fetch('/api/join_room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ room_id: roomId, player_id: playerId, username: username, character: character })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response data:', data);
        if (data.message === 'Player added' || data.message === 'Rejoining...') {
            console.log('Token:', data.token); // O token é o próprio playerId
            console.log(data.message);

            localStorage.setItem('playerId', data.token);
            localStorage.setItem('username', username);
            document.getElementById('userSelect').innerHTML = ''
        } else {
            window.location.href = 'https://youtube.com';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function initializeCanvas() {
   canvas.addEventListener('mousedown', startDrawing);
   canvas.addEventListener('mousemove', draw);
   canvas.addEventListener('mouseup', stopDrawing);
   canvas.addEventListener('mouseout', stopDrawing);

   canvas.addEventListener('touchstart', startDrawing);
   canvas.addEventListener('touchmove', draw);
   canvas.addEventListener('touchend', stopDrawing);
   canvas.addEventListener('touchcancel', stopDrawing);

   fillCanvasWithWhite();
   saveState();
}

function fillCanvasWithWhite() {
   ctx.fillStyle = 'white';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   saveState();
}

function setColor(color) {
    currentColor = color;            
    if (lastColor === undefined) {
         document.getElementById('black').style.borderColor = 'black'
        document.getElementById(color).style.borderColor = 'white'
        document.getElementById('actualColor').style.backgroundColor = currentColor
    } else if (lastColor != color) {
        document.getElementById(lastColor).style.borderColor = 'black'
        document.getElementById(color).style.borderColor = 'white'
        document.getElementById('actualColor').style.backgroundColor = currentColor
    }
    lastColor = color;
}

function setBrushSize(size) {
    currentSize = size;
}

function setEraser() {
    currentColor = 'white';
}

function startDrawing(event) {
   drawing = true;
   draw(event);
}

function draw(event) {
   if (!drawing) return;

   event.preventDefault();
   const rect = canvas.getBoundingClientRect();
   const x = (event.clientX || event.touches[0].clientX) - rect.left;
   const y = (event.clientY || event.touches[0].clientY) - rect.top;

   ctx.lineWidth = currentSize;
   ctx.lineCap = 'round';
   ctx.strokeStyle = currentColor;

   ctx.lineTo(x, y);
   ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(x, y);
}

function stopDrawing() {
   drawing = false;
   ctx.beginPath();
   saveState();
}

function saveState() {
   if (historyStep < history.length - 2) {
       history = history.slice(0, historyStep + 1);
   }
   history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
   historyStep++;
   redoHistory = []; // Limpa o histórico de redo sempre que uma nova ação é feita
}

function undo() {
   if (historyStep > 0) {
       redoHistory.push(history[historyStep]);
       historyStep--;
       let imageData = history[historyStep];
       ctx.putImageData(imageData, 0, 0);
   }
}

function redo() {
   if (redoHistory.length > 0) {
       historyStep++;
       let imageData = redoHistory.pop();
       ctx.putImageData(imageData, 0, 0);
       history.push(imageData); // Adiciona novamente ao histórico de undo
   }
}

document.addEventListener('keydown', function (event) {
   if (event.ctrlKey && event.key === 'z') {
       undo();
   }
   if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
       redo();
   }
});

function exportDrawing() {
    const dataURL = canvas.toDataURL('image/png');
    const playerId = localStorage.getItem('playerId')
    fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ player_id: playerId, room_id: roomId, image: dataURL })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        var drawings = localStorage.getItem('drawings');
        if (drawings) {
            drawings = parseInt(drawings);
        } else {
            drawings = 0;
        }

        if (drawings < 3) {
            drawings += 1;
            localStorage.setItem('drawings', drawings);
            document.getElementById('drawingCounter').innerHTML = `${drawings}/4`
            clearCanvas();
        } else {
            document.getElementById('drawingArea').style.display = 'none'
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); // reiniciar o caminho para que as novas linhas não se conectem às antigas
    fillCanvasWithWhite()
}

let phraseCounter = 0
function submitPhrase() {
    const phrase = document.getElementById('phrase').value;
    const playerId = localStorage.getItem('playerId')
    const submitPhraseBtn = document.getElementById('submitPhraseBtn')
    if (phrase) {
        submitPhraseBtn.disabled = true
        fetch('/submit_phrase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ room_id: roomId, player_id: playerId, phrase: phrase })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Phrase submitted') {
                submitPhraseBtn.disabled = false

                if (phraseCounter < 3) {
                    phraseCounter += 1
                    console.log(phraseCounter)
                } else {document.getElementById('round2').style.display = 'none';}
                document.getElementById('phrase').value = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert("Por favor, insira uma frase!");
    }
}

function fetchDistributedPhrases() {
    fetch(`/distribute_phrases/${roomId}`)
        .then(response => response.json())
        .then(data => {
            const playerId = localStorage.getItem('playerId')
            const phraseSelect = document.getElementById('phraseSelect');
            const round3 = document.getElementById('round3')
            phraseSelect.innerHTML = '';
            if (data[playerId] && data[playerId].length > 0) {
                data[playerId].forEach(phrase => {
                    const option = document.createElement('option');
                    option.value = phrase;
                    option.textContent = phrase;
                    phraseSelect.appendChild(option);
                });
            } else {
                phraseList.textContent = 'Nenhuma frase atribuída.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchDistributedDrawings() {
    fetch(`/distribute_drawing/${roomId}`)
        .then(response => response.json())
        .then(data => {
            const drawingList = document.getElementById('swiperCombine');
            const playerId = localStorage.getItem('playerId')
            const round3 = document.getElementById('round3')
            drawingList.innerHTML = '';
            if (data[playerId] && data[playerId].length > 0) {
                data[playerId].forEach(url => {
                    const newSwiper = document.createElement('swiper-slide')
                    const img = document.createElement('img');
                    img.src = url;
                    drawingList.appendChild(newSwiper);
                    newSwiper.appendChild(img);

                    const option = document.createElement('span');
                    option.textContent = url;
                    option.style.display = 'none';
                    newSwiper.appendChild(option);
                    round3.appendChild(drawingList);
                });
            } else {
                drawingList.textContent = 'Nenhum desenho atribuído.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
    });
}

function combineSelection() {
    const selectedPhrase = document.getElementById('phraseSelect').value;
    let newSelectedImage
    const selectedImage = document.querySelector('.swiper-slide-active').querySelectorAll('span').forEach(element => {
        newSelectedImage = element.innerHTML
    });
    console.log(newSelectedImage)
    const playerId = localStorage.getItem('playerId')

    if (newSelectedImage && selectedPhrase) {
        document.getElementById('round3').style.display = 'none'
        fetch(`/combine/${roomId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ player_id: playerId, image_path: newSelectedImage, phrase: selectedPhrase })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Combination saved successfully') {
                alert('Combinação enviada com sucesso!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Por favor, selecione um desenho e uma frase!');
    }
}

async function fetchMatchups() {
    const response = await fetch(`/tournament/${roomId}/matchup`);
    const data = await response.json();
    if (data.matchups) {
        matchups = data.matchups;
        currentMatchupIndex = 0;
        winners = [];
        displayMatchup();
    } else {
        document.getElementById('matchups').innerHTML = '<p>No matchups available</p>';
    }
}

function displayMatchup() {
    const matchupsDiv = document.getElementById('matchups');
    matchupsDiv.innerHTML = '';

    if (currentMatchupIndex < matchups.length) {
        const matchup = matchups[currentMatchupIndex];
        const matchupDiv = document.createElement('div');
        matchupDiv.classList.add('matchup');
        const combinations = matchup.combinations;
        const player1Comb = combinations[0][0];
        const player1 = matchup.players[0];
        const player2 = matchup.players[1];

        const player1Div = document.createElement('div');
        player1Div.classList.add('player-vote')
        player1Div.id = player1
        player1Div.innerHTML = `
            <img src="${player1Comb.image_path}">
            <span>${player1Comb.phrase}</span>
        `;
        matchupDiv.appendChild(player1Div);

        if (player2) {
            const player2Comb = combinations[1][0];
            const player2Div = document.createElement('div');
            player2Div.classList.add('player-vote')
            player2Div.id = player2
            player2Div.innerHTML = `
               <img src="${player2Comb.image_path}">
               <span>${player2Comb.phrase}</span>
            `;
            matchupDiv.appendChild(player2Div);
        } else {
            const byeDiv = document.createElement('div');
            byeDiv.innerHTML = `<p>Player: ${player1} gets a bye</p>`;
            matchupDiv.appendChild(byeDiv);
        }

        matchupsDiv.appendChild(matchupDiv);
        document.getElementById('sendVote').style.display = 'flex';
        selectedVote();

    } else {
        document.getElementById('sendVote').style.display = 'none';
    }
}

function selectedVote() {
   const selectedWinner = document.querySelectorAll('.player-vote');
    const sendVoteBtn = document.getElementById('sendVote')
    let previousWinnerSelected = null

   selectedWinner.forEach(winner => {
        winner.addEventListener('click', function () {
            if (sendVoteBtn.innerText === 'Enviar Voto') {

              if (previousWinnerSelected) {
                  document.getElementById(previousWinnerSelected).classList.remove('selected');
              }
              winner.classList.add('selected')
              selectedWinnerId = winner.id;
              previousWinnerSelected = winner.id
            }
        });
   });
}

function sendVote() {
   if (selectedWinnerId) {
       currentMatchupIndex++;
       const playerId = localStorage.getItem('playerId');
       const sendVoteBtn = document.getElementById('sendVote')
        sendVoteBtn.innerText = 'Cancelar'
        document.getElementById('matchups').classList.add('inactive')

        if (sendVoteBtn.innerText = 'Cancelar') {
            sendVoteBtn.onclick = cancelVote
        }
       var vote = selectedWinnerId;
       var data = {
           room_id: roomId,
           player_id: playerId,
           vote: vote
       };
    
       // enviar os dados para o servidor usando fetch
       fetch('/vote', {
           method: 'POST',
           body: JSON.stringify(data),
           headers: {
               'Content-Type': 'application/json'
           }
       })
       .then(response => response.json())
       .then(data => {
           console.log(data.message + vote);
       })
       .catch(error => {
           console.error('Error:', error);
       });
   } else {
       alert('Please select a winner before proceeding.');
       return; // Adicione um retorno aqui para evitar continuar a função sem um vencedor selecionado.
   }
}

function cancelVote() {
    document.getElementById('matchups').classList.remove('inactive')
    const sendVoteBtn = document.getElementById('sendVote')
    sendVoteBtn.innerText = 'Enviar Voto'
    sendVoteBtn.onclick = sendVote
}