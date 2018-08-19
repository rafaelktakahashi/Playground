

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema H - Manipulação de matrizes
// É o jogo da vida de Conway, sem a regra da superpopulação

#include <iostream>
#include <cstdio>
#define DEBUG 0

using namespace std;

class Matriz
{
public:
	bool square[5][5];

	// insert a boolean value into a square
	void insert(int i, int j, bool value)
	{
		square[i][j] = value;
	}

	// return a pointer to a square, if such square exists
	bool * look (int i, int j, char direction)
	{
		if (direction == 'N')
		{
			if (i == 4) return NULL;
			return &square[i + 1][j];
		}
		if (direction == 'S')
		{
			if (i == 0) return NULL;
			return &square[i - 1][j];
		}
		if (direction == 'W')
		{
			if (j == 0) return NULL;
			return &square[i][j - 1];
		}
		if (direction == 'E')
		{
			if (j == 4) return NULL;
			return &square[i][j + 1];
		}
		else if (DEBUG) printf("Matriz::look does not know where to look.\n");
		return NULL;
	}

	// return state of this square after infection
	bool infectThis(int i, int j)
	{
		if (square[i][j] == true) return true;		// infect squares remain infected

		int nCount = 0;
		bool * ptrSquare;

		ptrSquare = look(i, j, 'N');
		if (ptrSquare != NULL)
			if (*ptrSquare == true)
				nCount++;

		ptrSquare = look(i, j, 'S');
		if (ptrSquare != NULL)
			if (*ptrSquare == true)
				nCount++;

		ptrSquare = look(i, j, 'W');
		if (ptrSquare != NULL)
			if (*ptrSquare == true)
				nCount++;

		ptrSquare = look(i, j, 'E');
		if (ptrSquare != NULL)
			if (*ptrSquare == true)
				nCount++;

		if (nCount >= 2) return true;			// 2 or more infected neighbors
		else return false;
	}

	// ability to compare two matrices:
	inline bool operator==(Matriz& rhs)
	{
		for (int i = 0; i < 5; i++)
		{
			for (int j = 0; j < 5; j++)
			{
				if (this->square[i][j] != rhs.square[i][j]) return false;
			}
		}
		return true;
	}

	// ability to copy any matrix into this
	inline void operator=(Matriz& rhs)
	{
		for (int i = 0; i < 5; i++)
		{
			for (int j = 0; j < 5; j++)
			{
				this->square[i][j] = rhs.square[i][j];
			}
		}
		return;
	}

};

int main()
{
	// two matrices:
	Matriz oldM, newM;
	bool bitBuffer;
	char lineBuffer[10];

	while (cin >> lineBuffer)
	{
		// insert first line
		for (int i = 0; i < 5; i++)
		{
			if (lineBuffer[i] == '1') bitBuffer = true;
			else bitBuffer = false;
			newM.insert(0, i, bitBuffer);
		}

		// insert other lines
		for (int i = 1; i < 5; i++)
		{
			cin >> lineBuffer;
			for (int j = 0; j < 5; j++)
			{
				if (lineBuffer[j] == '1') bitBuffer = true;
				else bitBuffer = false;
				newM.insert(i, j, bitBuffer);
			}
		}

		// show matrix
		if (DEBUG)
		{
			cout << endl;
			printf("showing matrix:\n");
			for (int i = 0; i < 5; i++)
			{
				for (int j = 0; j < 5; j++)
				{
					cout << newM.square[i][j];
				}
				cout << endl;
			}
			cout << endl;
		}

		// continue doing stuff
		// call infect method on everything, put new values into newM, repeat until they're the same
		do {
			// first, new matrix becomes old
			oldM = newM;

			// each new state in old matrix is put into new matrix
			for (int i = 0; i < 5; i++)
			{
				for (int j = 0; j < 5; j++)
				{
					newM.square[i][j] = oldM.infectThis(i, j);
				}
			}


			// show new matrix
			if (DEBUG)
			{
				cout << endl;
				printf("showing matrix:\n");
				for (int i = 0; i < 5; i++)
				{
					for (int j = 0; j < 5; j++)
					{
						cout << newM.square[i][j];
					}
					cout << endl;
				}
				cout << endl;
			}


		} while(!(oldM == newM));	// I didn't overload !=
		if (DEBUG) printf("escaped from infection loop.\n");


		// output:
		if (DEBUG)printf("showing matrix:\n");
		for (int i = 0; i < 5; i++)
		{
			for (int j = 0; j < 5; j++)
			{
				cout << newM.square[i][j];
			}
			cout << endl;
		}
	} // next case

	return 0;
}

