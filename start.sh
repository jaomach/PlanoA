#!/bin/bash
export FLASK_APP=app.py
export FLASK_ENV=production
gunicorn -w 4 -k gevent --bind 0.0.0.0:10000 app:app