

#include <iostream>
using namespace std;

int main()
{
	int N = 0;
	int P, Q, V, D;
	int nTotal = 0;

	cin >> N;
	for (int i = 0; i < N; i++)	// cada caso de teste
	{
		P = Q = V = D = nTotal = 0;
		cin >> P;
		for (int j = 0; j < P; j++)	// cada produto
		{
			cin >> Q >> V;
			nTotal += (Q * V);
		}
		cin >> D;
		if (nTotal > D)
			cout << "DINHEIRO INSUFICIENTE\n";
		else
			printf("%d\n", D - nTotal);

	}

	return 0;
}

