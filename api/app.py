from flask import Flask
from flask import jsonify
from flask import request
from flask import Response
from flask_pymongo import PyMongo, ObjectId
from bson import json_util
from passlib.hash import sha256_crypt
app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bookworms'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/bookworms'

mongo = PyMongo(app)

################ Login/Signin stuff ##################
### Login check
@app.route('/login', methods=['POST'])
def login():
    user = mongo.db.users.find_one({'email': request.json['email']})
    if not user:
        return 'Email or password incorrect', 400
    if sha256_crypt.verify(str(request.json['password']), user['password']):
        return str(user['_id']), 200
    else:
        return 'Email or password incorrect', 400
### Creates a user
@app.route('/create_user', methods=['POST'])
def create_user():
    # Checking if email already in DB
    user_exists = mongo.db.users.find_one({'email': request.json['email']})
    if user_exists:
        return 'Email already in use', 400
    # Checking if passwords dont match
    if request.json['password'] != request.json['password2']:
        return "Passwords don't match", 400
    id = mongo.db.users.insert(
        {
            'first_name': request.json['first_name'],
            'last_name': request.json['last_name'],
            'email': request.json['email'],
            'password': sha256_crypt.encrypt(request.json['password'])
        }
    )
    return f'{str(ObjectId(id))}'

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