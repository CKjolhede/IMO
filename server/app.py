from models import db, User, Movie, Recommendation, Follow
from sqlalchemy_serializer import SerializerMixin
from werkzeug.exceptions import NotFound, Unauthorized
from flask_restful import Resource
from sqlalchemy.exc import MultipleResultsFound
from flask import request, make_response, jsonify, session, abort
from config import app, db, api, bcrypt, TMDB_API_KEY
import os
from dotenv import load_dotenv
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
        return make_response(user.to_dict(only=["id", "first_name", "last_name", "email", "phone", "password_hash", "zipcode", "image"]), 200)
    else:
        raise Unauthorized
    
@app.route("/authorized")
def authorized():
    if user := User.query.filter(User.id == session.get("user_id")).first():
        return make_response(user.to_dict(only=["id", "first_name", "last_name", "email", "phone",  "password_hash", "zipcode", "image"]), 200)
    else:
        raise Unauthorized

@app.route("/logout", methods=["DELETE"])
def logout():
    session.clear()
    return make_response({}, 204)


#*******************************  USERS

class Users(Resource):
    def get(self):
        users = [u.to_dict(only=['id','image', 'first_name', 'last_name', 'email', 'zipcode', 'phone']) for u in User.query.all()]
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
            
@app.route("/update-profile-picture", methods=['PATCH'])
def update_profile_picture():
    data = request.json()
    user_id = data.get('user_id')
    new_image_url = data.get('image')

    if user := User.query.get(user_id):
        user.image = new_image_url
        db.session.commit()
        return jsonify({'message': 'Profile picture updated successfully'}, 200)


@app.route('/users/search', methods=['GET'])
def search_users():
    name = request.args.get('name', '')
    users = User.query.filter(User.first_name.ilike(f'%{name}%') | User.last_name.ilike(f'%{name}%')).all()
    users_dict = [user.to_dict(only=['id', 'image', 'email', 'first_name', 'last_name', 'phone']) for user in users] 
    return make_response(jsonify(users_dict), 200)

#**********************************  USERS BY ID

class UserById(Resource):
    def get(self, id):
        try:
            user = User.query.filter(User.id == id).first()
            if user is not None:
                return make_response(user.to_dict(only=['id', 'first_name', 'last_name', 'email', 'phone', 'zipcode', 'image']), 200)
        except NotFound:
            return make_response({'error': 'User not found'}, 404)
    
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        form_json = request.get_json()
        for key, value in form_json.items():
            setattr(user, key, value)
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(only=['id', 'image','first_name', 'last_name', 'email', 'phone', 'zipcode']), 202)    
    
    
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response('deleted', 204)

#************************************  FOLLOWS
class Follows(Resource):
    def get(self):
        follows = [follow.to_dict(only=('id','following_id', 'follower_id','status')) for follow in Follow.query.all()]
        return make_response(jsonify(follows), 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_follow = Follow(**data)
            
            db.session.add(new_follow)
            db.session.commit()
        
            return make_response(new_follow.to_dict(only=('id','following_id', 'follower_id','status')), 201)
        except ValueError as e:
            abort(422, e.args[0])
            
class FollowsById(Resource):    
    def patch(self, follows_id):
        follow = Follow.query.filter(Follow.id == follows_id).first()
        if not follow:
            return make_response({'error': 'Follow not found'}, 404)
        form_json = request.get_json()
        for key, value in form_json.items():
            setattr(follow, key, value)
        db.session.add(follow)
        db.session.commit()
        return make_response(follow.to_dict(only=('id','following_id', 'follower_id','status')), 202)
        
    def delete(self, follows_id):
        follow = Follow.query.filter(Follow.id == follows_id).first()
        db.session.delete(follow)   
        db.session.commit()
        return make_response('', 204)
        

class FollowsByUser(Resource):
    def get(self, id):
        followings = Follow.query.filter(Follow.follower_id == id).all()
        if followings == []:
            return make_response(jsonify("No Followings found"), 404)
        following = [follow.to_dict(
            #only=('id','following_id', 'follower_id','status')
            ) for follow in followings] 
        return make_response(jsonify(following), 200)


class FollowByUserIdFollowingId(Resource):
    def patch(self, friendUser_id, user_id):
    
        follow = Follow.query.filter(
                Follow.following_id == friendUser_id
                and Follow.follower_id == user_id
            ).first()
        
        if not follow:
            return make_response({'error': 'follow not found'}, 404)
        form_json = request.get_json()
        for key, value in form_json.items():
            setattr(follow, key, value)
        response = follow.to_dict()
        db.session.add(follow)
        db.session.commit()
        return make_response(response, 202)
    



#*************************************  RECOMMENDATIONS 

class RecommendationsByUserId(Resource):
    def get(self, id):
        recommendations = Recommendation.query.filter(Recommendation.user_id == id).all()
        if recommendations == []:
            raise NotFound
        recommendations = [recommendation.to_dict(only=('id', 'movie.id', 'movie_id', 'user.id','user.first_name', 'user.last_name','user.image', 'movie.title', 'movie.overview', 'movie.release_date', 'movie.backdrop_path', 'movie.poster_path', )) for recommendation in recommendations]
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
        recs = [rec.to_dict(only=['id', 'movie_id', 'user.id', 'user.first_name', 'user.last_name', 'movie.title', 'movie.overview', 'movie.release_date', 'movie.backdrop_path', 'movie.poster_path']) for rec in recommendations]
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
    
class MovieByTmdbId(Resource):
    def get(self, tmdb_id):
        movie = Movie.query.filter(Movie.tmdb_id == tmdb_id).first()
        if movie == []:
            return make_response(False, 200)
        else: 
            return make_response(movie.to_dict(), 200)  
    

class Movies(Resource):
    def get(self):
        movies = Movie.query.all()
        fetched_movies = [movie.to_dict(
            ) for movie in movies]
        return make_response(fetched_movies, 200)

    def post(self):
        data = request.get_json()
        try:
            new_movie = Movie(**data)
        except ValueError as e:
            abort(422, e.args[0])
            
        db.session.add(new_movie)
        db.session.commit()
        return make_response(new_movie.to_dict(), 201)

@app.route('/movies/searchMovies', methods=['GET'])
def search_movies():
    searchTerm = request.args.get('searchTerm')
    print('searchTerm:', searchTerm)
    if not searchTerm:
        return make_response({'error': 'searchTerm parameter is required'}, 400)
    load_dotenv()
    #api_key = os.getenv('TMDB_API_KEY')
    base_url = "https://api.themoviedb.org/3/search/movie"
    headers = {"Authorization": f"Bearer {TMDB_API_KEY}", "accept": "application/json"}
    params = {'query' : searchTerm, 'api_key' : TMDB_API_KEY, 'include_adult' : 'false', 'language' : "en-US", 'page' : 1} 
    response = requests.get(base_url, params=params)
    #ipdb.set_trace()
    if response.status_code != 200:
        return make_response({'error': 'Unable to fetch movies from TMDB'}, response.status_code)
    
    data = response.json()
    if 'results' not in data or not data['results']:
        return make_response({'error': 'No movies found'}, 404)
    
    movies_dict = list(map(lambda movie: {       
        'tmdb_id': movie['id'],
        'title': movie['title'],
        'backdrop_path': movie['backdrop_path'],
        'overview': movie['overview'],
        'release_date': movie['release_date'],
        'genre': movie['genre_ids'],
        'poster_path': movie['poster_path'],
        'rating': movie['vote_average']
    }, data['results']))
    
    return make_response(jsonify(movies_dict), 200)    

api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Follows, '/follows/')
api.add_resource(FollowsById, '/follows/<int:follows_id>')
api.add_resource(FollowsByUser, '/follows/<int:id>')
api.add_resource(FollowByUserIdFollowingId, '/follows/<int:user_id>/<int:friendUser_id>')
api.add_resource(RecommendationsByUserId, '/recommendations/<int:id>')
api.add_resource(RecommendationsById, '/recommendations/<int:id>')
api.add_resource(Recommendations, '/recommendations/')   
api.add_resource(Movies, '/movies')
api.add_resource(MovieById, '/movies/<int:id>')
api.add_resource(MovieByTmdbId, '/movies/tmdb/<int:tmdb_id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)



#@app.route('/movies/', methods=['GET'])  
#def get_movies():
#    page = request.args.get('page', 2, type=int)
#    if not page:
#        return make_response({'error': 'page parameter is required'}, 400)
    
#    load_dotenv()
#    api_key = os.getenv('TMDB_API_KEY')
#    base_url = "https://api.themoviedb.org/3/discover/movie"
#    headers = {"Authorization": f"Bearer {TMDB_API_KEY}", "accept": "application/json"}
#    params = {'api_key' : TMDB_API_KEY, 'language' : "en-US", 'page' : page}
    
#    response = requests.get(base_url, params=params)
#    if response.status_code != 200:
#        return make_response({'error': 'Unable to fetch movies from TMDB'}, response.status_code)
    
#    data = response.json()
#    if 'results' not in data or not data['results']:
#        return make_response({'error': 'No movies found'}, 404)
    
#    movies_dict = list(map(lambda movie: {
#        'tmdb_id': movie['id'],
#        'title': movie['title'],
#        'overview': movie['overview'],
#        'release_date': movie['release_date'],
#        'poster_path': f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
#    }, data['results']))
    
#    return make_response(jsonify(movies_dict), 200)   