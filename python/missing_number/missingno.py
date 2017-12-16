"""missingno will find the missing number in a non-delimited sequence."""
from typing import List
import itertools


def __lengthOfNumber(number: int) -> int:
    """Calculates the length of the decimal expansion of a number
    by calculating the floor logarithm (base 10) and adding 1 to it."""
    result = 1
    while number >= 10:
        result += 1
        number /= 10
    return result


def __estimateLargestValue(seqSize: int) -> int:
    """Estimates n from the length of the concatenated sequence
    of decimal expansions of numbers from 0 to n."""
    if seqSize < 10000:
        return __estimateLargestValueSmall(seqSize)
    else:
        # TODO: The current inputs will never be that large, but
        # if this code is used for larger use cases, another
        # method will need to be implemented.
        raise ValueError("This value is not supported yet.")


def __estimateLargestValueSmall(seqSize: int) -> int:
    """Algorithm for __estimateLargestValue when input is small.
    Finds the result through brute force."""
    # Algorithm for __estimateLargestValue when input is small
    # calculates through brute force

    # n
    currentNumber = 0
    # length of n
    currentLength = 0
    while currentLength < seqSize:
        currentLength += __lengthOfNumber(currentNumber)
        currentNumber += 1
    return currentNumber


def __testWithSize(sequence: str, guessedSize: int) -> int:
    """Test all sequences of a certain size
    looking for the correct answer"""

    # Choose points in the sequence, then use them as delimiters
    # for breaking the sequence into fragments.

    # Choose elements to begin each fragment. The first should
    # always be chosen, so we take it out when choosing,
    # and choose one item less.

    enumSeq = list(enumerate(sequence))
    splitPointsList = itertools.combinations(enumSeq[1:], guessedSize - 1)
    for ls in splitPointsList:
        ls = sorted(ls)

    # Work on each combination
    for p in splitPointsList:
        # add the first element back
        p.insert(0, enumSeq[0])
        # Make a candidate from the split points
        candidate = []
        for i in range(0, len(p - 1)):
            firstChar = p[i][0]
            lastChar = p[i + 1][0]
            fragment = sequence[firstChar:lastChar]
            candidate.append(int(fragment))
        # This would leave out the last fragment; put it in:
        firstChar = p[len(p)]
        candidate.append(int(fragment[firstChar:]))

        # Debug
        print(candidate)

        # Test the candidate
        possibleResult = __testCandidate(candidate)
        if possibleResult is not None:
            return possibleResult

    # If nothing could be found:
    return None


def __testCandidate(candidate: List[int]) -> int:
    """Looks for the missing number; returns it if
    one missing number exists, otherwise returns None."""
    # Preprocess the candidate:
    # eliminate it if any number is larger than it could
    # possibly be
    for it in candidate:
        if it > len(candidate):
            return None

    # Look for each number in the sequence. Each
    # counting number must appear exactly once, with
    # one error permitted.
    missingNumber = None
    for i in range(0, len(candidate)):
        count = candidate.count(i)
        if count == 0:
            if missingNumber is not None:
                return None
            else:
                missingNumber = i
        elif count > 1:
            return None

    return missingNumber


def find(sequence: str) -> int:
    """Method for solving the main problem.
    Returns the missing number as an integer."""

    # Estimate how many integers are part of this sequence.
    # This is also an estimate of the largest value
    lengthEstimate = __estimateLargestValue(len(sequence))

    # Attempt the solution with many lengths, starting
    # from the estimated value
    counter = itertools.count()

    # limit for safety
    limit = 500
    while limit > 0:
        limit -= 1
        offset = counter.__next__()
        # try with positive offset
        possibleResult = __testWithSize(sequence, lengthEstimate + offset)
        if possibleResult is not None:
            return possibleResult
        # then try with negative offset
        if lengthEstimate - offset > 0:      # do not repeat for 0
            possibleResult = \
                __testWithSize(sequence, lengthEstimate - offset)
            if possibleResult is not None:
                return possibleResult

    return None
