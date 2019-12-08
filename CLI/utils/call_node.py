"""

Class for calling Node from the terminal

"""
# --- Imports ---
# Local

# Imported
from subprocess import call

# --- Main ---
class CallNode:
    def __init__(self, location="./"):
        # Subprocess entrance location
        self.location = location

    def runCommand(self, command, *args):
        _args = ", ".join(args)
        command = f'node -e "require({self.location}/lib/modules).{command}({_args})"'
