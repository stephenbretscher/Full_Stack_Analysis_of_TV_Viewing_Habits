"""
Routes and views for the flask application.
"""
from datetime import datetime
import json
import numpy as np
import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import render_template, Flask, jsonify
from Project_2 import app

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost:5432/project_2", echo=True)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)
combined_scores = Base.classes.combined_scores
emmys_mega_channels = Base.classes.emmys_mega_channels
platforms_whole = Base.classes.platforms_whole


session = Session(engine)



@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/Stephen')
def Stephen():
    """Renders the contact page."""
    return render_template(
        "Stephen.html",
        year=datetime.now().year,
    )

@app.route('/Allison')
def Allison():
    """Renders the about page."""
    return render_template(
        'Allison.html',
        year=datetime.now().year
    )

@app.route('/Chandler')
def Chandler():
    """Renders the about page."""
    return render_template(
        'Chandler.html',
        title='Chandler',
        year=datetime.now().year,
        message='Your application description page.'
    )

@app.route('/Sharice')
def Sharice():
    """Renders the about page."""
    return render_template(
        'Sharice.html',
        title='Sharice',
        year=datetime.now().year,
        message='Your application description page.'
    )

@app.route('/test')
def test():
    """Renders the contact page."""
    query = f"SELECT * FROM platforms_whole"
    conn = engine.connect()
    plot_table = pd.read_sql(query, conn)
    plot_json =  plot_table.to_json(orient='values')
    data = {'plot_data': plot_json}
    return render_template("test.html", data=data)

if __name__ == "__main__":
    app.run(debug=True)