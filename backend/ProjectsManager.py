import LogIngestor
from ProjectRepresenter import ProjectRepresenter
import pymongo

class ProjectsManager:

    # We want ProjectsManager to be self-sufficient and the big boss of the entire operation
    # That is why we gave it the uri for the server, so it can take care of itself and be reliable
    def __init__(self):
        self.uri = "mongodb+srv://stevecruz2014:sTYuxN9fUv5KF17m@team6arcana.wdmxzy3.mongodb.net/?retryWrites=true&w=majority"
        self.dbprl = pymongo.MongoClient(self.uri)['projectRepList']
        self.projRepList = self.pullProjects(self.dbprl)
        self.colorScheme = "default"

    # This function will be used anytime an instance of ProjectsManager is created
    # TLDR: It makes db documents into objects 
    def pullProjects(self, projectCollection):
        # Using find() with an empty parameter to just grab every document in the collecion
        dbprojects =  projectCollection.find({})
        projects = []

        # Going through the list given and making an object for each one so we can manipulate them later
        for p in dbprojects:
            temp = ProjectRepresenter(p['name'], p['initials'], p['location'], p['startDate'], p['endDate'], projectCollection[p['name']] )
            projects.append(temp)

    # Kind of self-explanatory
    # We just need feed the reference to the specific project collection and a directory for this bad boy to work
    def ingestLogs(self, projName, directory):
        ingestor = LogIngestor.LogIngestor(self.dbprl[projName])
        errors, eventRepList = ingestor.traverseFiles(directory)
        print(errors)
        print("Events created: ", len(eventRepList))

    # Only used to make a new project and make space for it in the db, no objects are made here
    def createProject(self, form):

        name = form['name']
        initials = form['initials']
        location = form['location']
        startDate = form['startDate']
        endDate = form['endDate']


        #inserting the document to the project collection
        self.dbprl[name].insert_one({'name': name, 'initials': initials, 'location' : location, 'startDate' : startDate, 'endDate' : endDate})

        #No need to create the object here, as the next time ProjectsManager is initialized, it will make the objects
