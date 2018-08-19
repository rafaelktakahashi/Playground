

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema F - Aritmética

#include <iostream>

using std::cout;
using std::cin;
using std::endl;

int main()
{
    int in, out;
    cin >> in;
    while (in){
        cout << in * (in + 1) / 2 << endl;
        cin >> in;
    }

    return 0;
}

