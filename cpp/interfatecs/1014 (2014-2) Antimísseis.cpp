

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema B - Geometria

#include <iostream>     // cin, cout
#include <cstdio>       // printf
#include <cmath>        // std::sqrt
#include <vector>		// std::vector
#include <algorithm>	// std::sort, std::stable_sort

#define DEBUG 1

using std::cin;
using std::cout;
using std::endl;

// coordinate holds x and y, can operate on them
struct Coord{
	int X, Y;
	inline void operator=(const Coord& rhs){
		this->X = rhs.X;
		this->Y = rhs.Y;
		return;
	}
	Coord(){}
	Coord(int x, int y){X = x; Y = y;}
};
inline bool operator==(const Coord& lhs, const Coord& rhs){
	return (lhs.X == rhs.X && lhs.Y == rhs.Y);
}
inline bool operator!=(const Coord& lhs, const Coord& rhs){
	return (lhs.X != rhs.X || lhs.Y != rhs.Y);
}

// distance between two coordinates
double distanceBetweenCoords(const Coord a, const Coord b)
{
	int DeltaX = a.X - b.X;
	int DeltaY = a.Y - b.Y;
	DeltaX *= DeltaX;
	DeltaY *= DeltaY;
	return std::sqrt((double)(DeltaX + DeltaY));
}

// struct for a missile
struct Missile{
	char name;		// B, C, D, E...
	Coord position;
	double distanceToRadar;
	Missile(){}
	Missile(Coord position, char name, double distance){
		this->position = position;
		this->name = name;
		this->distanceToRadar = distance;
	}
};
// ability to sort missiles:
inline bool operator<(const Missile& lhs, const Missile& rhs){
	return (lhs.distanceToRadar < rhs.distanceToRadar);
}

// class for radar and missiles
class RadarSystem
{
public:
	std::vector<Missile> missiles;
	Coord radarPosition;
	int radarRange;

	// method for inserting a missile with its range
	// assumes radar exists
	void insertMissile(Coord missilePosition, char name)
	{
		double distance = distanceBetweenCoords(missilePosition, radarPosition);
		missiles.push_back(Missile(missilePosition, name, distance));

		return;
	}

	// method for sorting all missiles according to their distance
	void sort()
	{
		std::stable_sort(missiles.begin(), missiles.end());	// operator< is defined for a Missile
		return;
	}

	// method for clearing everything
	void clear()
	{
		missiles.clear();
	}

	// method for checking if there's at least one missile in range
	// assumes sorted
	bool isThereAtLeastOneMissileInRange()
	{
		if (missiles[0].distanceToRadar <= radarRange) return true;
		else return false;
	}

	// method for printing all missiles in order of closest to fathest away, but only within range
	// assumes sorted
	void print()
	{
		if (!isThereAtLeastOneMissileInRange())
		{
			// if there's nothing
			cout << "OUT OF RANGE" << endl;
			return;
		}

		bool oneTimeMuffler = true;		// there's a space before each output, except the first
		for (std::vector<Missile>::iterator it = missiles.begin(); it != missiles.end(); it++)
		{
			// if this missile is outside of range, then stop printing:
			if (it->distanceToRadar > radarRange)
			{
				cout << endl;
				return;
			}

			if (oneTimeMuffler)
			{
				// muffle the space
				oneTimeMuffler = false;
			}
			else cout << ' ';

			// print name
			cout << it->name;
		}
		// finished printing
		cout << endl;
		return;
	}
};





int main()
{
	// need a radar, a radar range, a missile, and a RadarSystem for containing all that
	Coord radarPosition;
	int radarRange;
	int nMissiles;
	char nameBuffer;
	Coord missileBuffer;
	RadarSystem radarSystem;
	// plus the number of test cases
	int nTestCases;

	// input
	cin >> nTestCases;
	for (int testCases = 0; testCases < nTestCases; testCases++)
	{
		// read radar and range
		cin >> radarPosition.X >> radarPosition.Y >> radarRange;
		// input information into RadarSystem
		radarSystem.radarPosition = radarPosition;		// assignment is defined for Coord
		radarSystem.radarRange = radarRange;

		// read into a missile
		cin >> nMissiles;
		nameBuffer = 'B';			// first missile is named B
		for (int i = 0; i < nMissiles; i++)
		{
			cin >> missileBuffer.X;
			cin >> missileBuffer.Y;
			radarSystem.insertMissile(missileBuffer, nameBuffer);	// not the Missile constructor
			nameBuffer++;			// B -> C -> D...
		}

		// everything has been inserted into radarSystem, sort and print them:
		radarSystem.sort();
		radarSystem.print();
		radarSystem.clear();


	} // next case



	return 0;
}

