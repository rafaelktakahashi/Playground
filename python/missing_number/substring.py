"""From StackOverflow user Mathias Ettinger"""


def substring_indexes(substring, string):
    """Generate indices of where substring beings in string"""

    # Begin at -1 so the next position to search from is 0
    last_found = -1

    while True:
        last_found = string.find(substring, last_found + 1)
        if last_found == -1:
            break   # all occurrences have been found
        yield last_found
