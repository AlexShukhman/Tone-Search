#!/user/bin/env python3
'''

Tone-Search CLI Main

Notes:

* This is intended to run using PYTHON3, please only write py3 compatible code
    or your changes will not be accepted.
* Please be sure to obey the 80 character per line limit.
* Please be sure to comment your code using Sphinx commenting style
    https://pythonhosted.org/an_example_pypi_project/sphinx.html
* Please use a flake8 linter

Format:

Imports         -- packages used in this file
    Local       -- In py_lib directory
    Imported    -- If package not available as standard or via pip, download
                    the source and add it to the utils directory

Helpers         -- Where all the code should be

Main            -- Main class and runner

'''

# --- Imports ---
# Local
from .utils.call_node import CallNode

# Imported


# --- Helpers ---


# --- Main ---
class Main:
    def init(self):
        # Instantiate subprocess
        self.callNode = CallNode('../functions')
        