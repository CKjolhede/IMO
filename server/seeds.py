#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import os
import requests
from dotenv import load_dotenv
# Local imports
from app import app
from models import db, User, Movie, Follow, Recommendation

def create_users():
    users = []
    for _ in range(50):
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            password_hash = 'password',
            phone=fake.phone_number(),
            zipcode=fake.zipcode(),
            image= "./userDefault.png",
            #private=rc([True, False]),
        )
        users.append(user)
    return users

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

def create_follows(users):
    follows = []
    for _ in range(400):
        follow = Follow(
            following_id=rc(users).id,
            follower_id=rc(users).id,
            status=rc(['accepted', 'requested', 'pending']),
        )
        follows.append(follow)
    return follows

def create_recommendations(users, movies):
    recommendations = []
    for _ in range(300):
        recommendation = Recommendation(
            user_id=rc(users).id,
            movie_id=rc(movies).id
        )
        recommendations.append(recommendation)
    return recommendations



if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        print("Clearing tables...")
        User.query.delete()
        #Movie.query.delete()
        Follow.query.delete()
        Recommendation.query.delete()
        print("Tables cleared.")
        
        print("Seeding Users")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()
        
        print("Plowing Movies")        
        movies = create_movies()
        if isinstance(movies, list):
            db.session.add_all(movies)
            db.session.commit()
            print("Plowed Movies")
        else:
            print("Failed to seed movies")
        
        print("Seeding Follows")
        follows = create_follows(users)
        db.session.add_all(follows)
        db.session.commit()
        
        print("Seeding Recommendations")
        recommendations = create_recommendations(users, movies)
        db.session.add_all(recommendations)
        db.session.commit()
        
        print("Done seeding!")