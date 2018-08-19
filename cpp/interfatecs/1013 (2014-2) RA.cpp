

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema A - processamento de strings

#include <iostream>
#include <cstdio>
#include <cstring>
#include <vector>
#include <map>
#define DEBUG 0

using std::cin;
using std::cout;
using std::endl;

int main()
{
	// Formato do RA antigo: CCAASNNN
	// C - sigla do curso
	// A - ano de ingresso
	// S - semestre de ingresso (1, 2)
	// N - número do aluno

	// Formato do RA novo: FFF CCC AA S T NNN
	// F - código da FATEC
	// C - código do curso
	// A - ano de ingresso
	// S - semestre de ingresso (1, 2)
	// T - turno (1, 2, 3)
	// N - número do aluno

	std::string antigoRA;
	std::string antigoSigla;
	std::string antigoAno;
	std::string antigoSemestre;
	std::string antigoNumero;

	std::string novoRA;
	std::string novoCurso;
	std::string novoTurno;

	std::map<char, std::string> mapCurso;
	std::map<char, std::string> mapTurno;

	int nTestes;


	mapCurso['A'] = "048";
	mapCurso['S'] = "061";
	mapCurso['L'] = "074";
	mapCurso['P'] = "099";
	mapCurso['O'] = "100";

	mapTurno['D'] = "1";
	mapTurno['T'] = "2";
	mapTurno['N'] = "3";

	cin >> nTestes;
	for (int i = 0; i < nTestes; i++)
	{
		cin >> antigoRA;

		antigoSigla = antigoRA.substr(0, 2);
		antigoAno = antigoRA.substr(2, 2);
		antigoSemestre = antigoRA.substr(4, 1);
		antigoNumero = antigoRA.substr(5, 3);

		if (DEBUG)
			printf("sigla - %s\nano - %s\nsemestre - %s\nnumero = %s\n",
				antigoSigla.c_str(), antigoAno.c_str(), antigoSemestre.c_str(), antigoNumero.c_str());

		// transformar antigoSigla em novoCurso + novoTurno
		if (antigoSigla == "PL")	// polímeros é especial
		{
			novoCurso = "080";
			novoTurno = "2";
		}
		else
		{
			novoCurso = mapCurso[antigoSigla.at(0)];
			novoTurno = mapTurno[antigoSigla.at(1)];
		}

		if (DEBUG) printf("novo: %s - %s - %s - %s - %s - %s\n",
			"003", novoCurso.c_str(), antigoAno.c_str(), antigoSemestre.c_str(), novoTurno.c_str(), antigoNumero.c_str());

		// construir novo curso
		novoRA = "";	// esvaziar
		novoRA.append("003");			// FATEC de Sorocaba
		novoRA.append(novoCurso);
		novoRA.append(antigoAno);
		novoRA.append(antigoSemestre);
		novoRA.append(novoTurno);
		novoRA.append(antigoNumero);

		cout << novoRA << endl;
	}

	return 0;
}

