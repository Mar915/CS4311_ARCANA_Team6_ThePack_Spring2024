from EventsManager import EventsManager
from EventGraphManager import EventGraphManager
from TOAManager import TOAManager
from LogIngestor import LogIngestor
from LocalDatabase import Database

class ProjectRepresenter:
    def __init__(self, name, initials, location, startDate, endDate, proj):
        self.name = name
        self.initials = initials
        self.location = location
        self.startDate = startDate
        self.endDate = endDate
        self.eventGraphManager = EventGraphManager()
        self.toaManager = TOAManager()
        self.ingestedFiles = self.pullIngested(proj['ingestedFiles'])
        self.db = Database().getRef()
        self.eventsManager = EventsManager(self.db, self.name)

    def pullIngested(self, ingestedList):
        files = []
        ingested = ingestedList.find({})      # getting everything in the ingested collection
        for f in ingested:
            files.append(f['file'])
        return files
    
    # Kind of self-explanatory
    # We just need feed the reference to the specific project collection and a directory for this bad boy to work
    def ingestLogs(self, directory):
        ingestor = LogIngestor(self.db['projectRepList'][self.name])
        errors, eventRepList = ingestor.traverseFiles(directory)
        #print(errors)
        #print("Events created: ", len(eventRepList))

    

