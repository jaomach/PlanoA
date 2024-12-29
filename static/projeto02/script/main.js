// sistema rounds
let optionsActive = false
let gameMenuListening = false
let isCountdownActive = false

var socket = io({
    query: { roomId: roomId },
    transports: ['websocket', 'polling']
});

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('join', { room_id: roomId, user_type: 'host' });
});

function obterDigito(numero, posicao) {
    if (posicao < 0 || posicao >= numero.length) {
        console.log("Posição inválida.");
        return null;
    }
  
    return numero[posicao];
}

function alterarNum(numero, posicao, novoDigito) {
    if (posicao < 0 || posicao >= numero.length) {
        console.log("Posição inválida.");
        return numero;
    }

    quality = numero.substring(0, posicao) + novoDigito + numero.substring(posicao + 1);
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
                if (inTimeoutPause) {
                    startNextRound(Number(actualRoundDuration))
                }
                inTimeoutPause = false
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
            showMessage(data.message)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// canvas

const canvas = document.getElementById('canvas')
const divCanvas = document.getElementById('gameContainer')
const fixedWidth = 854
const fixedHeight = 480
let actualRound = 0
const pathToAssets = '/static/projeto02/assets/'
canvas.width = fixedWidth
canvas.height = fixedHeight
let selectingPlanet = true
const planets = [
    {
        name: 'Zentarion',
        atmosphere: 'Oxigênio e Nitrogênio',
        temperature: '20°C',
        color: 'red',
        radius: 50,
        texture: pathToAssets + 'planet1.png'
    },
    {
        name: 'Gloopitar',
        atmosphere: 'Sulfuric Acid and Nitrogen',
        temperature: '460°C',
        color: "yellow",
        radius: 30,
        texture: pathToAssets + 'planet1.png'
    },
    {
        name: 'Krylon',
        atmosphere: 'Methane and Ammonia',
        temperature: '-200°C',
        color: 'lightblue',
        radius: 40,
        texture: pathToAssets + 'wallpaper2.jpg'
    }
]
let currentPlanet = 0
let transitioning = false
const textureCache = {}

function loadTexture(key, src) {
  if (!textureCache[key]) {
    const img = new Image()
    img.src = src
    textureCache[key] = img
  }
  return textureCache[key]
}


const backgroundImage = new Image()
const skyBox = new Image()
backgroundImage.src = pathToAssets + 'background.png'
skyBox.src = pathToAssets + 'sky.png'
console.log(fixedWidth)
console.log(innerWidth)

const ctx = canvas.getContext('2d')
let x,
  y,
  numberOfStars = 300,
  speed = 2000,
  initialSize = 10,
  size = 30

let frameCounter = 0
let frameCounterAux = 0
let starsGoing = false
let color = ['#eb4d55']
let planetSelectionAnimation = false

window.addEventListener('click', () => {
  if (planetSelected) return
  if (transitioning) return
  planetSelectionAnimation = true
  animateText(planets[currentPlanet], fixedWidth / 2, (fixedHeight / 2) - 40 , 300, 1)
  setTimeout(function () {
    for (let i = 0; i < numberOfStars; i++) {
      stars[i].store_lx_ly()
    }
    starsGoing = true
    setTimeout(function () {
      planetSelected = true
    }, 2000)
    fadeOut = document.createElement('div')
    fadeOut.id = 'fadeOut'
    document.body.appendChild(fadeOut)
    roundAnimation(1, '9:00 AM')
  }, 1000)
})

// estrelas
function star (x, y, an, color) {
  this.x = x
  this.y = y
  this.an = an
  this.dirx = this.x > 0 ? 1 : -1
  this.diry = this.y > 0 ? 1 : -1
  this.color = color
  this.speed = speed
  this.m = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2))
  this.size = Math.sqrt(this.m) / size
  this.lm, this.lx, this.ly
  this.show_trail = false
  this.draw = function () {
    ctx.beginPath()
    ctx.arc(this.x + fixedWidth / 2, this.y + fixedHeight / 2, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = color
    ctx.fill()

    if (this.show_trail) {
      ctx.beginPath()
      ctx.moveTo(this.lx + fixedWidth / 2, this.ly + fixedHeight / 2)
      ctx.lineTo(this.x + fixedWidth / 2, this.y + fixedHeight / 2)
      ctx.stroke()
      ctx.strokeStyle = color
    }
  }
  this.store_lx_ly = () => {
    this.lx = this.x
    this.ly = this.y
    this.lm = this.m
    this.show_trail = true
    this.speed = this.m * 0.5
  }
  this.update = () => {
    this.m += this.m / this.speed

    this.size = Math.sqrt(this.m) / size

    this.x = this.dirx * this.m * Math.cos(this.an)
    this.y = this.diry * this.m * Math.sin(this.an)

    if (
      this.x <= -fixedWidth / 2 ||
      this.x >= fixedWidth / 2 ||
      this.y <= -fixedHeight / 2 ||
      this.y >= fixedHeight / 2
    ) {
      if (this.show_trail) {
        this.speed = 100
        this.lm += this.lm / this.speed
        this.lx = this.dirx * this.lm * Math.cos(this.an)
        this.ly = this.diry * this.lm * Math.sin(this.an)
        if (
          this.lx <= -fixedWidth / 2 ||
          this.lx >= fixedWidth / 2 ||
          this.ly <= -fixedHeight / 2 ||
          this.ly >= fixedHeight / 2
        ) {
          this.show_trail = false
          this.speed = speed
          this.x = (Math.random() - 0.5) * fixedWidth
          this.y = (Math.random() - 0.5) * fixedHeight
          this.an = Math.random() * Math.PI * 2
          this.m = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2))
          this.size = Math.sqrt(this.m) / size
          this.dirx = this.x > 0 ? 1 : -1
          this.diry = this.y > 0 ? 1 : -1
        }
      } else {
        this.x = (Math.random() - 0.5) * fixedWidth
        this.y = (Math.random() - 0.5) * fixedHeight
        this.an = Math.random() * Math.PI * 2
        this.m = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2))
        this.size = Math.sqrt(this.m) / 15
        this.dirx = this.x > 0 ? 1 : -1
        this.diry = this.y > 0 ? 1 : -1
      }
    }
    if (Math.abs(this.x) > 50 || Math.abs(this.y > 50)) this.draw()
  }
}

let stars = []
for (let i = 0; i < numberOfStars; i++) {
  x = (Math.random() - 0.5) * fixedWidth * 0.7
  y = (Math.random() - 0.5) * fixedHeight * 0.7
  an = Math.random() * Math.PI - Math.PI / 2
  stars.push(new star(x, y, an, color[Math.floor(Math.random() * 7)]))
}

function getEase (currentProgress, start, distance, steps) {
  currentProgress /= steps / 2
  if (currentProgress < 1) {
    return (distance / 2) * Math.pow(currentProgress, 3) + start
  }
  currentProgress -= 2
  return (distance / 2) * (Math.pow(currentProgress, 3) + 2) + start
}

function drawPlanet(planet, x, y, progress) {
  const opacity = progress
  let atmosphereBlur = 1;
  let atmosphereWidth = 1;
  
  if (starsGoing) {
    frameCounter++
    frameCounterAux = getEase(frameCounter, 0, 1000, 160)
    if (frameCounterAux > 20) {
      atmosphereBlur = frameCounterAux*0.08
      atmosphereWidth = frameCounterAux*0.08
    }
  }
  
  const textureImage = loadTexture(planet.name, planet.texture)

  if (!textureImage.complete) return

  const textureOffsetX = ((x * 1.06) + 200)
  
  ctx.save()
  ctx.globalAlpha = opacity

  const pattern = ctx.createPattern(textureImage, 'repeat')

  ctx.beginPath()
  ctx.arc(x, y, planet.radius + frameCounterAux * 0.5, 0, Math.PI * 2)
  ctx.fillStyle = pattern
  ctx.setTransform(1 + frameCounterAux * 0.3, 0, 0, 1 + frameCounterAux * 0.3, textureOffsetX, 0)
  ctx.fill()

  //atmosfera
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.beginPath()
  ctx.arc(x, y, planet.radius + frameCounterAux * 0.5 + 1.5, 0, Math.PI * 2)
  ctx.strokeStyle = planet.color
  ctx.lineWidth = atmosphereWidth
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = ctx.shadowOffsetY = 2;
  ctx.shadowColor = "#000";
  ctx.filter = `blur(${atmosphereBlur}px)`;
  ctx.stroke()
  ctx.filter = 'none'

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.beginPath()
  ctx.arc(x, y, planet.radius + frameCounterAux * 0.5 + 7, 0, Math.PI * 2)
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.beginPath()
  ctx.arc(x, y, planet.radius + frameCounterAux * 0.5 + 7, 0, Math.PI * 2)
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 1
  ctx.filter = 'blur(5px)'
  ctx.stroke()

  ctx.restore()
}

function drawPlanetText(planet, x, y, progress) {
  const opacity = progress

  ctx.save()
  ctx.globalAlpha = opacity
  ctx.fillStyle = 'red'
  ctx.font = '10px Arial'
  
  const textX = x + planet.radius + 15
  const textY = y - planet.radius / 2

  ctx.filter = 'blur(5px)'
  ctx.fillText(`Nome: ${planet.name}`, textX, textY)
  ctx.fillText(`Atmosfera: ${planet.atmosphere}`, textX, textY + 15)
  ctx.fillText(`Temperatura: ${planet.temperature}`, textX, textY + 30)

  ctx.filter = 'none'
  ctx.fillText(`Nome: ${planet.name}`, textX, textY)
  ctx.fillText(`Atmosfera: ${planet.atmosphere}`, textX, textY + 15)
  ctx.fillText(`Temperatura: ${planet.temperature}`, textX, textY + 30)

  ctx.restore()
}

function drawText(content, textX, textY, fontSize, textOpacity, bloom) {
  if (!fontSize) {
    fontSize = 12
  }
  if (!textOpacity) {
    textOpacity = 1
  }
  ctx.globalAlpha = textOpacity
  ctx.fillStyle = 'white'
  ctx.font = `${fontSize}px Arial`
  ctx.fillText(content, textX, textY)
  if (bloom) {
    ctx.filter = 'blur(5px)'
    ctx.fillStyle = 'white'
    ctx.font = `${fontSize}px Arial`
    ctx.fillText(content, textX, textY)
    ctx.filter = 'none'
  }
  ctx.globalAlpha = 1
}

function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.strokeStyle = '#FFF'; // Cor branca
  ctx.lineWidth = 0.5;        // Largura da linha
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

let textAnimationInProgress = false

function animateText(planet, x, y, duration, reverseAnimation) {
  reverseAnimation = reverseAnimation === 1
  textAnimationInProgress = true

  let start = null
  console.log(planet, x, y, duration, reverseAnimation)

  function step(timestamp) {
    if (!start) start = timestamp
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    const adjustedProgress = reverseAnimation ? 1 - progress : progress
    drawPlanetText(planet, x, y, adjustedProgress)
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      if (reverseAnimation) {
        drawPlanetText(planet, x, y, 0)
      }
      textAnimationInProgress = false
    }
  }

  requestAnimationFrame(step)
}
function animateTransition(newPlanet, direction) {
  if (transitioning) return
  transitioning = true
  let triggered = false

  
  const startPlanet = planets[currentPlanet]
  const endPlanet = planets[newPlanet]
  
  let progress = 0
  const steps = 90
  
  function transitionStep() {
    const startX = getEase(
      progress,
      (fixedWidth) / 2,
      -fixedWidth * direction,
      steps
    )
    const endX = getEase(
      progress,
      (fixedWidth) / 2 + fixedWidth * direction,
      -fixedWidth * direction,
      steps
    )
    
    if (progress <= steps) {
      drawPlanet(startPlanet, startX, (fixedHeight / 2) - 40, 1 - progress / steps, true)
      drawPlanet(endPlanet, endX, (fixedHeight / 2) - 40, progress / steps, true)
      ctx.filter = 'brightness(0.7)'
      ctx.drawImage(overlayImage, 0, 0, fixedWidth, fixedHeight)
      ctx.filter = 'none'
    }
    
    if (!triggered) {
      triggered = true
      animateText(startPlanet, startX, (fixedHeight / 2) - 40, 300, 1)
    }

    progress++

    if (progress > steps) {
      animateText(endPlanet, endX, (fixedHeight / 2) - 40, 300, 0)
      currentPlanet = newPlanet
      transitioning = false
    } else {
      requestAnimationFrame(transitionStep)
    }
  }

  transitionStep()
}

function changePlanet(direction) {
  const nextPlanet =
    (currentPlanet + direction + planets.length) % planets.length
  animateTransition(nextPlanet, direction)
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' && !planetSelected) {
    changePlanet(1)
  } else if (e.key === 'ArrowLeft' && !planetSelected) {
    changePlanet(-1)
  }
})

let zoomScale = 1
let zoomSpeed = 0.01

let animationId
let isPaused = false
let firstTime = true

let tilt = 0
let adjustedTilt
let daylight = true

let planetSelected = false

let verticalOffset = 0
const verticalSpeed = 0.3
const returnSpeed = 0.2

function drawBackground (zoomX, zoomY, zoomWidth, zoomHeight) {
  if (!zoomX) {
    zoomX = 0
  } else if (!zoomY) {
    zoomY = 0
  } else if (!zoomWidth) {
    zoomWidth = fixedWidth
  } else if (!zoomHeight) {
    zoomHeight = fixedHeight
  }
  ctx.drawImage(skyBox, zoomX, zoomY, zoomWidth, zoomHeight)
  ctx.drawImage(backgroundImage, zoomX, zoomY, zoomWidth, zoomHeight)
}

// Configuração de limites de zoom
const maxZoomScale = 3.25
const minZoomScale = 1

let showCircle = false // Indica se o círculo deve ser exibido

// Evento para alternar a exibição do círculo ao pressionar 'C'
document.addEventListener('keydown', event => {
  if (event.key === 'c' && !daylight && planetSelected) {
    const audio = new Audio('static/Flashlight Sound Effect sfx.mp3')
    setTimeout(function () {
      showCircle = !showCircle // Alterna entre mostrar e esconder o círculo
    }, 250)
    audio.volume = 0.4
    audio.play()
  } else if (event.key === 'v' && planetSelected) {
    if (!daylight) {
      daylight = true
    } else {
      daylight = false
    }
  }
})

let overlayImage = new Image()
overlayImage.src = pathToAssets + 'nave.png'

isZooming = false
let audioZooming = new Audio(pathToAssets + 'camera zoom sound effect.mp3')
let audioRelease = new Audio(pathToAssets + 'Flashlight Sound Effect sfx.mp3')

document.addEventListener('keydown', event => {
  if (
    (event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
    !isZooming &&
    zoomScale !== maxZoomScale
  ) {
    isZooming = true

    audioZooming.loop = true
    audioZooming.play()
    if (zoomScale === maxZoomScale) {
      audioZooming.pause()
      audioZooming.loop = false
    }
  }
})

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp') {
    zoomScale += 0.1
    zoomSpeed = 0
    adjustedTilt = tilt * zoomScale
    if (zoomScale > maxZoomScale) {
      zoomScale = maxZoomScale
      audioZooming.pause()
      audioZooming.loop = false
    }
  } else if (event.key === 'ArrowDown') {
    zoomScale -= 0.1
    zoomSpeed = 0
    adjustedTilt = tilt * zoomScale
    if (zoomScale < minZoomScale) {
      zoomScale = minZoomScale
      audioZooming.pause()
      audioZooming.loop = false
    }
  } else if (event.key === 'ArrowRight') {
    if (showCircle) {
      if (tilt <= (fixedWidth/2)/*-120 circulo inteiro na borda*/) {
        tilt += 10
        adjustedTilt = tilt * zoomScale
      }
    }
  } else if (event.key === 'ArrowLeft') {
    if (showCircle) {
      if (tilt >= -fixedWidth/2) {
        tilt -= 10
        adjustedTilt = tilt * zoomScale
      }
    }
  }
})

document.addEventListener('keyup', event => {
  if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && isZooming) {
    isZooming = false

    if (audioZooming) {
      audioZooming.pause()
      audioZooming.currentTime = 0
    }

    audioRelease.play()
  }
})

backgroundImage.onload = drawBackground

function updateCanvasScale () {
  const actualHorizontalSize =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  const updatedScale = actualHorizontalSize / fixedWidth
  divCanvas.style.scale = updatedScale
}

updateCanvasScale()
window.addEventListener('resize', updateCanvasScale)

const noiseCanvas = document.getElementById('noiseCanvas')
const noiseCtx = noiseCanvas.getContext('2d')
noiseCanvas.width = fixedWidth
noiseCanvas.height = fixedHeight

function generateNoise () {
  const imageData = noiseCtx.createImageData(
    noiseCanvas.width,
    noiseCanvas.height
  )
  const buffer = imageData.data

  for (let i = 0; i < buffer.length; i += 4) {
    const gray = Math.random() * 555
    buffer[i] = gray
    buffer[i + 1] = gray
    buffer[i + 2] = gray
    buffer[i + 3] = 8
  }

  noiseCtx.putImageData(imageData, 0, 0)
}
let roundBackground = false
const noiseCanvasContainer = document.getElementById('noiseCanvas')
// Função para animar o ruído
function animateNoise () {
  generateNoise()
  if (roundBackground == false) {
    requestAnimationFrame(animateNoise)
    noiseCanvasContainer.style.imageRendering = 'auto'
  } else {
    noiseCanvasContainer.style.imageRendering = 'pixelated'
  }
}

animateNoise()

function roundAnimation(day, time) {
  let opacity = 0
  const fadeIn = () => {
    roundBackground = true
    if (opacity < 1) {
      opacity += 0.01
      noiseCtx.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height)
      noiseCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      noiseCtx.fillRect(0, 0, noiseCanvas.width, noiseCanvas.height)
      requestAnimationFrame(fadeIn)
    } else {
      noiseCtx.fillStyle = 'black'
      noiseCtx.fillRect(0, 0, noiseCanvas.width, noiseCanvas.height)
      setTimeout(function() {
        noiseCtx.font = '20px Arial'
        noiseCtx.fillStyle = 'red'
        noiseCtx.fillText(`DIA ${day}`, 100, 100)

        noiseCtx.filter = 'blur(5px)'
        noiseCtx.font = '20px Arial'
        noiseCtx.fillStyle = 'red'
        noiseCtx.fillText(`DIA ${day}`, 100, 100)

        noiseCtx.filter = 'none'
        noiseCtx.font = '20px Arial'
        noiseCtx.fillStyle = 'red'
        noiseCtx.fillText(`${time}`, 100, 124)

        noiseCtx.filter = 'blur(5px)'
        noiseCtx.font = '20px Arial'
        noiseCtx.fillStyle = 'red'
        noiseCtx.fillText(`${time}`, 100, 124)

          setTimeout(function() {
            roundBackground = false
            animateNoise()
          }, 3000)
        }, 1000)
    }
  }
  fadeIn()
}

function animate() {
  if (!planetSelected) {
    // parte 1
    overlayImage = new Image()
    overlayImage.src = pathToAssets + 'nave.png'

    overlayImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < numberOfStars; i++) {
        stars[i].update()
      }

      if (!transitioning && !starsGoing) {
        drawPlanet(planets[currentPlanet], fixedWidth / 2, (fixedHeight / 2) - 40, 1)
        if (!textAnimationInProgress && !planetSelectionAnimation) {
          drawPlanetText(planets[currentPlanet], fixedWidth / 2, (fixedHeight / 2) - 40, 1)
        }
        ctx.filter = 'brightness(0.7)'
        ctx.drawImage(overlayImage, 0, 0, fixedWidth, fixedHeight)
        ctx.filter = 'none'
      } else if (!transitioning && starsGoing) {
        drawPlanet(planets[currentPlanet], fixedWidth / 2, (fixedHeight / 2) - 40, 1)
        ctx.filter = 'brightness(0.7)'
        ctx.drawImage(overlayImage, 0, 0, fixedWidth, fixedHeight)
        ctx.filter = 'none'
      }

      requestAnimationFrame(animate)
    }
  } else {
    // parte 2
    if (isPaused) {
      return
    }
    if (!daylight) {
      ctx.filter = 'brightness(0.08) contrast(1)'
      ctx.globalCompositeOperation = 'source-over'
    } else {
      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'source-over'
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const zoomWidth = fixedWidth * zoomScale
    const zoomHeight = fixedHeight * zoomScale
    const zoomX = (fixedWidth - zoomWidth) / 2
    const zoomY = (fixedHeight - zoomHeight) / 2 + verticalOffset

    drawBackground(zoomX, zoomY, zoomWidth, zoomHeight)

    if (verticalOffset > 80) {
      verticalOffset = 80
    } else if (verticalOffset !== 0) {
      if (verticalOffset > 0) {
        verticalOffset -= returnSpeed
        if (verticalOffset < 0) verticalOffset = 0
      } else if (verticalOffset < 0) {
        verticalOffset += returnSpeed
        if (verticalOffset > 0) verticalOffset = 0
      }
    } else {
      verticalOffset += verticalSpeed
    }

    if (zoomScale > maxZoomScale) {
      zoomScale = maxZoomScale
    }
    if (zoomScale < minZoomScale) {
      zoomScale = minZoomScale
    }

    if (showCircle && !daylight) {
      ctx.globalCompositeOperation = 'soft-light'
      ctx.filter = 'none'
      ctx.filter = `blur(${20 * zoomScale}px) brightness(1.5) contrast(1)`
      const circleX = canvas.width / 2 + adjustedTilt
      const circleY = canvas.height / 1.8

      const circleRadius = 80 * zoomScale
      console.log(circleRadius)

      ctx.beginPath()
      ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#85e686FF'
      ctx.fill()
      ctx.closePath()
    }
    //Overlay câmera
    drawLine(ctx, 30, 30, 90, 30);
    drawLine(ctx, 30, 30, 30, 90);
    drawLine(ctx, fixedWidth-30, 30, fixedWidth-30, 90);
    drawLine(ctx, fixedWidth-30, 30, fixedWidth-90, 30);
    
    drawLine(ctx, 30, fixedHeight - 30, 90, fixedHeight-30);
    drawLine(ctx, 30, fixedHeight - 90, 30, fixedHeight-30);
    drawLine(ctx, fixedWidth-30, fixedHeight - 30, fixedWidth-90, fixedHeight-30);
    drawLine(ctx, fixedWidth-30, fixedHeight - 90, fixedWidth-30, fixedHeight-30);

    drawText('REC', 40, 55, 20, 0.5)

    requestAnimationFrame(animate)
  }
}

animate()