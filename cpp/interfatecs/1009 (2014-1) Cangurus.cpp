

#include <iostream>
using namespace std;

int main()
{
	bool grid[4][4];

	short int xAxisNumeroDeCangurus[4];
	short int yAxisNumeroDeCangurus[4];
	bool PrecisaMoverCanguru = false;
	int OldX, OldY, NewX, NewY;

	int NumeroDoTeste;

	while (cin >> NumeroDoTeste)
	{
		// Inicializando os contadores de canguru...
		for (int i = 0; i < 4; i++)
		{
			xAxisNumeroDeCangurus[i] = 0;
			yAxisNumeroDeCangurus[i] = 0;
		}
		// Outras inicializações
		PrecisaMoverCanguru = false;
		OldX = OldY = NewX = NewY = 0;

		// Inserindo os cangurus...
		for (int i = 0; i < 4; i++)
		{
			for (int j = 0; j < 4; j++)
			{
				cin >> grid[i][j];
				if (grid[i][j])		// Se tem um canguru aqui
				{
					xAxisNumeroDeCangurus[j]++;
					yAxisNumeroDeCangurus[i]++;
				}
			}
		}

		// Validando cangurus...
		for (int i = 0; i < 4; i++)
		{
			if (xAxisNumeroDeCangurus[i] != 2
				|| yAxisNumeroDeCangurus[i] != 2)
				PrecisaMoverCanguru = true;
		}

		if (!PrecisaMoverCanguru)
			printf("Caso %d: CORRETO\n", NumeroDoTeste);

		else
		{	// Precisa mover

			for (int i = 0; i < 4; i++)
			{
				// Procurar x velho (3 cangurus) e x novo (1 canguru)
				if (xAxisNumeroDeCangurus[i] == 3)
					OldX = i + 1;
				if (xAxisNumeroDeCangurus[i] == 1)
					NewX = i + 1;
				// Procurar y velho (3 cangurus) e y novo (1 canguru)
				if (yAxisNumeroDeCangurus[i] == 3)
					OldY = i + 1;
				if (yAxisNumeroDeCangurus[i] == 1)
					NewY = i + 1;
			}
			
			printf("Caso %d: MOVER CANGURU DE (%d,%d) PARA (%d,%d)\n", NumeroDoTeste, OldY, OldX, NewY, NewX);
		}
	}


	return 0;
}

