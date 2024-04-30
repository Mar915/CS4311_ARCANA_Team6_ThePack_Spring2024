from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from ProjectsManager import ProjectsManager
from ProjectRepresenter import ProjectRepresenter
from EventsManager import EventsManager
from LocalDatabase import Database
from EventGraphManager import EventGraphManager
from UserActivityLogger import UserActivityLogger

app = Flask(__name__)
CORS(app)


# ProjectsManager initializes itself with a reference to the database, so we just need to give it
# the project name and directory of files to ingest logs

@app.route("/ingestLogs", methods = ['GET', 'POST'] )
def ingestLogs():
    if request.method == 'POST':
        data = request.json
        directory = data['logFile']
        project = data['project']
    
    resp = jsonify({'result' : 'success'})
    projectRepresenter = ProjectRepresenter( project['projName'], project['initials'], project['location'], project['startDate'], project['endDate'])

    # Goind to hardcode the projectname variable here since we don't have a select function yet
    # but I need the project name for functionality
    projectRepresenter.ingestLogs(directory)

    projectRepresenter = ProjectRepresenter( project['projName'], project['initials'], project['location'], project['startDate'], project['endDate'])
    projectRepresenter.autoCreateEdges()
    return resp



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
    
    return jsonify({'response' : 'success'})
        

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

    print(jevents)
    return jevents


@app.route("/deleteEvent", methods = ['GET', 'POST'])
def deleteEvent():
    # This function is expecting to receive a json object
    # that contains some unique identifier for events (stil TBD)
    # It needs to find that event in the database and delete it
    db = Database()
    if request.method == 'POST':
        data = request.json

    # event to delete should be accessed by eventID (srs: pg107 under #3, pg115 under 'Event'in data dictionary)
    project = data['project']
    event = data['currEvent']
    em = EventsManager(db.getRef(), project['projName'])
    em.deleteEvent(event['id'])
    resp = jsonify({'result' : 'success'})
    return resp

@app.route("/updateEvent", methods = ['GET', 'POST'])
def updateEvent():
    # This function is expecting to receive a json object
    # that contains the unique identifier AND has something like this
    # { 'id' = 'something', 'posture' : '', team : 'blue'  }
    # Anything left blank '' will not be changed, anything with info will be changed
    db = Database()
    if request.method == 'POST':
        data = request.json

    project = data['project']
    eM = EventsManager(db.getRef(), project['projName'])
    eM.updateEvent(data['eventData'])

    response = jsonify({'some': 'data'})
    return response

@app.route("/createEvent", methods = ['GET', 'POST'])
def createEvent():
    # This function is expecting to receive a json object
    # that will have all the fields needed to create an event
    # reminder that you access it like thihs data['location']

    # Assuming it has called attributes
    db = Database()
    if request.method == 'POST':
        data = request.json

    project = data['project']
    eM = EventsManager(db.getRef(), project['projName'])
    eM.createEvent(data['eventData'])

    response = jsonify({'some' : 'data'})
    return response


@app.route("/updateAllEvents", methods = ['GET', 'POST'])
def updateAllEvents():
    db = Database()
    if request.method == 'POST':
        data = request.json # data = {project, updateEvents} updateEvents is a list where each item is {id, eventInfo}

    project = data['project']
    em = EventsManager(db.getRef(), project['projName'])
    em.updateAllEvents(data['updateEvents'])

    response = jsonify({'some' : 'data'})
    return response

@app.route("/updatePosition", methods = ['GET', 'POST'])
def updatePosition():
    
    db = Database()
    if request.method == 'POST':
        data = request.json

    project = data['project']
    eGM = EventGraphManager(db.getRef(), project['projName'])
    eGM.updatePosition(data)

    response = jsonify({'some' : 'data'})
    return response

@app.route("/updateConnected", methods = ['GET', 'POST'])
def updateConnected():

    db = Database()
    if request.method == 'POST':
        data = request.json

    project = data['project']
    eGM = EventGraphManager(db.getRef, project['projName'])
    eGM.updateAdjList(data)

    response = jsonify({'some' : 'data'})
    return response

@app.route("/userLogs", methods = ['GET'])
def userLogs():
    
    ual = UserActivityLogger()
    logs = ual.getLogList()

    jLogs = jsonify(logs)    

    print(jLogs)
    return jLogs


# http://127.0.0.1:5000 is the port that backend will run on 

# flask --app ARCANA run (Use this in the environment where you are running Python)
# flask --app ARCANA --debug run