from flask import Flask, jsonify, render_template
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import datetime as dt
import pandas as pd
from flask import url_for




#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:@localhost:5433/project_2", echo=True)


# reflect an existing database into a new model
Base = automap_base()


# reflect the tables
Base.prepare(engine, reflect=True)


# Save references to tables
combined_scores = Base.classes.combined_scores
emmys_mega_channels = Base.classes.emmys_mega_channels
platforms_whole = Base.classes.platforms_whole


# Create our session (link) from Python to the DB
session = Session(engine)


#///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


# make data avalable to pages that need it 



@app.route("/stephen_data")
def plot_data():
    query = f"""SELECT * FROM combined_scores where "channel" = 'HBO' or "channel" = 'Netflix' or "channel" = 'NBC'or "channel" = 'FX'or "channel" = 'Hulu'or "channel" = 'CBS'or "channel" = 'ABC'or "channel" = 'Showtime'or "channel" = 'Amazon Studios'or "channel" = 'Fox'"""
    conn = engine.connect()
    plot_table = pd.read_sql(query, conn)
    return plot_table.to_json(orient='values')

@app.route("/2")
def data2():
    query = f"""SELECT * FROM platforms_whole"""
    conn = engine.connect()
    plot_table = pd.read_sql(query, conn)
    return plot_table.to_json(orient='values')

    
# Render site pages 
@app.route("/")
def home():
    return render_template("index.html")


@app.route('/Stephen')
def Stephen():
    """Renders the contact page."""
    return render_template(
        'Stephen.html',
        title='Stephen',
        # year=datetime.now().year,
        # message='Your application description page'
    )


@app.route('/Chandler')
def Chandler():
    """Renders the about page."""
    return render_template(
        'Chandler.html',
        title='Chandler',
       # year=datetime.now().year,
        # message='Your application description page.' 
    )

@app.route("/sunburst_data")
def sunburst_data():
    query = f"""SELECT * FROM sunburst_data"""
    conn = engine.connect()
    scores = pd.read_sql(query, conn)
    return scores.to_json(orient='values')

@app.route('/alison')
def alison():
    return render_template(
        'alison.html',
        title='alison',
        # year=datetime.now().year,
        # message='Your application description page.'
    )





if __name__ == "__main__":
    app.run()
# debug = True


