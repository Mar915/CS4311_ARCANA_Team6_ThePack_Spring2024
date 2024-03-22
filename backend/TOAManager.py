class TOAManager:
    def __init__(self):
        self.libary = "Some File path we don't have yet"
    
    def setTOA(self, team):
        if team == 'blue':
            return 'blueDefault.png', 'blueDefault'
        elif team == 'white':
            return 'whiteDefault.png', 'whiteDefault'
        else:
            return 'redDefault.png', 'redDefault'
    