from models import db, User, Movie, Recommendation, Follow
from werkzeug.exceptions import NotFound, Unauthorized
from flask_restful import Resource
from sqlalchemy.exc import MultipleResultsFound
from flask import request, make_response, jsonify, session, abort
from config import app, db, api, bcrypt
import requests
import ipdb

@app.route('/')
def index():
    return '<h1>IMO</h1>'

@app.route("/login", methods=["POST"])
def login():
    user = User.query.filter(User.email == request.get_json()["email"]).first()   
    if user and user.authenticate(request.get_json()["password"]):
        session["user_id"] = user.id 
        return make_response(user.to_dict(only=['id', 'first_name', 'last_name', 'email', 'zipcode','phone', 'password_hash', 'recommendations', 'image', 'private']), 200)
    else:
        raise Unauthorized
    # 'recommendations', 'phone', 'password_hash', 'zipcode', 'image', followers','private'


    
@app.route("/authorized")
def authorized():
    if user := User.query.filter(User.id == session.get("user_id")).first():
        return make_response(user.to_dict(only=['id', 'followers', 'following', 'recommendations', 'first_name', 'last_name', 'email', 'phone', 'password_hash', 'zipcode', 'image', 'private']), 200)
    else:
        raise Unauthorized

@app.route("/logout", methods=["DELETE"])
def logout():
    session.clear()
    return make_response({}, 204)


#*******************************  USERS

class Users(Resource):
    def get(self):
        users = [u.to_dict(only=['id', 'first_name', 'last_name', 'email', 'zipcode']) for u in User.query.all()]
        return make_response(users, 200)

    def post(self):
        data = request.get_json()
        try:
            new_user = User(**data)
            
            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id        
            return make_response(new_user.to_dict(), 201) 
        except ValueError as e:
            abort(422, e.args[0])




@app.route('/users/search', methods=['GET'])
def search_users():
    name = request.args.get('name', '')  # Get the 'name' query parameter
    users = User.query.filter(User.first_name.ilike(f'%{name}%')).all()
    users_dict = list(map(lambda user: user.to_dict(), users))
    return make_response(jsonify(users_dict), 200)

#**********************************  USERS BY ID

class UserById(Resource):
    def get(self, id):
        try:
            user = User.query.filter(User.id == id).first()
            if user is not None:
                return make_response(user.to_dict(only=['id', 'first_name', 'last_name', 'emai', 'zipcode']), 200)
        except NotFound:
            return make_response({'error': 'User not found'}, 404)
    
    def patch(self, id):
        user=db.session.get(User, id)
        if not user:
            return make_response({'error': 'User not found'}, 404)
        form_json = request.get_json()
        for key, value in form_json.items():
            setattr(user, key, value)
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(only=['id', 'first_name', 'last_name', 'email', 'zipcode']), 202)    
    
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response('deleted', 204)

#************************************  FOLLOWS

class FollowsById(Resource):
    def get(self, id):
        followings = Follow.query.filter(Follow.follower_id == id).all()
        if followings == []:
            raise NotFound
        following = [follow.to_dict() for follow in followings] 
        return make_response(following, 200)
        
    def delete(self,id):
        follow = Follow.query.filter(Follow.id == id).first()
        db.session.delete(follow)
        db.session.commit()
        return make_response('', 204)

#*************************************  RECOMMENDATIONS 

class RecommendationsByUserId(Resource):
    def get(self, id):
        recommendations = Recommendation.query.filter(Recommendation.user_id == id).all()
        if recommendations == []:
            raise NotFound
        recommendations = [recommendation.to_dict(only=('id', 'movie_id', 'user.first_name', 'comment', 'movie.title', 'movie.poster', 'accepted', 'public')) for recommendation in recommendations]
        return make_response(recommendations, 200)

class RecommendationsById(Resource):  
    def delete(self,id):
        recommendation = Recommendation.query.filter(Recommendation.id == id).first()
        db.session.delete(recommendation)
        db.session.commit()
        return make_response('deleted', 204)        


class Recommendations(Resource):
    def get(self):
        recommendations = Recommendation.query.all()
        recs = [rec.to_dict(only=['id', 'movie_id', 'user.first_name', 'comment', 'movie.title', 'movie.poster', 'accepted', 'public']) for rec in recommendations]
        return make_response(recs, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_recommendation = Recommendation(**data)
            db.session.add(new_recommendation)
            db.session.commit()
            return make_response(new_recommendation.to_dict(), 201)
        except ValueError as e:
            abort(422, e.args[0])
            
#*******************************  MOVIES

class MovieById(Resource): 
    def get(self, id):
        movie = Movie.query.filter(Movie.id == id).first()
        if movie == []:
            raise NotFound
        return make_response(movie.to_dict(), 200)

    def patch(self, id):
        movie=db.session.get(Movie, id) 
        if not movie:
            return make_response({'error': 'Movie not found'}, 404)
        form_json = request.get_json()
        for key, value in form_json.items():
            setattr(movie, key, value)
        db.session.add(movie)
        db.session.commit()
        return make_response(movie.to_dict(), 202)    
    
    def delete(self, id):
        movie = Movie.query.filter(Movie.id == id).first()
        db.session.delete(movie)
        db.session.commit()
        return make_response('', 204)

class Movies(Resource):
    def get(self):
        movies = Movie.query.all()
        movies = [movie.to_dict() for movie in movies]
        return make_response(movies, 200)

    def post(self):
        data = request.get_json()
        try:
            new_movie = Movie(**data)
        except ValueError as e:
            abort(422, e.args[0])
            
        db.session.add(new_movie)
        db.session.commit()
        return make_response(new_movie.to_dict(), 201)
    

@app.route('/movies/search', methods=['GET'])
def search_movies():
    title = request.args.get('title', '')  
    movies = Movie.query.filter(Movie.title.ilike(f'%{title}%')).all()
    movies_dict = list(map(lambda movie: movie.to_dict(), movies))
    return make_response(jsonify(movies_dict), 200)    


api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(FollowsById, '/follows/<int:id>')
api.add_resource(RecommendationsByUserId, '/recommendations/<int:id>')
api.add_resource(RecommendationsById, '/recommendations/<int:id>')
api.add_resource(Recommendations, '/recommendations')   
api.add_resource(Movies, '/movies')
api.add_resource(MovieById, '/movies/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

