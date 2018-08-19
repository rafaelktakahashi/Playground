

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes
// Mal optimizado

// Problema A - Padrão EAN-13 e checksum

#include <iostream>
#include <cstdio>
#include <cstring>
#define DEBUG 0

using std::cout;
using std::cin;
using std::endl;

// Retorna char decimal com paridade em bParity
int Left2Decimal(char * Character, bool * bParity);

// Também serve para o dígito checksum
int Right2Decimal(char * Character);

int GetFirst(bool arrayParities[]);

int main()
{
    char bInputBuffer;      // bit
    char cLeft[6][8];       // seis strings de 7 chars cada + null
    char cRight[5][8];      // cinco strings de 7 chars cada + null
    char cCheckSum[8];      // uma string de 7 chars + null

    bool bParities[6];     // paridades dos 6 dígitos à esquerda da guarda central
    int nLeftmostDecimal;  // primeiro dígito
    int nLeftDecimal[6];   // 6 dígitos à esquerda da guarda central
    int nRightDecimal[5];  // 5 dígitos à direita da guarda central
    int nCheckSumDecimal;  // último dígito
    int nCalcCheckSum;

    // input
    while (cin >> bInputBuffer)
    {
        cin >> bInputBuffer >> bInputBuffer;        // absorver a guarda esquerda

        for (int i = 0; i < 6; i++)
        {
            cLeft[i][7] = '\0';
            for (int j = 0; j < 7; j++)
            {
                // Ler dígito (7 bits) bit a bit
                cin >> bInputBuffer;
                cLeft[i][j] = bInputBuffer;
            } // próximo bit
        } // próximo dígito (7-bit)

        for (int i = 0; i < 5; i++)
            cin >> bInputBuffer;        // absorver a guarda central
        
        for (int i = 0; i < 5; i++)
        {
            cRight[i][7] = '\0';
            for (int j = 0; j < 7; j++)
            {
                // Ler dígito (7 bits) bit a bit
                cin >> bInputBuffer;
                cRight[i][j] = bInputBuffer;
            } // próximo bit
        } // próximo dígito (7bit)

        // ler checksum
        for (int j = 0; j < 7; j++)
        {
            cin >> bInputBuffer;
            cCheckSum[j] = bInputBuffer;
        }
        cCheckSum[7] = '\0';

        for (int i = 0; i < 3; i++)
            cin >> bInputBuffer;        // Absorver a guarda direita
        
        if (DEBUG)
        {
            cout << "MYSTERYCHAR" << endl;
            cout << "LEFTGUARD" << endl;
            for (int i = 0; i < 6; i++)
                cout << cLeft[i] << endl;
            cout << "GUARD" << endl;
            for (int i = 0; i < 5; i++)
                cout << cRight[i] << endl;
            cout << "RIGHTGUARD" << endl;
        }

        // processamento

        // extrair os dígitos à esquerda da guarda central
        for (int i = 0; i < 6; i++)
        {
            nLeftDecimal[i] = Left2Decimal(cLeft[i], &bParities[i]);
        }

        // extrair o primeiro dígito
        nLeftmostDecimal = GetFirst(bParities);

        // extrair os dígitos à direita da guarda central
        for (int i = 0; i < 5; i++)
        {
            nRightDecimal[i] = Right2Decimal(cRight[i]);
        }
        nCheckSumDecimal = Right2Decimal(cCheckSum);

        if(DEBUG)cout << nLeftmostDecimal << ' ';
        if(DEBUG)for (int i = 0; i < 6; i++)
            cout << nLeftDecimal[i];
        if(DEBUG)for (int i = 0; i < 6; i++)
            cout << '(' << bParities[i] << ')';
        if(DEBUG)for (int i = 0; i < 5; i++)
            cout << nRightDecimal[i];
        if(DEBUG)cout << ' ' << nCheckSumDecimal << endl;

        // calcular o dígito checksum
        nCalcCheckSum = 0;

        nCalcCheckSum += nLeftmostDecimal;
        nCalcCheckSum += nLeftDecimal[1];
        nCalcCheckSum += nLeftDecimal[3];
        nCalcCheckSum += nLeftDecimal[5];
        nCalcCheckSum += nRightDecimal[1];
        nCalcCheckSum += nRightDecimal[3];
        for (int i = 0; i < 3; i++)
        {
            nCalcCheckSum += nLeftDecimal[0];
            nCalcCheckSum += nLeftDecimal[2];
            nCalcCheckSum += nLeftDecimal[4];
            nCalcCheckSum += nRightDecimal[0];
            nCalcCheckSum += nRightDecimal[2];
            nCalcCheckSum += nRightDecimal[4];
        }
        nCalcCheckSum %= 10;
        nCalcCheckSum = 10 - nCalcCheckSum;
        nCalcCheckSum %= 10;

        if (nCalcCheckSum != nCheckSumDecimal)
        {
            printf("barcode incorreto: lido = %d esperado = %d\n", nCheckSumDecimal, nCalcCheckSum);
        }
        else
        {
            cout << nLeftmostDecimal << nLeftDecimal[0]
                << '-';
            for (int i = 1; i < 6; i++)
                cout << nLeftDecimal[i];
            cout << '-';
            for (int i = 0; i < 5; i++)
                cout << nRightDecimal[i];
            cout << '-' << nCheckSumDecimal << endl;
        }

    }

    return 0;
}

// Retorna decimal com paridade em bParity
int Left2Decimal(char * Character, bool * bParity)
{
    *bParity = true;
    if (!strcmp(Character, "0001101"))
        return 0;
    if (!strcmp(Character, "0011001"))
        return 1;
    if (!strcmp(Character, "0010011"))
        return 2;
    if (!strcmp(Character, "0111101"))
        return 3;
    if (!strcmp(Character, "0100011"))
        return 4;
    if (!strcmp(Character, "0110001"))
        return 5;
    if (!strcmp(Character, "0101111"))
        return 6;
    if (!strcmp(Character, "0111011"))
        return 7;
    if (!strcmp(Character, "0110111"))
        return 8;
    if (!strcmp(Character, "0001011"))
        return 9;

    
    *bParity = false;

    if (!strcmp(Character, "0100111"))
        return 0;
    if (!strcmp(Character, "0110011"))
        return 1;
    if (!strcmp(Character, "0011011"))
        return 2;
    if (!strcmp(Character, "0100001"))
        return 3;
    if (!strcmp(Character, "0011101"))
        return 4;
    if (!strcmp(Character, "0111001"))
        return 5;
    if (!strcmp(Character, "0000101"))
        return 6;
    if (!strcmp(Character, "0010001"))
        return 7;
    if (!strcmp(Character, "0001001"))
        return 8;
    if (!strcmp(Character, "0010111"))
        return 9;
    
    if(DEBUG)printf("Could not understand %s (left)", Character);
    return 100000;
}

// Também serve para o dígito checksum
int Right2Decimal(char * Character)
{
    if (!strcmp(Character, "1110010"))
        return 0;
    if (!strcmp(Character, "1100110"))
        return 1;
    if (!strcmp(Character, "1101100"))
        return 2;
    if (!strcmp(Character, "1000010"))
        return 3;
    if (!strcmp(Character, "1011100"))
        return 4;
    if (!strcmp(Character, "1001110"))
        return 5;
    if (!strcmp(Character, "1010000"))
        return 6;
    if (!strcmp(Character, "1000100"))
        return 7;
    if (!strcmp(Character, "1001000"))
        return 8;
    if (!strcmp(Character, "1110100"))
        return 9;
    
    if(DEBUG)printf("Could not understand %d (right)", Character);
    return 1000000;
}

int GetFirst(bool arrayParities[])
{
    char cArrayParities[7];
    for (int i = 0; i < 6; i++)
    {
        cArrayParities[i] =
            (arrayParities[i] ? '1' : '0');
    }
    cArrayParities[6] = '\0';

    if (!strcmp(cArrayParities, "111111"))
        return 0;
    if (!strcmp(cArrayParities, "110100"))
        return 1;
    if (!strcmp(cArrayParities, "110010"))
        return 2;
    if (!strcmp(cArrayParities, "110001"))
        return 3;
    if (!strcmp(cArrayParities, "101100"))
        return 4;
    if (!strcmp(cArrayParities, "100110"))
        return 5;
    if (!strcmp(cArrayParities, "100011"))
        return 6;
    if (!strcmp(cArrayParities, "101010"))
        return 7;
    if (!strcmp(cArrayParities, "101001"))
        return 8;
    if (!strcmp(cArrayParities, "100101"))
        return 9;

    if(DEBUG)printf("Could not understand parity %s", cArrayParities);
    return 1000000;
}

