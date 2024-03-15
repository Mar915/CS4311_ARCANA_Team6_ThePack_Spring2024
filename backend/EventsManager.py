from EventRepresenter import EventRepresenter
from TOAManager import TOAManager
class EventsManager:
    def __init__(self, db, projName):
        self.db = db
        self.projName = projName
        self.eventList = self.pullEvents()

    def createEvent(self, data):
        rep = {}
        rep['isMalformed'] = 'False'
        storedEvents = list(self.db['projectRepList'][self.projName]['eventRepList'].find())
        rep['id'] = str(len(storedEvents) + 1)
        rep['initials'] = data['eventInitials']
        rep['team'] = data['eventTeam']
        rep['sourceHost'] = data['eventSource']
        rep['targetHostList'] = data['parsedHost']
        rep['location'] = data['eventLocation']
        rep['posture'] = data['eventPosture']
        rep['vectorID'] = data['eventVector']
        rep['description'] = data['eventDescription']
        rep['timestamp'] = str(data['eventDate']) + " " + str(data['eventTime'])
        rep['dataSource'] = 'User Created'

        self.db['projectRepList'][self.projName]['eventRepList'].insert_one(rep)
        


    # How data is sent from front end
    #const data = {
    #        eventDate, eventTime, eventInitials, eventTeam, eventPosture, eventLocation, eventVector, eventSource, parsedHost, eventDescription, eventAuto
    #    }
    
    
    def updateEvent(self, newData):
        # Assuming newData is an EventRepresenter obj
        eventsDB = self.db[self.projName]['eventRepList']
        query = {'id' : newData['id']}
        changes = {}
        for item in newData:
            if item != 'id':
                if newData[item] != '':
                    changes[item] = newData[item] 

        newValues = {'$set' : changes}
        eventsDB.update_one(query, newValues)


    def pullEvents(self):
        events = self.db[self.projName]['eventRepList'].find()
        tempList = []
        for e in events:
            temp = EventRepresenter(e['id'], e['initials'], e['team'], e['sourceHost'], e['targetHostList'], e['location'], e['posture'], e['vectorID'], e['description'], e['timestamp'], e['dataSource'])
            # Here is where Im going to implement the TOAManager changes
            tempList.append(temp)
        return tempList
    
    def deleteEvent(self, eventID):

        # SRS data containers to update: events (updates event list), user activity logs (event deleted log),
        # archived events (deleted events), undo activity information (event deletion information)

        self.db[self.projName]['eventRepList'].delete_one({'id' : eventID})


    


