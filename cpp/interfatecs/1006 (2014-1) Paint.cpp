

#include <iostream>

using namespace std;


struct Pixel
{
	unsigned char Value;
	bool IsPainted;
	int xCoord;
	int yCoord;
	Pixel * NextPixel;		// for the list
};

class PixelList
{
public:
	Pixel * First;		// They will point to elements in Board[1000][1000]
	Pixel * Last;

	PixelList()
	{
		First = nullptr;
		Last = nullptr;
	}

	void AddElement(Pixel * NewPixel)
	{
		if (NewPixel == nullptr)		// Sometimes receives nullptr
			return;

		if (First == nullptr)	// if null pointer, empty list
		{
			NewPixel->NextPixel = nullptr;
			Last = First = NewPixel;
		}
		else
		{
			NewPixel->NextPixel = nullptr;
			Last->NextPixel = NewPixel;
			Last = Last->NextPixel;
		}
		
	}

	void ClearList()
	{
		First = Last = nullptr;
	}
};

Pixel * CheckPixel(int yCoord, int xCoord, Pixel **Board, unsigned char ComparisonValue, int* Counter)
{
	// Receives coords of a pixel, return a pointer to it.
	// If pixel is already painted, or its value is different, returns a null pointer.
	
	if (Board[yCoord][xCoord].IsPainted == false
		&& Board[yCoord][xCoord].Value == ComparisonValue)
	{
		*Counter = *Counter + 1;
		Board[yCoord][xCoord].IsPainted = true;
		return &Board[yCoord][xCoord];
	}
	
	else return nullptr;
}

int main()
{
	Pixel **Board = new Pixel*[1000];
	for (int i = 0; i < 1000; i++)
		Board[i] = new Pixel[1000];
	PixelList MainPixelList;
	PixelList NewPixelList;
	Pixel * CurrentPixel;		// This will be useful later
	int WorkInt;
	int C, L;
	int c, l;
	bool flgFinished;
	int Res;

	cin >> L >> C;

	while (L)
	{
		Res = 1;		// Starts at 1 because function for painting is not called for the first one

		// Fill board
		for (int i = 0; i < L; i++)
		{
			for (int j = 0; j < C; j++)
			{
				cin >> WorkInt;					// reads 0 to 255

				Board[i][j].Value = WorkInt;	// converts to unsigned char
				Board[i][j].xCoord = j;
				Board[i][j].yCoord = i;
				Board[i][j].IsPainted = false;
			}
		}

		// Get first element
		cin >> l >> c;
		l--;
		c--;

		// It is painted
		Board[l][c].IsPainted = true;
		// Put first element in new list
		NewPixelList.AddElement(&Board[l][c]);

		// LOOP
		flgFinished = false;
		while (!flgFinished)
		{

			// Transfer new pixel list to main pixel list
			MainPixelList.First = NewPixelList.First;
			MainPixelList.Last = NewPixelList.Last;

			// Clear new pixel list
			NewPixelList.ClearList();

			// For each element in MainPixelList, search unpainted pixels and add them to NewPixelList
			for (CurrentPixel = MainPixelList.First;
				CurrentPixel != nullptr;	// While not null pointer
				CurrentPixel = CurrentPixel->NextPixel)
			{
				// Up pixel
				if (CurrentPixel->yCoord != 0)	// if not first line
				{
					NewPixelList.AddElement(
						CheckPixel(CurrentPixel->yCoord - 1, CurrentPixel->xCoord, Board, CurrentPixel->Value, &Res));
				}
				// Down pixel
				if (CurrentPixel->yCoord != L - 1)	// if not last line
				{
					NewPixelList.AddElement(
						CheckPixel(CurrentPixel->yCoord + 1, CurrentPixel->xCoord, Board, CurrentPixel->Value, &Res));
				}
				// Left pixel
				if (CurrentPixel->xCoord != 0)	// if not first column
				{
					NewPixelList.AddElement(
						CheckPixel(CurrentPixel->yCoord, CurrentPixel->xCoord - 1, Board, CurrentPixel->Value, &Res));
				}
				// Right pixel
				if (CurrentPixel->xCoord != C - 1)	// if not last column
				{
					NewPixelList.AddElement(
						CheckPixel(CurrentPixel->yCoord, CurrentPixel->xCoord + 1, Board, CurrentPixel->Value, &Res));
				}

				// All freshly painted pixels are elements of NewPixelList
				
				
			}
			// If, by the end, no new pixels have been added, it's time to end:
			if (NewPixelList.First == nullptr)	// if null pointer
			{
				flgFinished = true;
			}

		} // end while

		cout << Res << endl;

		cin >> L >> C;
	};
	
	for (int i = 0; i < 1000; i++)
		delete[] Board[i];
	delete[] Board;

	return 0;
}

