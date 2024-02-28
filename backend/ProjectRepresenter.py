from EventsManager import EventsManager
from EventGraphManager import EventGraphManager
from TOAManager import TOAManager

class ProjectRepresenter:
    def __init__(self, name, initials, location, startDate, endDate, proj):
        self.name = name
        self.initials = initials
        self.location = location
        self.startDate = startDate
        self.endDate = endDate
        self.eventsManager = EventsManager()
        self.eventGraphManager = EventGraphManager()
        self.toaManager = TOAManager()
        self.ingestedFiles = self.pullIngested(proj['ingestedFiles'])

    def pullIngested(self, ingestedList):
        files = []
        ingested = ingestedList.find({})      # getting everything in the ingested collection
        for f in ingested:
            files.append(f['file'])
        return files

