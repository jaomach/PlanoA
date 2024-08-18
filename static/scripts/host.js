let countdown;
let timeLeft;
let round1 = true;
let round2 = false;
let handleRound2 = false;
let round3 = false;
let handleRound3 = false;
let handleRound4 = false;
let handleRound5 = false;
let round4 = false;
let round5 = false;
let currentMatchupIndex = 0;
let gameStarted = false;
let auxGameStarted = false;
let matchups = [];
let winners = [];
let roundsHandled = {};
let currentRound = 6;
let actualPlayer1 = ''
let actualPlayer2 = ''
let timeOuts = []
let round2Time = 240
let round3Time = 90
console.log(auxGameStarted)
const fullscreenBtn = document.getElementById('fullscreen');

fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement && fullscreenBtn.src.includes('fullscreen.svg')) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
        fullscreenBtn.src = '/static/images/collapse.svg';
    } else if (document.fullscreenElement && fullscreenBtn.src.includes('collapse.svg')) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        fullscreenBtn.src = '/static/images/fullscreen.svg';
    }
});

document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        fullscreenBtn.src = '/static/images/fullscreen.svg';
    } else {
        fullscreenBtn.src = '/static/images/collapse.svg';
    }
});

const muteBtn = document.getElementById('volume');
muteBtn.addEventListener('click', function() {
    const audioElements = document.querySelectorAll('audio, video');

    if (audioElements.length > 0) {
        // Verifica se o primeiro elemento de áudio/vídeo está mutado
        const isMuted = audioElements[0].muted;

        // Alterna o estado de mutação de todos os elementos de áudio/vídeo
        audioElements.forEach(function(element) {
            element.muted = !isMuted;
        });

        if (isMuted) {
            muteBtn.src = '/static/images/volume-up.svg';
        } else {
            muteBtn.src = '/static/images/volume-off.svg';
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !gameStarted) {
        gameStarted = true;
        startGame();
    }
    if (event.key === 's') {
        document.getElementById('skipRoundBtn').click()
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === '1' && !gameStarted) {
        round2Var1()
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === '2' && !gameStarted) {
        round2Var2()
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === '3' && !gameStarted) {
        round2Var3()
    }
});


console.log('Connecting to server with roomId:', roomId);
var socket = io({ query: { roomId: roomId } });

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('join', { room_id: roomId });
});


socket.on('message', function(data) {
    if (data.msg) {
        document.getElementById('container-' + data.msg).classList.remove('in-game')
    }

    console.log('Mensagem recebida:', data.msg);
});

let previousImageSrc = {};

let previousPlayers = {};

function fetchPlayers() {
fetch(`/room_status/${roomId}`)
.then(response => response.json())
.then(data => {
const playerList = document.getElementById('playerList');

for (const [playerId, playerData] of Object.entries(data.players)) {
    let playerContainer = document.getElementById(`container-${playerId}`);
    let playerImage, playerItem;

    if (!playerContainer) {
        playerContainer = document.createElement('div');
        playerContainer.classList.add('player-container');
        playerContainer.id = `container-${playerId}`;

        playerImage = document.createElement('img');
        playerImage.classList.add('character-image');
        playerImage.id = `image-${playerId}`;
        playerContainer.appendChild(playerImage);

        playerItem = document.createElement('div');
        playerSign = document.createElement('div');
        playerItem.classList.add('fodao');
        playerSign.classList.add('sign');
        playerItem.id = playerId;
        playerSign.appendChild(playerItem);
        playerContainer.appendChild(playerSign);

        playerList.appendChild(playerContainer);
    } else {
        playerImage = document.getElementById(`image-${playerId}`);
        playerItem = document.getElementById(playerId);
    }

    // verificação e atualização da imagem
    const newImageSrc = `/static/images/${playerData.character}.png`;
    if (!previousPlayers[playerId] || previousPlayers[playerId].character !== playerData.character) {
        playerImage.src = newImageSrc;
    }

    // texto do jogador
    if (!previousPlayers[playerId] || previousPlayers[playerId].username !== playerData.username) {
        playerItem.textContent = `${playerData.username}`;
    }
}

//funciona filho da puta funcionou
previousPlayers = { ...data.players };

if (data.remaining_time === 0 && round1 === true) {
    round1 = false;
    timeLeft = 0;
    roundCallRandom(round2Var1, round2Var2, round2Var3)
}
if (data.current_round === 2 && round2 === false) {
    round2 = true;
    document.getElementById('rounds').classList.remove('aparecendo')
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.add('in-game');
    });
    socket.emit('message', { message: 'Round 2 started', room_id: roomId });
}
if (data.remaining_time === 0 && data.current_round === 2 && handleRound2 === false) {
    timeLeft = 0;
    handleRound2 = true;
    roundCallRandom(round3Var1, round3Var2, round3Var3)
}
if (data.current_round === 3 && round3 === false) {
    round3 = true;
    document.getElementById('rounds').classList.remove('aparecendo')
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.add('in-game');
    });
    socket.emit('message', { message: 'Round 3 started', room_id: roomId });
}
if (data.remaining_time === 0 && data.current_round === 3 && handleRound3 === false) {
    timeLeft = 0;
    handleRound3 = true;
    startCountdown(30, 12000);
    document.getElementById('circle').classList.add('close')
    document.getElementById('rounds').classList.add('aparecendo')
    document.getElementById('barreira').classList.add('animada')
    socket.emit('message', { message: 'Round 3 finished', room_id: roomId });
    setTimeout(function() {
        startTournament(roomId);
        document.getElementById('body').classList.add('desligado')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('playerList').style.display = 'none'
        document.getElementById('circle').classList.add('open')
        setTimeout(function() {
            fetchMatchups();
        }, 1000);
        setTimeout(function() {
            document.getElementById('papaleguas').classList.add('appear')
        }, 2000);
    }, 10000);
}
if (data.current_round === 4 && round4 === false) {
    round4 = true;
    document.getElementById('rounds').classList.remove('aparecendo')
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.add('in-game');
    });
    socket.emit('message', { message: 'Round 4 started', room_id: roomId });
}
if (data.remaining_time === 0 && data.current_round === 4 && handleRound4 === false) {
    handleRound4 = true;
    timeLeft = 0;
    processVotes(data);
    startCountdown(30, 10000);
    setTimeout(function() {
        document.getElementById('papaleguas').classList.remove('appear')
    }, 5000)
    socket.emit('message', { message: 'Round 4 finished', room_id: roomId });
}
if (data.current_round === 5 && round5 === false) {
    document.getElementById('papaleguas').classList.add('appear')
    round5 = true;
    socket.emit('message', { message: 'Round 5 started', room_id: roomId });
}
if (data.remaining_time === 0 && data.current_round === 5 && handleRound5 === false) {
    handleRound5 = true;
    timeLeft = 0;
    processVotes(data);
    startCountdown(30, 10000);
    setTimeout(function() {
        document.getElementById('papaleguas').classList.remove('appear')
    }, 5000)
    socket.emit('message', { message: 'Round 5 finished', room_id: roomId });
}

//round infinito pra quem não conhece
if (data.current_round >= 6) {
    if (data.remaining_time === 0 && roundsHandled[data.current_round] === false) {
        roundsHandled[data.current_round] = true;
        timeLeft = 0;
        processVotes(data);
        startCountdown(30, 10000); // AJUSTAR O TEMPO DA PARTIDA ROUNDS INFINITOS nunca vou precisar disso
        setTimeout(function() {
            document.getElementById('papaleguas').classList.remove('appear')
        }, 5000)
        socket.emit('message', { message: `Last round finished`, room_id: roomId });
    }
    if (data.current_round === currentRound && !(currentRound in roundsHandled)) {
        roundsHandled[currentRound] = false;
        document.getElementById('papaleguas').classList.add('appear')
        socket.emit('message', { message: `Next round started`, room_id: roomId });
        currentRound++;
    }
}
})
.catch(error => {
    console.error('Error:', error);
});
}

verifyRoom()

function startGame() {
    fetch(`/start_game/${roomId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Game started') {
            roundCallRandom(round1Var1, round1Var1, round1Var1)
            document.querySelectorAll('.player-container').forEach(function(element) {
                element.classList.add('in-game');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function startCountdown(duration, intervalo) {
    clearInterval(countdown);
    const timerElement = document.getElementById('timer');
    timeLeft = duration
    if (auxGameStarted === true) {
        timeOuts.push(setTimeout(function() {
            console.log(auxGameStarted)
            startNextRound(duration);
            timeLeft = duration;
            timerElement.textContent = timeLeft
        }, intervalo))
    } else {
        timeLeft=duration
        auxGameStarted = true
        timerElement.textContent = timeLeft
    }

    timeOuts.push(setTimeout(function() {
        countdown = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                timerElement.style.display = 'none'
            }
        }, 1000);
    }, intervalo));
}

function modifyTimer(seconds) {
    timeLeft += seconds;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
}

function startNextRound(duration) {
    fetch(`/start_round/${roomId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ duration: duration })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Round started') {
            document.getElementById('timer').style.display = 'block'
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.onload = () => {
    fetchPlayers();
    setInterval(fetchPlayers, 3000);
};

function startTournament(roomId) {
    fetch(`/start_tournament/${roomId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log('Tournament started:', data.rounds);

        });
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
    }
}

function displayMatchup() {
    const matchupsDiv = document.getElementById('matchups');
    matchupsDiv.innerHTML = ''; 

    if (currentMatchupIndex < matchups.length) {
        const matchup = matchups[currentMatchupIndex];
        const matchupDiv = document.createElement('div');
        matchupDiv.classList.add('matchup');
        matchupDiv.id = 'papaleguas';
        const player1 = matchup.players[0];
        const player2 = matchup.players[1];
        const combinations = matchup.combinations;

        const player1Comb = combinations[0][0];
        const player1Div = document.createElement('div');
        player1Div.classList.add('fodinha')
        player1Div.id = `${player1}Container`
        actualPlayer1 = `${player1}`
        player1Div.innerHTML = `
            <div id="${player1}Voters" class="voters-container"></div>
            <img id="${player1}Drawing" class="drawings" style="background-image: url(${player1Comb.image_path}); background-size: 68%;" src="/static/images/cu.png" alt="${player1}">
            <span id="${player1}Phrase" class="phrases">${player1Comb.phrase}</span>
            <img id="${player1}Iluminacao" class="iluminacao-matchup" src="/static/images/iluminacao.png"></img>
        `;
        matchupDiv.appendChild(player1Div);
        setTimeout( function() {
            const iluminacaoMatchupP1 = document.getElementById(`${player1}Iluminacao`)
            iluminacaoMatchupP1.classList.add('aceso')
        }, 6000);

        if (player2) {
            const player2Comb = combinations[1][0];
            const player2Div = document.createElement('div');
            player2Div.classList.add('fodinha')
            player2Div.id = `${player2}Container`
            actualPlayer2 = `${player2}`
            player2Div.innerHTML = `
                <div id="${player2}Voters" class="voters-container"></div>
                <img id="${player2}Drawing" class="drawings" style="background-image: url(${player2Comb.image_path}); background-size: 68%;" src="/static/images/cu.png" alt="${player2}">
                <span id="${player2}Phrase" class="phrases">${player2Comb.phrase}</span>
                <img id="${player2}Iluminacao" class="iluminacao-matchup" src="/static/images/iluminacao.png"></img>
            `;
            matchupDiv.appendChild(player2Div);
            
            function callRandomAI() {
                players = [player1Comb.image_path, player2Comb.image_path];
                const choosedPlayer = players[Math.floor(Math.random() * players.length)];
            
                // Gere um número aleatório e compare com 0.8
                if (Math.random() <= 1) {
                    sendToAI(choosedPlayer);
                    setTimeout(function() {
                        document.getElementById('messageContainer').classList.add('aparecendo');
                    }, 2000)
                }
                function gerarUsername() {
                    // Listas de nomes, comidas e números
                    const criterios1 = ["Pedro", "Goku", "Sasuke", "OcultDay", "PaulaNoku", player1, player2];
                    const criterios2 = ["SocaFofo", "FC", "OFC", "Implacavel", "Amostradinho", "Pensador"];
                    const criterios3 = [12, 34, 56, 78, 90];
                
                    // Função para escolher um elemento aleatório de uma lista
                    function escolherAleatorio(lista) {
                        return lista[Math.floor(Math.random() * lista.length)];
                    }
                
                    // Gerando as partes do username
                    const criterio1 = escolherAleatorio(criterios1);
                    const criterio2 = escolherAleatorio(criterios2);
                    const criterio3 = escolherAleatorio(criterios3);
                
                    // Combinando as partes para formar o username
                    const username = `${criterio1}${criterio2}${criterio3}`;
                    return username;
                }
                
                const usernameAleatorio = gerarUsername();
                document.getElementById('usernameMessage').innerText = `@${usernameAleatorio}`
            }

            callRandomAI()

            setTimeout(function() {
                document.getElementById('messageContainer').classList.remove('aparecendo')
            }, 25000)
            setTimeout(function() {
            const iluminacaoMatchupP2 = document.getElementById(`${player2}Iluminacao`)
            iluminacaoMatchupP2.classList.add('aceso')
            }, 6000);
            
        } else {
            actualPlayer2 = `${player1}`
            console.log('numero impar')
            setTimeout(function() {
                timeLeft = 10
            }, 2000);
        }
        matchupsDiv.appendChild(matchupDiv);
    }
}
function nextMatchup(mostVoted) {
    winners.push(mostVoted);
    currentMatchupIndex++;
    setTimeout(function() {
        saveWinners()
    }, 7000);
    setTimeout(function() {
        perderAnimation(mostVoted)
    }, 2000);
}

async function saveWinners() {
    try {
        const response = await fetch(`/tournament/${roomId}/advance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ winners })
        });

        if (!response.ok) {
            if (response.status === 400) {
                socket.emit('message', { message: `Tournament next`, room_id: roomId });
                displayMatchup();
            }
            throw new Error(`Failed to advance the tournament: ${response.statusText}`);
        }

        const responseData = await response.json();

        if (responseData.winner) {
            const gameWinner = responseData.winner
            socket.emit('message', { message: `Tournament finished`, room_id: roomId });
            console.log(responseData.winner);
            console.log('sou IRADO');
            showWinner(gameWinner);
        }

        fetchMatchups();
        socket.emit('message', { message: `Tournament advanced`, room_id: roomId });
    } catch (error) {
        console.error(error);
    }
}

function showWinner(winner) {
    var circle = document.getElementById('circle');
    circle.classList.add('close');

    setTimeout(function() {
        var playerToRemove = actualPlayer1 === winner ? actualPlayer2 : actualPlayer1;
        
        if (document.getElementById(`${playerToRemove}Container`)) {
            document.getElementById(`${playerToRemove}Container`).remove();
        }

        circle.classList.remove('close');
        circle.classList.add('open');
    }, 5000);
}

function processVotes(data) {
    console.log('Room Status:', data);

    // Mostrar quem votou em quem
    for (const [user, vote] of Object.entries(data.votes)) {
        const characterName = data.players[user].character;
        console.log(`${user} votou em ${vote}`);
        const playerContainer = document.getElementById(`${vote}Voters`);
        if (playerContainer) {
            const voters = document.createElement('div');
            playerContainer.appendChild(voters);

            const votersImg = document.createElement('img');
            votersImg.src = `/static/images/vote/${characterName}Vote.png`;
            votersImg.classList.add('voter-image');
            voters.appendChild(votersImg);
        }
    }

    const voteCounts = {};
    for (let vote of Object.values(data.votes)) {
        voteCounts[vote] = (voteCounts[vote] || 0) + 1;
    }

    let mostVoted = [];
    let maxVotes = 0;
    for (let [option, count] of Object.entries(voteCounts)) {
        if (count > maxVotes) {
            maxVotes = count;
            mostVoted = [option];
        } else if (count === maxVotes) {
            mostVoted.push(option);
        }
    }

    if (mostVoted.length > 1 || mostVoted.length === 0) {
        const randomIndex = Math.floor(Math.random() * 2);
        mostVoted = randomIndex === 0 ? actualPlayer1 : actualPlayer2;
    } else {
        mostVoted = mostVoted[0];
    }

    const leastVoted = mostVoted === actualPlayer1 ? actualPlayer2 : actualPlayer1;

    console.log('actual player 1:', actualPlayer1);
    console.log('actual player 2:', actualPlayer2);
    console.log('most voted:', mostVoted);
    console.log('least voted:', leastVoted);

    if (leastVoted) {
        const perdedorContainer = document.getElementById(`${leastVoted}Container`)
        const perdedorAuxContainer = document.createElement('div')
        const perdedorSign = document.createElement('img')
        const perdedorImg = document.createElement('img')
        perdedorSign.src = '/static/images/plaquinha.png'
        perdedorImg.src = `/static/images/perdedor/${data.players[leastVoted].character}.png`
        perdedorImg.classList.add('perdedor-image')
        perdedorImg.id = 'perdedorImg'
        perdedorAuxContainer.classList.add('perdedor-container')
        perdedorSign.classList.add('perdedor-sign')
        perdedorContainer.appendChild(perdedorAuxContainer)
        perdedorAuxContainer.appendChild(perdedorImg)
        perdedorAuxContainer.appendChild(perdedorSign)
    }

    nextMatchup(mostVoted);
    console.log(`Most Voted Option: ${mostVoted} (${maxVotes} votes)`);
    console.log(`Least Voted Option: ${leastVoted}`);
}



function perderAnimation(winner) {
    const drawingVencedor = document.getElementById(`${winner}Drawing`);
    const phraseVencedor = document.getElementById(`${winner}Phrase`);
    drawingVencedor.classList.add('drawing-hold');
    phraseVencedor.classList.add('hold');
    drawingVencedor.classList.remove('drawings');
    phraseVencedor.classList.remove('phrases');
    
    const drawingPerdedor = document.getElementsByClassName('drawings');
    const phrasePerdedor = document.getElementsByClassName('phrases');
    for (let i = 0; i < drawingPerdedor.length; i++) {
    drawingPerdedor[i].classList.add('perdedor');
    phrasePerdedor[i].classList.add('perdedor');
    }
}

function verifyRoom() {
    fetch(`/room_status/${roomId}`)
    .then(response => response.json())
    .then(data => {
        console.log('Response data:', data);
        if (data.started === true) {
            setTimeout(function() {
                auxGameStarted = false
                console.log(auxGameStarted)
                const remainingTime = data.remaining_time
                document.getElementById('timer').style.display = 'block'
                document.getElementById('startButton').style.display = 'none'
                document.getElementById('timer').classList.add('appear')
                startCountdown(remainingTime - 5, 0)
            }, 2000)
        }
        if (data.currentRound === 1) {
            setTimeout(function() {
                auxGameStarted = false
                console.log(auxGameStarted)
                const remainingTime = data.remaining_time
                document.getElementById('timer').style.display = 'block'
                document.getElementById('startButton').style.display = 'none'
                document.getElementById('timer').classList.add('appear')
                startCountdown(remainingTime - 5, 0)
            }, 2000)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function roundCallRandom(variavel1, variavel2, variavel3) {
    const roundVars = [variavel1, variavel2, variavel3];
    const selectVar = roundVars[Math.floor(Math.random() * roundVars.length)];
    selectVar();
}

function round1Var1() {
    document.getElementById('skipRoundBtn').disabled = true;
    document.getElementById('startButton').disabled = true;
    document.getElementById('timer').style.display = 'block'
    document.getElementById('startButton').classList.add('translate')
    var whistleDown = document.getElementById("whistleDown");
    var whistleUp = document.getElementById("whistleUp");
    var soundTrackR1 = document.getElementById("soundTrackR1");
    var audioRodada1 = document.getElementById("audioR1");
    const body = document.body
    const round1 = document.createElement('img')
    round1.src = '/static/images/Round1.png'
    round1.id = 'rounds'
    document.getElementById('roundContainer').appendChild(round1)
    auxGameStarted = true

    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round2.png" id="rounds">
    `
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/legenda.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
        });

    audioRodada1.ontimeupdate = function() {
        var currentTime = audioRodada1.currentTime;
        var subtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
        if (subtitle) {
        subtitleDiv.innerHTML = subtitle.text;
        } else {
        subtitleDiv.innerHTML = '';
        }
    };

    setTimeout(function() {
        document.getElementById('startButton').classList.add('desappear')
        document.getElementById('timerContainer').classList.remove('appear')
        document.getElementById('circle').classList.add('close')
        whistleDown.play();
        setTimeout(function() {
            startCountdown(240, 16000);
            soundTrackR1.play();
            audioRodada1.play();
            document.getElementById('iluminacao').classList.add('aceso')
            document.getElementById('logo').classList.add('aparecendo')
            document.getElementById('show').classList.add('aparecendo')
        }, 1000);
    }, 500);
    setTimeout(function() {
        document.getElementById('show').classList.remove('aparecendo')
        document.getElementById('logo').classList.remove('aparecendo')
        document.getElementById('iluminacao').classList.remove('aceso')
    }, 9210);
    setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        document.getElementById('rounds').classList.add('aparecendo')
    }, 12210);
    setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play()
        document.getElementById('rounds').classList.remove('aparecendo')
        socket.emit('message', { message: 'Game started', room_id: roomId });
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
        document.getElementById('timerContainer').classList.add('appear')
    }, 16000);
    console.log(auxGameStarted)
}

function round2Var1() {
    socket.emit('message', { message: 'Round 1 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR1 = document.getElementById("soundTrackR1");
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var audioR2Var1 = document.getElementById("audioR2");
    soundTrackR2.src = '/static/audios/r2/soundTrackR2.mp3'
    audioR2Var1.src = '/static/audios/r2/audioR2Var1.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    var playerContainers = clonedPlayerList.querySelectorAll('.player-container');

    timeOuts.push(setTimeout(function() {
        playerContainers.forEach(function(container) {
            var img = container.querySelector('img');
            
            if (img.src.includes('/static/images/')) {
                img.src = img.src.replace('/static/images/', '/static/images/perdedor/');
            }
        });
    }, 5500))

    // Adiciona a div clonada ao DOM
    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round2.png" id="rounds">
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/captionR2Var1.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
    });

    audioR2Var1.ontimeupdate = function() {
        var currentTime = audioR2Var1.currentTime;
        var subtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
        if (subtitle) {
        subtitleDiv.innerHTML = subtitle.text;
        } else {
        subtitleDiv.innerHTML = '';
        }
    };

    timeOuts.push(setTimeout(function() {
        document.getElementById('timerContainer').classList.remove('appear')
        document.getElementById('timer').classList.add('appear')
        document.getElementById('circle').classList.add('close')
        whistleDown.play();
        setTimeout(function() {
            clonedPlayerList.classList.add('appear')
        }, 1800)
        setTimeout(function() {
            startCountdown(round2Time, 12000);
            soundTrackR1.pause();
            soundTrackR2.play();
            audioR2Var1.play();

            setTimeout(function() {
                document.getElementById('iluminacao').classList.add('aceso')
            }, 1670)
        }, 1000);
    }, 500));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        clonedPlayerList.classList.remove('appear')
    }, 6600));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        document.getElementById('rounds').classList.add('aparecendo')
    }, 9300));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play()
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
        document.getElementById('timerContainer').classList.add('appear')
    }, 11970));
}

function round2Var2() {
    socket.emit('message', { message: 'Round 1 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR1 = document.getElementById("soundTrackR1");
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var audioR2Var1 = document.getElementById("audioR2");
    soundTrackR2.src = '/static/audios/r2/soundTrackR2.mp3'
    audioR2Var1.src = '/static/audios/r2/audioR2Var2.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    // Adiciona a div clonada ao DOM
    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round2.png" id="rounds">
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/captionR2Var2.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
    });

    audioR2Var1.ontimeupdate = function() {
        var currentTime = audioR2Var1.currentTime;
        var subtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
        if (subtitle) {
        subtitleDiv.innerHTML = subtitle.text;
        } else {
        subtitleDiv.innerHTML = '';
        }
    };

    timeOuts.push(setTimeout(function() {
        document.getElementById('timerContainer').classList.remove('appear')
        document.getElementById('timer').classList.add('appear')
        document.getElementById('circle').classList.add('close')
        whistleDown.play();
        setTimeout(function() {
            clonedPlayerList.classList.add('appear')
        }, 1700)
        setTimeout(function() {
            startCountdown(round2Time, 12800);
            soundTrackR1.pause();
            soundTrackR2.play();
            audioR2Var1.play();

            setTimeout(function() {
                document.getElementById('iluminacao').classList.add('aceso')
            }, 1670)
        }, 1000);
    }, 500));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        clonedPlayerList.classList.remove('appear')
    }, 6600));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        document.getElementById('rounds').classList.add('aparecendo')
    }, 9300));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play()
        document.getElementById('timerContainer').classList.add('appear')
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
}, 12600));
}

function round2Var3() {
    socket.emit('message', { message: 'Round 1 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timerContainer').classList.remove('appear')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR1 = document.getElementById("soundTrackR1");
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var audioR2Var1 = document.getElementById("audioR2");
    soundTrackR2.src = '/static/audios/r2/soundTrackR2.mp3'
    audioR2Var1.src = '/static/audios/r2/audioR2Var3.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round2Vote.png" id="rounds">
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);

    var playerContainers = clonedPlayerList.querySelectorAll('.player-container');

    playerContainers.forEach(function(container) {
        var img = container.querySelector('img');
        
        if (img.src.includes('/static/images/')) {
            img.src = img.src.replace('/static/images/', '/static/images/perdedor/');
        }
    });

    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/captionR2Var3.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
    });

    audioR2Var1.ontimeupdate = function() {
        var currentTime = audioR2Var1.currentTime;
        var subtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
        if (subtitle) {
        subtitleDiv.innerHTML = subtitle.text;
        } else {
        subtitleDiv.innerHTML = '';
        }
    };

    timeOuts.push(setTimeout(function() {
        document.getElementById('timer').classList.add('appear')
        document.getElementById('circle').classList.add('close')
        whistleDown.play();
        setTimeout(function() {
            startCountdown(round2Time, 18800);
            soundTrackR1.pause();
            soundTrackR2.play();
            audioR2Var1.play();

            setTimeout(function() {
                document.getElementById('iluminacao').classList.add('aceso')
                clonedPlayerList.classList.add('appear')
            }, 800)
        }, 1000);
    }, 500));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        clonedPlayerList.classList.remove('appear')
    }, 6729));
    timeOuts.push(setTimeout(function() {
        document.getElementById('rounds').classList.add('aparecendo')
        setTimeout(function() {
            document.getElementById('iluminacao').classList.add('aceso')
        }, 1021)
    }, 10169));
    timeOuts.push(setTimeout(function() {
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('iluminacao').classList.remove('aceso')
    }, 12732))
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        setTimeout(function() {
            document.getElementById('rounds').src = '/static/images/Round2.png'
            document.getElementById('rounds').classList.add('aparecendo')
        }, 500)
    }, 15400))
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play()
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
        document.getElementById('timerContainer').classList.add('appear')
    }, 18500));
}

function round3Var1() {
    startCountdown(round3Time, 10000);
    document.getElementById('circle').classList.add('close')
    document.getElementById('rounds').classList.add('aparecendo')
    whistleDown.play();
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });
    setTimeout(function() {
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play();
    }, 10000);
}

function round3Var2() {
    startCountdown(round3Time, 1000);
    document.getElementById('circle').classList.add('close')
    document.getElementById('rounds').classList.add('aparecendo')
    whistleDown.play();
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });
    setTimeout(function() {
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play();
    }, 1000);
}

function round3Var3() {
    startCountdown(round3Time, 10000);
    document.getElementById('circle').classList.add('close')
    document.getElementById('rounds').classList.add('aparecendo')
    whistleDown.play();
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });
    setTimeout(function() {
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play();
    }, 10000);
}

function skipRound(round) {
    document.getElementById('skipRoundBtn').disabled = true;
    document.getElementById('skipRoundBtn').classList.remove('aparecendo')
    timeOuts.forEach(function(timeoutID) {
        clearTimeout(timeoutID);
    });
    if (round === 1) {
        const audioR1Var1 = document.getElementById("audioR1");
        audioR1Var1.pause();
        audioR1Var1.currentTime = 0;
        startCountdown(15, 500)
    } 
    if (round === 2) {
        const audioR2Var1 = document.getElementById("audioR2");
        audioR2Var1.pause();
        audioR2Var1.currentTime = 0;
        startCountdown(15, 500)
    }
    if (round === 3) {
        const audioR3Var1 = document.getElementById("audioR3");
        audioR3Var1.pause();
        audioR3Var1.currentTime = 0;
        startCountdown(15, 500)
    }
    if (round === 4) {
        const audioR3Var1 = document.getElementById("audioR3");
        audioR3Var1.pause();
        audioR3Var1.currentTime = 0;
        startCountdown(40, 500)
    }
    document.getElementById('circle').classList.remove('close')
    document.getElementById('circle').classList.add('open')
    document.getElementById('roundContainer').innerHTML = ''
    document.getElementById('roundContainer').innerHTML = `
        <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
        <img id="logo" src="/static/images/LOGO.png" alt="">
        <img id="show" src="/static/images/OSHOW.png" alt="">
    `
}
function sendToAI(image_path) {
    const imagePath = image_path;

    fetch('/call_ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_path: imagePath })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.response;
    })
    .catch(error => console.error('Error:', error));
}




let lastTime = performance.now();
let frame = 0;
let fps = 0;

function calculateFPS() {
    const now = performance.now();
    const delta = (now - lastTime) / 1000; // Tempo em segundos
    lastTime = now;
    fps = 1 / delta; // FPS

    document.getElementById('fps').textContent = `FPS: ${fps.toFixed(2)}`;

    requestAnimationFrame(calculateFPS);
}

calculateFPS();

const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        console.log(`${entry.entryType} [${entry.name}]: ${entry.duration}ms`);
    });
});

observer.observe({ entryTypes: ['longtask'] }); // Observe "long tasks" que podem indicar uso intenso de CPU