from EventRepresenter import EventRepresenter
from TOAManager import TOAMananger
class EventsManager:
    def __init__(self, db, projName):
        self.db = db
        self.projName = projName
        self.eventList = self.pullEvents()

    def pullEvents(self):
        events = self.db[self.projName]['eventRepList'].find()
        tempList = []
        for e in events:
            temp = EventRepresenter(e['initials'], e['team'], e['sourceHost'], e['targetHostList'], e['location'], e['posture'], e['vectorID'], e['description'], e['timestamp'], e['dataSource'])
            # Here is where Im going to implement the TOAManager changes
            tempList.append(temp)
        return tempList
    

