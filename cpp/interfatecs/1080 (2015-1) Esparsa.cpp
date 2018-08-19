

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema E - Continhas de aritmética

#include <iostream>
#include <cstdio>

using namespace std;

int main()
{
    int Q;
    int P;
    int nonzero;
    int zero;

    cin >> Q;
    for (int i = 0; i < Q; i++)
    {
        // uma matriz de lado P tem P elementos iguais a 2.
        // também tem P-1 elementos iguais a -1 de cada lado, então são 2P-2.
        // com P^2 elementos totais, existem 3P-2 elementos não-zero e
            // P^2-(3P-2) elementos zero
        cin >> P;
        nonzero = 3 * P - 2;
        zero = P * P - nonzero;
        if (zero > nonzero)
            cout << "S ";
        else
            cout << "N ";
        cout << zero << endl;
    }

    return 0;
}

