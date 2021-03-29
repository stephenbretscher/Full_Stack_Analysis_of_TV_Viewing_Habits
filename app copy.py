from flask import Flask, jsonify, render_template
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import datetime as dt
import pandas as pd
print("banana")


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:Olivia2019@localhost:5433/project_2", echo=True)
print("cherry")

# reflect an existing database into a new model
Base = automap_base()
print("plum")

# reflect the tables
Base.prepare(engine, reflect=True)
print("apple")

# Save references to tables
combined_scores = Base.classes.combined_scores
emmys_mega_channels = Base.classes.emmys_mega_channels
platforms_whole = Base.classes.platforms_whole
print("peach")

# Create our session (link) from Python to the DB
session = Session(engine)
print("berry")

#///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


@app.route("")
def test():
    query = f"""SELECT * FROM combined_scores"""
    conn = engine.connect()
    scores = pd.read_sql(query, conn)
    chart_data = scores.to_dict(orient='records')
    chart_data = json.dumps(chart_data, indent=2)
    data = {'chart_data': chart_data}
    return render_template("index.html", data=data)
    


if __name__ == "__main__":
    app.run()



