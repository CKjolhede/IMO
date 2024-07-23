#!/usr/bin/env python3

# Remote library imports
from flask import request, make_response, jsonify, session, abort
from flask_restful import Resource
from werkzeug.exceptions import NotFound, Unauthorized

# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import db, User, Movie

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

