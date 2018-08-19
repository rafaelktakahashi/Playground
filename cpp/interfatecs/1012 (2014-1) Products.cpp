

#include <iostream>
using namespace std;

int main()
{
	// Create arrays of maximum size
	int QuantityPerMonth[12][20];
	int ValuesPerProduct[20][2];
	int Product[12][2];
	int N, P, M, C, L;
	int caseNumber = 1;

	// Inserting values
	cin >> N;
	while (N-- > 0)
	{
		cin >> P >> M;

		// Reading first matrix
		for (int i = 0; i < M; i++)
		{
			for (int j = 0; j < P; j++)
			{
				cin >> QuantityPerMonth[i][j];
			}
		}
		// Reading second matrix
		for (int i = 0; i < P; i++)
		{
			for (int j = 0; j < 2; j++)
			{
				cin >> ValuesPerProduct[i][j];
			}
		}

		// Calculate matrix product
		for (int i = 0; i < M; i++)
		{
			for (int j = 0; j < 2; j++)
			{
				// Initialize
				Product[i][j] = 0;
				// Calculate
				for (int k = 0; k < P; k++)
					Product[i][j] += (QuantityPerMonth[i][k] * ValuesPerProduct[k][j]);
			}
		}


		printf("Case %d:\n", caseNumber);
		for (int i = 0; i < M; i++)
		{
			printf("%d %d\n", Product[i][0], Product[i][1]);
		}


		caseNumber++;
	} // end of file
	
	return 0;
}

