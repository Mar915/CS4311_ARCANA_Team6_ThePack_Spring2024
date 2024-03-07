from ProjectRepresenter import ProjectRepresenter
from LocalDatabase import Database

class ProjectsManager:

    # We want ProjectsManager to be self-sufficient and the big boss of the entire operation
    # That is why we gave it the uri for the server, so it can take care of itself and be reliable
    def __init__(self):
        self.db = Database().getRef()
        self.projRepList = self.pullProjects(self.db['projectRepList'])
        self.colorScheme = "default"

    # This function will be used anytime an instance of ProjectsManager is created
    # TLDR: It makes db documents into objects 
    def pullProjects(self, projectCollection):
        # Using find() with an empty parameter to just grab every document in the collecion
        dbprojects =  projectCollection.find()
        projects = []

        # Going through the list given and making an object for each one so we can manipulate them later
        for p in dbprojects:
            #print(p)
            name = p['name']
            temp = ProjectRepresenter(name, p['initials'], p['location'], p['startDate'], p['endDate'], projectCollection[name] )
            projects.append(temp)

    
    # Only used to make a new project and make space for it in the db, no objects are made here
    def createProject(self, data):

        name = data['projName']
        initials = data['projInitials']
        location = data['projLocation']
        startDate = data['projStartDate']
        endDate = data['projEndDate']
    
        # Checking if project with that name already exists
        projects = self.db['projectRepList'].find()
        for p in projects:
            if name == p['name']:
                dup = True

        #inserting the document to the project collection IF not a duplicate name
        if not dup:
            self.db['projectRepList'].insert_one({'name': name, 'initials': initials, 'location' : location, 'startDate' : startDate, 'endDate' : endDate})

        #No need to create the object here, as the next time ProjectsManager is initialized, it will make the objects

    def deleteProject(self, projName):
        # All we need is to call this function to get rid of the specified project in the database
        # It deletes the project document in the projectRepList, and its two collections 
        # Should probably ask for confirmation since we can't bring this bad boy back
        self.db['projectRepList'].delete_one({'name' : projName})  # Deletes the document based on projName
        target = self.db['projectRepList'][projName] #
        target['ingestedFiles'].drop()
        target['eventRepList'].drop()

    def openProject(self, projName):
        # Basic idea is to return a list of dictionaries 
        events = []
        dbEvents = self.db['projectRepList'][projName]['eventRepList'].find()
        for e in dbEvents:
            e['_id'] = "NaN"
            events.append(e)
        
        return events
        # Really hoping this returns only documents and not the sub collections as well
