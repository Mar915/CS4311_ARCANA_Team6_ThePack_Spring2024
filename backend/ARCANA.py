from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from ProjectsManager import ProjectsManager


app = Flask(__name__)
CORS(app)


# ProjectsManager initializes itself with a reference to the database, so we just need to give it
# the project name and directory of files to ingest logs

@app.route("/ingestLogs/<projectName>/<directory>")
def ingestLogs(projectName = None, directory = None):
    projectManager = ProjectsManager()
    projectManager.ingestLogs(projectName, directory)



# Needs a form on the front end to be sent. This is why I am using POST method from flask
# Other than that, this function just creates a collection in the db and inserts a document with info
    
@app.route("/showProjects")
def showProjects():
    pm = ProjectsManager()
    projects = jsonify(pm.dprl.find({}))
    return projects

@app.route("/createProject", methods = ['GET', 'POST'])
def createProject():      # Going to assume it will be a dictionary given, will update when necessary
    if request.method == 'POST':
        data = request.json
    pm = ProjectsManager()
    pm.createProject(data)
    resp = jsonify({'some' : 'data'})
    return resp
    
   
@app.route("/deleteProject/<projectName>")
def deleteProject(projectName = None):
    pm = ProjectsManager()
    pm.deleteProject(projectName)

@app.route("/openProject/<projectName>")
def openProject(projectName = None):
    pm = ProjectsManager()
    events = pm.openProject(projectName)

    jevents = jsonify(events)    # Really hoping this will make the list interpretable by front end
                                    # If not, I will deal with it when we get there.

    return jevents



# http://127.0.0.1:5000 is the port that backend will run on 

# flask --app ARCANA run (Use this in the environment where you are running Python)