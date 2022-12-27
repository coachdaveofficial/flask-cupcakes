"""Flask app for Cupcakes"""
from flask import Flask, request, redirect, render_template, flash, jsonify
from models import db, connect_db, Cupcake
from flask_debugtoolbar import DebugToolbarExtension
from secret import SECRET_KEY

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = SECRET_KEY
debug = DebugToolbarExtension(app)

with app.app_context():
    connect_db(app)

    db.create_all()

@app.route('/api/cupcakes/')
def get_all_cupcakes():
    '''Return JSON data for all cupcakes in database'''
    

    cupcakes = [cupcake.to_dict() for cupcake in Cupcake.query.all()]

    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/', methods=['POST'])
def add_cupcake():
    '''Added new cupcake to db when passed cupcake data'''

    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json['image']

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    return ( jsonify(cupcake=new_cupcake.to_dict()), 201)

            

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    '''Return JSON data for single cupcake'''

    cupcake = Cupcake.query.get_or_404(cupcake_id)


    return jsonify(cupcake=cupcake.to_dict())