

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema B - Algoritmo de busca em profundidade

#include <iostream>
#include <deque>
#include <cstdio>

#define DEBUG 0

using namespace std;

void search(const int CoordX, const int CoordY, int sizeX, int sizeY, bool * quadro);

int main()
{
    int sizeX, sizeY;
    bool quadro[15 * 15];
    int count;

    // input
    while (cin >> sizeY >> sizeX)
    {
        for (int i = 0; i < sizeX; i++)
            for (int j = 0; j < sizeY; j++)
                cin >> quadro[i * 15 + j];
    
    count = 0;
    // processamento
    if (DEBUG)
    {
        for (int i = 0; i < sizeX; i++)
        {
            for (int j = 0; j < sizeY; j++)
                cout << quadro[i * 15 + j] << ' ';
            cout << endl;
        }
    }


    for (int i = 0; i < sizeX; i++)
        for (int j = 0; j < sizeY; j++)
            if (quadro[i * 15 + j])
            {
                search(i, j, sizeX, sizeY, quadro);
                count++;
                if(DEBUG)printf("DEBUG - deleted at position i=%d j=%d\r\n", i, j);
            }
    
    cout << count << endl;

    } // loop infinito

    return 0;
}

void search(const int CoordX, const int CoordY, int sizeX, int sizeY, bool * quadro)
{
    // Se pixel vazio, volta:
    if (quadro[CoordX * 15 + CoordY] == 0)
        return;

    // Pixel desaparece:
    quadro[CoordX * 15 + CoordY] ^= 1;  // toggle

    // Recursividade: chama-se para cada lado
    if (CoordX >= 1)
        search(CoordX - 1, CoordY, sizeX, sizeY, quadro);
    if (CoordX <= sizeX - 2)
        search(CoordX + 1, CoordY, sizeX, sizeY, quadro);
    if (CoordY >= 1)
        search(CoordX, CoordY - 1, sizeX, sizeY, quadro);
    if (CoordY <= sizeY - 2)
        search(CoordX, CoordY + 1, sizeX, sizeY, quadro);

    return;
}

