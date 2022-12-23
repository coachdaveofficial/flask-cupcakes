"""Flask app for Cupcakes"""
from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = "doggies"
debug = DebugToolbarExtension(app)

with app.app_context():
    connect_db(app)

    db.create_all()