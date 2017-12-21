from typing import List


def canBalance(input: List[int]) -> bool:
    """Main implementation."""
    


    def transformToTorque(list: List[int], pivot: int) -> List[int]:
        """takes a list and a pivot, and returns the torque
        for each element."""
        return [list[i] * (pivot - i) for i in range(1, len(list))]
