#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

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
            image=fake.image_url(),
            private=rc([True, False]),
        )
        users.append(user)
    return users

def create_movies():
    movies = []
    used_tmdb_ids = set()  # Set to keep track of used tmdb_id values
    while len(movies) < 100:
        tmdb_id = fake.unique.random_int(min=1, max=10000)
        if tmdb_id not in used_tmdb_ids:
            used_tmdb_ids.add(tmdb_id)
            movie = Movie(
                tmdb_id=tmdb_id,
                title=fake.sentence(),
                overview=fake.paragraph(),
                release_date=fake.date(),
                genre=fake.word(),
                director=fake.name(),
                rating=fake.random_number(1, 10),
            )
            movies.append(movie)
    return movies

def create_follows(users):
    follows = []
    for _ in range(200):
        follow = Follow(
            following_id=rc(users).id,
            follower_id=rc(users).id
        )
        follows.append(follow)
    return follows

def create_recommendations(users, movies):
    recommendations = []
    for _ in range(1000):
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
        # Seed code goes here!
        User.query.delete()
        Movie.query.delete()
        Follow.query.delete()
        Recommendation.query.delete()
        print("Tables cleared.")
        
        print("Seeding Users")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()
        
        print("Seeding Movies")        
        movies = create_movies()
        db.session.add_all(movies)
        db.session.commit()
        
        print("Seeding Follows")
        follows = create_follows(users)
        db.session.add_all(follows)
        db.session.commit()
        
        print("Seeding Recommendations")
        recommendations = create_recommendations(users, movies)
        db.session.add_all(recommendations)
        db.session.commit()
        
        print("Done seeding!")