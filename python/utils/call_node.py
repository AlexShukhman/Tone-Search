'''

Class for calling Node from the terminal

'''
# --- Imports ---
# Local

# Imported

# --- Main ---
class CallNode:
    def __init__(self, location="./"):
        # Subprocess entrance location
        self.location = location

    def runCommand(self, command, *args):
        return