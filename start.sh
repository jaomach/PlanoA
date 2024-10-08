#!/bin/bash
export FLASK_APP=app.py
export FLASK_ENV=production
gunicorn -w 1 -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker --bind 0.0.0.0:10000 app:app
