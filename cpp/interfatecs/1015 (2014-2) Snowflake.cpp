

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema C - Fractais

#include <iostream>
#include <cstdio>
#include <cmath>

using std::cin;
using std::cout;
using std::endl;

double koch (double s, int n, const double ROOTTHREEOVERFOUR)
{
    // para o nível 0, o polígono tem área 0.
    // para o nível 1, o polígono é um triângulo e tem área dada por s^2*sqrt(3)/4
    // para os níveis > 1, o polígono tem 3*4^(n-2) novos triângulos, cada qual com área
        // (s/3^(n-1))^2 * sqrt(3)/4
    double result = 0.0;

    if (n == 0)
        return 0;
    
    for (int i = 1; i <= n; i++)
    {
        if (i == 1)
            result += std::pow(s,2) * ROOTTHREEOVERFOUR;
        else
            result +=
                3 * std::pow(4, i - 2) * std::pow(( s / std::pow(3, i - 1) ), 2) * ROOTTHREEOVERFOUR;
    }
    return result;

    // Mais exatamente, a área é dada pela somatória de 3 * 4^(i-2) * (s/3^(i-1))^2 * sqrt(3) / 4, para i de -infinito a n
    // Nota-se que para os valores de i entre -infinito e 1, 3 * 4^(i-2) é igual à série 3 / 4^x, que converge para 1.
}

int main()
{
    const double ROOT_3_OVER_4 = std::sqrt(3) / 4;

    double s;
    int n;
    double result;

    cin >> s >> n;
    while (s > 0 || n > 0)
    {
        printf("%.8f\n", koch(s, n, ROOT_3_OVER_4));
        cin >> s >> n;
    }


    return 0;
}

