

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema G - Árvore de extensão mínima

// Usando o algoritmo de Prim

#include <iostream>     // cin, cout
#include <cstdio>       // printf
#include <cmath>        // sqrt
#include <vector>       // push_back-able arrays
#include <limits>       // for max value of double

using std::cin;
using std::cout;
using std::endl;

struct Coordinate
{
	int X, Y;
};

struct Node
{
	int index;
	Coordinate Coord;
	bool MSTset;
	double keyValue;
};

double distance_between_points(Coordinate a, Coordinate b);

double minimum_spanning_tree_length(int nPoints);


int main()
{
	int nRepetitions;
	int nPoints;

	cin >> nRepetitions;

	for (int i = 0; i < nRepetitions; i++)
	{
		cin >> nPoints;
		printf("%.4f\n", minimum_spanning_tree_length(nPoints));
	}
	return 0;
};

double distance_between_points(Coordinate a, Coordinate b)
{
	int DeltaX, DeltaY;
	DeltaX = a.X - b.X;
	DeltaX *= DeltaX;
	DeltaY = a.Y - b.Y;
	DeltaY *= DeltaY;
	return std::sqrt(DeltaX + DeltaY);
}

double minimum_spanning_tree_length(int nPoints)
{
	std::vector<Node> Points;
	int nWorkX, nWorkY;
	double dTotalLength = 0;
	bool flgRepeat = true;
	double dWork;
	Node BestPointYet;

	for (int i = 0; i < nPoints; i++)
	{
		// input into each point
		cin >> nWorkX >> nWorkY;
		Points.push_back(Node());
		Points[i].index = i;
		Points[i].Coord.X = nWorkX;
		Points[i].Coord.Y = nWorkY;
		Points[i].MSTset = false;
		Points[i].keyValue = std::numeric_limits<double>::max();
	}

	// Prim:
	
	// 1.Create MST set to keep track of nodes in MST
	// 2.Every has has a key value initialized to +infinity, except for first node
	Points[0].keyValue = 0;
	// 3.While there's a node not yet in MST:
	while (flgRepeat)
	{
		// 3.1.Pick vertex not in MST that has the lowest value
		BestPointYet.index = std::numeric_limits<int>::max();
		BestPointYet.keyValue = std::numeric_limits<double>::max();
		for (int i = 0; i < nPoints; i++)
		{
			if (Points[i].MSTset == true)	// already in MST
				continue;
			if (Points[i].keyValue < BestPointYet.keyValue)
			{
				BestPointYet.index = i; // (also equal to Points[i].index)
				BestPointYet.keyValue = Points[i].keyValue;
			}
		}
		// 3.2.Add that vertex to MST set
		Points[BestPointYet.index].MSTset = true;
		// Also, add its key value to the total length of MST
		dTotalLength += BestPointYet.keyValue;
		// 3.3.Every node adjacent to new node has its key value updated:
		// 3.3.1.Compare this node (node at BestNodeYet.index) to every of its connected nodes
		for (int j = 0; j < nPoints; j++)
		{
			// Skip nodes already in MST (that includes the node itself)
			if (Points[j].MSTset == true)
				continue;
			// If their distance if less than that node's key value, update it.
			dWork = distance_between_points(Points[BestPointYet.index].Coord, Points[j].Coord);
			if (dWork < Points[j].keyValue)
				Points[j].keyValue = dWork;
		}
		// Test for ending condition
		flgRepeat = false;
		for (int k = 0; k < nPoints; k++)
		{
			if (Points[k].MSTset == false)	// if there's a node not in the MST
				flgRepeat = true;			// needs to repeat
		}

	}


	return dTotalLength;
}

