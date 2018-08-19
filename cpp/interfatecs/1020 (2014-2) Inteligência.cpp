

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// uCoder 1020 - Inteligência Artificial em Jogos

#include <iostream>
#include <cstdio>
#include <cmath>
#include <queue>

#define DEBUG 0

using std::cin;
using std::cout;
using std::endl;

double distanceBetweenPoints(int aX, int aY, int bX, int bY)
{
	double answer;
	aX -= bX;
	aY -= bY;	// they're deltas now

	aX *= aX;
	aY *= aY;	// they're squares now

	answer = std::sqrt((double)(aX + aY));	// square of their sums

	if (DEBUG) printf("distance formula called and returned %.3f.\n", answer);
	return answer;
}

struct Square
{
	int X;					// first dimension is always j
	int Y;					// second dimension is always i
	char value;
	bool visited;			// for searching
};

class Level
{
private:
	// Method that takes a coordinate, and does a DFS avoiding X's (and visited squares) looking for a colon (:)
	bool searchForX(int enemyX, int enemyY);

	// Method that returns a pointer to square in a certain direction, if such square exists. Returns null pointer otherwise.

	Square * getNeighbor(int currentX, int currentY, char direction)	// X grows eastward, Y grows northward
	{
		if (direction == 'W')
		{
			if (currentX == 0) return NULL;
			return &field[currentX - 1][currentY];	// go west
		}
		if (direction == 'E')
		{
			if (currentX == width- 1) return NULL;
			return &field[currentX + 1][currentY];	// go east
		}
		if (direction == 'N')
		{
			if (currentY == height - 1) return NULL;
			return &field[currentX][currentY + 1];	// go north
		}
		if (direction == 'S')
		{
			if (currentY == 0) return NULL;
			return &field[currentX][currentY - 1];	// go south
		}
		else if (DEBUG) printf("disaster! getNeighbor does not know which direction to look!\n");
		return NULL;
	}

public:
	int height;
	int width;
	int playerX;
	int playerY;
	Square field[50][50];	// 2d array of squares

	void input(int x, int y, char c)
	{
		field[x][y].X = x;
		field[x][y].Y = y;		// mostly for safety (because I don't initialize anything)
		field[x][y].value = c;
	}

	// a method that loops through all '*'s (really, all of them and checks if they're stars)
		// and if they're sufficiently close, calls the search method
	bool search(int range);

};

bool Level::searchForX(int enemyX, int enemyY)
{
	std::queue<Square*> myQueue;	// for searching
	Square * ptrSquare;


	// first, initialize the visited status of all relevant squares
	for (int i = 0; i < height; i++)
	{
		for (int j = 0; j < width; j++)
			field[j][i].visited = false;
	}

	// here, we do a search, and if we find any square with content colon (:), return true

	// add first
	myQueue.push(&field[enemyX][enemyY]);
	myQueue.front()->visited = true;

	while (myQueue.empty() == false)
	{

		// go through every direction
		ptrSquare = getNeighbor(myQueue.front()->X, myQueue.front()->Y, 'N');		// look
		if (ptrSquare != NULL)
		{
			if (ptrSquare->value == ':') return true;									// see if player was found
			if (ptrSquare->value != 'X' && ptrSquare->visited == false)						// if not wall
			{
				myQueue.push(ptrSquare);
				myQueue.front()->visited = true;
				if (DEBUG) printf("square at X=%d, Y=%d added to queue.\n", myQueue.front()->X, myQueue.front()->Y);
			}
		}
		ptrSquare = getNeighbor(myQueue.front()->X, myQueue.front()->Y, 'S');		// look
		if (ptrSquare != NULL)
		{
			if (ptrSquare->value == ':') return true;									// see if player was found
			if (ptrSquare->value != 'X' && ptrSquare->visited == false)						// if not wall
			{
				myQueue.push(ptrSquare);
				myQueue.front()->visited = true;
				if (DEBUG) printf("square at X=%d, Y=%d added to queue.\n", myQueue.front()->X, myQueue.front()->Y);
			}
		}
		ptrSquare = getNeighbor(myQueue.front()->X, myQueue.front()->Y, 'W');		// look
		if (ptrSquare != NULL)
		{
			if (ptrSquare->value == ':') return true;									// see if player was found
			if (ptrSquare->value != 'X' && ptrSquare->visited == false)						// if not wall
			{
				myQueue.push(ptrSquare);
				myQueue.front()->visited = true;
				if (DEBUG) printf("square at X=%d, Y=%d added to queue.\n", myQueue.front()->X, myQueue.front()->Y);
			}
		}
		ptrSquare = getNeighbor(myQueue.front()->X, myQueue.front()->Y, 'E');		// look
		if (ptrSquare != NULL)
		{
			if (ptrSquare->value == ':') return true;									// see if player was found
			if (ptrSquare->value != 'X' && ptrSquare->visited == false)						// if not wall
			{
				myQueue.push(ptrSquare);
				myQueue.front()->visited = true;
				if (DEBUG) printf("square at X=%d, Y=%d added to queue.\n", myQueue.front()->X, myQueue.front()->Y);
			}
		}


		myQueue.pop();

	}
	// did not find
	if (DEBUG) printf("enemy at X=%d, Y=%d did not find player.\n", enemyX, enemyY);
	return false;

}

bool Level::search(int range)
{
	// loop through everything
	for (int i = 0; i < height; i++)
	{
		for (int j = 0; j < width; j++)
		{
			// condition:
			if (field[j][i].value == '*' && distanceBetweenPoints(j, i, playerX, playerY) <= range)
			{
				if (DEBUG) printf("enemy at X=%d, Y=%d heard a shot!\n", j, i);
				if (searchForX(j, i)) return true;
			}
		}
	}

	return false;
}

// entry point
int main()
{
	int height;
	int width;
	int range;
	char cBigBuffer[100];	// didn't have to be this big
	char cBuffer;
	Level myLevel;

	while (cin >> height >> width)
	{
		myLevel.height = height;
		myLevel.width = width;

		cin.ignore(1, '\n');

		for (int i = 0; i < height; i++)
		{
			// gets an entire line:
			cin.getline(cBigBuffer, 100);
			for (int j = 0; j < width; j++)
			{
				// get each character in that line:
				cBuffer = cBigBuffer[j];

				if (cBuffer == ':')		// found the player!
				{
					myLevel.playerX = j;
					myLevel.playerY = i;
				}

				myLevel.input(j, i, cBuffer);	// X is horizontal
			}
		}

		cin >> range;
		// all input has been read

		// show it:
		if (DEBUG)
		{
			cout << endl;
			cout << "checking:" << endl;
			for (int i = 0; i < height; i++)
			{
				for (int j = 0; j < width; j++)
					cout << myLevel.field[j][i].value;
				cout << endl;
			}
			printf("player is at X=%d, Y=%d.\n", myLevel.playerX, myLevel.playerY);
			cout << endl;
		}

		// do the search:

		cout << (myLevel.search(range) ? 'S' : 'N') << endl;

	}

	return 0;
}

