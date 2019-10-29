import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine(r"sqlite:///C:\Users\grace\socialdatamappingproject\csv2.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables

Base.prepare(engine, reflect=True)


# Save reference to the table
Fb_data = Base.classes.FBData
print(Fb_data)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""

    return render_template("index.html")
   # return (
        #f"Available Routes:<br/>"
       # f"/api/fb_data"
        
    #)

@app.route("/api/fb_data")
def fb_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all fb activity data including time and location data"""
    # Query all fb activity
    results = session.query(Fb_data.lat, Fb_data.long).all()

    session.close()


     # Create a dictionary from the row data and append to a list of all_passengers
    all_activityloc = []
    for lat, long in results:
        activity_dict = {}
        activity_dict["latitude"] = lat
        activity_dict["longitude"] = long
        all_activityloc.append(activity_dict)

    
    return jsonify(all_activityloc)



if __name__ == '__main__':
    app.run(debug=True)