from EventsManager import EventsManager

class EventGraphManager:

    def __init__(self, db, projName):
        self.db = db
        self.projName = projName
        self.eventList = EventsManager.pullEvents()

    
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