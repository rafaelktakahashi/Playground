from typing import List


# This function returns the string "Yes" if the list can be balaced,
# and returns the string "No" if it cannot.
def canBalance(input: List[int]) -> String:

    def transformToTorque(list: List[int], pivot: int) -> List[int]:
        """takes a list and a pivot, and returns the torque
        for each element."""

        # Loop through the list, multiply each element
        # by its distance to the pivot
        # (pivot is at 0 distance to the pivot)
        result = []
        for x in range(0, size(list)):
            distance = abs(pivot - x)
            result.append(distance * list[x])
        return result

    """Main implementation."""
    # Each element in the list is a candidate to be the pivot
    # First naïve implementation: a simple for loop
    for x in range(0, size(input) - 1):
        # pivot is the same as x
        pivot = x
        # transform the list to torque
        torqued = transformToTorque(input, pivot)
        # weight to the left of pivot
        # must the equal to the weight to the right
        leftList = torqued[:pivot]
        rightList = torqued[pivot + 1:]
        if sum(leftList) == sum(rightList):
            return "Yes"

    # If no option was valid, then it is not possible:
    return "No"
