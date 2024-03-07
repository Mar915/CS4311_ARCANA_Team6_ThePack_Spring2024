from EventRepresenter import EventRepresenter
from TOAManager import TOAMananger
class EventsManager:
    def __init__(self, db, projName):
        self.db = db
        self.projName = projName
        self.eventList = self.pullEvents()

    def createEvent(self, data):
        temp = EventRepresenter(data['initials'], data['team'], data['sourceHost'], data['targetHostList'], data['location'], data['posture'], data['vectorID'], data['description'], data['timestamp'], data['dataSource'])
        self.db.append(temp)

    def updateEvent(self, newData):

        # Assuming newData is an EventRepresenter obj
        temp = self.pullEvents()

        for ev in temp:

            if ev['id'] == newData['id']:

                for i in range(len(ev.attrToList())):

                    if ev[i] != '':
                        ev[i] = newData[i]

    def pullEvents(self):
        events = self.db[self.projName]['eventRepList'].find()
        tempList = []
        for e in events:
            temp = EventRepresenter(e['initials'], e['team'], e['sourceHost'], e['targetHostList'], e['location'], e['posture'], e['vectorID'], e['description'], e['timestamp'], e['dataSource'])
            # Here is where Im going to implement the TOAManager changes
            tempList.append(temp)
        return tempList
    
    def deleteEvent(self, eventID):

        # SRS data containers to update: events (updates event list), user activity logs (event deleted log),
        # archived events (deleted events), undo activity information (event deletion information)

        self.db[self.projName]['eventRepList'].delete_one({'id' : eventID})


    


