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
let quality = localStorage.getItem('pc-gm-qual')
let timeOuts = []
let round1Time = 240
let round2Time = 120
let round3Time = 90
let round4Time = 35
let optionsActive = false
let gameWinner
gameMenuListening = false
//console.log(auxGameStarted)
const fullscreenBtn = document.getElementById('fullscreen');

function callRound4Test() {
    timeLeft = 0;
    handleRound3 = true;
    roundCallRandom(round4Var1, round4Var1, round4Var1)
    socket.emit('message', { message: 'Round 3 finished', room_id: roomId });
}

function gameMenuChange() {
    const elements = document.querySelectorAll('.bar-element');
    const gameOptionContainer = document.getElementById('gameOption')
    const videoOptionContainer = document.getElementById('videoOption')
    const audioOptionContainer = document.getElementById('audioOption')
    const audioElements = document.querySelectorAll('audio');
    const audioSampleSlider = document.getElementById('sampleAudio');
    const volumeSlider = document.getElementById('volume-slider');
    const animationSelect = document.getElementById('animationSelect');
    const screenEffectSelect = document.getElementById('screenSelect')
    const screenEffectContainer = document.getElementById('effectContainer')
    const roundtime1Input = document.getElementById('roundtime1Input');
    const roundtime2Input = document.getElementById('roundtime2Input');
    const roundtime3Input = document.getElementById('roundtime3Input');
    const roundtime4Input = document.getElementById('roundtime4Input');
    optionsActive = true
    gameMenuListening = true

    roundtime1Input.addEventListener('input', () => {
        round1Time = roundtime1Input.value;
    });
    roundtime2Input.addEventListener('input', () => {
        round2Time = roundtime2Input.value;
    });
    roundtime3Input.addEventListener('input', () => {
        round3Time = roundtime3Input.value;
    });
    roundtime4Input.addEventListener('input', () => {
        round4Time = roundtime4Input.value;
    });

    // Log the selected value to the console
    animationSelect.addEventListener('change', () => {
    //    console.log(animationSelect.value);
    });
    screenEffectSelect.addEventListener('change', () => {
        screenEffectContainer.classList.toggle('ativo')
    });

    // Volume control for all audio elements
    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value;
        audioElements.forEach(audio => {
            audio.volume = volume;
        });
    });

    volumeSlider.addEventListener('mouseup', () => {
        audioSampleSlider.play();
    });

    // Adiciona um event listener a cada elemento
    elements.forEach((element, index) => {
        element.addEventListener('click', () => {
            if (index == 0) {
                elements.forEach(el => el.classList.remove('ativo'));

                element.classList.add('ativo');
                gameOptionContainer.style.display = 'flex'
                videoOptionContainer.style.display = 'none'
                audioOptionContainer.style.display = 'none'
            }
            if (index == 1) {
                elements.forEach(el => el.classList.remove('ativo'));

                element.classList.add('ativo');
                gameOptionContainer.style.display = 'none'
                videoOptionContainer.style.display = 'flex'
                audioOptionContainer.style.display = 'none'
            }
            if (index == 2) {
                elements.forEach(el => el.classList.remove('ativo'));

                element.classList.add('ativo');
                gameOptionContainer.style.display = 'none'
                videoOptionContainer.style.display = 'none'
                audioOptionContainer.style.display = 'flex'
            }
        });
    });
}

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
        fullscreenBtn.classList.add('pop')
        setTimeout(function() {
            fullscreenBtn.classList.remove('pop')
        }, 100)
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
        fullscreenBtn.classList.add('pop')
        setTimeout(function() {
            fullscreenBtn.classList.remove('pop')
        }, 100)
    }
});

document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        fullscreenBtn.src = '/static/images/fullscreen.svg';
    } else {
        fullscreenBtn.src = '/static/images/collapse.svg';
    }
});

const configBtn = document.getElementById('setting');
configBtn.addEventListener('click', function() {
    if (!optionsActive && !gameMenuListening) {
        showOptions()
        gameMenuChange()
        configBtn.classList.add('roll')
        setTimeout(function() {
            configBtn.classList.remove('roll')
        }, 1000)
    }
    else if (optionsActive) {
        hideOptions()
    }
    else if (!optionsActive) {
        showOptions()
        configBtn.classList.add('roll')
        setTimeout(function() {
            configBtn.classList.remove('roll')
        }, 1000)
    }
});

const reportBtn = document.getElementById('report');
reportBtn.addEventListener('click', function() {
    if (!optionsActive && !gameMenuListening) {
        showReport()
        gameMenuChange()
        reportBtn.classList.add('pop')
        setTimeout(function() {
            reportBtn.classList.remove('pop')
        }, 1000)
    }
    else if (optionsActive) {
        hideReport()
    }
    else if (!optionsActive) {
        showReport()
        reportBtn.classList.add('pop')
        setTimeout(function() {
            reportBtn.classList.remove('pop')
        }, 1000)
    }
});

//const muteBtn = document.getElementById('volume');
//muteBtn.addEventListener('click', function() {
//    const audioElements = document.querySelectorAll('audio, video');
//
//    if (audioElements.length > 0) {
//        // Verifica se o primeiro elemento de áudio/vídeo está mutado
//        const isMuted = audioElements[0].muted;
//
//        // Alterna o estado de mutação de todos os elementos de áudio/vídeo
//        audioElements.forEach(function(element) {
//            element.muted = !isMuted;
//        });

//        if (isMuted) {
//            muteBtn.src = '/static/images/volume-up.svg';
//        } else {
//            muteBtn.src = '/static/images/volume-off.svg';
//        }
//    }
//});

const eyeBtn = document.getElementById('eyeBtn');
eyeBtn.addEventListener('click', function() {
    const idElement = document.getElementById('roomId');

    if (idElement.style.filter == 'blur(0px)') {
        eyeBtn.src = '/static/images/eye-close.svg'
        idElement.style.filter = 'blur(10px)'
    } else {
        eyeBtn.src = '/static/images/eye-open.svg'
        idElement.style.filter = 'blur(0px)'
        idElement.innerText = roomId
    }
});

const clipboardBtn = document.getElementById('copyBtn');
clipboardBtn.addEventListener('click', function(event) {
    if (document.querySelector('.context-box')) {
        return;
    }

    var urlAtual = window.location.hostname;
    navigator.clipboard.writeText(urlAtual + ':5000/drawing/' + roomId);

    const contextBox = document.createElement('span');
    contextBox.classList.add('context-box');
    contextBox.classList.add('aparecendo');
    contextBox.innerText = 'Copiado!';
    document.body.appendChild(contextBox);

    contextBox.style.position = 'absolute';
    contextBox.style.left = (event.pageX - 40) + 'px';
    contextBox.style.top = (event.pageY + 25) + 'px';

    contextBox.classList.add('appear');
    document.body.addEventListener('mousemove', function(event) {
        contextBox.style.position = 'absolute';
        contextBox.style.left = event.pageX - 40 + 'px';
        contextBox.style.top = event.pageY + 25 + 'px';
    });
    setTimeout(() => {
        contextBox.classList.remove('appear');
    }, 1000);

    setTimeout(() => {
        contextBox.remove();
    }, 1200);
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
        round3Var1()
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === '2' && !gameStarted) {
        round3Var2()
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === '3' && !gameStarted) {
        round1 = false;
        round2 = true;
        timeLeft = 0;
        handleRound2 = true;
        round3 = true;
        timeLeft = 0;
        handleRound3 = true;
        roundCallRandom(round4Var1, round4Var1, round4Var1)
        socket.emit('message', { message: 'Round 3 finished', room_id: roomId });
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !optionsActive && !gameMenuListening) {
        showOptions()
        gameMenuChange()
    }
    else if (event.key === 'Escape' && optionsActive) {
        hideOptions()
    }
    else if (event.key === 'Escape' && !optionsActive) {
        showOptions()
    }
});


console.log('Connecting to server with roomId:', roomId);
var socket = io({
    query: { roomId: roomId },
    transports: ['websocket', 'polling']
});

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('join', { room_id: roomId, user_type: 'host' });
});

socket.on('admin_message', function(data) {
    const errorMsg = document.getElementById('errorMsg')
    const errorContainer = document.getElementById('errorContainer')
    errorMsg.innerText = `${data.msg}`
    errorContainer.classList.add('appear')
    setTimeout(function(){
        errorContainer.classList.remove('appear')
    }, 9000)
})

socket.on('message', function(data) {
    if (data.msg) {
        const playerId = data.msg;
        const container = document.getElementById(`container-${playerId}`);

        if (container) {
            container.classList.remove('in-game');
        }
    }
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
        playerDel = document.createElement('button');
        playerItem.classList.add('fodao');
        playerSign.classList.add('sign');
        playerDel.classList.add('player-del-btn');
        playerDel.setAttribute('onclick', `removePlayer('${playerId}')`)
        playerItem.id = playerId;
        playerSign.appendChild(playerItem);
        playerContainer.appendChild(playerSign);
        playerContainer.appendChild(playerDel);

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
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.remove('in-game');
    });
    if (quality === 'low') {
        roundCallRandom(round2Var1Low, round2Var2Low, round2Var3Low)
    } else {
        roundCallRandom(round2Var1, round2Var2, round2Var3)
    }
}
if (data.current_round === 2 && round2 === false) {
    round2 = true;
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.add('in-game');
    });
    socket.emit('message', { message: 'Round 2 started', room_id: roomId });
}
if (data.remaining_time === 0 && data.current_round === 2 && handleRound2 === false) {
    timeLeft = 0;
    handleRound2 = true;
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.remove('in-game');
    });
    if (quality === 'low') {
        roundCallRandom(round3Var1Low, round3Var2Low, round3Var3Low)
    } else {
        roundCallRandom(round3Var1, round3Var2, round3Var3)
    }
}
if (data.current_round === 3 && round3 === false) {
    round3 = true;
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.add('in-game');
    });
    socket.emit('message', { message: 'Round 3 started', room_id: roomId });
}
if (data.remaining_time === 0 && data.current_round === 3 && handleRound3 === false) {
    timeLeft = 0;
    handleRound3 = true;
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.remove('in-game');
    });
    roundCallRandom(round4Var1, round4Var1, round4Var1)
    socket.emit('message', { message: 'Round 3 finished', room_id: roomId });
}
if (data.current_round === 4 && round4 === false) {
    round4 = true;
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.add('in-game');
    });
    socket.emit('message', { message: 'Round 4 started', room_id: roomId });
}
if (data.remaining_time === 0 && data.current_round === 4 && handleRound4 === false) {
    handleRound4 = true;
    timeLeft = 0;
    processVotes(data);
    startCountdown(30, 8000);
    setTimeout(function() {
        document.getElementById('papaleguas').classList.remove('appear')
    }, 5000)
    document.getElementById('timerContainer').classList.remove('appear')
    socket.emit('message', { message: 'Round 4 finished', room_id: roomId });
}
if (data.current_round === 5 && round5 === false) {
    document.getElementById('papaleguas').classList.add('appear')
    document.getElementById('timerContainer').classList.add('appear')
    round5 = true;
    socket.emit('message', { message: 'Round 5 started', room_id: roomId });
}
if (data.remaining_time === 0 && data.current_round === 5 && handleRound5 === false) {
    handleRound5 = true;
    timeLeft = 0;
    if (!gameWinner) {
        processVotes(data);
        startCountdown(30, 8000);
        setTimeout(function() {
            document.getElementById('papaleguas').classList.remove('appear')
        }, 5000)
    } else {
        startCountdown(90, 8000);
    }
    document.getElementById('timerContainer').classList.remove('appear')
    socket.emit('message', { message: 'Round 5 finished', room_id: roomId });
}

//round infinito pra quem não conhece
if (data.current_round >= 6) {
    if (data.remaining_time === 0 && roundsHandled[data.current_round] === false) {
        roundsHandled[data.current_round] = true;
        timeLeft = 0;
        if (!gameWinner) {
            processVotes(data);
            startCountdown(30, 8000);
            setTimeout(function() {
                document.getElementById('papaleguas').classList.remove('appear')
            }, 5000)
        } else {
            startCountdown(90, 8000);
        }
        document.getElementById('timerContainer').classList.remove('appear')
        socket.emit('message', { message: `Last round finished`, room_id: roomId });
    }
    if (data.current_round === currentRound && !(currentRound in roundsHandled)) {
        roundsHandled[currentRound] = false;
        document.getElementById('papaleguas').classList.add('appear')
        socket.emit('message', { message: `Next round started`, room_id: roomId });
        currentRound++;
        document.getElementById('timerContainer').classList.add('appear')
    }
}
})
.catch(error => {
    console.error('Error:', error);
});
}

function removePlayer(playerId) {
    socket.emit('remove_player', { room_id: roomId, player_id: playerId });
}

socket.on('remove_success', (data) => {
    const containerToRemove = document.getElementById(`container-${data.msg}`)
    containerToRemove.remove()
});

function showOptions(){
    const menu = document.getElementById('gameMenu')
    const inactive = document.createElement('div')
    const body = document.body

    menu.classList.add('ativo')

    inactive.classList.add('inativo')
    body.appendChild(inactive)
    optionsActive = true
    inactive.id = 'bgInactive'

    inactive.addEventListener("click", function(){
        menu.classList.remove('ativo')

        body.removeChild(inactive)
        optionsActive = false
    })
}

function hideOptions(){
    const menu = document.getElementById('gameMenu')
    const inactive = document.getElementById('bgInactive')
    const body = document.body

    menu.classList.remove('ativo')

    body.removeChild(inactive)
    optionsActive = false
}

function showReport(){
    const menu = document.getElementById('reportMenu')
    const inactive = document.createElement('div')
    const body = document.body

    menu.classList.add('ativo')

    inactive.classList.add('inativo')
    body.appendChild(inactive)
    inactive.id = 'bgInactive'

    inactive.addEventListener("click", function(){
        menu.classList.remove('ativo')

        body.removeChild(inactive)
        optionsActive = false
    })
}

function hideReport(){
    const menu = document.getElementById('reportMenu')
    const inactive = document.getElementById('bgInactive')
    const body = document.body

    menu.classList.remove('ativo')

    body.removeChild(inactive)
    optionsActive = false
}

function getSystemInfo() {
    const browserInfo = {
        browserName: navigator.userAgentData ? navigator.userAgentData.brands[0].brand : navigator.userAgent,
        browserVersion: navigator.userAgentData ? navigator.userAgentData.brands[0].version : navigator.appVersion,
        platform: navigator.platform,
        language: navigator.language,
        userAgent: navigator.userAgent
    };
    return browserInfo;
}

function sendReport() {
    const systemInfo = getSystemInfo();

    const formData = {
        browser: `${systemInfo.browserName} (versão: ${systemInfo.browserVersion})`,
        description: document.getElementById('descricaoInput').value,
        motive: document.getElementById('motivoInput').value,
        platform: systemInfo.platform,
        user_agent: systemInfo.userAgent
    };

    fetch('/send_report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log(data.message)
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    sendReport();
});

verifyRoom()

function startGame() {
    fetch(`/start_game/${roomId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Game started') {
            if (quality === 'low') {
                roundCallRandom(round1Var1Low, round1Var1Low, round1Var1Low)
            } else {
                roundCallRandom(round1Var1, round1Var1, round1Var1)
            }
            document.querySelectorAll('.player-container').forEach(function(element) {
                element.classList.add('in-game');
            });
            document.querySelectorAll('.input-container').forEach(function(element) {
                element.disabled = true
            });
            document.querySelectorAll('.player-del-btn').forEach(function(element) {
                element.classList.add('in-game');
            });
            document.getElementById('idContainer').remove()
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function startCountdown(duration, intervalo, roundNumber) {
    duration = Number(duration);
    clearInterval(countdown);
    const timerElement = document.getElementById('timer');
    timeLeft = duration
    if (auxGameStarted === true) {
        timeOuts.push(setTimeout(function() {
            console.log(auxGameStarted)
            startNextRound(duration, roundNumber);
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

function startNextRound(duration, roundNumber) {
    fetch(`/start_round/${roomId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            duration: duration, 
            round: roundNumber 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Round started') {
            document.getElementById('timer').style.display = 'block';
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
            <div id="${player1}PhraseContainer" class="phrase-container">
                <span id="${player1}Phrase" class="phrases">${player1Comb.phrase}</span>
            </div>
            <img id="${player1}Iluminacao" class="iluminacao-matchup" src="/static/images/iluminacao.png"></img>
        `;
        matchupDiv.appendChild(player1Div);
        setTimeout( function() {
            const iluminacaoMatchupP1 = document.getElementById(`${player1}Iluminacao`)
            iluminacaoMatchupP1.classList.add('aceso')
            document.getElementById('lightTurnOn').play()
        }, 4000);

        if (player2) {
            const player2Comb = combinations[1][0];
            const player2Div = document.createElement('div');
            player2Div.classList.add('fodinha')
            player2Div.id = `${player2}Container`
            actualPlayer2 = `${player2}`
            player2Div.innerHTML = `
                <div id="${player2}Voters" class="voters-container"></div>
                <img id="${player2}Drawing" class="drawings" style="background-image: url(${player2Comb.image_path}); background-size: 68%;" src="/static/images/cu.png" alt="${player2}">
                <div id="${player2}PhraseContainer" class="phrase-container">
                    <span id="${player2}Phrase" class="phrases">${player2Comb.phrase}</span>
                </div>
                <img id="${player2}Iluminacao" class="iluminacao-matchup" src="/static/images/iluminacao.png"></img>
            `;
            matchupDiv.appendChild(player2Div);
            
            function callRandomAI() {
                players = [player1Comb.image_path, player2Comb.image_path];
                const choosedPlayer = players[Math.floor(Math.random() * players.length)];
            
                // Gere um número aleatório e compare com 0.8
                if (Math.random() <= 0.9) {
                    sendToAI(choosedPlayer);
                    setTimeout(function() {
                        document.getElementById('messageContainer').classList.add('appear');
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
            document.getElementById('timer').classList.add('appear')

            setTimeout(function() {
                document.getElementById('messageContainer').classList.remove('appear')
            }, 25000)
            setTimeout(function() {
                const iluminacaoMatchupP2 = document.getElementById(`${player2}Iluminacao`)
                iluminacaoMatchupP2.classList.add('aceso')
            }, 4000);
            
        } else {
            actualPlayer2 = `${player1}`
            setTimeout(function() {
                timeLeft = 10
                changeDuration(1)
            }, 1000);
            document.getElementById('timerContainer').classList.remove('appear')
            player1Div.innerHTML = `
            <img class="drawings aparecendo" src="/static/images/mistery.png"></img>
            `
            player1Div.classList.add('aparecendo')
        }
        matchupsDiv.appendChild(matchupDiv);
    }
}

function changeDuration(newDuration) {
    fetch(`/change_duration/${roomId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_remaining_time: parseInt(newDuration) })
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Erro:', error);
    });
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
            gameWinner = responseData.winner
            document.getElementById('timerContainer').classList.remove('appear')
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
    roundFinal()

    setTimeout(function() {
        var playerToRemove = actualPlayer1 === winner ? actualPlayer2 : actualPlayer1;
        
        if (document.getElementById(`${playerToRemove}Container`)) {
            document.getElementById(`${playerToRemove}Container`).remove();
        }
    }, 8000);
}

let globalMostVotedInfo = null; // variável global para salvar todas as informações do mostVoted

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

    // Guardar todas as informações do mostVoted
    globalMostVotedInfo = {
        username: data.players[mostVoted].username,
        character: data.players[mostVoted].character,
        voteCount: maxVotes,
        playerId: mostVoted
    };

    console.log('Most Voted Info:', globalMostVotedInfo); // Verificar as informações no console

    const leastVoted = mostVoted === actualPlayer1 ? actualPlayer2 : actualPlayer1;

    if (leastVoted) {
        const perdedorContainer = document.getElementById(`${leastVoted}Container`);
        const perdedorAuxContainer = document.createElement('div');
        const perdedorSign = document.createElement('div');
        const perdedorSpan = document.createElement('div');
        const perdedorImg = document.createElement('img');
        perdedorSign.src = '/static/images/plaquinha.png';
        perdedorImg.src = `/static/images/perdedor/${data.players[leastVoted].character}.png`;
        perdedorSpan.classList.add('fodao');
        perdedorSpan.innerHTML = `${data.players[leastVoted].username}`;
        perdedorImg.classList.add('perdedor-image');
        perdedorImg.id = 'perdedorImg';
        perdedorAuxContainer.classList.add('perdedor-container');
        perdedorSign.classList.add('sign');
        perdedorContainer.appendChild(perdedorAuxContainer);
        perdedorAuxContainer.appendChild(perdedorImg);
        perdedorAuxContainer.appendChild(perdedorSign);
        perdedorSign.appendChild(perdedorSpan);
    }

    nextMatchup(mostVoted);
}

function playRandomAudio() {
    const audioIds = ['audioFalling1', 'audioFalling2', 'audioFalling3'];
    const randomIndex = Math.floor(Math.random() * audioIds.length);
    const selectedAudio = document.getElementById(audioIds[randomIndex]);
    
    // Pausa todos os áudios antes de reproduzir o novo
    audioIds.forEach(id => document.getElementById(id).pause());
    selectedAudio.currentTime = 0; // Reseta o tempo do áudio
    selectedAudio.play();
}

function perderAnimation(winner) {
    const drawingVencedor = document.getElementById(`${winner}Drawing`);
    const phraseVencedor = document.getElementById(`${winner}PhraseContainer`);
    drawingVencedor.classList.add('drawing-hold');
    phraseVencedor.classList.add('phrase-container-hold');
    drawingVencedor.classList.remove('drawings');
    phraseVencedor.classList.remove('phrase-container');
    
    const drawingPerdedor = document.getElementsByClassName('drawings');
    const phrasePerdedor = document.getElementsByClassName('phrase-container');
    for (let i = 0; i < drawingPerdedor.length; i++) {
    drawingPerdedor[i].classList.add('perdedor');
    phrasePerdedor[i].classList.add('perdedor');

    setTimeout(function() {
        playRandomAudio()
    }, 420)
    }
}

function verifyRoom() {
    fetch(`/room_status/${roomId}`)
    .then(response => response.json())
    .then(data => {
        if (data.started === true) {
            setTimeout(function() {
                document.getElementById('oopsMessage').style.display = 'flex'
                socket.disconnect()
            }, 890)
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

// rounds normais
function round1Var1() {
    timeOuts.length = 0;
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
    <img src="/static/images/Round1.png" id="rounds">
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
            startCountdown(round1Time, 16000);
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
    timeOuts.length = 0;
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
        timeOuts.push(setTimeout(function() {
            clonedPlayerList.classList.add('appear')
        }, 1800))
        timeOuts.push(setTimeout(function() {
            startCountdown(round2Time, 12000);
            soundTrackR1.pause();
            soundTrackR2.play();
            audioR2Var1.play();

            timeOuts.push(setTimeout(function() {
                document.getElementById('iluminacao').classList.add('aceso')
            }, 1670))
        }, 1000));
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
    timeOuts.length = 0;
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
        timeOuts.push(setTimeout(function() {
            clonedPlayerList.classList.add('appear')
        }, 1700))
        timeOuts.push(setTimeout(function() {
            startCountdown(round2Time, 12800);
            soundTrackR1.pause();
            soundTrackR2.play();
            audioR2Var1.play();

            timeOuts.push(setTimeout(function() {
                document.getElementById('iluminacao').classList.add('aceso')
            }, 1670))
        }, 1000));
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
    timeOuts.length = 0;
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
        timeOuts.push(setTimeout(function() {
            startCountdown(round2Time, 18800);
            soundTrackR1.pause();
            soundTrackR2.play();
            audioR2Var1.play();

            timeOuts.push(setTimeout(function() {
                document.getElementById('iluminacao').classList.add('aceso')
                clonedPlayerList.classList.add('appear')
            }, 800))
        }, 1000));
    }, 500));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        clonedPlayerList.classList.remove('appear')
    }, 6729));
    timeOuts.push(setTimeout(function() {
        document.getElementById('rounds').classList.add('aparecendo')
        timeOuts.push(setTimeout(function() {
            document.getElementById('iluminacao').classList.add('aceso')
        }, 1021))
    }, 10169));
    timeOuts.push(setTimeout(function() {
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('iluminacao').classList.remove('aceso')
    }, 12732))
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        timeOuts.push(setTimeout(function() {
            document.getElementById('rounds').src = '/static/images/Round2Var2.png'
            document.getElementById('rounds').classList.add('aparecendo')
        }, 500))
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
    timeOuts.length = 0;
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var soundTrackR3 = document.getElementById("soundTrackR3");
    var audioR3Var1 = document.getElementById("audioR3");
    soundTrackR3.src = '/static/audios/r3/soundTrackR3var1.mp3'
    audioR3Var1.src = '/static/audios/r3/audioR3var1.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round3.png" id="rounds">
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/captionR3Var1.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
    });

    audioR3Var1.ontimeupdate = function() {
        var currentTime = audioR3Var1.currentTime;
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
        timeOuts.push(setTimeout(function() {
            startCountdown(round3Time, 31100);
            soundTrackR2.pause();
            soundTrackR3.play();
            audioR3Var1.play();
        }, 1000));
    }, 500));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        document.getElementById('rounds').classList.add('aparecendo')
    }, 29000));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play()
        document.getElementById('timerContainer').classList.add('appear')
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
}, 31100));
}

function round3Var2() {
    timeOuts.length = 0;
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var soundTrackR3 = document.getElementById("soundTrackR3");
    var audioR3Var1 = document.getElementById("audioR3");
    soundTrackR3.src = '/static/audios/r3/soundTrackR3var2.mp3'
    audioR3Var1.src = '/static/audios/r3/audioR3var2.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round3.png" id="rounds">
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/captionR3Var2.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
    });

    audioR3Var1.ontimeupdate = function() {
        var currentTime = audioR3Var1.currentTime;
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
        timeOuts.push(setTimeout(function() {
            clonedPlayerList.classList.add('appear')
        }, 1700))
        timeOuts.push(setTimeout(function() {
            startCountdown(round3Time, 23700);
            soundTrackR2.pause();
            soundTrackR3.play();
            audioR3Var1.play();

            timeOuts.push(setTimeout(function() {
                document.getElementById('iluminacao').classList.add('aceso')
            }, 1670))
        }, 1000));
    }, 500));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        clonedPlayerList.classList.remove('appear')
    }, 7614));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        document.getElementById('rounds').classList.add('aparecendo')
    }, 20300));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play()
        document.getElementById('timerContainer').classList.add('appear')
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
    }, 23700));
}

function round3Var3() {
    timeOuts.length = 0;
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var soundTrackR3 = document.getElementById("soundTrackR3");
    var audioR3Var1 = document.getElementById("audioR3");
    soundTrackR3.src = '/static/audios/r3/soundTrackR3.mp3'
    audioR3Var1.src = '/static/audios/r3/audioR3var3.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round3.png" id="rounds">
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/captionR3Var3.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
    });

    audioR3Var1.ontimeupdate = function() {
        var currentTime = audioR3Var1.currentTime;
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
        timeOuts.push(setTimeout(function() {
            clonedPlayerList.classList.add('appear')
        }, 1700))
        timeOuts.push(setTimeout(function() {
            startCountdown(round3Time, 16800);
            soundTrackR2.pause();
            soundTrackR3.play();
            audioR3Var1.play();

            timeOuts.push(setTimeout(function() {
                document.getElementById('iluminacao').classList.add('aceso')
            }, 1700))
        }, 1000));
    }, 500));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        clonedPlayerList.classList.remove('appear')
    }, 7600));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        document.getElementById('rounds').classList.add('aparecendo')
    }, 14400));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.remove('aceso')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        whistleUp.play()
        document.getElementById('timerContainer').classList.add('appear')
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
    }, 16800));
}

function round4Var1() {
    timeOuts.length = 0;
    socket.emit('message', { message: 'Round 3 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(4)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR3 = document.getElementById("soundTrackR3");
    var soundTrackR4 = document.getElementById("soundTrackR4");
    var audioR4 = document.getElementById("audioR4");
    soundTrackR4.src = '/static/audios/r4/soundTrackR4.mp3'    

    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round4.png" id="rounds">
    `    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/captionR4.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
    });

    audioR4.ontimeupdate = function() {
        var currentTime = audioR4.currentTime;
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
        timeOuts.push(setTimeout(function() {
            startCountdown(round4Time, 18100, 4);
            soundTrackR3.pause();
            soundTrackR4.play();
            audioR4.play();
        }, 1000));
    }, 500));
    timeOuts.push(setTimeout(function() {
        document.getElementById('iluminacao').classList.add('aceso')
        document.getElementById('rounds').classList.add('aparecendo')
    }, 16100));
    timeOuts.push(setTimeout(function() {
        startTournament(roomId);
        whistleUp.play()
        document.getElementById('iluminacao').classList.remove('aceso')
        document.getElementById('barreira').classList.add('animada')
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('open')
        document.getElementById('timerContainer').classList.add('appear')
        document.getElementById('rounds').classList.remove('aparecendo')
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
        document.getElementById('body').classList.add('desligado')
        document.getElementById('playerList').style.display = 'none'
        timeOuts.push(setTimeout(function() {
            fetchMatchups();
        }, 1000));
        timeOuts.push(setTimeout(function() {
            document.getElementById('papaleguas').classList.add('appear')
        }, 2000));
    }, 18600));
}

function roundFinal() {
    timeOuts.length = 0;
    document.getElementById('skipRoundBtn').setAttribute('onclick', `skipRound('final')`)
    var whistleDown = document.getElementById("whistleDown");
    var whistleUp = document.getElementById("whistleUp");
    var audioRodadaFinal = document.getElementById("audioFinal");
    var soundTrackR4 = document.getElementById("soundTrackR4");
    soundTrackR4.pause();

    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img src="/static/images/Round2.png" id="rounds">
    `
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/captionFinal.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
        });

    audioRodadaFinal.ontimeupdate = function() {
        var currentTime = audioRodadaFinal.currentTime;
        var subtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
        if (subtitle) {
        subtitleDiv.innerHTML = subtitle.text;
        } else {
        subtitleDiv.innerHTML = '';
        }
    };

    document.getElementById('timerContainer').classList.remove('appear')

    setTimeout(function() {
        document.getElementById('circle').classList.add('close')
        whistleDown.play();
        setTimeout(function() {
            audioRodadaFinal.play();
            document.getElementById('timerContainer').classList.remove('appear')
        }, 1000);
    }, 500);
    setTimeout(function() {
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('final-round')
        whistleUp.play()
        document.getElementById('timerContainer').classList.remove('appear')
        const matchupsContainer = document.getElementById('matchups')
        const matchupContainer = document.getElementById('papaleguas')
        matchupContainer.classList.add('final-round')
        matchupsContainer.classList.add('final-round')
        const perdedorContainer = document.getElementById(`${globalMostVotedInfo.playerId}Container`);
        const perdedorAuxContainer = document.createElement('div');
        const perdedorSign = document.createElement('div');
        const perdedorSpan = document.createElement('div');
        const perdedorImg = document.createElement('img');
        const iluminacao = document.getElementById('iluminacao')
        iluminacao.classList.add('final')
        perdedorSign.src = '/static/images/plaquinha.png';
        perdedorImg.src = `/static/images/${globalMostVotedInfo.character}.png`;
        perdedorSpan.classList.add('fodao');
        perdedorSpan.innerHTML = `${globalMostVotedInfo.username}`;
        perdedorImg.classList.add('perdedor-image');
        perdedorImg.id = 'perdedorImg';
        perdedorAuxContainer.classList.add('vencedor-container');
        perdedorSign.classList.add('sign');
        perdedorContainer.appendChild(perdedorAuxContainer);
        perdedorAuxContainer.appendChild(perdedorImg);
        perdedorAuxContainer.appendChild(perdedorSign);
        perdedorSign.appendChild(perdedorSpan);

        const creditos = document.createElement('div')
        creditos.id = 'creditosContainer'
        console.log('fodido')
        creditos.innerHTML = `
        <div class="creditos-element">
            <h1 class="h1-creditos">Desenvolvimento</h1>
            <ul class="list-creditos">
                <li class="list-element-creditos">
                    <span class="span-creditos"><b>Geral</b></span>
                    <span class="span-creditos">JOÃO MACHADO</span>
                </li>
            </ul>
        </div>
        <div class="creditos-element">
            <h1 class="h1-creditos">Design</h1>
            <ul class="list-creditos">
                <li class="list-element-creditos">
                    <span class="span-creditos"><b>Game Design</b></span>
                    <span class="span-creditos">JOÃO MACHADO</span>
                </li>
                <li class="list-element-creditos">
                    <span class="span-creditos"><b>Personagens</b></span>
                    <span class="span-creditos">GABRIEL SILVEIRA</span>
                </li>
            </ul>
        </div>
        <div class="creditos-element">
            <h1 class="h1-creditos">Vozes</h1>
            <ul class="list-creditos">
                <li class="list-element-creditos">
                    <span class="span-creditos"><b>Narrador</b></span>
                    <span class="span-creditos">GABRIEL SILVEIRA</span>
                </li>
            </ul>
        </div>
        <div class="creditos-element">
            <h1 class="h1-creditos">Musica</h1>
            <ul class="list-creditos">
                <li class="list-element-creditos">
                    <span class="span-creditos">Rodada 1 e 2</span>
                    <span class="span-creditos"><b>Shady Business - Ave Coo</b></span>
                </li>
            </ul>
        </div>
        <div class="creditos-element">
            <h1 class="h1-creditos">Participantes</h1>
            <ul id="participantesCreditos" class="list-creditos">
            </ul>
        </div>
        <div class="creditos-element">
            <h1 class="h1-creditos">Apoio</h1>
            <ul class="list-creditos">
                <li class="list-element-creditos">
                    <span class="span-creditos">Eduardo Bruno</span>
                    <span class="span-creditos"><b>CATARSE</b></span>
                </li>
            </ul>
        </div>
        <span class="span-creditos">Inspirado por jogos no estilo Jackbox Party Pack.</span>
        <img class="logo-creditos" src="/static/images/index/planoA.png"></img>
        `
        matchupContainer.appendChild(creditos)
        function fetchPlayersCreditos() {
            fetch(`/room_status/${roomId}`)
            .then(response => response.json())
            .then(data => {
            
            for (const [playerId, playerData] of Object.entries(data.players)) {
                const playerLi = document.createElement('li')
                const playerUl = document.getElementById('participantesCreditos')
                const playerInformationCh = document.createElement('span')
                const playerInformationUs = document.createElement('span')
                playerLi.classList.add('list-element-creditos')
                playerInformationUs.innerHTML = `${playerData.username} como `
                playerInformationCh.innerHTML = `<b>${playerData.character}</b>`
                playerInformationCh.classList.add('span-creditos')
                playerInformationUs.classList.add('span-creditos')
                playerLi.appendChild(playerInformationUs)
                playerLi.appendChild(playerInformationCh)
                playerUl.appendChild(playerLi)
            }})
        }
        fetchPlayersCreditos()
        document.getElementById('skipRoundBtn').disabled = false;
        document.getElementById('skipRoundBtn').classList.add('aparecendo')
    }, 10500);
    timeOuts.push(setTimeout(function() {
        const finalScreen = document.createElement('div')
        finalScreen.id = "loadingScreen"
        finalScreen.classList.add('message-screen')
        finalScreen.classList.add('show')

        finalScreen.innerHTML = `
        <img src="/static/images/LOGO.png" class="loading-screen-img"></img>
        <button class="final-btn" onclick="createRoom()" id="newGameBtn">Jogar Novamente</button>
        <button class="final-btn" id="newGameBtn" onclick="backToBox()">Voltar à Caixa</button>
        <img id="finalLogo" src="/static/images/index/planoA.png" alt="">
        `
        document.body.appendChild(finalScreen)
    }, 90000));
}

function round1Var1Low() {
    timeOuts.length = 0;
    document.getElementById('skipRoundBtn').disabled = true;
    document.getElementById('startButton').disabled = true;
    document.getElementById('timer').style.display = 'block'
    document.getElementById('startButton').classList.add('translate')
    var whistleDown = document.getElementById("whistleDown");
    var whistleUp = document.getElementById("whistleUp");
    var soundTrackR1 = document.getElementById("soundTrackR1");
    var audioRodada1 = document.getElementById("audioR1");
    const body = document.body
    auxGameStarted = true

    document.getElementById('roundContainer').innerHTML = `
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img src="/static/images/Round1Low.png" id="roundsLow">
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

    document.getElementById('startButton').classList.add('desappear')
    setTimeout(function() {
        document.getElementById('timerContainer').classList.remove('appear')
        document.getElementById('circleLow').classList.add('close')
        setTimeout(function() {
            startCountdown(round1Time, 16000);
            soundTrackR1.play();
            audioRodada1.play();
            document.getElementById('logoLow').classList.add('aparecendo')
        }, 1000);
    }, 1500);
    setTimeout(function() {
        document.getElementById('logoLow').classList.remove('aparecendo')
    }, 10210);
    setTimeout(function() {
        document.getElementById('roundsLow').classList.add('aparecendo')
    }, 13210);
    setTimeout(function() {
        document.getElementById('circleLow').classList.remove('close')
        document.getElementById('circleLow').classList.add('open')
        document.getElementById('roundsLow').classList.remove('aparecendo')
        socket.emit('message', { message: 'Game started', room_id: roomId });
        document.getElementById('skipRoundBtn').classList.remove('aparecendo')
        document.getElementById('timerContainer').classList.add('appear')
    }, 17000);
    //console.log(auxGameStarted)
}

function skipRound(roundNum) {
    document.getElementById('skipRoundBtn').disabled = true;
    document.getElementById('skipRoundBtn').classList.remove('aparecendo')
    timeOuts.forEach(function(timeoutID) {
        clearTimeout(timeoutID);
        console.log('fodinha')
    });
    console.log('foda')
    if (roundNum === 1) {
        const audioR1Var1 = document.getElementById("audioR1");
        audioR1Var1.pause();
        audioR1Var1.currentTime = 0;
        startCountdown(round1Time, 500)
        document.getElementById('timerContainer').classList.add('appear')
    } 
    if (roundNum === 2) {
        const audioR2Var1 = document.getElementById("audioR2");
        audioR2Var1.pause();
        audioR2Var1.currentTime = 0;
        startCountdown(round2Time, 500)
        document.getElementById('timerContainer').classList.add('appear')
    }
    if (roundNum === 3) {
        const audioR3Var1 = document.getElementById("audioR3");
        audioR3Var1.pause();
        audioR3Var1.currentTime = 0;
        startCountdown(round3Time, 500)
        document.getElementById('timerContainer').classList.add('appear')
    }
    if (roundNum === 4) {
        const audioR4Var1 = document.getElementById("audioR4");
        audioR4Var1.pause();
        audioR4Var1.currentTime = 0;
        startCountdown(round4Time, 500)
        document.getElementById('timerContainer').classList.add('appear')
    }
    if (roundNum === 'final') {
        const audioFinal = document.getElementById("audioFinal");
        audioFinal.pause();
        audioFinal.currentTime = 0;
        const finalScreen = document.createElement('div')
        finalScreen.id = "loadingScreen"
        finalScreen.classList.add('show')

        finalScreen.innerHTML = `
        <img src="/static/images/LOGO.png" class="loading-screen-img"></img>
        <button class="final-btn" onclick="createRoom()" id="newGameBtn">Jogar Novamente</button>
        <button class="final-btn" id="newGameBtn" onclick="backToBox()">Voltar à Caixa</button>
        <img id="finalLogo" src="/static/images/index/planoA.png" alt="">
        `
        document.body.appendChild(finalScreen)
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
let fps = 0;
let fpsArray = [];
let testStartTime = performance.now();
let testDuration = 5000; // 5 seconds
let isTesting = true;

function verifyQuality() {
    if (localStorage.getItem('pc-gm-qual')){
        quality = localStorage.getItem('pc-gm-qual')
        if (quality == 'high') {
            autoSetQuality(quality)
        } else if (quality == 'medium') {
            autoSetQuality(quality)
        } else {
            autoSetQuality(quality)
        }
    } else {
        requestAnimationFrame(calculateFPS);
    }
} 

function autoSetQuality(performanceLevel) {
    if (performanceLevel == 'high') {
        localStorage.setItem('pc-gm-qual', 'high')
        showLoadingScreen(performanceLevel)
        return
    } else if (performanceLevel == 'medium'){
        localStorage.setItem('pc-gm-qual', 'medium')
        showLoadingScreen(performanceLevel)
        return
    } else {
        const screenEffectSelect = document.getElementById('screenSelect')
        const screenEffectContainer = document.getElementById('effectContainer')
        screenEffectSelect.selectedIndex = 1;
        screenEffectContainer.classList.toggle('ativo')
        showLoadingScreen(performanceLevel)

        localStorage.setItem('pc-gm-qual', 'low')
    }
}

function calculateFPS() {
    const now = performance.now();
    const delta = (now - lastTime) / 1000;
    lastTime = now;
    fps = 1 / delta;

    if (isTesting) {
        fpsArray.push(fps);

        if (now - testStartTime >= testDuration) {
            isTesting = false;
            const averageFPS = fpsArray.reduce((sum, value) => sum + value, 0) / fpsArray.length;
            console.log(averageFPS)
            
            let performanceLevel;
            if (averageFPS < 10) {
                performanceLevel = 'low';
            } else if (averageFPS < 30) {
                performanceLevel = 'medium';
            } else {
                performanceLevel = 'high';
            }
            
            autoSetQuality(performanceLevel)
        }
    }

    document.getElementById('fps').textContent = `FPS: ${fps.toFixed(2)}`;
    requestAnimationFrame(calculateFPS);
}

function showLoadingScreen(interval) {
    const loadingScreen = document.getElementById('loadingScreen')
    loadingScreen.classList.add('skip')
    setTimeout(function(){
        loadingScreen.remove()
    }, 1000)
}

verifyQuality()

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/static/scripts/sw.js')
    .then((registration) => {
    console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch((error) => {
    console.log('Falha ao registrar o Service Worker:', error);
    });
}

function createRoom() {
    fetch('/create_room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.room_id === undefined) {
            const errorMsg = document.getElementById('errorMsg')
            const errorContainer = document.getElementById('errorContainer')
            if (data.cooldown_remaining !== undefined) {
                errorMsg.innerText = `Cooldown ativo. Tente novamente em ${Math.ceil(data.cooldown_remaining)} segundos.`
                errorContainer.classList.add('appear')
                setTimeout(function(){
                errorContainer.classList.remove('appear')
            }, 2000)
            } else {
                console.error('Erro: room_id retornou undefined');
            }
        } else {
            const roomId = data.room_id;
            window.location.href = `/receptor/${roomId}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function backToBox() {
    window.location.href = `/`;
}