from typing import List


def readLines(file: str) -> list[str]:
    content = open(file).readlines()
    return [str(x.strip('\n')) for x in content]


inputLines = readLines("input")
outputLines = readLines("output")

if len(inputLines) != len(outputLines):
    print("Error: input and output lengths do not match.")
    exit()

producesLines = "TODO"

combinedResult = list(zip(outputLines, producedLines))

hasErrors = False
for pair in combinedResult:
    if pair[1] is None:
        print("Error: Result could not be found!")
        hasErrors = true
    elif pair[0] != pair[1]:
        print("Error:")
        print(f"Expected value: {pair[0]}")
        print(f"Actual value: {pair[1]}")
        print("")
        hasErrors = True

if not hasErrors:
    print("Success!\n")

