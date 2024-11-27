let countdown
let timeLeft
let roundVar
let round1 = true
let round2 = false
let round3 = false
let round4 = false
let round5 = false
let handleRound2 = false
let handleRound3 = false
let handleRound4 = false
let handleRound5 = false
let actualRoundDuration
let currentMatchupIndex = 0
let gameStarted = false
let auxGameStarted = false
let matchups = []
let winners = []
let roundsHandled = {}
let currentRound = 6
let actualPlayer1 = ''
let actualPlayer2 = ''
let quality = localStorage.getItem('pc-gm-qual')
let timeOuts = []
let timeoutPause
let startTime
let remainingTime
let roundTimes = {
    round1Time: 240,
    round2Time: 120,
    round3Time: 90,
    round4Time: 35,
};
let round1Time = 240
let round2Time = 120
let round3Time = 90
let round4Time = 35
let optionsActive = false
let gameWinner
gameMenuListening = false
let audioData
let isCountdownActive = false
let isPaused = false
let isPausedContainer = false
let finalScreenDisable = false
let actualIsSolo = false
let mobileUser = false
let tournamentStarted = false
let audioPlaybackSupport
let actualRoundAudio
if (quality) {
    audioPlaybackSupport = obterDigito(quality, 3)
}
const fullscreenBtn = document.getElementById('fullscreen');

(function() {
  const userAgent = navigator.userAgent;

  if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    const finalScreen = document.createElement('div');
    finalScreen.id = "loadingScreen";
    finalScreen.classList.add('message-screen');
    finalScreen.classList.add('show');
    finalScreen.classList.add('warning');

    finalScreen.innerHTML = `
    <div class="menu-part warning">
        <div class="categories-element"><span>Aviso</span></div>
        <div class="categories-container warning">
            <div class="element-container warning">
                <span>Ainda estamos trabalhando no suporte para mobile.</span> 
            </div>
            <button class="primary-btn" id="newGameBtn" onclick="backToBox()">Voltar à Caixa</button>
        </div>
    </div>
    <img id="finalLogo" src="/static/images/index/planoA.png" alt="">
    `;
    document.body.appendChild(finalScreen);

    mobileUser = true

    return;
  }

  function runDesktopCode() {

  }

  runDesktopCode();
})();
function alterarNum(numero, posicao, novoDigito) {
    if (posicao < 0 || posicao >= numero.length) {
        console.log("Posição inválida.");
        return numero;
    }

    quality = numero.substring(0, posicao) + novoDigito + numero.substring(posicao + 1);
}
function obterDigito(numero, posicao) {
    if (posicao < 0 || posicao >= numero.length) {
        console.log("Posição inválida.");
        return null;
    }
  
    return numero[posicao];
}


function gameMenuChange() {
    const elements = document.querySelectorAll('.bar-element');
    const gameOptionContainer = document.getElementById('gameOption')
    const videoOptionContainer = document.getElementById('videoOption')
    const audioOptionContainer = document.getElementById('audioOption')
    const accessibilityOptionContainer = document.getElementById('accessibilityOption')
    const audioElements = document.querySelectorAll('audio');
    const audioSampleSlider = document.getElementById('sampleAudio');
    const volumeSlider = document.getElementById('volume-slider');
    const animationSelect = document.getElementById('animationSelect');
    const screenEffectSelect = document.getElementById('screenSelect')
    const legendaActivationSelect = document.getElementById('legendaActivationSelect')
    const legendaSizeSelect = document.getElementById('legendaSizeSelect')
    const screenEffectContainer = document.getElementById('effectContainer')
    const roundtime1Input = document.getElementById('roundtime1Input');
    const roundtime2Input = document.getElementById('roundtime2Input');
    const roundtime3Input = document.getElementById('roundtime3Input');
    const roundtime4Input = document.getElementById('roundtime4Input');
    gameMenuListening = true

    roundtime1Input.addEventListener('input', () => {
        round1Time = roundtime1Input.value;
        roundTimes.round1Time = roundtime1Input.value
    });
    roundtime2Input.addEventListener('input', () => {
        round2Time = roundtime2Input.value;
        roundTimes.round2Time = roundtime2Input.value
    });
    roundtime3Input.addEventListener('input', () => {
        round3Time = roundtime3Input.value;
        roundTimes.round3Time = roundtime3Input.value
    });
    roundtime4Input.addEventListener('input', () => {
        round4Time = roundtime4Input.value;
        roundTimes.round4Time = roundtime4Input.value
    });

    animationSelect.addEventListener('change', () => {
        if (animationSelect.value === 'Alto') {
            alterarNum(quality, 0, '1')
            localStorage.setItem('pc-gm-qual', quality)
        } else {
            alterarNum(quality, 0, '0')
            localStorage.setItem('pc-gm-qual', quality)
        }
    });
    screenEffectSelect.addEventListener('change', () => {
        screenEffectContainer.classList.toggle('ativo')
        if (screenEffectSelect.value === 'Desativado') {
            alterarNum(quality, 1, '0')
            localStorage.setItem('pc-gm-qual', quality)
        } else {
            alterarNum(quality, 1, '1')
            localStorage.setItem('pc-gm-qual', quality)
        }
    });

    legendaActivationSelect.addEventListener('change', () => {
        document.getElementById('subtitles').classList.toggle('active')

        const isActive = document.getElementById('subtitles').classList.contains('active') ? '1' : '0';

        alterarNum(quality, 2, isActive)
        localStorage.setItem('pc-gm-qual', quality)
    });

    legendaSizeSelect.addEventListener('change', () => {
        const captions = document.querySelectorAll('.caption-container');
        const fontSize = legendaSizeSelect.value;
        
        captions.forEach(caption => {
            caption.style.fontSize = fontSize+'pt';
        });
    });

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value;
        audioElements.forEach(audio => {
            audio.volume = volume;
        });
    });

    volumeSlider.addEventListener('mouseup', () => {
        audioSampleSlider.play();
    });

    elements.forEach((element, index) => {
        element.addEventListener('click', () => {
            if (index == 0) {
                elements.forEach(el => el.classList.remove('ativo'));

                element.classList.add('ativo');
                gameOptionContainer.style.display = 'flex'
                videoOptionContainer.style.display = 'none'
                accessibilityOptionContainer.style.display = 'none'
                audioOptionContainer.style.display = 'none'
            }
            if (index == 1) {
                elements.forEach(el => el.classList.remove('ativo'));

                element.classList.add('ativo');
                gameOptionContainer.style.display = 'none'
                videoOptionContainer.style.display = 'flex'
                accessibilityOptionContainer.style.display = 'none'
                audioOptionContainer.style.display = 'none'
            }
            if (index == 2) {
                elements.forEach(el => el.classList.remove('ativo'));

                element.classList.add('ativo');
                gameOptionContainer.style.display = 'none'
                videoOptionContainer.style.display = 'none'
                accessibilityOptionContainer.style.display = 'none'
                audioOptionContainer.style.display = 'flex'
            }
            if (index == 3) {
                elements.forEach(el => el.classList.remove('ativo'));

                element.classList.add('ativo');
                gameOptionContainer.style.display = 'none'
                videoOptionContainer.style.display = 'none'
                audioOptionContainer.style.display = 'none'
                accessibilityOptionContainer.style.display = 'flex'
            }
        });
    });
}

fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement && fullscreenBtn.src.includes('fullscreen.svg')) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
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
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
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
    if (!finalScreenDisable) {
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
    }
});

const reportBtn = document.getElementById('report');
reportBtn.addEventListener('click', function() {
    if (!reportActive && !gameMenuListening) {
        showReport()
        gameMenuChange()
        reportBtn.classList.add('pop')
        setTimeout(function() {
            reportBtn.classList.remove('pop')
        }, 1000)
    }
    else if (reportActive) {
        hideReport()
    }
    else if (!reportActive) {
        showReport()
        reportBtn.classList.add('pop')
        setTimeout(function() {
            reportBtn.classList.remove('pop')
        }, 1000)
    }
});

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
    navigator.clipboard.writeText(urlAtual + '/player/' + roomId);

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

//TESTAR ROUNDS
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
    if (event.key === 'f' && !reportActive && !gameMenuListening) {
        showReport()
        gameMenuChange()
        reportBtn.classList.add('pop')
        setTimeout(function() {
            reportBtn.classList.remove('pop')
        }, 1000)
    }
    else if (event.key === 'f' && reportActive) {
        hideReport()
    }
    else if (event.key === 'f' && !reportActive) {
        showReport()
        reportBtn.classList.add('pop')
        setTimeout(function() {
            reportBtn.classList.remove('pop')
        }, 1000)
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === '1' && !gameStarted) {
        alterarNum(quality, 3, '0')
        localStorage.setItem('pc-gm-qual', quality)
        audioPlaybackSupport = obterDigito(quality, 3)
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === '2' && !gameStarted) {
        round2Var2()
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === '4' && !gameStarted) {
        round2Var3()
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === '3' && !gameStarted) {
        actualRoundAudio = document.getElementById('soundTrackR2')
        round1 = false;
        round2 = true;
        handleRound2 = true;
        round3 = true;
        handleRound3 = true;
        roundCallRandom(round4Var1, round4Var1, round4Var1)
        socket.emit('message', { message: 'Round 3 finished', room_id: roomId });
    }
});
document.addEventListener('keydown', function(event) {
    if (!finalScreenDisable) {
        if (event.key === 'Escape' && !optionsActive && !gameMenuListening) {
            isPausedContainer = true
            showOptions()
            gameMenuChange()
            configBtn.classList.add('roll')
            setTimeout(function() {
                configBtn.classList.remove('roll')
            }, 1000)
        }
        else if (event.key === 'Escape' && optionsActive) {
            isPausedContainer = false
            hideOptions()
        }
        else if (event.key === 'Escape' && !optionsActive) {
            isPausedContainer = true
            showOptions()
            configBtn.classList.add('roll')
            setTimeout(function() {
                configBtn.classList.remove('roll')
            }, 1000)
        }
    }
});

document.addEventListener("visibilitychange", function() {
    if (document.hidden && isPausedContainer == false) {
        const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
        
        document.dispatchEvent(escEvent);
    }
});

if (mobileUser === false) {
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

    socket.on('remove_success', (data) => {
        const containerToRemove = document.getElementById(`container-${data.msg}`)
        containerToRemove.remove()
    });
}

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
        let playerContainer = document.createElement('div');
        playerContainer.classList.add('player-container');
        playerContainer.id = `container-${playerId}`;

        playerImage = document.createElement('img');
        playerImage.classList.add('character-image');
        playerImage.id = `image-${playerId}`;
        playerContainer.appendChild(playerImage);

        playerItem = document.createElement('div');
        const playerSign = document.createElement('div');
        const playerDel = document.createElement('button');
        playerItem.classList.add('fodao');
        playerSign.classList.add('sign');
        playerDel.classList.add('primary-btn');
        playerDel.classList.add('player-del-btn');
        playerDel.innerHTML = 'Remover Jogador'
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

    const newImageSrc = `/static/images/${playerData.character}.png`;
    if (!previousPlayers[playerId] || previousPlayers[playerId].character !== playerData.character) {
        playerImage.src = newImageSrc;
    }

    if (!previousPlayers[playerId] || previousPlayers[playerId].username !== playerData.username) {
        playerItem.textContent = `${playerData.username}`;
    }
}

previousPlayers = { ...data.players };

if (timeLeft === 0 && round1 === true) {
    round1 = false;
    timeLeft = 0;
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.remove('in-game');
    });
    roundCallRandom(round2Var1, round2Var2, round2Var3)
}
if (data.current_round === 2 && round2 === false) {
    round2 = true;
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.add('in-game');
    });
    socket.emit('message', { message: 'Round 2 started', room_id: roomId });
}
if (timeLeft === 0 && data.current_round === 2 && handleRound2 === false) {
    timeLeft = 0;
    handleRound2 = true;
    document.querySelectorAll('.player-container').forEach(function(element) {
        element.classList.remove('in-game');
    });
    if (obterDigito(quality, 0) === '0') {
        roundCallRandom(round3Var1, round3Var2, round3Var3)
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
if (timeLeft === 0 && data.current_round === 3 && handleRound3 === false) {
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
if (timeLeft === 0 && data.current_round === 4 && handleRound4 === false) {
    handleRound4 = true;
    timeLeft = 0;
    processVotes(data);
    if (actualIsSolo===true) {
        isCountdownActive = false
        startCountdown(30, 2000);
        console.log('piroquinha')
    } else {
        isCountdownActive = false
        startCountdown(30, 12000);
        setTimeout(function() {
            document.getElementById('papaleguas').classList.remove('appear')
        }, 5000)
        console.log('proximo round')
    }
    document.getElementById('timerContainer').classList.remove('appear')
    actualIsSolo = false
    socket.emit('message', { message: 'Round 4 finished', room_id: roomId });
}
if (data.current_round === 5 && round5 === false) {
    document.getElementById('papaleguas').classList.add('appear')
    document.getElementById('timerContainer').classList.add('appear')
    round5 = true;
    socket.emit('message', { message: 'Round 5 started', room_id: roomId });
}
if (timeLeft === 0 && data.current_round === 5 && handleRound5 === false) {
    handleRound5 = true;
    timeLeft = 0;
    if (!gameWinner) {
        processVotes(data);
        if (actualIsSolo===true) {
            isCountdownActive = false
            startCountdown(30, 2000);
            console.log('piroquinha')
        } else {
            isCountdownActive = false
            startCountdown(30, 12000);
            setTimeout(function() {
                document.getElementById('papaleguas').classList.remove('appear')
            }, 5000)
        }
    } else {
        isCountdownActive = true;
        startCountdown(90, 8000);
        document.getElementById('timerContainer').remove()
    }
    document.getElementById('timerContainer').classList.remove('appear')
    actualIsSolo = false
    socket.emit('message', { message: 'Round 5 finished', room_id: roomId });
}

if (data.current_round >= 6) {
    if (timeLeft === 0 && roundsHandled[data.current_round] === false) {
        roundsHandled[data.current_round] = true;
        timeLeft = 0;
        if (!gameWinner) {
            processVotes(data);
            if (actualIsSolo===true) {
                isCountdownActive = false
                startCountdown(30, 2000);
                console.log('piroquinha')
            } else {
                isCountdownActive = false
                startCountdown(30, 12000);
                setTimeout(function() {
                    document.getElementById('papaleguas').classList.remove('appear')
                }, 5000)
            }
        } else {
            isCountdownActive = true;
            startCountdown(90, 8000);
            document.getElementById('timerContainer').remove()
        }
        document.getElementById('timerContainer').classList.remove('appear')
        actualIsSolo = false
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

function showOptions(){
    if (!reportActive) {
        const menu = document.getElementById('lateralMenu')
        const inactive = document.createElement('div')
        const body = document.body
        const allAudios = document.querySelectorAll('audio');
    
        menu.classList.add('active')
    
        inactive.classList.add('inativo')
        body.appendChild(inactive)
        optionsActive = true
        inactive.id = 'bgInactive'
    
        inactive.addEventListener("click", function(){
            hideOptions()
        })
        allAudios.forEach(audio => {
            audio.pause()
        });
        togglePauseResumeCountdown()
    } else {
        hideReport()
        showOptions()
    }
}

function hideOptions(){
    const menu = document.getElementById('lateralMenu')
    const inactive = document.getElementById('bgInactive')
    const body = document.body
    const allAudios = document.querySelectorAll('audio');
    const playingAudios = Array.from(allAudios).filter(audio => audio.currentTime > 0);


    menu.classList.remove('active')

    playingAudios.forEach(audio => {
        if (audio.currentTime < audio.duration) {
            audio.play();
        }
    });  

    body.removeChild(inactive)
    optionsActive = false
    isPausedContainer = false
    togglePauseResumeCountdown()
}

let reportActive = false

function showReport(){
    if (!optionsActive) {
        const menu = document.getElementById('reportMenu')
        const inactive = document.createElement('div')
        const body = document.body
        const allAudios = document.querySelectorAll('audio');
    
        menu.classList.add('ativo')
    
        inactive.classList.add('inativo')
        body.appendChild(inactive)
        inactive.id = 'bgInactive'
        reportActive = true
    
        inactive.addEventListener("click", function(){
            hideReport()
        })
        allAudios.forEach(audio => {
            audio.pause()
        });
        togglePauseResumeCountdown()
    } else {
        hideOptions()
        showReport()
    }
}

function hideReport(){
    const menu = document.getElementById('reportMenu')
    const inactive = document.getElementById('bgInactive')
    const body = document.body
    const allAudios = document.querySelectorAll('audio');
    const playingAudios = Array.from(allAudios).filter(audio => audio.currentTime > 0);

    menu.classList.remove('ativo')

    body.removeChild(inactive)
    playingAudios.forEach(audio => {
        if (audio.currentTime < audio.duration) {
            audio.play();
        }
    });   
    reportActive = false
    togglePauseResumeCountdown()
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
            if (obterDigito(quality, 0) === '0') {
                roundCallRandom(round1Var1, round1Var1, round1Var1)
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
        } else {
            const errorMsg = document.getElementById('errorMsg')
            const errorContainer = document.getElementById('errorContainer')
            errorMsg.innerText = `${data.message}`
            errorContainer.classList.add('appear')
            setTimeout(function(){
                errorContainer.classList.remove('appear')
            }, 9000)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function startCountdown(duration, intervalo, roundNum) {
    if (!roundNum) {
        roundNum = null
    }
    if (isCountdownActive === true) {
        console.log('paizao')
        return;
    }
    clearTimeout(timeoutPause);
    clearInterval(countdown);
    isCountdownActive = true;
    remainingTime = intervalo
    actualRoundDuration = duration

    console.log('paizinho')
    duration = Number(duration);
    intervalo = Number(intervalo);
    const timerElement = document.getElementById('timer');
    timeLeft = isPaused ? timeLeft : duration;
    
    //console.log(countdown)
    //console.log(remainingTime)
    
    isPaused = false;
    
    startTime = Date.now(); // Registra o momento de início
    timeoutPause = setTimeout(function() {
        startNextRound(Number(duration), roundNum)
        console.log('intervalo excedido')
        timerElement.style.display = 'block'
        countdown = setInterval(() => {
            if (timeLeft > 0) {
                console.log(timeLeft);
                console.log(isCountdownActive);
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                clearInterval(countdown);
                timerElement.style.display = 'none';
                isCountdownActive = false;
                return
            }
        }, 1000);
    }, intervalo);
    console.log(intervalo)
    console.log(timeoutPause)
}


function togglePauseResumeCountdown() {
    if (isCountdownActive) {
        if (!isPaused) {
            clearInterval(countdown);
            clearTimeout(timeoutPause);
            const elapsed = Date.now() - startTime;
            remainingTime -= elapsed;
            isPaused = true;
            isPausedContainer = true;
            //console.log('Temporizador pausado');
        } else {
            //console.log('Retomando temporizador');
            isPaused = false;
            isPausedContainer = false;
        
            startTime = Date.now();
            timeoutPause = setTimeout(() => {
                startNextRound(Number(actualRoundDuration))
                clearInterval(countdown);
                countdown = setInterval(() => {
                    /*console.log(countdown);
                    console.log(timeLeft);
                    console.log(isCountdownActive);*/
                    timeLeft--;
                    const timerElement = document.getElementById('timer');
                    timerElement.textContent = timeLeft;
                    if (timeLeft <= 0) {
                        clearInterval(countdown);
                        timerElement.style.display = 'none';
                        isCountdownActive = false;
                        console.log(isCountdownActive)
                    }
                }, 1000);
            }, remainingTime);
        }
    }
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
    if (tournamentStarted === false) {
        fetch(`/start_tournament/${roomId}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                console.log('Tournament started:', data.rounds);
                tournamentStarted = true
            });
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
            
                if (Math.random() <= 0.8) {
                    sendToAI(choosedPlayer);
                    setTimeout(function() {
                        document.getElementById('messageContainer').classList.add('appear');
                    }, 2000)
                }
                function gerarUsername() {
                    const criterios1 = ["Pedro", "Goku", "Sasuke", "OcultDay", "PaulaNoku", player1, player2];
                    const criterios2 = ["SocaFofo", "FC", "OFC", "Implacavel", "Amostradinho", "Pensador"];
                    const criterios3 = [12, 34, 56, 78, 90];
                
                    function escolherAleatorio(lista) {
                        return lista[Math.floor(Math.random() * lista.length)];
                    }
                
                    const criterio1 = escolherAleatorio(criterios1);
                    const criterio2 = escolherAleatorio(criterios2);
                    const criterio3 = escolherAleatorio(criterios3);
                
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
                document.getElementById('timerContainer').classList.remove('appear')
                changeDuration(1)
                timeLeft = 0
                setTimeout(function() {
                    soundTrackR4.play()
                }, 5000);
            }, 1000);
            player1Div.innerHTML = `
            <img class="drawings aparecendo" src="/static/images/mistery.png"></img>
            `
            const soundTrackR4 = document.getElementById("soundTrackR4");
            audioSolo = document.getElementById('audioFallingSolo')
            audioSolo.play()
            soundTrackR4.pause()
            audioSolo.addEventListener('timeupdate', () => {
            if (audioSolo.currentTime >= 4.4) {
                player1Div.classList.add('perdedor');
            }
            })
            socket.emit('message', { message: `Player Solo`, room_id: roomId });
            actualIsSolo=true
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
    if (actualIsSolo===true) {
        setTimeout(function() {
            saveWinners()
        }, 1000);
        perderAnimation(mostVoted)
        console.log('top')
    } else {
        setTimeout(function() {
            saveWinners()
        }, 7000);
        setTimeout(function() {
            perderAnimation(mostVoted)
        }, 2000);
    }
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

let globalMostVotedInfo = null;

function processVotes(data) {
    console.log('Room Status:', data);

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

    globalMostVotedInfo = {
        username: data.players[mostVoted].username,
        character: data.players[mostVoted].character,
        voteCount: maxVotes,
        playerId: mostVoted
    };

    console.log('Most Voted Info:', globalMostVotedInfo);

    const leastVoted = mostVoted === actualPlayer1 ? actualPlayer2 : actualPlayer1;

    if (leastVoted) {
        if (leastVoted !== mostVoted) {
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
    }

    nextMatchup(mostVoted);
}

function playRandomAudio() {
    const audioIds = ['audioFalling1', 'audioFalling2', 'audioFalling3'];
    const randomIndex = Math.floor(Math.random() * audioIds.length);
    const selectedAudio = document.getElementById(audioIds[randomIndex]);
    
    audioIds.forEach(id => document.getElementById(id).pause());
    selectedAudio.currentTime = 0;
    selectedAudio.play();
}

function perderAnimation(winner) {
    if (document.getElementById(`${winner}Drawing`)) {
        const drawingVencedor = document.getElementById(`${winner}Drawing`);
        const phraseVencedor = document.getElementById(`${winner}PhraseContainer`);
        drawingVencedor.classList.add('drawing-hold');
        phraseVencedor.classList.add('phrase-container-hold');
        drawingVencedor.classList.remove('drawings');
        phraseVencedor.classList.remove('phrase-container');
    }
    
    const drawingPerdedor = document.getElementsByClassName('drawings');
    const phrasePerdedor = document.getElementsByClassName('phrase-container');
    for (let i = 0; i < drawingPerdedor.length; i++) {
        drawingPerdedor[i].classList.add('perdedor');
        if (phrasePerdedor[i]) {
            phrasePerdedor[i].classList.add('perdedor');
            setTimeout(function() {
                playRandomAudio()
            }, 420)
        }

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

function round1Var1() {
    timeOuts.length = 0;
    document.getElementById('skipRoundBtn').disabled = true;
    document.getElementById('startButton').disabled = true;
    document.getElementById('timer').style.display = 'block'
    document.getElementById('startButton').classList.add('translate')
    let soundTrackR1 = document.getElementById("soundTrackR1");
    let audioRodada1 = document.getElementById("audioR1");
    const round1 = document.createElement('img')
    round1.src = '/static/images/Round1.png'
    round1.id = 'rounds'
    document.getElementById('roundContainer').appendChild(round1)
    auxGameStarted = true

    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round1Low.png" id="roundsLow">
    <img src="/static/images/Round1.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
    `
    var whistleDown = document.getElementById("whistleDown");
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/pgGame/rounds/legenda.json')
        .then(response => response.json())
        .then(data => {
        subtitles = data;
        });
        
    audioRodada1.ontimeupdate = function() {
        const currentTime = audioRodada1.currentTime;
        var subtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
        if (subtitle) {
        subtitleDiv.innerHTML = subtitle.text;
        } else {
        subtitleDiv.innerHTML = '';
        }
    };

    if (obterDigito(quality, 0) === '0') {
        fetch('/static/pgGame/rounds/round1/r1Var1Low.json')
        .then(response => response.json())
        .then(data => {
        audioData = data;
        });
        audioRodada1.src = `/static/pgGame/audios/r1/audioR1Q${audioPlaybackSupport}.mp3`

        setTimeout(function() {
            document.getElementById('startButton').classList.add('desappear')
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('circleLow').classList.add('close')
            whistleDown.play();
            setTimeout(function() {
                if (audioPlaybackSupport == '1') {
                    soundTrackR1.play();
                }
                audioRodada1.play();
            }, 1000);
        }, 500);
    } else {
        fetch('/static/pgGame/rounds/round1/r1Var1.json')
        .then(response => response.json())
        .then(data => {
        audioData = data;
        });
        audioRodada1.src = `/static/pgGame/audios/r1/audioR1Q${audioPlaybackSupport}.mp3`

        setTimeout(function() {
            document.getElementById('startButton').classList.add('desappear')
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('circle').classList.add('close')
            whistleDown.play();
            setTimeout(function() {
                if (audioPlaybackSupport == '1') {
                    soundTrackR1.play();
                }
                audioRodada1.play();
            }, 1000);
        }, 500);
    }
    actualRoundAudio = audioRodada1
    audioRodada1.addEventListener('timeupdate', () => {
        const currentTime = audioRodada1.currentTime;
        audioData.forEach(item => {
        if (Math.abs(currentTime - item.time) < 0.5) {
          const targetElement = document.getElementById(item.elementId);
          if (targetElement) {
            if(item.classlistRemove) {
                targetElement.classList.remove(item.classlistRemove);
            }
            if(item.classlistAdd) {
                targetElement.classList.add(item.classlistAdd);
            }
            if(item.play) {
                targetElement.play()
            }
            if(item.remove) {
                targetElement.remove()
            }
            if (item.startCountdown) {
                const args = item.startCountdown.split(', ');
            
                const param1 = roundTimes[args[0]]; 
                const param2 = parseInt(args[1], 10); 
            
                startCountdown(param1, param2);
            }
            if (item.socketEmit) {
                socket.emit('message', { message: item.socketEmit, room_id: roomId })
            }
          }
        }
      });
    });
}

function round2Var1() {
    timeOuts.length = 0;
    roundVar = 1
    socket.emit('message', { message: 'Round 1 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR1 = document.getElementById("soundTrackR1");
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var audioR2Var1 = document.getElementById("audioR2");
    soundTrackR2.src = '/static/pgGame/audios/r2/soundTrackR2.mp3'
    audioR2Var1.src = '/static/pgGame/audios/r2/audioR2Var1.mp3'

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

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round2Low.png" id="roundsLow">
    <img src="/static/images/Round2.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
        
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/pgGame/rounds/captionR2Var1.json')
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

    if (obterDigito(quality, 0) === '0') {
        fetch(`/static/pgGame/rounds/round2/r2Var1Low.json`)
            .then(response => response.json())
            .then(data => {
                audioData = data;
            });
        audioR2Var1.src = `/static/pgGame/audios/r2/audioR2Var1Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circleLow').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR1.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport === '1') {
                    soundTrackR2.play();
                }
                audioR2Var1.play();
                actualRoundAudio = audioR2Var1
            }, 1000));
        }, 500));
    } else {
        fetch(`/static/pgGame/rounds/round2/r2Var1.json`)
        .then(response => response.json())
        .then(data => {
            audioData = data;
        });
        audioR2Var1.src = `/static/pgGame/audios/r2/audioR2Var1Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circle').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR1.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport === '1') {
                    soundTrackR2.play();
                }
                audioR2Var1.play();
                actualRoundAudio = audioR2Var1
            }, 1000));
        }, 500));
    }
    setTimeout(function() {
        audioR2Var1.addEventListener('timeupdate', () => {
            const currentTime = audioR2Var1.currentTime;
            audioData.forEach(item => {
                if (Math.abs(currentTime - item.time) < 0.5) {
                    const targetElement = document.getElementById(item.elementId);
                    if (targetElement) {
                        if (item.classlistRemove) {
                            targetElement.classList.remove(item.classlistRemove);
                            console.log(1)
                        }
                        if (item.classlistAdd) {
                            targetElement.classList.add(item.classlistAdd);
                            console.log(2)
                        }
                        if (item.play) {
                            targetElement.play();
                            console.log(3)
                        }
                        if(item.remove) {
                            targetElement.remove()
                        }
                        if (item.startCountdown) {
                            const args = item.startCountdown.split(', ');
    
                            const param1 = roundTimes[args[0]]; 
                            const param2 = parseInt(args[1], 10); 
    
                            startCountdown(param1, param2);
                            console.log(4)
                        }
                    }
                }
            });
        });
    }, 200)
}

function round2Var2() {
    timeOuts.length = 0;
    roundVar = 2
    socket.emit('message', { message: 'Round 1 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR1 = document.getElementById("soundTrackR1");
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var audioR2Var1 = document.getElementById("audioR2");
    soundTrackR2.src = '/static/pgGame/audios/r2/soundTrackR2.mp3'
    audioR2Var1.src = '/static/pgGame/audios/r2/audioR2Var2.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round2Low.png" id="roundsLow">
    <img src="/static/images/Round2.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/pgGame/rounds/captionR2Var2.json')
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

    if (obterDigito(quality, 0) === '0') {
        fetch(`/static/pgGame/rounds/round2/r2Var2Low.json`)
            .then(response => response.json())
            .then(data => {
                audioData = data;
            });
        audioR2Var1.src = `/static/pgGame/audios/r2/audioR2Var2Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circleLow').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR1.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport === '1') {
                    soundTrackR2.play();
                }
                audioR2Var1.play();
                actualRoundAudio = audioR2Var1
            }, 1000));
        }, 500));
    } else {
        fetch('/static/pgGame/rounds/round2/r2Var2.json')
        .then(response => response.json())
        .then(data => {
            audioData = data;
        });
        audioR2Var1.src = `/static/pgGame/audios/r2/audioR2Var2Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circle').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR1.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport === '1') {
                    soundTrackR2.play();
                }
                audioR2Var1.play();
                    actualRoundAudio = audioR2Var1
                }, 1000));
        }, 500));
    }
    setTimeout(function() {
        audioR2Var1.addEventListener('timeupdate', () => {
            const currentTime = audioR2Var1.currentTime;
            audioData.forEach(item => {
                if (Math.abs(currentTime - item.time) < 0.5) {
                    const targetElement = document.getElementById(item.elementId);
                    if (targetElement) {
                        if (item.classlistRemove) {
                            targetElement.classList.remove(item.classlistRemove);
                        }
                        if (item.classlistAdd) {
                            targetElement.classList.add(item.classlistAdd);
                        }
                        if (item.play) {
                            targetElement.play();
                        }
                        if(item.remove) {
                            targetElement.remove()
                        }
                        if (item.startCountdown) {
                            const args = item.startCountdown.split(', ');
    
                            const param1 = roundTimes[args[0]]; 
                            const param2 = parseInt(args[1], 10); 
    
                            startCountdown(param1, param2);
                        }
                        if (item.socketEmit) {
                            socket.emit('message', { message: item.socketEmit, room_id: roomId });
                        }
                    }
                }
            });
        });
    }, 200)
}

function round2Var3() {
    timeOuts.length = 0;
    roundVar = 3
    socket.emit('message', { message: 'Round 1 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timerContainer').classList.remove('appear')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR1 = document.getElementById("soundTrackR1");
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var audioR2Var1 = document.getElementById("audioR2");
    soundTrackR2.src = '/static/pgGame/audios/r2/soundTrackR2.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round2Var2Low.png" id="roundsLow">
    <img src="/static/images/Round2Var2.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
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

    fetch('/static/pgGame/rounds/captionR2Var3.json')
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

    if (obterDigito(quality, 0) === '0') {
        fetch('/static/pgGame/rounds/round2/r2Var3Low.json')
            .then(response => response.json())
            .then(data => {
                audioData = data;
            });
        audioR2Var1.src = `/static/pgGame/audios/r2/audioR2Var3Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circleLow').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR1.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport === '1') {
                    soundTrackR2.play();
                }
                audioR2Var1.play();
                actualRoundAudio = audioR2Var1
            }, 1000));
        }, 500));
    } else {
        fetch('/static/pgGame/rounds/round2/r2Var3.json')
        .then(response => response.json())
        .then(data => {
            audioData = data;
        });
        audioR2Var1.src = `/static/pgGame/audios/r2/audioR2Var3Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circle').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR1.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport === '1') {
                    soundTrackR2.play();
                }
                audioR2Var1.play();
                actualRoundAudio = audioR2Var1
            }, 1000));
        }, 500));
    }
    setTimeout(function() {
        audioR2Var1.addEventListener('timeupdate', () => {
            const currentTime = audioR2Var1.currentTime;
            audioData.forEach(item => {
                if (Math.abs(currentTime - item.time) < 0.5) {
                    const targetElement = document.getElementById(item.elementId);
                    if (targetElement) {
                        if (item.classlistRemove) {
                            targetElement.classList.remove(item.classlistRemove);
                        }
                        if (item.classlistAdd) {
                            targetElement.classList.add(item.classlistAdd);
                        }
                        if (item.play) {
                            targetElement.play();
                        }
                        if(item.remove) {
                            targetElement.remove()
                        }
                        if (item.startCountdown) {
                            const args = item.startCountdown.split(', ');
    
                            const param1 = roundTimes[args[0]]; 
                            const param2 = parseInt(args[1], 10); 
    
                            startCountdown(param1, param2);
                        }
                        if (item.src) {
                            targetElement.src = item.src;
                        }
                    }
                }
            });
        });
    }, 200)
}
function round3Var1() {
    timeOuts.length = 0;
    roundVar = 1
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var soundTrackR3 = document.getElementById("soundTrackR3");
    var audioR3Var1 = document.getElementById("audioR3");
    soundTrackR3.src = '/static/pgGame/audios/r3/soundTrackR3Var1.mp3'
    audioR3Var1.src = '/static/pgGame/audios/r3/audioR3var1.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round3Low.png" id="roundsLow">
    <img src="/static/images/Round3.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/pgGame/rounds/captionR3Var1.json')
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

    if (obterDigito(quality, 0) === '0') {
        fetch('/static/pgGame/rounds/round3/r3Var1Low.json')
            .then(response => response.json())
            .then(data => {
                audioData = data;
            });
        audioR3Var1.src = `/static/pgGame/audios/r3/audioR3var1Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circleLow').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR2.remove();
                actualRoundAudio.remove()
                if (audioPlaybackSupport === '1') {
                    soundTrackR3.play();
                }
                audioR3Var1.play();
                actualRoundAudio = audioR3Var1
            }, 1000));
        }, 500));
    } else {
        fetch('/static/pgGame/rounds/round3/r3Var1.json')
        .then(response => response.json())
        .then(data => {
            audioData = data;
        });
        audioR3Var1.src = `/static/pgGame/audios/r3/audioR3var1Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circle').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR2.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport === '1') {
                    soundTrackR3.play();
                }
                audioR3Var1.play();
                actualRoundAudio = audioR3Var1
            }, 1000));
        }, 500));
    }
    setTimeout(function() {
        audioR3Var1.addEventListener('timeupdate', () => {
            const currentTime = audioR3Var1.currentTime;
            audioData.forEach(item => {
                if (Math.abs(currentTime - item.time) < 0.5) {
                    const targetElement = document.getElementById(item.elementId);
                    if (targetElement) {
                        if (item.classlistRemove) {
                            targetElement.classList.remove(item.classlistRemove);
                        }
                        if (item.classlistAdd) {
                            targetElement.classList.add(item.classlistAdd);
                        }
                        if (item.play) {
                            targetElement.play();
                        }
                        if(item.remove) {
                            targetElement.remove()
                        }
                        if (item.startCountdown) {
                            const args = item.startCountdown.split(', ');
    
                            const param1 = roundTimes[args[0]]; 
                            const param2 = parseInt(args[1], 10); 
    
                            startCountdown(param1, param2);
                        }
                        if (item.src) {
                            targetElement.src = item.src;
                        }
                    }
                }
            });
        });
    }, 200)
}

function round3Var2() {
    timeOuts.length = 0;
    roundVar = 2
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var soundTrackR3 = document.getElementById("soundTrackR3");
    var audioR3Var1 = document.getElementById("audioR3");
    soundTrackR3.src = '/static/pgGame/audios/r3/soundTrackR3Var2.mp3'
    audioR3Var1.src = '/static/pgGame/audios/r3/audioR3var2.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round3Low.png" id="roundsLow">
    <img src="/static/images/Round3.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/pgGame/rounds/captionR3Var2.json')
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

    if (obterDigito(quality, 0) === '0') {
        fetch('/static/pgGame/rounds/round3/r3Var2Low.json')
            .then(response => response.json())
            .then(data => {
                audioData = data;
            });
        audioR3Var1.src = `/static/pgGame/audios/r3/audioR3var2Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circleLow').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR2.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport == '1') {
                    soundTrackR3.play();
                }
                audioR3Var1.play();
                actualRoundAudio = audioR3Var1
            }, 1000));
        }, 500));
    } else {
        fetch('/static/pgGame/rounds/round3/r3Var2.json')
        .then(response => response.json())
        .then(data => {
            audioData = data;
        });
        audioR3Var1.src = `/static/pgGame/audios/r3/audioR3var2Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circle').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR2.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport == '1') {
                    soundTrackR3.play();
                }
                audioR3Var1.play();
                actualRoundAudio = audioR3Var1
            }, 1000));
        }, 500));
    }
    setTimeout(function() {
        audioR3Var1.addEventListener('timeupdate', () => {
            const currentTime = audioR3Var1.currentTime;
            audioData.forEach(item => {
                if (Math.abs(currentTime - item.time) < 0.5) {
                    const targetElement = document.getElementById(item.elementId);
                    if (targetElement) {
                        if (item.classlistRemove) {
                            targetElement.classList.remove(item.classlistRemove);
                        }
                        if (item.classlistAdd) {
                            targetElement.classList.add(item.classlistAdd);
                        }
                        if (item.play) {
                            targetElement.play();
                        }
                        if(item.remove) {
                            targetElement.remove()
                        }
                        if (item.startCountdown) {
                            const args = item.startCountdown.split(', ');
    
                            const param1 = roundTimes[args[0]]; 
                            const param2 = parseInt(args[1], 10); 
    
                            startCountdown(param1, param2);
                        }
                        if (item.src) {
                            targetElement.src = item.src;
                        }
                    }
                }
            });
        });
    }, 200)
}

function round3Var3() {
    timeOuts.length = 0;
    roundVar = 3
    socket.emit('message', { message: 'Round 2 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)')
    document.getElementById('skipRoundBtn').classList.add('aparecendo')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = false;
    var soundTrackR2 = document.getElementById("soundTrackR2");
    var soundTrackR3 = document.getElementById("soundTrackR3");
    var audioR3Var1 = document.getElementById("audioR3");
    soundTrackR3.src = '/static/pgGame/audios/r3/soundTrackR3.mp3'
    audioR3Var1.src = '/static/pgGame/audios/r3/audioR3var3.mp3'

    const playerList = document.getElementById('playerList');
            
    const clonedPlayerList = playerList.cloneNode(true);

    clonedPlayerList.id = 'playerListR2'
    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round3Low.png" id="roundsLow">
    <img src="/static/images/Round3.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
    `
    document.getElementById('roundContainer').appendChild(clonedPlayerList);
    
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/pgGame/rounds/captionR3Var3.json')
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

    if (obterDigito(quality, 0) === '0') {
        fetch('/static/pgGame/rounds/round3/r3Var3Low.json')
            .then(response => response.json())
            .then(data => {
                audioData = data;
            });

        audioR3Var1.src = `/static/pgGame/audios/r3/audioR3var3Q${audioPlaybackSupport}.mp3`
        console.log(audioData)

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circleLow').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR2.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport == '1') {
                    soundTrackR3.play();
                }
                audioR3Var1.play();
                actualRoundAudio = audioR3Var1
            }, 1000));
        }, 500));
    } else {
        fetch('/static/pgGame/rounds/round3/r3Var3.json')
        .then(response => response.json())
        .then(data => {
            audioData = data;
        });
        audioR3Var1.src = `/static/pgGame/audios/r3/audioR3var3Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circle').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR2.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport == '1') {
                    soundTrackR3.play();
                }
                audioR3Var1.play();
                actualRoundAudio = audioR3Var1
            }, 1000));
        }, 500));
    }
    setTimeout(function() {
        audioR3Var1.addEventListener('timeupdate', () => {
            const currentTime = audioR3Var1.currentTime;
            audioData.forEach(item => {
                if (Math.abs(currentTime - item.time) < 0.5) {
                    const targetElement = document.getElementById(item.elementId);
                    if (targetElement) {
                        if (item.classlistRemove) {
                            targetElement.classList.remove(item.classlistRemove);
                        }
                        if (item.classlistAdd) {
                            targetElement.classList.add(item.classlistAdd);
                        }
                        if (item.play) {
                            targetElement.play();
                        }
                        if(item.remove) {
                            targetElement.remove()
                        }
                        if (item.startCountdown) {
                            const args = item.startCountdown.split(', ');
    
                            const param1 = roundTimes[args[0]]; 
                            const param2 = parseInt(args[1], 10); 
    
                            startCountdown(param1, param2);
                        }
                        if (item.src) {
                            targetElement.src = item.src;
                        }
                    }
                }
            });
        });
    }, 200)
}

function round4Var1() {
    let timeOutOcorrendo = false
    timeOuts.length = 0;
    roundVar = 1
    socket.emit('message', { message: 'Round 3 finished', room_id: roomId });

    document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(4)')
    document.getElementById('timer').style.display = 'block'
    document.getElementById('skipRoundBtn').disabled = true;
    var soundTrackR3 = document.getElementById("soundTrackR3");
    var soundTrackR4 = document.getElementById("soundTrackR4");
    var audioR4 = document.getElementById("audioR4");

    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img id="logoLow" src="/static/images/LogoLow.png" alt="">
    <img id="logo" src="/static/images/LOGO.png" alt="">
    <img id="show" src="/static/images/OSHOW.png" alt="">
    <img src="/static/images/Round4Low.png" id="roundsLow">
    <img src="/static/images/Round4.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
    `
    
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/pgGame/rounds/captionR4.json')
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

    if (obterDigito(quality, 0) === '0') {
        fetch('/static/pgGame/rounds/round4/r4Var1Low.json')
            .then(response => response.json())
            .then(data => {
                audioData = data;
            });
        audioR4.src = `/static/pgGame/audios/r4/audioR4Q${audioPlaybackSupport}.mp3`

        console.log(audioData)

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circleLow').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR3.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport == '1') {
                    soundTrackR4.play();
                }
                audioR4.play();
                actualRoundAudio = audioR4
            }, 1000));
        }, 500));
    } else {
        fetch('/static/pgGame/rounds/round4/r4Var1.json')
        .then(response => response.json())
        .then(data => {
            audioData = data;
        });
        audioR4.src = `/static/pgGame/audios/r4/audioR4Q${audioPlaybackSupport}.mp3`

        timeOuts.push(setTimeout(function() {
            document.getElementById('timerContainer').classList.remove('appear')
            document.getElementById('timer').classList.add('appear')
            document.getElementById('circle').classList.add('close')
            whistleDown.play();
            timeOuts.push(setTimeout(function() {
                soundTrackR3.remove();
                actualRoundAudio.remove();
                if (audioPlaybackSupport == '1') {
                    soundTrackR4.play();
                }
                audioR4.play();
                actualRoundAudio = audioR4
            }, 1000));
        }, 500));
    }
    setTimeout(function() {
        audioR4.addEventListener('timeupdate', () => {
            const currentTime = audioR4.currentTime;
            audioData.forEach(item => {
                if (Math.abs(currentTime - item.time) < 0.5) {
                    const targetElement = document.getElementById(item.elementId);
                    if (targetElement) {
                        if (item.classlistRemove) {
                            targetElement.classList.remove(item.classlistRemove);
                        }
                        if (item.classlistAdd) {
                            targetElement.classList.add(item.classlistAdd);
                        }
                        if (item.play) {
                            targetElement.play();
                        }
                        if(item.remove) {
                            targetElement.remove()
                        }
                        if (item.startCountdown) {
                            const args = item.startCountdown.split(', ');
    
                            const param1 = roundTimes[args[0]]; 
                            const param2 = parseInt(args[1], 10); 
                            const param3 = parseInt(args[2], 10); 
                            startCountdown(35, 0, 4);
                        }
                        if (item.startTournament) {
                            startTournament(roomId);
                        }
                        if (item.src) {
                            targetElement.src = item.src;
                        }
                        if (item.timeOut) {                            
                            if (timeOutOcorrendo === false) {
                                timeOuts.push(setTimeout(function() {
                                    fetchMatchups();
                                }, 1000));
                                timeOuts.push(setTimeout(function() {
                                    document.getElementById('papaleguas').classList.add('appear')
                                }, 2000));
                                timeOutOcorrendo = true
                            } else {
                                console.log('multiplos timeouts ocorrendo, apenas um ficará')
                            }
                        }
                    }
                }
            });
        });
    }, 200)
    startTournament(roomId)
}

function roundFinal() {
    timeOuts.length = 0;
    roundVar = 1
    document.getElementById('skipRoundBtn').setAttribute('onclick', `skipRound('final')`)
    var audioRodadaFinal = document.getElementById("audioFinal");
    var soundTrackR4 = document.getElementById("soundTrackR4");
    soundTrackR4.pause();

    document.getElementById('roundContainer').innerHTML = `
    <img id="iluminacao" src="/static/images/iluminacao.png" alt="">
    <img src="/static/images/Round2.png" id="rounds">
    <audio id="whistleUp" src="/static/pgGame/audios/WhistleUp.mp3" type="audio/mpeg"></audio>
    <audio id="whistleDown" src="/static/pgGame/audios/WhistleDown.mp3" type="audio/mpeg"></audio>
    `

    var whistleDown = document.getElementById("whistleDown");
    var whistleUp = document.getElementById("whistleUp");
    var subtitleDiv = document.getElementById("subtitles");
    var subtitles = [];

    fetch('/static/pgGame/rounds/captionFinal.json')
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
            soundTrackR4.remove()
            actualRoundAudio.remove()
            audioRodadaFinal.play();
            document.getElementById('timerContainer').classList.remove('appear')
        }, 1000);
    }, 500);
    setTimeout(function() {
        document.getElementById('circle').classList.remove('close')
        document.getElementById('circle').classList.add('final-round')
        finalScreenDisable = true
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

        fetch('/static/pgGame/rounds/round4/creditos.json')
        .then(response => response.json())
        .then(data => {
          const creditos = document.createElement('div');
          creditos.id = 'creditosContainer';
      
          data.creditos.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('creditos-element');
      
            const sectionTitle = document.createElement('h1');
            sectionTitle.classList.add('h1-creditos');
            sectionTitle.textContent = section.categoria;
            sectionDiv.appendChild(sectionTitle);
      
            const ul = document.createElement('ul');
            ul.classList.add('list-creditos');
            
            section.items.forEach(item => {
              const li = document.createElement('li');
              li.classList.add('list-element-creditos');
      
              const spanTitulo = document.createElement('span');
              spanTitulo.classList.add('span-creditos');
              spanTitulo.innerHTML = `<b>${item.titulo}</b>`;
              
              const spanNome = document.createElement('span');
              spanNome.classList.add('span-creditos');
              spanNome.textContent = item.nome;
      
              li.appendChild(spanTitulo);
              li.appendChild(spanNome);
              ul.appendChild(li);
            });
      
            sectionDiv.appendChild(ul);
            creditos.appendChild(sectionDiv);
          });
      
          const inspiracao = document.createElement('span');
          inspiracao.classList.add('span-creditos');
          inspiracao.textContent = data.inspiracao;
          creditos.appendChild(inspiracao);
      
          const logo = document.createElement('img');
          logo.classList.add('logo-creditos');
          logo.src = data.logoSrc;
          creditos.appendChild(logo);
      
          matchupContainer.appendChild(creditos);
        })
        .catch(error => console.error('Erro ao carregar os créditos:', error));
      
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
        <button class="primary-btn" id="newGameBtn" onclick="backToBox()">Voltar à Caixa</button>
        `
        document.body.appendChild(finalScreen)
    }, 90000));
}

function skipRound(roundNum) {
    document.getElementById('skipRoundBtn').disabled = true;
    document.getElementById('skipRoundBtn').classList.remove('aparecendo')
    timeOuts.forEach(function(timeoutID) {
        clearTimeout(timeoutID);
    });
    if (roundNum === 1) {
        const audioR1Var1 = document.getElementById("audioR1");
        audioR1Var1.pause();
        audioR1Var1.currentTime = 0;
        startCountdown(round1Time, 500)
        document.getElementById('timerContainer').classList.add('appear')
    } 
    if (roundNum === 2) {
        const audioR2Var1 = document.getElementById("audioR2");
        if (roundVar === 1) {
            audioR2Var1.currentTime = 10.6;
            setTimeout(function() {
                audioR2Var1.currentTime = 11;
        }, 100)
        }
        if (roundVar === 2) {
            audioR2Var1.currentTime = 11;
            setTimeout(function() {
                audioR2Var1.currentTime = 14;
            }, 100)
        }
        if (roundVar === 3) {
            audioR2Var1.currentTime = 17;
            setTimeout(function() {
                audioR2Var1.currentTime = 17.8;
            }, 100)
        }
        startCountdown(round2Time, 500)
        document.getElementById('timerContainer').classList.add('appear')
    }
    if (roundNum === 3) {
        const audioR3Var1 = document.getElementById("audioR3");
        if (roundVar === 1) {
            audioR3Var1.currentTime = 29.4;
            setTimeout(function() {
                audioR3Var1.currentTime = 30;
            }, 100)
        }
        if (roundVar === 2) {
            audioR3Var1.currentTime = 22.2;
            setTimeout(function() {
                audioR3Var1.currentTime = 22.2;
            }, 100)
        }
        if (roundVar === 3) {
            audioR3Var1.currentTime = 15.4;
            setTimeout(function() {
                audioR3Var1.currentTime = 15.7;
            }, 100)
        }
        startCountdown(round3Time, 500)
        document.getElementById('timerContainer').classList.add('appear')
    }
    if (roundNum === 4) {
        const audioR4 = document.getElementById("audioR4");
        startCountdown(round4Time, 500)
        document.getElementById('timerContainer').classList.add('appear')
    }
    if (roundNum === 'final') {
        const audioFinal = document.getElementById("audioFinal");
        audioFinal.pause();
        audioFinal.currentTime = 0;
        const finalScreen = document.createElement('div')
        finalScreen.id = "loadingScreen"
        finalScreen.classList.add('message-screen')
        finalScreen.classList.add('show')

        finalScreen.innerHTML = `
        <img src="/static/images/logoAnimado.png" class="loading-screen-img"></img>
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
let testDuration = 5000;
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
    const animationSelect = document.getElementById('animationSelect')
    const screenEffectSelect = document.getElementById('screenSelect')
    const screenEffectContainer = document.getElementById('effectContainer')
    const legendaActivationSelect = document.getElementById('legendaActivationSelect')
    quality = performanceLevel
    localStorage.setItem('pc-gm-qual', quality)

    checkAudioPlaybackSupport().then(support => {
        if (support) {
            alterarNum(quality, 3, "1")
            localStorage.setItem('pc-gm-qual', quality)
            audioPlaybackSupport = obterDigito(quality, 3)
        } else {
            alterarNum(quality, 3, "0")
            localStorage.setItem('pc-gm-qual', quality)
            audioPlaybackSupport = obterDigito(quality, 3)
        }
    });

    if (obterDigito(performanceLevel, 0) == 1) {
        alterarNum(quality, 0, "1")
        animationSelect.value = 'Alto'
        showLoadingScreen(performanceLevel)
    } else {
        alterarNum(quality, 0, "0")
        animationSelect.value = 'Baixo'
        showLoadingScreen(performanceLevel)
    }

    if (obterDigito(performanceLevel, 1) == 1) {
        alterarNum(quality, 1, "1")
        screenEffectSelect.value = 'Ativado'
        showLoadingScreen(performanceLevel)
    } else {
        alterarNum(quality, 1, "0")
        screenEffectSelect.value = 'Desativado'
        screenEffectContainer.classList.toggle('ativo')
        showLoadingScreen(performanceLevel)
    }

    if (obterDigito(performanceLevel, 2) == 1) {
        alterarNum(quality, 2, "1")
        legendaActivationSelect.value = 'Ativado'
        showLoadingScreen(performanceLevel)
    } else {
        alterarNum(quality, 2, "0")
        legendaActivationSelect.value = 'Desativado'
        document.getElementById('subtitles').classList.toggle('active')
        showLoadingScreen(performanceLevel)
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
            
            let performanceLevel = 0;
            if (averageFPS < 10) {
                performanceLevel = '00111111';
            } else if (averageFPS < 30) {
                performanceLevel = '10111111';
            } else {
                performanceLevel = '11111111';
            }

            autoSetQuality(performanceLevel)
        }
    }

    document.getElementById('fps').textContent = `FPS: ${fps.toFixed(2)}`;
    document.getElementById('fps').style.display = 'none'
    requestAnimationFrame(calculateFPS);
}

async function checkAudioPlaybackSupport() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.0001;

        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        
        oscillator1.frequency.setValueAtTime(440, audioContext.currentTime); 
        oscillator2.frequency.setValueAtTime(660, audioContext.currentTime);

        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator1.start();
        oscillator2.start();

        setTimeout(() => {
            oscillator1.stop();
            oscillator2.stop();
            audioContext.close();
        }, 1000);

        return true;

    } catch (error) {
        return false;
    }
}


function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen')
    loadingScreen.classList.add('skip')
    setTimeout(function(){
        loadingScreen.remove()
    }, 4000)
}

verifyQuality()

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/static/pgGame/scripts/sw.js')
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
            window.location.href = `/host/${roomId}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function backToBox() {
    window.location.href = `/box?played=1`;
}