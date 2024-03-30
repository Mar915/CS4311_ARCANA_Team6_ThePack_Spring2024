import pymongo

class Database:
    def __init__(self):
        # If you have the local one setup, use the shorter URI. Otherwise, use the longer one
        # Keep in mind, the online (longer) one will result in varying response times from server
        # This depends on your connection speed is my guess (or MongoDB is greedy and throttles it lol)

        #self.uri = "mongodb+srv://stevecruz2014:sTYuxN9fUv5KF17m@team6arcana.wdmxzy3.mongodb.net/?retryWrites=true&w=majority"
        #self.uri = "mongodb://127.0.0.1:27017/"
        self.uri = "mongodb://127.0.0.1:27017/"
        self.db = pymongo.MongoClient(self.uri)['arcana']

    def getRef(self):
        return self.db