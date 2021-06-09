from datetime import datetime
from flask import Flask, redirect
from flask import jsonify
from flask import request
from flask import Response
from flask_pymongo import PyMongo, ObjectId
from bson import json_util
from passlib.hash import sha256_crypt
import redis
import re

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bookworms'
app.config['MONGO_URI'] = 'mongodb+srv://admin:admin_password123@bookwormscluster.2skn0.mongodb.net/bookworms?retryWrites=true&w=majority'

mongo = PyMongo(app)
redis_cache = redis.Redis(host='redis-10597.c261.us-east-1-4.ec2.cloud.redislabs.com', port=10597,  db=0, password='W9JLic5gqqv4o99zM6V4FKDLBplsdrGR')
SESSION_TIME = 1800

@app.route('/redis/<id>', methods=['POST'])
def redis(id):
    """
    ***For Development***
    Redis session testing
    """
    print(redis_cache.dbsize())
    if redis_cache.exists(id):
        return 'user exists'
    else:
        print('User does not exists adding it to cache')
        print(redis_cache.dbsize())
        redis_cache.hset(id, 'name', id)
        redis_cache.expire(id, SESSION_TIME)
        return 'User does not exists adding it to cache'

# Cache redis
@app.route('/session/<token>', methods=['GET'])
def get_session(token):
    """
    ***For Development***
    Checks if session exists and if not it creates it with params received from request
    """
    if redis_cache.exists(token):
        print('user exists')
        return 'user exists', 200
    else:
        print('User does not exists adding it to cache')
        ### get info from mongo
        user = mongo.db.users.find_one({'_id': ObjectId(token)})
        redis_cache.hset(token, 'token', token)
        redis_cache.hset(token, 'email', str(user['email']))
        redis_cache.expire(token, SESSION_TIME)
        tok = redis_cache.hget(token, 'token')
        em = redis_cache.hget(token, 'email')
        print(f'Token: {tok}')
        print(f'Email: {em}')
        return 'User does not exists adding it to cache', 400

################ Login/Signin stuff ##################
@app.route('/login', methods=['POST'])
def login():
    """
    Login of user
    """
    user = mongo.db.users.find_one({'email': request.json['email']})
    if not user:
        return 'Email or password incorrect', 401
    if sha256_crypt.verify(str(request.json['password']), user['password']):
        id = user['_id']
        redis_cache.hset(str(id), 'id', str(id))
        redis_cache.hset(str(id), 'first_name', str(user['first_name']))
        redis_cache.hset(str(id), 'last_name', str(user['last_name']))
        redis_cache.hset(str(id), 'email', str(user['email']))
        redis_cache.expire(str(id), SESSION_TIME)
        return jsonify( {'token': str(user['_id'])}), 200
    else:
        return 'Email or password incorrect', 401

@app.route('/signin', methods=['POST'])
def signin():
    """
    Inserts user into DB
    """
    # Checking if email already in DB
    user_exists = mongo.db.users.find_one({'email': request.json['email']})
    if user_exists:
        return 'Email already in use', 400
    # Checking if passwords dont match
    if request.json['password'] != request.json['password2']:
        return "Passwords don't match", 402
    id = mongo.db.users.insert(
        {
            'first_name': request.json['firstName'],
            'last_name': request.json['lastName'],
            'email': request.json['email'],
            'password': sha256_crypt.encrypt(request.json['password']),
            'recommendations': [],
            'read': [],
            'currently_reading': [],
            'want_read': [],
        }
    )
    if id:
        redis_cache.hset(str(id), 'id', str(id))
        redis_cache.hset(str(id), 'first_name', str(request.json['firstName']))
        redis_cache.hset(str(id), 'last_name', str(request.json['lastName']))
        redis_cache.hset(str(id), 'email', str(request.json['email']))
        redis_cache.expire(str(id), SESSION_TIME)
        return jsonify( {'token': str(id)}), 200
    return 'Error while signin user', 500
### Logout check
@app.route('/logout', methods=['POST'])
def logout():
    """
    Terminates the session that has the token (given by cookies) as key
    """
    token = request.cookies.get('token')
    redis_cache.expire(str(token), 0)
    return 'Done', 200

@app.route('/users', methods=['GET'])
def get_users():
    """
    Gets all users
    """
    users = mongo.db.users.find({})
    if users:
        doc = json_util.dumps(users)
        return Response(doc, mimetype='application/json')
    return 'Users not found', 404

@app.route('/users', methods=['POST'])
def get_userss():
    """
    Gets all users
    """
    users = []
    print(request.json['following'])
    for follow in request.json['following']:
        user = mongo.db.users.find_one({'_id': ObjectId(follow)})
        users.append(user)
    if users:
        doc = json_util.dumps(users)
        return Response(doc, mimetype='application/json')
    return 'Users not found', 404

@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    """
    Gets the user with the id given
    """
    user = mongo.db.users.find_one({'_id': ObjectId(id)})
    if user:
        doc = json_util.dumps(user)
        return Response(doc, mimetype='application/json')
    return 'User not found', 404

@app.route('/user/<id>', methods=['DELETE'])
def delete_user(id):
    """
    Deletes the user that has the id given
    """
    result = mongo.db.users.delete_one({'_id': ObjectId(id)})
    if result.deleted_count > 0:
        return 'Deleted', 200
    else:
        return 'User not found', 404

@app.route('/get_users', methods=['POST'])
def get_users_query():
    """
    Gets all users that their name matches the query
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME)
    users = mongo.db.users.aggregate([
        {
            '$project': {
                'fullname': {
                    '$toLower': {
                        '$concat': [
                            '$first_name', ' ', '$last_name'
                        ]
                    }
                }, 
                'name': {
                    '$concat': [
                        '$first_name', ' ', '$last_name'
                    ]
                }, 
                'email': '$email'
            }
        }, {
            '$match': {
                'fullname': re.compile(rf".*{request.json['query']}.*")
            }
        }
    ])

    users = json_util.dumps(users)
    return Response(users, mimetype='application/json')

@app.route('/get_books', methods=['GET'])
def get_books():
    """
    Gets all books in db.books
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME)
    books = mongo.db.books
    books = books.find({})
    books = json_util.dumps(books)
    return Response(books, mimetype='application/json')


@app.route('/get_books', methods=['POST'])
def get_books_query():
    """
    Gets all books that match query
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME)
    books = mongo.db.books
    books = books.aggregate([
        {
            '$project': {
                'title': {
                    '$toLower': '$title'
                },
                'book_title': '$title', 
                'book_id': '$book_id', 
                'authors': '$authors', 
                'image_url': '$image_url', 
                'average_rating': '$average_rating'
            }
        }, {
            '$match': {
                'title': re.compile(rf".*{request.json['query']}.*")
            }
        }
    ])
    books = json_util.dumps(books)
    return Response(books, mimetype='application/json')

@app.route('/find_book/<id>', methods=['GET'])
def get_book(id):
    """
    Gets information of the book with the id indicated
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME)
    books = mongo.db.books
    book = books.find_one({'book_id': id})
    book = json_util.dumps(book)
    return Response(book, mimetype='application/json')

# Get bookshelves
@app.route('/getBooks/<genre>', methods=['GET'])
def get_books_by_genre(genre):
    """
    Gets books by genre
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME)
    books = mongo.db.books
    docs = books.find({'genre': genre})
    docs = json_util.dumps(docs)
    return Response(docs, mimetype='application/json')
    
@app.route('/get_authors', methods=['POST'])
def get_authors_query():
    """
    Gets all books that match query
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    # redis_cache.expire(str(token), SESSION_TIME)
    books = mongo.db.books
    books = books.aggregate([
        {
            '$project': {
                'book_title': '$title', 
                'book_id': '$book_id', 
                'author': {
                    '$toLower': {
                        '$arrayElemAt': [
                            '$authors', 0
                        ]
                    }
                }, 
                'authors': '$authors', 
                'image_url': '$image_url', 
                'average_rating': '$average_rating'
            }
        }, {
            '$match': {
                'author': re.compile(rf".*{request.json['query']}.*")
            }
        }
    ])
    books = json_util.dumps(books)
    return Response(books, mimetype='application/json')

@app.route('/getAuthorBooks', methods=['POST'])
def get_author_books():
    """
    Gets all books of a given author
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME)
    books = mongo.db.books
    author = request.json['author']
    print(author)
    docs = books.find({'authors': author})
    docs = json_util.dumps(docs)
    print(len(docs))
    return Response(docs, mimetype='application/json')

@app.route('/mybookshelves/<bookshelf>', methods=['GET'])
def bookshelf_books(bookshelf):
    """
    Gets all books in an specific user bookshelf
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME )

    # validatin user
    user = mongo.db.users.find_one({'_id': ObjectId(token)})
    if not user:
        return 'User not found', 404

    book_ids = user[bookshelf]
    if not book_ids:
        return 'No books found', 404
    #querying all documents
    books = mongo.db.books
    bookshelf_books = []
    for book_id in book_ids:
        book = books.find_one({'book_id': book_id})
        bookshelf_books.append(book)
    bookshelf_books = json_util.dumps(bookshelf_books)
    return Response(bookshelf_books, mimetype='application/json')

@app.route('/mybookshelves/<id>/<bookshelf>', methods=['GET'])
def bookshelf_user(id, bookshelf):
    """
    Gets all books in an specific user bookshelf
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME )

    # validatin user
    user = mongo.db.users.find_one({'_id': ObjectId(id)})
    if not user:
        return 'User not found', 404

    book_ids = user[bookshelf]
    if not book_ids:
        return 'No books found', 404
    #querying all documents
    books = mongo.db.books
    bookshelf_books = []
    for book_id in book_ids:
        book = books.find_one({'book_id': book_id})
        bookshelf_books.append(book)
    bookshelf_books = json_util.dumps(bookshelf_books)
    return Response(bookshelf_books, mimetype='application/json')

@app.route('/mybookshelf/<action>', methods=['POST'])
def edit_bookshelf(action):
    """
    Edits bookshelf of user
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME )

    #querying all documents
    if action == 'add':
        updated = mongo.db.users.update({'_id': ObjectId(token)}, {'$push': {request.json['bookshelf']: request.json['book_id']}} )
        post = mongo.db.users.update(
            {'_id': ObjectId(token)}, 
            {'$push': {'posts': {
                        'action': 'add',
                        'bookshelf': request.json['bookshelf'],
                        'date': datetime.now(),
                        'book': request.json['book_id']
                    }}
            })
    else:
        updated = mongo.db.users.update({'_id': ObjectId(token)}, {'$pull': {request.json['bookshelf']: request.json['book_id']}})
    print('before update')

    if not updated:
        return 'Server error', 500
    return 'Updated', 200

@app.route('/posts', methods=['GET'])
def get_posts():
    """
    Gets posts from following
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME )

    user = mongo.db.users.find_one({'_id': ObjectId(token)})
    follwing = user['following']
    posts = []
    for follow in follwing:
        foll = mongo.db.users.find_one({'_id': ObjectId(follow)})
        for post in foll['posts']:
            book = mongo.db.books.find_one({'book_id': post['book']})
            post_to_add = {
                'user_id': follow,
                'first_name': foll['first_name'],
                'last_name': foll['last_name'],
                'bookshelf': post['bookshelf'],
                'date': post['date'],
                'book_id': post['book'],
                'book_img': book['image_url'],
                'book_title': book['title'],
                'authors': book['authors'],
                'rating': book['average_rating']
            }
            posts.append(post_to_add)

    posts = json_util.dumps(posts)

    if not posts:
        return 'No posts found', 404

    return Response(posts, mimetype='application/json')

@app.route('/follow', methods=['POST'])
def follow_unfollow():
    """
    Follows/unfollows user
    """
    # Checking if session exists
    token = request.cookies.get('token')
    session = redis_cache.hgetall(str(token))
    if not session:
        return 'No session', 408
    # if it exist renew session time (user still active)
    redis_cache.expire(str(token), SESSION_TIME )

    action = request.json['action']
    print(action)
    print(request.json['user'])
    if action == 'unfollow':
        updated = mongo.db.users.update({'_id': ObjectId(token)}, {'$pull': {'following': request.json['user']}})
    else:
        updated = mongo.db.users.update({'_id': ObjectId(token)}, {'$push': {'following': request.json['user']}})
    if not updated:
        return 'Server error', 500

    return 'Updated', 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')