

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema J - Programação para iniciantes

#include <iostream>     // cin e cout
#include <cstdio>       // printf

using namespace std;

int main()
{
    int mainDay, mainMonth;
    int currentDay, currentMonth;
    int Repeats;
    bool output;

    cin >> mainDay >> mainMonth;
    while (mainDay)
    {
        output = false;

        cin >> Repeats;
        for (int i = 0; i < Repeats; i++)
        {
            cin >> currentDay >> currentMonth;
            if (currentDay == mainDay && currentMonth == mainMonth)
                output = true;
        }

        cout << (output ? 'S' : 'N') << endl;

        cin >> mainDay >> mainMonth;
    }

    return 0;
}

