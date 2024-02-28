
class EventRepresenter:
    def __init__(self, initials ="", team ="", sourceHost = "", targetHostList = "", location = "", posture = "", vectorID = "", description = "", timestamp = ""):
        self.initials = initials
        self.team = team
        self.sourceHost = sourceHost
        self.targetHostList = targetHostList
        self.location = location
        self.posture = posture
        self.vectorID = vectorID
        self.description = description
        self.timestamp = timestamp
        self.malformed = False
    
    def isMalformed(self):
        self.isMalformed = True