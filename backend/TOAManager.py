class TOAManager:
    def __init__(self):
        self.libary = "Icons"
    
    def setTOA(self, team):
        if team == 'Blue':
            return 'default_blue'
        elif team == 'White':
            return 'default_white'
        else:
            return 'default_red'
    