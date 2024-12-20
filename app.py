from flask import Flask, request, redirect, jsonify, send_from_directory, render_template_string, url_for, Response
import os
import base64
import time
import random
import threading
import json
from flask_socketio import SocketIO, emit, join_room
import mysql.connector
from mysql.connector import Error
import secrets
import requests
import traceback

app = Flask(__name__, static_folder='static')
socketio = SocketIO(app, async_mode='gevent')
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

#api_key = os.environ["GPT_KEY"]
available_characters = ["Vanderlei", "Merda", "Empregada", "Maria", "Davinte", "Berro"]

rooms = {
    'TEST': {
        'players': {
            'player1': {'username': 'Alice', 'character': 'Vanderlei'},
            'player2': {'username': 'Bob', 'character': 'Merda'},
            'player3': {'username': 'Alanzoka', 'character': 'Empregada'},
            #'player4': {'username': 'Charlie', 'character': 'Maria'},
            #'player5': {'username': 'Charlie', 'character': 'Berro'},
            #'playerControl': {'username': 'Player', 'character': 'Davinte'},
        },
        'started': False,
        'start_time': time.time(),
        'duration': 10000,
        'current_round': 0,
        'last_activity': time.time(),
        'votes': {},
        #'player1': [os.path.join(UPLOAD_FOLDER, 'transferir.png'), os.path.join(UPLOAD_FOLDER, 'transferir.png')],
        'player2': [os.path.join(UPLOAD_FOLDER, 'transferir.png'), os.path.join(UPLOAD_FOLDER, 'transferir.png')],
        'player3': [os.path.join(UPLOAD_FOLDER, 'transferir.png'), os.path.join(UPLOAD_FOLDER, 'transferir.png')],
        'combinations': {
            #'player1': [{'image_path': '/uploads/transferir.png', 'phrase': 'A funny caption'}],
            'player2': [{'image_path': '/uploads/transferir.png', 'phrase': 'Another funny caption'}],
            'player3': [{'image_path': '/uploads/transferir.png', 'phrase': 'Yet another funny caption'}],
            'player4': [{'image_path': '/uploads/transferir.png', 'phrase': 'Yet another funny caption'}],
            'player5': [{'image_path': '/uploads/transferir.png', 'phrase': 'Yet another funny caption'}],
            'playerControl': [{'image_path': '/uploads/transferir.png', 'phrase': 'Yet another funny caption'}],
        },
        'phrases': [
            #{'player_id': 'player1', 'phrase': 'Phrase 1 from player 1', 'timestamp': time.time()},
            {'player_id': 'player2', 'phrase': 'Phrase 1 from player 2', 'timestamp': time.time()},
            {'player_id': 'player3', 'phrase': 'Phrase 1 from player 3', 'timestamp': time.time()},
            {'player_id': 'player4', 'phrase': 'Phrase 1 from player 4', 'timestamp': time.time()},
            #{'player_id': 'player1', 'phrase': 'Phrase 2 from player 1', 'timestamp': time.time()},
            {'player_id': 'player2', 'phrase': 'Phrase 2 from player 2', 'timestamp': time.time()},
            {'player_id': 'player3', 'phrase': 'Phrase 2 from player 3', 'timestamp': time.time()},
        ]
    }
}
clients = []
users = {}
queue = []
inactive_rooms = {}
room_timers = {}
room_timeout = 60
max_rooms = 2
ADMIN_KEY = 'batata'
db_config = {
    "host": "autorack.proxy.rlwy.net",
    "user": "root",
    "password": "OtgCwJSchszoxekPiKtNYcSdtWThIlaN",
    "database": "planoA",
    "port": "20770",
}

def connect_to_db():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
        return None

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

@app.route('/call_ai', methods=['POST'])
def call_ai():
    data = request.json
    image_url = data['image_path']

    relative_path = image_url.replace("http://awdawd-y1xl.onrender.com", "") 

    local_image_path = os.path.join(os.getcwd(), relative_path.lstrip('/'))

    base64_image = encode_image(local_image_path)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Finja que você está no twitter e poste um tweet engraçado sobre a imagem, brinque falando se ela está boa ou não!"},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                ]
            }
        ],
        "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    
    if response.status_code != 200:
        return jsonify({"error": f"API request failed with status code {response.status_code} and response: {response.text}"}), response.status_code

    try:
        response_json = response.json()
        if 'choices' in response_json and len(response_json['choices']) > 0:
            ai_response = response_json['choices'][0]['message']['content']
            return jsonify({"response": ai_response})
        else:
            return jsonify({"error": f"Unexpected API response format: {response_json}"}), 500
    except Exception as e:
        return jsonify({"error": f"Exception: {str(e)}, response: {response.text}"}), 500

@app.route('/create_room', methods=['POST'])
def create_room():
    socket_id = request.json.get('socket_id')

    if len(rooms) < max_rooms:
        room_id = generate_room_id()
        rooms[room_id] = {
            'players': {},
            'started': False,
            'start_time': None,
            'duration': 10000, 
            'current_round': 0,
            'last_activity': time.time(),
            'votes': {}
        }
        return jsonify({'room_id': room_id})
    else:
        if socket_id not in queue:
            queue.append(socket_id)
        return jsonify({'message': 'All rooms are full, you have been added to the queue', 'queue_position': queue.index(socket_id) + 1})

@app.route('/find_room', methods=['POST'])
def find_room():
    data = request.json
    room_id = data['roomId']
    if room_id in rooms:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

def queue_manager():
    """Gerenciador de filas para criar novas salas se houver espaço disponível."""
    if len(rooms) < max_rooms and queue:
        socket_id = queue.pop(0)
        room_id = generate_room_id()
        rooms[room_id] = {
            'players': {},
            'started': False,
            'start_time': None,
            'duration': 10000, 
            'current_round': 0,
            'last_activity': time.time(),
            'votes': {}
        }
        socketio.emit('room_created', {'socket_id': socket_id, 'room_id': room_id})
        print(f"Jogador {socket_id} foi movido para uma sala.")

def generate_token(length=12):
    return secrets.token_urlsafe(length)[:length]

@app.route('/api/join_room', methods=['POST'])
def join_room_character():
    data = request.json
    room_id = data['room_id']
    player_id = data['player_id']
    username = data['username']
    character = data['character']

    if character not in available_characters:
        return jsonify({'message': 'Invalid character'}), 400

    if room_id in rooms:
        room = rooms[room_id]

        if player_id in room['players']:
            room['players'][player_id]['username'] = username  
            room['last_activity'] = time.time()
            return jsonify({'message': 'Rejoining...', 'token': player_id})

        if len(room['players']) < 8:
            if room['started']:
                return jsonify({'message': 'Cannot join room, game already started'}), 400

            if any(player.get('character') == character for player in room['players'].values()):
                return jsonify({'message': 'Character already taken'}), 400

            if not player_id:
                player_id = generate_token()
            rooms[room_id]['players'][player_id] = {'username': username, 'character': character}
            rooms[room_id]['last_activity'] = time.time()
            return jsonify({'message': 'Player added', 'token': player_id})
        else:
            return jsonify({'message': 'Room is full'}), 400
    else:
        return jsonify({'message': 'Room does not exist'}), 404
    
@app.route('/api/leave_room', methods=['POST'])
def leave_room(room_id, player_id):
    if room_id in rooms:
        room = rooms[room_id]

        if player_id in room['players']:
            del room['players'][player_id] 
            room['last_activity'] = time.time()

            return {'message': 'Player removed from room'}, 200
        else:
            return {'message': 'Player not in room'}, 404
    else:
        return {'message': 'Room does not exist'}, 404

@app.route('/start_game/<room_id>', methods=['POST'])
def start_game(room_id):
    if room_id in rooms:
        players = rooms[room_id].get('players', [])
        if len(players) < 2:
            return jsonify({'message': 'É recomendado no mínimo 2 jogadores para iniciar o jogo.'}), 400
        
        rooms[room_id]['started'] = True
        rooms[room_id]['start_time'] = time.time()
        rooms[room_id]['last_activity'] = time.time()
        return jsonify({'message': 'Game started'})
    
    return jsonify({'message': 'Room not found'}), 404

@app.route('/room_status/<room_id>', methods=['GET'])
def room_status(room_id):
    if room_id in rooms:
        room = rooms[room_id]
        elapsed_time = int(time.time() - room['start_time']) if room['start_time'] else 0
        remaining_time = max(room['duration'] - elapsed_time, 0)
        room['last_activity'] = time.time()
        return jsonify({
            'started': room['started'],
            'players': room['players'],
            'votes': room['votes'],
            'remaining_time': remaining_time,
            'current_round': room['current_round'],  # manda o número do round aleluia
            'started': room['started']
        })
    return jsonify({'message': 'Room not found'}), 404

@app.route('/start_round/<room_id>', methods=['POST'])
def start_round(room_id):
    if room_id in rooms:
        data = request.get_json()
        duration = data.get('duration', 30) 
        round_number = data.get('round')

        if isinstance(duration, int) and duration > 0:
            if round_number is None: 
                rooms[room_id]['current_round'] += 1
            else: 
                rooms[room_id]['current_round'] = round_number

            rooms[room_id]['duration'] = duration
            rooms[room_id]['start_time'] = time.time()
            rooms[room_id]['votes'] = {}
            rooms[room_id]['last_activity'] = time.time()

            return jsonify({'message': 'Round started', 'round': rooms[room_id]['current_round'], 'duration': duration})
        else:
            return jsonify({'message': 'Invalid duration'}), 400
    return jsonify({'message': 'Room not found'}), 404

@app.route('/change_duration/<room_id>', methods=['POST'])
def change_duration(room_id):
    if room_id in rooms:
        data = request.get_json()
        new_remaining_time = data.get('new_remaining_time')

        if isinstance(new_remaining_time, int) and new_remaining_time > 0:
            elapsed_time = time.time() - rooms[room_id]['start_time']

            if elapsed_time >= rooms[room_id]['duration']:
                return jsonify({'message': 'Round already finished, cannot change remaining time'}), 400

            rooms[room_id]['duration'] = elapsed_time + new_remaining_time
            rooms[room_id]['start_time'] = time.time()

            return jsonify({
                'message': 'Remaining time updated',
                'new_remaining_time': new_remaining_time
            })
        else:
            return jsonify({'message': 'Invalid remaining time'}), 400
    return jsonify({'message': 'Room not found'}), 404

@app.route('/upload', methods=['POST'])
def upload():
    data = request.json
    player_id = data['player_id']
    room_id = data['room_id']
    image_data = data['image'].split(',')[1]
    image_data = base64.b64decode(image_data)
    
    if room_id not in rooms or player_id not in rooms[room_id]['players']:
        return jsonify({'message': 'Invalid room or player'}), 400

    if player_id not in rooms[room_id]:
        rooms[room_id][player_id] = []

    if len(rooms[room_id][player_id]) >= 4:
        return jsonify({'message': 'Limite de imagens atingido para este jogador'}), 400
    
    timestamp = int(time.time())
    filename = f"{room_id}_{player_id}_{timestamp}.png"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    with open(file_path, 'wb') as f:
        f.write(image_data)
    
    rooms[room_id][player_id].append(file_path)
    rooms[room_id]['last_activity'] = time.time()

    all_uploaded = all(len(rooms[room_id].get(p_id, [])) >= 4 for p_id in rooms[room_id]['players'])

    if all_uploaded:
        if room_id in rooms:
            rooms[room_id]['duration'] = 0
            rooms[room_id]['start_time'] = time.time()
            rooms[room_id]['last_activity'] = time.time()
        return jsonify({'message': 'Imagem salva com sucesso! Próximo round iniciado automaticamente.'})

    return jsonify({'message': 'Imagem salva com sucesso!'})

@app.route('/distribute_drawing/<room_id>', methods=['GET'])
def distribute_drawing(room_id):
    if room_id not in rooms:
        return jsonify({'message': 'Invalid room'}), 400
    
    players = list(rooms[room_id]['players'].keys())
    drawings = []

    for player_id in players:
        if player_id in rooms[room_id]:
            for image_path in rooms[room_id][player_id]:
                drawings.append({'player_id': player_id, 'image_path': image_path})
    
    random.shuffle(drawings)
    assignments = {player_id: [] for player_id in players}

    remaining_drawings = drawings[:]
    min_assignments = len(drawings) // len(players)
    
    for player_id in players:
        available_drawings = [drawing for drawing in remaining_drawings if drawing['player_id'] != player_id]
        random.shuffle(available_drawings)
        
        while len(assignments[player_id]) < min_assignments and available_drawings:
            drawing = available_drawings.pop()
            assignments[player_id].append(drawing['image_path'])
            remaining_drawings.remove(drawing)

    for player_id in players:
        available_drawings = [drawing for drawing in remaining_drawings if drawing['player_id'] != player_id]
        random.shuffle(available_drawings)
        
        while len(assignments[player_id]) < 4 and available_drawings:
            drawing = available_drawings.pop()
            assignments[player_id].append(drawing['image_path'])
            remaining_drawings.remove(drawing)
    
    for player_id in assignments:
        assignments[player_id] = [url_for('get_image', filename=os.path.basename(path), _external=True) for path in assignments[player_id]]
    
    return jsonify(assignments)

@app.route('/distribute_phrases/<room_id>', methods=['GET'])
def distribute_phrases(room_id):
    if room_id not in rooms or 'phrases' not in rooms[room_id]:
        return jsonify({'message': 'Invalid room or no phrases found'}), 400
    
    players = list(rooms[room_id]['players'].keys())
    phrases = rooms[room_id]['phrases']
    
    random.shuffle(players)
    random.shuffle(phrases)
    
    assignments = {player_id: [] for player_id in players}
    remaining_phrases = phrases[:]
    
    min_assignments = len(phrases) // len(players)
    
    for player_id in players:
        available_phrases = [phrase for phrase in remaining_phrases if phrase['player_id'] != player_id]
        random.shuffle(available_phrases)
        
        while len(assignments[player_id]) < min_assignments and available_phrases:
            phrase = available_phrases.pop()
            assignments[player_id].append(phrase['phrase'])
            remaining_phrases.remove(phrase)

    for player_id in players:
        available_phrases = [phrase for phrase in remaining_phrases if phrase['player_id'] != player_id]
        random.shuffle(available_phrases)
        
        while len(assignments[player_id]) < 4 and available_phrases:
            phrase = available_phrases.pop()
            assignments[player_id].append(phrase['phrase'])
            remaining_phrases.remove(phrase)

    return jsonify(assignments)

@app.route('/uploads/<filename>')
def get_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/combine/<room_id>', methods=['POST'])
def combine(room_id):
    if room_id not in rooms:
        return jsonify({'message': 'Invalid room'}), 400
    
    data = request.json
    player_id = data.get('player_id')
    image_path = data.get('image_path')
    phrase = data.get('phrase')
    
    if not all([player_id, image_path, phrase]):
        return jsonify({'message': 'Missing player_id, image_path, or phrase'}), 400
    
    if player_id not in rooms[room_id]['players']:
        return jsonify({'message': 'Invalid player'}), 400
    
    if 'combinations' not in rooms[room_id]:
        rooms[room_id]['combinations'] = {}
    
    if player_id not in rooms[room_id]['combinations']:
        rooms[room_id]['combinations'][player_id] = []
    
    rooms[room_id]['combinations'][player_id].append({'image_path': image_path, 'phrase': phrase})
    rooms[room_id]['last_activity'] = time.time()

    all_combined = all(player_id in rooms[room_id]['combinations'] for player_id in rooms[room_id]['players'])

    if all_combined:
        if room_id in rooms:
            rooms[room_id]['duration'] = 0
            rooms[room_id]['start_time'] = time.time()
            rooms[room_id]['last_activity'] = time.time()
        return jsonify({'message': 'Combination saved successfully! Próximo round iniciado automaticamente.'}), 200
    
    return jsonify({'message': 'Combination saved successfully'}), 200

@app.route('/combine/<room_id>/combinations', methods=['GET'])
def get_combinations(room_id):
    player_id = request.args.get('player_id') 

    if room_id not in rooms:
        return jsonify({'message': 'Invalid room'}), 400

    combinations = rooms[room_id].get('combinations', {})

    if player_id:
        if player_id not in combinations:
            return jsonify({'message': 'No combinations found for this player'}), 404
        return jsonify({'combinations': {player_id: combinations[player_id]}}), 200

    return jsonify({'combinations': combinations}), 200

@app.route('/submit_phrase', methods=['POST'])
def submit_phrase():
    data = request.json
    player_id = data['player_id']
    room_id = data['room_id']
    phrase = data['phrase']
    
    if room_id not in rooms or player_id not in rooms[room_id]['players']:
        return jsonify({'message': 'Invalid room or player'}), 400
    
    if 'phrases' not in rooms[room_id]:
        rooms[room_id]['phrases'] = []
    
    player_phrases = [p for p in rooms[room_id]['phrases'] if p['player_id'] == player_id]
    
    if len(player_phrases) >= 4:
        return jsonify({'message': 'Limite de frases atingido para este jogador'}), 400

    rooms[room_id]['phrases'].append({'player_id': player_id, 'phrase': phrase, 'timestamp': int(time.time())})
    rooms[room_id]['last_activity'] = time.time()

    all_submitted = all(
        len([p for p in rooms[room_id]['phrases'] if p['player_id'] == pid]) >= 4
        for pid in rooms[room_id]['players']
    )

    if all_submitted:
        if room_id in rooms:
            rooms[room_id]['duration'] = 0
            rooms[room_id]['start_time'] = time.time()
            rooms[room_id]['last_activity'] = time.time()
        return jsonify({'message': 'Phrase submitted! Próximo round iniciado automaticamente.'})
    
    return jsonify({'message': 'Phrase submitted'})

@app.route('/')
def index():
    with open('static/index/index.html', encoding='utf-8') as f:
        html_content = f.read()
    return render_template_string(html_content)

@app.route('/join')
def join_screen():
    with open('static/index/join.html', encoding='utf-8') as f:
        html_content = f.read()
    return render_template_string(html_content)

@app.route('/admin')
def admin():
    with open('static/index/admin.html', encoding='utf-8') as f:
        html_content = f.read()
    return render_template_string(html_content)


@app.route('/player/<room_id>')
def drawing(room_id):
    with open('static/pgGame/player.html', encoding='utf-8') as f:
        html_content = f.read()
    return render_template_string(html_content, room_id=room_id)

@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)

def remove_room(room_id):
    """Função que remove a sala após o timeout de inatividade."""
    if room_id in inactive_rooms:
        del inactive_rooms[room_id]
        print(f'Sala {room_id} foi removida da lista de inatividade.')

        if room_id in rooms:
            del rooms[room_id]
            print(f'Sala {room_id} foi deletada do dicionário principal de salas.')

            socketio.emit('message', {'msg': f'Sala {room_id} foi removida por inatividade.'}, room=room_id)
        else:
            print(f'Sala {room_id} não existe em rooms.')

    queue_manager()

@socketio.on('disconnect')
def handle_disconnect():
    user_info = users.get(request.sid)
    
    if user_info:
        user_type = user_info.get('type', 'client')
        room_id = user_info.get('room_id')
        
        if room_id:
            if user_type == 'host':
                print(f'Host disconnected: {request.sid}')
                emit('message', {'msg': f'Host {request.sid} has left the room'}, room=room_id)
                
                inactive_rooms[room_id] = True
                print(f'Sala {room_id} foi marcada como inativa.')
                
                timer = threading.Timer(room_timeout, remove_room, [room_id])
                room_timers[room_id] = timer
                timer.start()
                
            elif user_type == 'player':
                print(f'Player disconnected: {request.sid}')
                emit('message', {'msg': f'Player {request.sid} has left the room'}, room=room_id)
            else:
                print(f'Client disconnected: {request.sid}')
                emit('message', {'msg': f'Client {request.sid} has left the room'}, room=room_id)

        users.pop(request.sid, None)
    else:
        print(f'Usuário com SID {request.sid} não encontrado em `users`.')
        if request.sid in queue:
            queue.remove(request.sid)
            emit('queue_update', {'msg': 'Client disconnected from queue'}, broadcast=True)
            print(f'Player {request.sid} foi removido da fila devido à desconexão.')

@socketio.on('message')
def handle_message(data):
    room_id = data.get('room_id')
    message = data.get('message')
    if room_id:
        emit('message', {'msg': message}, room=room_id)
        print(f'Message sent to room {room_id}: {message}')

@socketio.on('queue_update')
def handle_queue_update(data):
    message = data.get('msg')
    emit('queue_update', {'msg': message})

@socketio.on('admin_message')
def admin_handle_message(data):
    admin_key = data.get('admin_key')
    room_id = data.get('room_id')
    message = data.get('message')

    if admin_key != ADMIN_KEY:
        emit('error', {'msg': 'Invalid admin key'})
        print('Failed admin key check')
        return

    if room_id and message:
        emit('admin_message', {'msg': message}, room=room_id)
        print(f'Message sent to room {room_id}: {message}')
    else:
        emit('error', {'msg': 'Room ID or message missing'})
        print('Room ID or message missing')

@socketio.on('join')
def on_join(data):
    room_id = data.get('room_id')
    
    if isinstance(room_id, dict):
        room_id = room_id.get('id')

    user_type = data.get('user_type', 'player')
    join_room(room_id)

    users[request.sid] = {
        'type': user_type,
        'room_id': room_id
    }

    if user_type == 'host':
        print(f'Host {request.sid} joined room {room_id}')
        emit('message', {'msg': f'Host {request.sid} has joined the room {room_id}'}, room=room_id)
        
        if room_id in inactive_rooms:
            timer = room_timers.get(room_id)
            if timer:
                timer.cancel()
                del room_timers[room_id]
                print(f'Temporizador para a sala {room_id} foi cancelado.')
            
            del inactive_rooms[room_id]
            emit('message', {'msg': f'Host retornou à sala {room_id}'}, room=room_id)
    else:
        print(f'Player {request.sid} joined room {room_id}')
        emit('message', {'msg': f'Player {request.sid} has joined the room {room_id}'}, room=room_id)

@socketio.on('remove_player')
def on_remove_player(data):
    room_id = data['room_id']
    player_id = data['player_id']

    response, status_code = leave_room(room_id, player_id)

    if status_code == 200:
        emit('remove_success', {'msg': f'{player_id}'}, room=request.sid)
        emit('update_players', list(rooms[room_id]['players'].values()), room=room_id)
    else:
        emit('remove_error', {'msg': response['message']}, room=request.sid)

@app.route('/host/<room_id>')
def receptor(room_id):
    room_id = room_id.upper()

    if len(room_id) != 4:
        return redirect(url_for('index'))
    
    if room_id not in rooms:
        return redirect(url_for('index'))

    with open('static/pgGame/host.html', encoding='utf-8') as f:
        html_content = f.read()
    return render_template_string(html_content, room_id=room_id)

@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('index'))

def generate_room_id():
    import random
    import string
    return ''.join(random.choices(string.ascii_uppercase, k=4))

@app.route('/start_tournament/<room_id>', methods=['POST'])
def start_tournament(room_id):
    if room_id not in rooms:
        return jsonify({'message': 'Room not found'}), 404
    
    room = rooms[room_id]
    players = list(room['players'].keys())
    
    if len(players) < 2:
        return jsonify({'message': 'Not enough players to start a tournament'}), 400

    random.shuffle(players)
    rounds = []
    
    while len(players) >= 2:
        player1 = players.pop()
        player2 = players.pop()
        rounds.append((player1, player2))
    
    if players:  # pra players impares, talvez preciso revisar
        rounds.append((players[0], None))
    
    room['tournament'] = {
        'current_round': 1,
        'rounds': {1: rounds},
        'eliminated': []
    }
    room['last_activity'] = time.time()

    return jsonify({'message': 'Tournament started', 'rounds': room['tournament']['rounds']}), 200

@app.route('/tournament/<room_id>/advance', methods=['POST'])
def advance_tournament_round(room_id):
    data = request.json
    winners = data.get('winners', [])
    
    if room_id not in rooms:
        return jsonify({'message': 'Room not found'}), 404
    
    room = rooms[room_id]
    tournament = room.get('tournament', None)
    
    if not tournament or tournament['current_round'] == 'finished':
        return jsonify({'message': 'Tournament not active or already finished'}), 400
    
    current_round = tournament['current_round']
    matchups = tournament['rounds'][current_round]
    
    if len(winners) != len(matchups):
        return jsonify({'message': 'Number of winners does not match number of matchups'}), 400
    
    next_round_players = []
    
    for i, matchup in enumerate(matchups):
        if winners[i] in matchup:
            next_round_players.append(winners[i])
        else:
            return jsonify({'message': 'Invalid winner in matchup'}), 400
    
    if len(next_round_players) == 1:
        tournament['current_round'] = 'finished'
        tournament['winner'] = next_round_players[0]
        return jsonify({'message': 'Tournament finished', 'winner': next_round_players[0]}), 200
    
    random.shuffle(next_round_players)
    next_round = []
    
    while len(next_round_players) >= 2:
        player1 = next_round_players.pop()
        player2 = next_round_players.pop()
        next_round.append((player1, player2))
    
    if next_round_players:  # número impar denovo odeio isso
        next_round.append((next_round_players[0], None))
    
    tournament['current_round'] += 1
    tournament['rounds'][tournament['current_round']] = next_round
    room['last_activity'] = time.time()

    return jsonify({'message': 'Advanced to next round', 'rounds': tournament['rounds']}), 200

@app.route('/tournament/<room_id>/matchup', methods=['GET'])
def get_tournament_matchup(room_id):
    if room_id not in rooms:
        return jsonify({'message': 'Room not found'}), 404
    
    room = rooms[room_id]
    tournament = room.get('tournament', None)
    
    if not tournament or tournament['current_round'] == 'finished':
        return jsonify({'message': 'Tournament not active or already finished'}), 400

    current_round = tournament['current_round']
    matchups = tournament['rounds'][current_round]

    if not matchups:
        return jsonify({'message': 'No matchups available'}), 404
    
    combinations = room.get('combinations', {})
    matchups_with_combinations = []
    for player1, player2 in matchups:
        player1_combinations = combinations.get(player1, [])
        player2_combinations = combinations.get(player2, []) if player2 else []
        matchups_with_combinations.append({
            'players': (player1, player2),
            'combinations': (player1_combinations, player2_combinations)
        })

    return jsonify({'matchups': matchups_with_combinations}), 200

@app.route('/vote', methods=['POST'])
def vote():
    data = request.json
    room_id = data['room_id']
    player_id = data['player_id']
    vote = data['vote']
    
    if room_id in rooms and player_id in rooms[room_id]['players']:
        rooms[room_id]['votes'][player_id] = vote
        
        if all(vote is not None for vote in rooms[room_id]['votes'].values()):
            emit('message', {'message': 'All players have voted'}, room=room_id, namespace='/')
        
        return jsonify({'message': 'Vote received'})
    else:
        return jsonify({'message': 'Invalid room or player'}), 400

@app.route('/list_rooms', methods=['GET'])
def list_rooms():
    adm_key = request.args.get('adm_key')
    
    if adm_key == ADMIN_KEY:
        room_titles = list(rooms.keys())
        return jsonify({"rooms": room_titles})
    else:
        return jsonify({"error": "Invalid admin key"}), 403

@app.route("/send_report", methods=["POST"])
def send_report():
    if request.method == "POST":
        connection = None 
        try:
            connection = connect_to_db()
            if connection is not None:
                cursor = connection.cursor()

                data = request.get_json()
                motive = data.get("motive", "")
                description = data.get("description", "")
                browser = data.get("browser", "")
                platform = data.get("platform", "")
                user_agent = data.get("user_agent", "")

                cursor.execute(
                    "INSERT INTO reports (browser, motive, description, platform, user_agent) VALUES (%s, %s, %s, %s, %s)",
                    (browser, motive, description, platform, user_agent),
                )
                connection.commit()

                return jsonify({"message": "Report enviado com sucesso"}), 200

        except Exception as e:
            traceback.print_exc()
            return jsonify({"message": f"Erro ao mandar o report: {e}"}), 500
        finally:
            if connection:
                connection.close()
    else:
        return jsonify({"message": "Método não permitido"}), 405
    
@app.route("/call_reports", methods=["GET"])
def call_reports():
    adm_key = request.args.get('adm_key')

    if adm_key == ADMIN_KEY:
        connection = None
        try:
            connection = connect_to_db()
            if connection is not None:
                cursor = connection.cursor()

                cursor.execute("SELECT browser, motive, description, platform, user_agent FROM reports")
                reports = cursor.fetchall()

                reports_list = [
                    {
                        "browser": report[0],
                        "motive": report[1],
                        "description": report[2],
                        "platform": report[3],
                        "user_agent": report[4],
                    }
                    for report in reports
                ]

                return jsonify(reports_list), 200

        except Exception as e:
            traceback.print_exc()
            return jsonify({"message": f"Erro ao buscar os reports: {e}"}), 500
        finally:
            if connection:
                connection.close()
    else:
        return jsonify({"error": "Invalid admin key"}), 403

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)