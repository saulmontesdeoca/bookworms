from flask import Flask
from flask import jsonify
from flask import request
from flask import Response
from flask_pymongo import PyMongo
from bson import json_util
app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bookworms'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/bookworms'

mongo = PyMongo(app)

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
if __name__ == '__main__':
    app.run(debug=True)