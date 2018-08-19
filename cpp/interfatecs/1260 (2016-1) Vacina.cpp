

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

#include <iostream>
#include <string>
#include <cstdio>
#include <vector>
#include <algorithm>

#define DEBUG 0

using std::cin;
using std::cout;
using std::endl;

struct StringStruct
{
	std::string value;
};

bool findInThree(std::string what, std::string a, std::string b, std::string c)
{
	bool result = true;
	if (a.find(what) == std::string::npos)
		result = false;
	if (b.find(what) == std::string::npos)
		result = false;
	if (c.find(what) == std::string::npos)
		result = false;

	if (DEBUG) printf((result ? "match found!\n" : "match not found.\n"));
	return result;
}

int main()
{
	std::string first;
	std::string second;
	std::string third;

	bool bWork;

	std::vector<std::string> alreadyGone;

	std::string sub;

	int sizeSub;
	int output = 0;

	std::getline(cin, first);
	std::getline(cin, second);
	std::getline(cin, third);
	cin >> sizeSub;

	// create every possible substring of size sizeSub
	if (sizeSub > first.length()) {cout << 0 << endl; return 0;}

	for (int i = 0; i + sizeSub <= first.length(); i++)
	{

		sub = first.substr(i, sizeSub);
		if (DEBUG) printf("testing substring %s\n", sub.c_str());


		// first test if string has already been seen:
		if ( std::find(alreadyGone.begin(), alreadyGone.end(), sub) != alreadyGone.end() )
		{
			// sub exists in alreadyGone
			if (DEBUG) printf("substring has already been seen.\n");
			continue;
		}
		else
		{
			// now it has been seen
			alreadyGone.push_back(sub);
		}

		if (findInThree(sub, first, second, third))
			output++;
	}

	cout << output << endl;

	return 0;
}

