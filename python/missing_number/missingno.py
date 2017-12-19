import substring


def __estimateLastValue(length: int) -> int:
    """Estimates the largest value of n
    from the length of the lequence."""

    # running estimate for n, starting at 0
    estimatedN = 0

    # running estimate for the length,
    # starting at 1 because of the starting n '0'.
    estimatedLength = 1

    # the original length is at least the received length + 1,
    # since a number of at least length 1 was removed.
    while estimatedLength < length + 1:
        # update the estimate:
        estimatedLength += len(str(estimatedN))
        estimatedN += 1
    return estimatedN


def __findMissing(sequence: str, number: int, missingno: int) -> int:
    """
    Search for the specified number in the sequence, and for each
    occurrence, remove that occurrence and call it again. Assuming
    that the number is not present is always a possibility, but
    only once.
    """

    # Stop condition 1: if the number reached -1
    # and the string is not empty: failure
    if number == -1 and len(sequence) > 0:
        return None
    # Also valid if there are any characters at all
    if number == -1 and not sequence.isspace():
        return None

    # Stop condition 2: string is empty
    if sequence == "" or sequence.isspace():
        # criteria for success:
        # 1. all numbers have been evaluated (number is now -1)
        # 2. there is a number in the accumulator
        if number == -1 and missingno is not None:
            return missingno    # Found the answer!
        else:
            # either we ran out of string before evaluating zero,
            # or we got to the end without missing a single number.
            return None

    # look for and remove each occurrence of this number in the sequence,
    # then call this function again using the new string and the next
    # number (which is one less than this one)
    for occurrence in substring.substring_indexes(str(number), sequence):
        # remove the occurrence
        left = sequence[:occurrence]
        right = sequence[occurrence + len(str(number)):]

        # recursive call 1:
        possibleAnswer = __findMissing(
            left + " " + right,
            number - 1,
            missingno)
        if possibleAnswer is not None:
            # bubble up the answer if one was found
            return possibleAnswer
    # the previous loop might not run once. That's okay.

    # make the assumption that this is the missing number
    if missingno is None:

        # recursive call 2:
        possibleAnswer = __findMissing(sequence, number - 1, number)
        if possibleAnswer is not None:
            return possibleAnswer

    # this is reached at the very end, if everything failed to return a value.
    return None


def find(sequence: str) -> int:
    """Finds the missing integer in the sequence,
    if such a number exists. If no solution is
    found, then None is returned."""

    # first, estimate the last n, so that we may begin from it.
    lastN = __estimateLastValue(len(sequence))

    print(f"String of size {len(sequence)} - estimated last n: {lastN}")

    # recurse (and try a few times)
    result = __findMissing(sequence, lastN, None)
    if result is None:
        print("Failure... attempting estimate + 1.")
        result = __findMissing(sequence, lastN + 1, None)
    if result is None:
        print("Failure... attempting estimate - 1.")
        result = __findMissing(sequence, lastN - 1, None)
    if result is None:
        print("Failure... attempting estimate + 2.")
        result = __findMissing(sequence, lastN + 2, None)
    if result is None:
        print("Failure... attempting estimate - 2.")
        result = __findMissing(sequence, lastN - 2, None)
    if result is None:
        print("Failure... attempting estimate + 3.")
        result = __findMissing(sequence, lastN + 3, None)

    print(f"Completed string of size {len(sequence)}; result: {result}\n")
    return result
