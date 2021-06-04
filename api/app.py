from flask import Flask, redirect
from flask import jsonify
from flask import request
from flask import Response
from flask_pymongo import PyMongo, ObjectId
from bson import json_util
from passlib.hash import sha256_crypt
import redis

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bookworms'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/bookworms'

mongo = PyMongo(app)
redis_cache = redis.Redis(host='redis-10597.c261.us-east-1-4.ec2.cloud.redislabs.com', port=10597,  db=0, password='W9JLic5gqqv4o99zM6V4FKDLBplsdrGR')

@app.route('/redis/<id>', methods=['POST'])
def redis(id):
    print(redis_cache.dbsize())
    if redis_cache.exists(id):
        return 'user exists'
    else:
        print('User does not exists adding it to cache')
        print(redis_cache.dbsize())
        redis_cache.hset(id, 'name', id)
        redis_cache.expire(id, 10)
        return 'User does not exists adding it to cache'

### cache redis
@app.route('/session/<token>', methods=['GET'])
def get_session(token):
    if redis_cache.exists(token):
        print('user exists')
        return 'user exists', 200
    else:
        print('User does not exists adding it to cache')
        ### get info from mongo
        user = mongo.db.users.find_one({'_id': ObjectId(token)})
        redis_cache.hset(token, 'token', token)
        redis_cache.hset(token, 'email', str(user['email']))
        redis_cache.expire(token, 60)
        tok = redis_cache.hget(token, 'token')
        em = redis_cache.hget(token, 'email')
        print(f'Token: {tok}')
        print(f'Email: {em}')
        return 'User does not exists adding it to cache', 400

################ Login/Signin stuff ##################
### Login check
@app.route('/login', methods=['POST'])
def login():
    user = mongo.db.users.find_one({'email': request.json['email']})
    if not user:
        return 'Email or password incorrect', 401
    if sha256_crypt.verify(str(request.json['password']), user['password']):
        # redis_cache.hset(id, 'id', id)
        # redis_cache.hset(id, 'first_name', b"f'{str(user['first_name'])}'")
        # redis_cache.hset(id, 'last_name', str(user['last_name']))
        # redis_cache.hset(id, 'email', str(user['email']))
        # redis_cache.expire(id, 30)
        return jsonify( {'token': str(user['_id'])}), 200
    else:
        return 'Email or password incorrect', 401

### Creates a user
@app.route('/signin', methods=['POST'])
def signin():
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
            'password': sha256_crypt.encrypt(request.json['password'])
        }
    )
    return jsonify( {'token': str(ObjectId(id))}), 200

### gets a user by id
@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = mongo.db.users.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(id)),
        'first_name': user['first_name'],
        'last_name': user['last_name'],
        'email': user['email'],
        'password': user['password'],
    })

### deletes a user by id
@app.route('/user/<id>', methods=['DELETE'])
def delete_user(id):
    result = mongo.db.users.delete_one({'_id': ObjectId(id)})
    if result.deleted_count > 0:
        return 'Deleted', 200
    else:
        return 'Error deleting user', 404

# Get a book by book_id
@app.route('/find_book/<id>', methods=['GET'])
def get_book(id):
    books = mongo.db.books
    book = books.find_one({'book_id': id})
    book = json_util.dumps(book)
    return Response(book, mimetype='application/json')

# Get an author by author_id
@app.route('/find_author/<id>', methods=['GET'])
def get_author(id):
    authors = mongo.db.authors
    author = authors.find_one({'author_id': id})
    author = json_util.dumps(author)
    return Response(author, mimetype='application/json')

#Get romantic bookshelf
@app.route('/get_romantic', methods=['GET'])
def get_romance():
    genera = mongo.db.static
    doc = genera.find_one({'genre': 'romantic'})
    doc = json_util.dumps(doc)
    return Response(doc, mimetype='application/json')

#Get fiction bookshelf
@app.route('/get_fiction', methods=['GET'])
def get_fiction():
    genera = mongo.db.static
    doc = genera.find_one({'genre': 'fiction'})
    doc = json_util.dumps(doc)
    return Response(doc, mimetype='application/json')

#Get mistery bookshelf
@app.route('/get_mistery', methods=['GET'])
def get_mistery():
    genera = mongo.db.static
    doc = genera.find_one({'genre': 'mistery'})
    doc = json_util.dumps(doc)
    return Response(doc, mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True)