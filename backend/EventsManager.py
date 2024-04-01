from EventRepresenter import EventRepresenter
from TOAManager import TOAManager
class EventsManager:
    def __init__(self, db, projName):
        self.db = db
        self.projName = projName
        self.eventList = self.pullEvents()

    def createEvent(self, event):
        rep = {}
        rep['isMalformed'] = 'False'
        storedEvents = list(self.db['projectRepList'][self.projName]['eventRepList'].find())
        rep['id'] = str(len(storedEvents) + 1)
        rep['initials'] = event['initials']
        rep['team'] = event['team']
        rep['sourceHost'] = event['sourceHost']
        rep['targetHostList'] = event['targetHostList']
        rep['location'] = event['location']
        rep['posture'] = event['posture']
        rep['vectorID'] = event['vectorID']
        rep['description'] = event['description']
        rep['timestamp'] = event['timestamp']
        rep['icon'] = event['icon']
        rep['dataSource'] = 'User Created'
        

        # Just added while updating EventRepresenter, will change names when issue with local DB is fixed - Omar
        rep['xCord'] = "0"
        rep['yCord'] = "200"
        # Add logic for auto creating edges algorithm
        rep['adjList'] = ""

        self.db['projectRepList'][self.projName]['eventRepList'].insert_one(rep)
        


    # How data is sent from front end
    #const data = {
    #        eventDate, eventTime, eventInitials, eventTeam, eventPosture, eventLocation, eventVector, eventSource, parsedHost, eventDescription, eventAuto
    #    }
    
    
    def updateEvent(self, newData):
        # Assuming newData is an EventRepresenter obj
        eventsDB = self.db['projectRepList'][self.projName]['eventRepList']
        targetEvent = newData
        query = {'id' : targetEvent['id']}
        changes = {}
        if newData['initials'] != '':
            changes['initals'] = newData['initials']
        if newData['team'] != targetEvent['team']:
            changes['team'] = newData['team']
        if newData['sourceHost'] != '':
            changes['sourceHost'] = newData['sourceHost']
        if newData['targetHostList'] != ['']:
            changes['targetHostList'] = newData['targetHostList']
        if newData['location'] != '':
            changes['location'] = newData['location']
        if newData['posture'] != '':
            changes['posture'] = newData['posture']
        if newData['description'] != '':
            changes['description'] = newData['description']
        if newData['vectorID'] != '':
            changes['vectorID'] = newData['vectorID']
        if newData['timestamp'] != '':
            changes['timestamp'] = newData['timestamp']
        if newData['icon'] != '':
            changes['icon'] = newData['icon']
        if newData['xCord'] != '':
            changes['xCord'] = newData['xCord']
        if newData['yCord'] != '':
            changes['yCord'] = newData['yCord']
        if newData['adjList'] != '':
            changes['adjList'] = newData['adjList']
            
        newValues = {'$set' : changes}
        eventsDB.update_one(query, newValues)

    #const data = {
    #        eventDate, eventTime, eventInitials, eventTeam, eventPosture, eventLocation, eventVector, eventSource, parsedHost, eventDescription, eventAuto, currEvent, project
    #    }


    def pullEvents(self):
        events = self.db['projectRepList'][self.projName]['eventRepList'].find()
        tempList = []
        for e in events:
            temp = EventRepresenter(e['id'], e['initials'], e['team'], e['sourceHost'], e['targetHostList'], e['location'], e['posture'], e['vectorID'], e['description'], e['timestamp'], e['dataSource'])
            # Here is where Im going to implement the TOAManager changes
            tempList.append(temp)
        return tempList
    
    def deleteEvent(self, eventID):

        # SRS data containers to update: events (updates event list), user activity logs (event deleted log),
        # archived events (deleted events), undo activity information (event deletion information)
        # print('Target Event ID: ', eventID)
        self.db['projectRepList'][self.projName]['eventRepList'].delete_one({'id' : eventID})


    


