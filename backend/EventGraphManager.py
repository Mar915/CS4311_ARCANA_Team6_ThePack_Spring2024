from EventsManager import EventsManager
import numpy as np

class EventGraphManager:

    def __init__(self, db, projName, eventList):
        self.db = db
        self.projName = projName
        self.eventList = eventList

    
    def updatePosition(self, newData):
        eventsDB = self.db['projectRepList'][self.projName]['eventRepList']
        targetEvent = newData['currEvent']
        query = {'id' : targetEvent['id']}
        changes = {}
        
        if newData['xCord'] != '':
            changes['xCord'] = newData['xCord']
        if newData['yCord'] != '':
            changes['yCord'] = newData['yCord']
        
        newValues = {'$set' : changes}
        eventsDB.update_one(query, newValues)


    def updateAdjList(self, newData):
        eventsDB = self.db['projectRepList'][self.projName]['eventRepList']
        targetEvent = newData['currEvent']
        query = {'id': targetEvent['id']}
        changes = {}

        if newData['AdjList'] != '':
            changes['AdjList'] = newData['AdjList']

        newValues = {'$set': changes}
        eventsDB.update_one(query, newValues)

    def getEvent(self, id):
        for e in self.eventList:
            if e.eventID == id:
                return e

    def makeEdges(self):
        eventsDB = self.db['projectRepList'][self.projName]['eventRepList']
      
        # Using the busted commands from MongoDB to get unique occurences in the vectorID attribute
        vectorIDs = eventsDB.distinct("vectorID")
        groups = {}

        # Using the find command to get a list of the events with a particular vectorID
        # And sort by timestamp
        for v in vectorIDs:
            groups[v] = []
            databaseEvents = eventsDB.find({ 'vectorID': v, 'isMalformed' : 'False' })
            for e in databaseEvents:
               # print(e)
                groups[v].append(self.getEvent(e['id']))
            # The code above SHOULD check each event from the database query and find its matching eventRepresenter


            groups[v].sort(key = self.interpretTimeStamp)

            # Once all of the vectorID sharing events are in a list, we set up the edges
            if len(groups[v]) != 0:
                popped = groups[v].pop()

            for event in groups[v]:
                query = {'id' : popped.eventID}
                change = {'$set': {'adjList' : event.eventID}}
                eventsDB.update_one(query, change)
                if len(groups[v]) != 0:
                    popped = groups[v].pop()



        
    
    def interpretTimeStamp(self, event):
        dateTime = event.timestamp.split()
        date = [ int(x) for x in dateTime[0].split("/") ]
        time = [ int(x) for x in dateTime[1].split(":") ]
        sum = np.sum(date) + np.sum(time)

        return sum
