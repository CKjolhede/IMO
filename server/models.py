from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from config import bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from config import db



# Models
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=True)
    zip_code = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True, default='/images/user_default.jpg')
    private = db.Column(db.Boolean, default=False)
    
    recommendations = db.relationship('Recommendation', back_populates='user')
    
    followers = db.relationship(
        'User', 
        secondary = 'follows', 
        primaryjoin = ('follows.c.following_id == User.id'), 
        secondaryjoin = ('follows.c.follower_id == User.id'), 
        back_populates='following')
    
    #followers = db.relationship('User', secondary='follows', primaryjoin='User.id==follows.c.following_id', secondaryjoin='User.id==follows.c.follower_id', back_populates='users')
    following = db.relationship(
        'User', 
        secondary='follows', 
        primaryjoin='follows.c.follower_id == User.id', 
        secondaryjoin='User.id==follows.c.following_id', back_populates='followers')
    #follows = db.relationship('Follow', back_populates='user', cascade='all, delete', passive_deletes=True)
    
    serializer_rules = ('-recommendations.user', '-recommendations.movie' '-follows.follower', '-follows.following', '-password_hash', '-private', '-followers') 

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf8"))
        self._password_hash = password_hash.decode("utf8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf8"))
    
    def __repr__(self):
        return f'<ID: {self.id} | Name {self.first_name} {self.last_name} | Email {self.email}>'

#####################################################################

class Follow(db.Model, SerializerMixin):
    __tablename__ = 'follows'
    
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))

#####################################################################

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    overview = db.Column(db.Text, nullable=False)
    release_date = db.Column(db.String, nullable=True)
    poster= db.Column(db.String, nullable=True, default='/images/heads.jpg')
    genre = db.Column(db.String, nullable=False)
    director = db.Column(db.String, nullable=True)
    rating = db.Column(db.Integer, nullable=True)
    
    recommendations = db.relationship('Recommendation', back_populates='movie', cascade="all, delete-orphan")
    
    serialize_rules = ('-recommendations.movie', '-recommendations.user')

    def __repr__(self):
        return f'<Poster: {self.poster} | ID: {self.id} | Title: {self.title} | Director: {self.director} | Overview: {self.overview} | Release Date: {self.release_date} | Genre: {self.genre} | Rating: {self.rating}>'
    
#####################################################################



class Recommendation(db.Model, SerializerMixin):
    __tablename__ = 'recommendations'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    accepted = db.Column(db.Boolean, default=False)
    public = db.Column(db.Boolean, default=True)
    comment = db.Column(db.Text, nullable=True)
    media_type = db.Column(db.String, nullable=False, default='movie')
    
    user = db.relationship('User', back_populates='recommendations')
    movie = db.relationship('Movie', back_populates='recommendations')
    
    serialize_rules = ('-user.recommendations', '-movie.recommendations')
    
    def __repr__(self):
        return f'<ID: {self.id} | Movie: {self.movie_id} | User: {self.user_id}> | Comment: {self.comment}>'