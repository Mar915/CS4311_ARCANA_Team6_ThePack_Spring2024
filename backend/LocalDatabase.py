import pymongo

class Database:
    def __init__(self):
        #self.uri = "mongodb+srv://stevecruz2014:sTYuxN9fUv5KF17m@team6arcana.wdmxzy3.mongodb.net/?retryWrites=true&w=majority"
        self.uri = "mongodb://127.0.0.1:27017/"
        self.db = pymongo.MongoClient(self.uri)['arcana']

    def getRef(self):
        return self.db