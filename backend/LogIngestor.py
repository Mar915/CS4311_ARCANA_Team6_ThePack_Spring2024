import os
from EventRepresenter import EventRepresenter
import pandas as pd



# Current Checklist
# make files parsed collection in database, maybe add fileParsedFrom attribute for EventRepresenters




#initials, team, sourceHost, targetHostList, location, posture, vectorID, description, timestamp
#    0            1            2            3        4       5         6         7          8
#dateCreated, description, sourceHost, targetHost, team, location, initials, vectorId, lastModified
class LogIngestor:
    def __init__(self, project, ingestedFiles):
        self.ingestedFiles = ingestedFiles   # List of files that have already been ingested
        self.ingested = project['ingestedFiles']  
        self.eventList = project['eventRepList']

    def uploadIngested(self):
        for file in self.ingestedFiles:
            self.ingested.insert_one({'file' : file})

    def createEvents(self, log, dataSource):   #Log should be in the form of a 2D array
        startID = len(list(self.eventList.find())) + 1
        events = []
        for event in log:
            #Can't parse posture
            rep = EventRepresenter(startID, str(event[6]), str(event[4]), str(event[2]), str(event[3]), str(event[5]), "", str(event[7]), str(event[1]), str(event[0]), dataSource )
            events.append(rep)
            startID += 1
        self.uploadEvents(events)

        return events
    
    def uploadEvents(self, log):
        events = []
        for e in log:
            rep = {'isMalformed' : str(e.isMalformed), 'id': e.eventID, 'initials' : e.initials, 'team' : e.team, 'sourceHost' : e.sourceHost, 'targetHostList' : e.targetHostList, 'location' : e.location, 'posture' : e.posture, 'vectorID' : e.vectorID, 'description' : e.description, 'timestamp' : e.timestamp, 'icon': e.icon, 'dataSource' : e.dataSource}
            events.append(rep)

        self.eventList.insert_many(events)
        print("Uploaded : ", len(events))


    def parseFiles(self, filepath):   #parse files and create event representer objects
        parsed = []                   #list meant to hold EventRepresenters
        logs = os.listdir(filepath)
        for log in logs:
            print(log)
            if log not in self.ingestedFiles:
                self.ingestedFiles.append(log)
                report = pd.read_csv(filepath+"/"+log).values
                parsed = parsed + self.createEvents(report, (filepath+"/"+log))
        self.uploadIngested()
        return parsed
    
    def traverseFiles(self, directory):
        eventRepList = []
        errors = ""
        if not os.path.isdir(directory):
            errors = "Directory given does not exist or could not be found"
            raise Exception("Directory given does not exist or could not be found", directory)
        dates = os.listdir(directory)

        for folder in dates:
            copyDir = directory + "/" +folder
            for color in os.listdir(copyDir):
                colorDir = copyDir + "/" + color

                if color == "white":        #Only grabbing analyst logs
                    for initial in os.listdir(colorDir):
                        eventRepList = eventRepList + (self.parseFiles(colorDir+"/"+initial))

        return errors, eventRepList

            

        

