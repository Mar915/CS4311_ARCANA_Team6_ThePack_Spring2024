from EventsManager import EventsManager
from UserActivityLogger import UserActivityLogger
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
        initials = self.db['projectRepList'].find_one({'name' : self.projName}).get('initials')
        UserActivityLogger().addToUserLogs(initials, "updated node position in " + self.projName + ", event " + targetEvent)


    def updateAdjList(self, newData):
        eventsDB = self.db['projectRepList'][self.projName]['eventRepList']
        targetEvent = newData['currEvent']
        query = {'id': targetEvent['id']}
        changes = {}

        if newData['adjList'] != '':
            changes['adjList'] = newData['adjList']

        newValues = {'$set': changes}
        eventsDB.update_one(query, newValues)

    def getEvent(self, id):
        for e in self.eventList:
            if e.eventID == id:
                return e

    def makeEdges(self):
        x = 200
        eventsDB = self.db['projectRepList'][self.projName]['eventRepList']
      
        # Using the busted commands from MongoDB to get unique occurences in the vectorID attribute
        vectorIDs = eventsDB.distinct("vectorID")
        groups = {}

        # Using the find command to get a list of the events with a particular vectorID
        # And sort by timestamp
        for v in vectorIDs:
            y = 0
            groups[v] = []
            print(v)
            databaseEvents = eventsDB.find({ 'vectorID': v, 'isMalformed' : 'False' })
            for e in databaseEvents:
                #print(e['id'])
                groups[v].append(self.getEvent(e['id']))
            # The code above SHOULD check each event from the database query and find its matching eventRepresenter

            # Once all of the vectorID sharing events are in a list, we set up the edges
            if len(groups[v]) != 0:
                groups[v].sort(key = self.interpretTimeStamp)
                #self.printArrayOrder(groups[v])
                popped = groups[v].pop(0)

                #In the case there is only one event in the list
                query = {'id' : popped.eventID}
                change = {'$set': {'xCord' : x, 'yCord': y }}
                eventsDB.update_one(query, change)
                #print('Updated: ', popped.eventID)

            length = len(groups[v])    

            while len(groups[v]) != 0:
                print(popped.eventID)
                query = {'id' : popped.eventID}
                change = {'$set': {'adjList' : groups[v][0].eventID, 'xCord' : x, 'yCord': y}}
                eventsDB.update_one(query, change)
                print('Updated: ', popped.eventID)
                popped = groups[v].pop(0)
                print("length of list:" + str(len(groups[v])))
                print("Current Popped: " + str(popped.eventID))
                if len(groups[v]) == 0:
                    query = {'id' : popped.eventID}
                    change = {'$set': {'adjList': -1,'xCord' : x, 'yCord': y}}
                    eventsDB.update_one(query, change)
                y+=100
            
            x+=200
        initials = self.db['projectRepList'].find_one({'name' : self.projName}).get('initials')
        UserActivityLogger().addToUserLogs(initials, "edges made for " + self.projName)
            



        
    
    def interpretTimeStamp(self, event):
        dateTime = event.timestamp.split()
        date = [ int(x) for x in dateTime[0].split("/") ]
        time = [ int(x) for x in dateTime[1].split(":") ]

        date[1]*= 0.01
        x = 1
        for i in range(0, len(time)):
            time[i] *= x
            x *= .1

        sum = np.sum(date) + np.sum(time)
        print("ID: " + str(event.eventID) + ", timestamp: " + str(event.timestamp) + ", value: " + str(sum) )
        return sum
