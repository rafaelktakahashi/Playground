

#include <iostream>
using namespace std;

int Fact(int nInput)
{
	if (nInput == 1 || nInput == 0) return 1;
	else return nInput * Fact(nInput - 1);
}

float Calculo(int nN)
{
	float Res = 0;
	float interm = 0;
	for (int i = 0; i <= nN; i++)
	{
		interm = 100000000 / Fact(i);
		interm /= 100000000;
		Res += interm;
	}
	return Res;
}

int main()
{
	int Input = 0;
	float Output = 0;
	
	
	cin >> Input;
	do
	{
		Output = Calculo(Input);
		printf("%.6f\n", Output);
		cin >> Input;
	} while (Input != -1);

	return 0;
}

