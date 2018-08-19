

// Rafael Kenji Takahashi - FATEC Mogi das Cruzes

// Problema E - Processamento de strings

#include <iostream>     // cin, cout
#include <cstdio>       // printf
#include <cstring>      // strstr
#include <string>       // std::string

using std::cin;
using std::cout;
using std::endl;

bool FindAnywhereAnyhow(std::string what, std::string where);
std::string CaesarEverything(std::string what);

int main()
{
    std::string FindWhat;
    int FindHowMany;
    std::string FindWhere;
    bool Found;

    while (std::getline(std::cin, FindWhat))
    {
        cin >> FindHowMany;
        cin.ignore(1, '\n');

        Found = false;
        for (int i = 0; i < FindHowMany; i++)
        {
            std::getline(std::cin, FindWhere);
            if (FindAnywhereAnyhow(FindWhat, FindWhere))
                Found = true;
        }

        cout << (Found ? 'S' : 'N') << endl;
    }

    return 0;
}

bool FindAnywhereAnyhow(std::string what, std::string where)
{
    bool Return = false;
    where.append(where);
    for (int i = 0; i < 27; i ++)
    {
        if (where.find(what) != std::string::npos)
            Return = true;
        what = CaesarEverything(what);
    }
    return Return;
}

std::string CaesarEverything(std::string what)
{
    char cBuffer;
    for (int i = 0; i < what.length(); i++)
    {
        cBuffer = what[i];
        if (cBuffer == ' ') {}
        else if (cBuffer == 'Z') cBuffer = 'A';
        else {cBuffer++;}

        what.replace(i, 1, 1, cBuffer);
    }
    return what;
}

