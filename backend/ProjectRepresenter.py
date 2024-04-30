from EventsManager import EventsManager
from EventGraphManager import EventGraphManager
from TOAManager import TOAManager
from LogIngestor import LogIngestor
from LocalDatabase import Database
from UserActivityLogger import UserActivityLogger

class ProjectRepresenter:
    def __init__(self, name, initials, location, startDate, endDate):
        self.name = name
        self.initials = initials
        self.location = location
        self.startDate = startDate
        self.endDate = endDate
        self.toaManager = TOAManager()
        self.db = Database().getRef()
        self.ingestedFiles = self.pullIngested(self.db['projectRepList'][name]['ingestedFiles'])
        self.eventsManager = EventsManager(self.db, self.name)
        self.eventGraphManager = EventGraphManager(self.db, self.name, self.eventsManager.eventList)

    def pullIngested(self, ingestedList):
        files = []
        ingested = ingestedList.find({})      # getting everything in the ingested collection
        for f in ingested:
            files.append(f['file'])
        return files
    
    # Kind of self-explanatory
    # We just need feed the reference to the specific project collection and a directory for this bad boy to work
    def ingestLogs(self, directory):
        ingestor = LogIngestor(self.db['projectRepList'][self.name], self.ingestedFiles)
        errors, eventRepList = ingestor.traverseFiles(directory)
        UserActivityLogger().addToUserLogs(self.initials, "ingested in " + self.name)
        #print(errors)
        #print("Events created: ", len(eventRepList))

    def autoCreateEdges(self):
        self.eventGraphManager.makeEdges()

    

