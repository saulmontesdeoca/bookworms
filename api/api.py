from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'bookworms'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/bookworms'

mongo = PyMongo(app)

@app.route('/findone/<id>', methods=['GET'])
def hello_world(id):
    books = mongo.db.books
    s = books.find_one({'book_id': id})
    return jsonify({'result' : s['title']})

if __name__ == '__main__':
    app.run(debug=True)