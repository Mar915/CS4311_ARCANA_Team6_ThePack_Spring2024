from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from ProjectsManager import ProjectsManager
from EventsManager import EventsManager


app = Flask(__name__)
CORS(app)


# ProjectsManager initializes itself with a reference to the database, so we just need to give it
# the project name and directory of files to ingest logs

@app.route("/ingestLogs", methods = ['GET', 'POST'] )
def ingestLogs():
    if request.method == 'POST':
        data = request.json
        directory = data['logFile']
        project = data['project']['projName']
    
    resp = jsonify({'result' : 'success'})
    projectManager = ProjectsManager()

    # Goind to hardcode the projectname variable here since we don't have a select function yet
    # but I need the project name for functionality
    projectManager.ingestLogs(project, directory)
    return resp


@app.route("/updateevent", methods = ['GET', 'POST'])
def updateEvent():

    if request.method == 'POST':
        data = request.json

    eM = EventsManager()
    eM.updateEvent(data['prevEvent'], data['actualEvent'])


@app.route("/createEvent", methods = ['GET', 'POST'])
def createEvent():

    if request.method == 'POST':
        data = request.json

    eM = EventsManager()
    eM.createEvent(data)

    response = jsonify({'some' : 'data'})
    return response


# Needs a form on the front end to be sent. This is why I am using POST method from flask
# Other than that, this function just creates a collection in the db and inserts a document with info


@app.route("/showProjects", methods = ['GET', 'POST'])
def showProjects():
    if request.method == 'POST':
        pm = ProjectsManager()
        projects = jsonify(pm.db['ProjectRepList'].find({}))
        return projects
    elif request.method == 'GET':
        pm = ProjectsManager()
        projects = list(pm.db['projectRepList'].find({}))
        for p in projects:
            p['_id'] = 'NaN'
            p['projName'] = p['name']
        return jsonify(projects)
        

@app.route("/createProject", methods = ['GET', 'POST'])
def createProject():      # Going to assume it will be a dictionary given, will update when necessary
    if request.method == 'POST':
        data = request.json
    pm = ProjectsManager()
    pm.createProject(data)
    resp = jsonify({'some' : 'data'})
    return resp
    
   
@app.route("/deleteProject", methods = ['GET', 'POST'])
def deleteProject():
    if request.method == 'POST':
        data = request.json

    pm = ProjectsManager()
    pm.deleteProject(data['projName'])
    resp = jsonify({'result' : 'success'})
    return resp
   

@app.route("/openProject", methods = ['GET', 'POST'])
def openProject():
    if request.method == 'POST':
        data = request.json

    pm = ProjectsManager()
    events = pm.openProject(data['projName'])

    jevents = jsonify(events)    

    return jevents




# http://127.0.0.1:5000 is the port that backend will run on 

# flask --app ARCANA run (Use this in the environment where you are running Python)