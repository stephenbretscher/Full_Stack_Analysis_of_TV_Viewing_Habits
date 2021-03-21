from flask import Flask, jsonify, render_template
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import datetime as dt
import pandas as pd

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost:5432/project_2", echo=True)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to tables
tv_csv = Base.classes.tv_shows_csv

#Needs primary key in SQL 
emmys = Base.classes.emmys_data


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

@app.route("/")


@app.route("/test")
def test():
    query = f"""SELECT * FROM tv_shows_csv"""
    conn = engine.connect()
    tv_df = pd.read_sql(query, conn)
    return tv_df.to_json(orient="values")



if __name__ == "__main__":
    app.run()



