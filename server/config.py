from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
import secrets
import tmdbsimple as tmdb
import requests
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = secrets.token_hex(16)
#tmdb.REQUESTS_SESSION = requests.Session()              
#tmdb.API_KEY = "691764fd447005d65f8471166c212648"
#app.secret_key = b'\x06\xd8\x1a\xad\xce\xfcX[\x14\x9a\x13*b\x19\xc0\x8d'
#app.secret_key = os.urandom(16).hex()

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

CORS(app)

bcrypt = Bcrypt(app)

