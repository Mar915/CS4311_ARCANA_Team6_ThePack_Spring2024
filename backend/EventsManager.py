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

        # Just added while updating EventRepresenter, will change names when issue with local DB is fixed - Omar
        rep['xCord'] = data['xCord']
        rep['yCord'] = data['yCord']
        rep['adjList'] = data['adjList']

        self.db['projectRepList'][self.projName]['eventRepList'].insert_one(rep)
        


    # How data is sent from front end
    #const data = {
    #        eventDate, eventTime, eventInitials, eventTeam, eventPosture, eventLocation, eventVector, eventSource, parsedHost, eventDescription, eventAuto
    #    }
    
    
    def updateEvent(self, newData):
        # Assuming newData is an EventRepresenter obj
        eventsDB = self.db['projectRepList'][self.projName]['eventRepList']
        targetEvent = newData['currEvent']
        query = {'id' : targetEvent['id']}
        changes = {}
        if newData['eventInitials'] != '':
            changes['initals'] = newData['eventInitials']
        if newData['eventTeam'] != targetEvent['team']:
            changes['team'] = newData['eventTeam']
        if newData['eventSource'] != '':
            changes['sourceHost'] = newData['eventSource']
        if newData['parsedHost'] != ['']:
            changes['targetHostList'] = newData['parsedHost']
        if newData['eventLocation'] != '':
            changes['location'] = newData['eventLocation']
        if newData['eventPosture'] != '':
            changes['posture'] = newData['eventPosture']
        if newData['eventDescription'] != '':
            changes['description'] = newData['eventDescription']
        if newData['eventVector'] != '':
            changes['vectorID'] = newData['eventVector']
        if newData['eventDate'] + newData['eventTime'] != '':
            changes['timestamp'] = newData['eventDate'] + newData['eventTime']
        
        
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


    


