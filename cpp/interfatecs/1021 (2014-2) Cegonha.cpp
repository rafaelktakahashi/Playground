

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema J - Matemática

#include <iostream>

using namespace std;

int main()
{
	int nGestantes;
	double dAltura;
	double dPesoAntes;
	double dPesoDepois;
	double dPesoGanho;
	double dIMC;
	double dLimiteInferiorkg;
	double dLimiteSuperiorkg;

	cin >> nGestantes;
	for (int i = 0; i < nGestantes; i++)
	{
		cin >> dAltura >> dPesoAntes >> dPesoDepois;

		dPesoGanho = dPesoDepois - dPesoAntes;
		dIMC = dPesoAntes / (dAltura * dAltura);

		// descobrir limite aceitável de aumento de peso
		if (dIMC < 18.5)
		{
			dLimiteInferiorkg = 12.5;
			dLimiteSuperiorkg = 18;
		}
		else if (dIMC < 25)
		{
			dLimiteInferiorkg = 11;
			dLimiteSuperiorkg = 16;
		}
		else if (dIMC < 30)
		{
			dLimiteInferiorkg = 7;
			dLimiteSuperiorkg = 11.5;
		}
		else
		{
			dLimiteInferiorkg = 5;
			dLimiteSuperiorkg = 9;
		}

		// avaliar aumento de peso
		if (dPesoGanho < dLimiteInferiorkg)
			cout << "GANHO INSUFICIENTE" << endl;
		else if (dPesoGanho <= dLimiteSuperiorkg)
			cout << "GANHO NORMAL" << endl;
		else
			cout << "GANHO EXAGERADO" << endl;
	}


	return 0;
}

