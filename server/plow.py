from app import app
from flask import make_response, request, jsonify
import os
import requests
from dotenv import load_dotenv
from models import db, User, Movie, Follow, Recommendation



def create_movies():
    load_dotenv()
    api_key = os.getenv('TMDB_API_KEY')
    base_url = "https://api.themoviedb.org/3/discover/movie/"
    for _ in range(500):
        headers = {"Authorization": f"Bearer {api_key}", "accept": "application/json"}
        params = {'api_key' : api_key, 'language' : "en-US", 'page': 1}
    response = requests.get(base_url, params=params)
    #if response.status_code != 200:
    #    return make_response({'error': 'Unable to fetch movies from TMDB'}, response.status_code)
    data = response.json()
    movies = [data]
    movies_dict = list(map(lambda movie: {'tmdb_id': movie['id'], 'title': movie['title'], 'overview': movie['overview'], 'release_date': movie['release_date'], 'poster_path': f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"}, movies))



    movie_instances = []
    for movie in movies_dict:
        new_movie = Movie(**movie)
        movie_instances.append(new_movie)
    print(new_movie)
    return movie_instances

if __name__ == '__main__':
    with app.app_context():
        print("Starting plow...")
        

        print("Clearing tables...")
        User.query.delete()
        Movie.query.delete()
        Follow.query.delete()
        Recommendation.query.delete()
        print("Tables cleared.")
        
        print("Plowing Movies")        
        movies = create_movies()
        if isinstance(movies, list):
            db.session.add_all(movies)
            db.session.commit()
            print("Plowed Movies")
        else:
            print("Failed to seed movies")
