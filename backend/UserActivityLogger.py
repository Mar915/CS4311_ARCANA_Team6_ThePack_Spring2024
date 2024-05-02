from LocalDatabase import Database
from datetime import datetime

class UserActivityLogger:

    def __init__(self):
        self.db = Database().getRef()
        self.userActivityLogList = self.db['userActivityLogList']

    def addToUserLogs(self, initials, statement):
        # when the function gets called the timestamp produced
        timestamp = datetime.now().isoformat()

        userLog = {
            "initials": initials,
            "timestamp": timestamp,
            "statement": statement
        }
        self.userActivityLogList.insert_one(userLog)

    def getLogList(self):
        # .find({}, {'_id': 0}) excludes the objects ID from being added to the list
        logs = self.userActivityLogList.find({}, {'_id': 0})
        logList = list(logs)
        return logList
    
