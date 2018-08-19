

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
#include <cmath>

#define DEBUG 0

using std::cin;
using std::cout;
using std::endl;

bool isPrime(int p)
{
	double root = std::sqrt(p);
	for (int i = 2; i < root; i++)
	{
		if (p % i == 0)
			return false;
	}
	return true;
}

// a struct to hold right-truncatable primes of a certain length
struct Truncatables
{
	std::vector<int> valuesVector;
};

int main()
{
	Truncatables truncatables[9];	// nine of them
	int nCandidate;
	int nDesiredLength;

	// manually insert into first one:
	truncatables[0].valuesVector.push_back(2);
	truncatables[0].valuesVector.push_back(3);
	truncatables[0].valuesVector.push_back(5);
	truncatables[0].valuesVector.push_back(7);

	if (DEBUG)
	{
		for (std::vector<int>::iterator it = truncatables[0].valuesVector.begin(); it != truncatables[0].valuesVector.end(); it++)
			cout << "debug: length 1: " << *it << endl;
	}

	for (int i = 1; i < 9; i++)
	{
		if (DEBUG) cout << "about to test length " << i + 1 << endl;
		// go through each prime in previous list, append a 1, 3, 7, or 9 and test the new number:
		for (std::vector<int>::iterator it = truncatables[i - 1].valuesVector.begin(); it != truncatables[i - 1].valuesVector.end(); it++)
		{
			nCandidate = *it * 10 + 1;
			if (isPrime(nCandidate)) truncatables[i].valuesVector.push_back(nCandidate);
			nCandidate = *it * 10 + 3;
			if (isPrime(nCandidate)) truncatables[i].valuesVector.push_back(nCandidate);
			nCandidate = *it * 10 + 7;
			if (isPrime(nCandidate)) truncatables[i].valuesVector.push_back(nCandidate);
			nCandidate = *it * 10 + 9;
			if (isPrime(nCandidate)) truncatables[i].valuesVector.push_back(nCandidate);
		}
		if (DEBUG) cout << "tested length " << i + 1 << endl;
	}

	cin >> nDesiredLength;
	for (std::vector<int>::iterator it = truncatables[nDesiredLength - 1].valuesVector.begin(); it != truncatables[nDesiredLength - 1].valuesVector.end(); it++)
	{
		cout << *it << endl;
	}

	return 0;
}

