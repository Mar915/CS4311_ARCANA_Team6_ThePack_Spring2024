from TOAManager import TOAManager

class EventRepresenter:
    def __init__(self,id = "",  initials ="", team ="", sourceHost = "", targetHostList = "", location = "", posture = "", vectorID = "", description = "", timestamp = "", dataSource = ""):
        self.eventID = id
        self.initials = initials
        self.team = team
        self.sourceHost = sourceHost
        self.targetHostList = targetHostList
        self.location = location
        self.posture = posture
        self.vectorID = vectorID
        self.description = description
        self.timestamp = timestamp
        self.isMalformed = self.checkMalformed()
        self.dataSource = dataSource
        self.icon, self.actionTitle = TOAManager().setTOA(self.team)
        


    # Returns a list of the attributes
    def attrToList(self):

        temp = []

        for attr in range(self.__sizeof__()):

            temp.append(attr)

        return temp

    def checkMalformed(self):
        attributes = [self.initials, self.team, self.sourceHost, self.targetHostList, self.location, self.vectorID]
        attributes = attributes + [self.description, self.timestamp]
        for a in attributes:
            if a == "nan" or a == 'NaN':
                return True
        
        return False
    
