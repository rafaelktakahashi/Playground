

def modpow(base: int, exp: int, mod: int) -> int:
    """Function for modular exponentiation.
    This is not very interesting because Python
    has built-in modpow as an overload of pow()"""
    result = 1
    while exp > 1:
        result *= base
        exp -= 1
        while result > mod:
            result -= mod
