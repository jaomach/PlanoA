const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
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
let actualUsername
let fillMode = false;
let soloAux = 10

console.log('Connecting to server with roomId:', roomId);
var socket = io({ query: { roomId: roomId } });

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('join', { room_id: roomId, user_type: 'player' });
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
        document.getElementById('waitingMessage').style.display = 'flex';
        exportDrawing();
    }
    if (data.msg === 'Round 2 started') {
        document.getElementById('phraseInput').style.display = 'flex';
        document.getElementById('round2').style.display = 'block';
        document.getElementById('waitingMessage').style.display = 'none';
    }
    if (data.msg === 'Round 2 finished') {
        document.getElementById('phraseInput').style.display = 'none';
        document.getElementById('round2').style.display = 'none';
        document.getElementById('waitingMessage').style.display = 'flex';
    }
    if (data.msg === 'Round 3 started') {
        phrasesFetched = true
        fetchDistributedPhrases()
        fetchDistributedDrawings()
        document.getElementById('combinationArea').style.display = 'flex';
        document.getElementById('round3').style.display = 'block'
        document.getElementById('waitingMessage').style.display = 'none';
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
        if (soloAux>0) {
            document.getElementById('round4').style.display = 'flex'
            displayMatchup()
        }
        soloAux = soloAux+1
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
        if (soloAux>0) {
            document.getElementById('round4').style.display = 'flex'
            displayMatchup()
        }
        soloAux = soloAux+1
    }
    if (data.msg === 'Tournament next') {
        displayMatchup()
    }
    if (data.msg === 'Player Solo') {
        soloAux = 0
    }
    console.log('Mensagem recebida:', data.msg);
    const contemHostELeft = data.msg.includes('Host') && data.msg.includes('left');
    const contemHostEJoined = data.msg.includes('Host') && data.msg.includes('joined');

    if (contemHostELeft) {
        document.getElementById('oopsHostMessage').style.display = 'flex'
    } else if (contemHostEJoined) {
        document.getElementById('oopsHostMessage').style.display = 'none'
    }
});

socket.on('update_players', function(data) {
    const usernameExists = data.some(item => item.username === actualUsername);
    if (!usernameExists) {
        socket.disconnect()
        localStorage.setItem('room', '')
        document.getElementById('kickMessage').style.display = 'flex'
        setTimeout(function() {
            backToBox()
        }, 5000)
    }
})

function checkGameStatus() {
    fetch(`/room_status/${roomId}`)
    .then(response => response.json())
    .then(data => {
        // Verifica se o playerId está presente na resposta

        if (data.started && !gameStarted) {
            const playerId = localStorage.getItem('playerId');

            if (!data.players[playerId]) {
                document.getElementById('userSelect').style.display = 'none'
                document.getElementById('oopsMessage').style.display = 'flex'
                socket.disconnect()
                return
            }
            gameStarted = true;
        }
        if (data.current_round === 1 && data.remaining_time > 0) {
            document.getElementById('userSelect').style.display = 'none'
            document.getElementById('waitingMessage').style.display = 'none';
            document.getElementById('drawingArea').style.display = 'flex';
            const drawingCheck = localStorage.getItem('drawings')
            if (drawingCheck >= 3) {
                document.getElementById('drawingArea').style.display = 'none';
                document.getElementById('waitingMessage').style.display = 'flex';
            }
            initializeCanvas();
        }
        if (data.current_round === 1 && data.remaining_time === 0) {
            document.getElementById('drawingArea').style.display = 'none';
            document.getElementById('waitingMessage').style.display = 'flex';
        }
        if (data.current_round === 2 && data.remaining_time > 0) {
            document.getElementById('userSelect').style.display = 'none'
            document.getElementById('waitingMessage').style.display = 'none';
            document.getElementById('phraseInput').style.display = 'flex';
        }
        if (data.current_round === 2 && data.remaining_time === 0) {
            document.getElementById('phraseInput').style.display = 'none';
            document.getElementById('waitingMessage').style.display = 'flex';
        }
        if (data.current_round > 2) {
            document.getElementById('userSelect').style.display = 'none'
            document.getElementById('waitingMessage').style.display = 'none';
            document.getElementById('roundErrorMessage').style.display = 'flex';
            socket.disconnect()
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


window.addEventListener('beforeunload', function (event) {
    // Define a mensagem a ser exibida no alerta
    const message = 'Tem certeza de que deseja sair da página? As alterações não salvas serão perdidas.';
    
    // Alguns navegadores modernos ignoram a customização da mensagem,
    // mas ainda assim exibem um alerta padrão de confirmação
    event.returnValue = message; // Definido para compatibilidade com alguns navegadores
    return message; // Para outros navegadores que utilizam essa forma
});

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
        characterNew = element.innerHTML
    });


    localStorage.setItem('username', username);
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
        if (data.message === 'Player added' || data.message === 'Rejoining...') {
            console.log('Token:', data.token); // O token é o próprio playerId
            console.log(data.message);

            localStorage.setItem('playerId', data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('character', character);
            document.getElementById('userSelect').innerHTML = ''
            actualUsername = username
        } else if (data.message === 'Character already taken') {
            document.querySelectorAll('.character-img').forEach(function(element) {
                element.classList.add('error');
                setTimeout(function() {
                    element.classList.remove('error');
                }, 200)
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function initializeCanvas() {
    canvas.addEventListener('mousedown', (e) => {
        if (!fillMode) startDrawing();
        fill(e);
    });
   canvas.addEventListener('mousemove', draw);
   canvas.addEventListener('mouseup', stopDrawing);

   canvas.addEventListener('touchstart', (e) => {
        if (!fillMode) startDrawing();
        fill(e);
    });
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

document.getElementById('bucketBtn').addEventListener('click', () => {
    fillMode = !fillMode;
    document.querySelectorAll('.active-other').forEach(function(element) {
        element.classList.remove('active-other');
    });
    document.getElementById('bucketBtn').classList.add('active-other')
});

let firstIteration = false

function setColor(color) {
    currentColor = color;
    if (firstIteration == false) {
        lastColor = 'black'  
    }
    document.getElementById('actualColor').style.backgroundColor = currentColor;

    if (lastColor && document.getElementById(lastColor)) {
        document.getElementById(lastColor).style.borderColor = '#3f3f3f';
    }

    if (document.getElementById(color)) {
        document.getElementById(color).style.borderColor = 'white';
    }

    firstIteration = true
    lastColor = color;
}

function setBrushSize(size, element) {
    currentSize = size;
    fillMode = false;
    document.querySelectorAll('.active').forEach(function(element) {
        element.classList.remove('active');
    });
    document.querySelectorAll('.active-other').forEach(function(element) {
        if (element.id == 'bucketBtn') { // Verifica se o ID é diferente de 'bucketBtn'
            element.classList.remove('active-other');
        }
    });
    element.classList.add('active'); // Add 'active' to the clicked element
}


function setEraser(element) {
    currentColor = 'white';
    fillMode = false
    document.querySelectorAll('.active-other').forEach(function(element) {
        element.classList.remove('active-other');
    });

    element.classList.add('active-other')
}

function startDrawing(event) {
   drawing = true;
   draw(event);
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
}

function fill(e) {
    if (fillMode) {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
        const fillColor = hexToRgb(currentColor);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const targetColor = getPixelColor(data, x, y);

        if (!colorsMatch(targetColor, fillColor)) {
            floodFill(x, y, targetColor, fillColor, data);
            ctx.putImageData(imageData, 0, 0);
        }
    }
}

function floodFill(x, y, targetColor, fillColor, data) {
    const stack = [[x, y]];
    const width = canvas.width;
    const height = canvas.height;

    while (stack.length > 0) {
        const [cx, cy] = stack.pop();
        const index = (cy * width + cx) * 4;

        if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;
        if (data[index] !== targetColor.r || data[index + 1] !== targetColor.g || data[index + 2] !== targetColor.b) continue;

        data[index] = fillColor.r;
        data[index + 1] = fillColor.g;
        data[index + 2] = fillColor.b;
        data[index + 3] = 255;

        stack.push([cx + 1, cy]);
        stack.push([cx - 1, cy]);
        stack.push([cx, cy + 1]);
        stack.push([cx, cy - 1]);
    }
}

function getPixelColor(data, x, y) {
    const index = (y * canvas.width + x) * 4;
    return {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2]
    };
}

function colorsMatch(color1, color2) {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
}

function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
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
        let drawings = localStorage.getItem('drawings');
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
            document.getElementById('waitingMessage').style.display = 'flex';
            socket.emit('message', {message: playerId, room_id: roomId });
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
                } else {
                    document.getElementById('round2').style.display = 'none';
                    document.getElementById('waitingMessage').style.display = 'flex';
                    socket.emit(playerId);
                }
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
            document.getElementById('waitingMessage').style.display = 'none'
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
            document.getElementById('waitingMessage').style.display = 'flex'
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

function backToBox() {
    window.location.href = `/`;
}
