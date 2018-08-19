

// Equipe IR^2, FATEC Mogi das Cruzes

// Problema "Bons Amigos" - algoritmo de busca em profundidade

#include <iostream>		// cin, cout
#include <cstdio>		// scanf, printf
#include <stack>		// std::stack
#include <string>		// std::string
#include <limits>		// std::numeric_limits
#define DEBUG 0

using std::cin;
using std::cout;
using std::endl;


struct Coord
{
	int X, Y;			// X INDEXA i, Y INDEXA j; POR ISSO, X SÃO LINHAS E Y SÃO COLUNAS
	bool operator==(const Coord& rhs) const
	{
		return (rhs.X == this->X && rhs.Y == this->Y);
	}
};

struct Preferencia
{
	// As direções que cada pessoa prefere, de maior prioridade para menor prioridade
	char n1, n2, n3, n4;		// 'N' = norte, 'S' = sul, 'O' = oeste, 'L' = leste
};

struct Pixel
{
	Coord Position;
	char Content;
	bool Visited;
};

struct Pessoa
{
	Coord Position;
	std::string Name;
	int DemorouQuanto;
	Preferencia Prefere;
};

// retorna true se o pixel olhado é válido (não bloqueado e não visitado)
bool Look(char Direction, Coord Here, Pixel Matriz[][100], int MatrizAltura, int MatrizLargura)
{
	// definitivamente ineficiente, espero que não importe

	if (Direction == 'N')
	{
		// Olhar para cima
		if (Here.X == 0)		// está no topo
			return false;
		if (Matriz[Here.X - 1][Here.Y].Visited == false		// Condições para OK
			&& Matriz[Here.X - 1][Here.Y].Content != '#')
			return true;
		return false;															// Não deu
	}

	if (Direction == 'S')
	{
		// Olhar para baixo
		if (Here.X == MatrizAltura - 1)	// está no fundo
			return false;
		if (Matriz[Here.X + 1][Here.Y].Visited == false
			&& Matriz[Here.X + 1][Here.Y].Content != '#')
			return true;
		return false;
	}

	if (Direction == 'O')
	{
		// Olhar para a esquerda
		if (Here.Y == 0)					// está no canto esquerdo
			return false;
		if (Matriz[Here.X][Here.Y - 1].Visited == false
			&& Matriz[Here.X][Here.Y - 1].Content != '#')
			return true;
		return false;
	}

	if (Direction == 'L')
	{
		// Olhar para a direita
		if (Here.Y == MatrizLargura - 1)	// está no canto direito
			return false;
		if (Matriz[Here.X][Here.Y + 1].Visited == false
			&& Matriz[Here.X][Here.Y + 1].Content != '#')
			return true;
		return false;
	}

	// Se nada deu certo:
	if (DEBUG)
		cout << "Desastre! bool Look nao sabe para onde olhar." << endl;
	return false;
}

// Marca o pixel na direção Direction como visitado e retorna tal pixel
// Matriz é passada como um ponteiro de 2D-array para poder alterar os dados
Pixel * Visit(char Direction, Coord Here, Pixel Matriz[][100])
{
	if (Direction == 'N')
	{
		Matriz[Here.X - 1][Here.Y].Visited = true;		// Marca o pixel como visitado
		return &Matriz[Here.X - 1][Here.Y];				// Retorna um ponteiro para o valor
	}
	if (Direction == 'S')
	{
		Matriz[Here.X + 1][Here.Y].Visited = true;
		return &Matriz[Here.X + 1][Here.Y];
	}
	if (Direction == 'O')
	{
		Matriz[Here.X][Here.Y - 1].Visited = true;
		return &Matriz[Here.X][Here.Y - 1];
	}
	if (Direction == 'L')
	{
		Matriz[Here.X][Here.Y + 1].Visited = true;
		return &Matriz[Here.X][Here.Y + 1];
	}

	// Se nada deu certo:
	if (DEBUG)
		cout << "Desastre! Pixel * Visit nao sabe para onde olhar.";
	return NULL;
}


// retorna a distância mínima entre dois coords dentro da matriz
int DFS(Pessoa Pessoa, Coord Doce, Pixel Matriz[][100], int MatrizAltura, int MatrizLargura)
{										// Provavelmente não é o melhor jeito de passar esta matriz
	// trabalho:
	Pixel workPixel;
	Pixel * ptrPixel;

	std::stack<Pixel*> pxStack;			// Pilha que vai guardar pointeiros para pixels dentro da matriz
	int Counter = 1;	// quantidade de passos; casa inicial também conta.
	char Who = Matriz[Pessoa.Position.X][Pessoa.Position.Y].Content;			// Quem é?

	// Nada foi visitado:
	for (int i = 0; i < MatrizAltura; i++)
		for (int j = 0; j < MatrizLargura; j++)
			Matriz[i][j].Visited = false;
	
	// Elemento no fundo da pilha:
	pxStack.push(&Matriz[Pessoa.Position.X][Pessoa.Position.Y]);	// É ponteiro para o pixel dentro da matriz
	// Visitou a casa onde está agora (inicio)
	pxStack.top()->Visited = true;

	if (DEBUG)
		printf("%s esta em (%d, %d), doce esta em (%d, %d)\n",
			Pessoa.Name.c_str(), Pessoa.Position.X, Pessoa.Position.Y, Doce.X, Doce.Y);
	while (pxStack.empty() == false)		// enquanto tiver algum elemento na pilha
	{
		if (DEBUG)
			printf("%s passo %d em (%d, %d)\n", Pessoa.Name.c_str(), Counter, pxStack.top()->Position.X, pxStack.top()->Position.Y);

		// Primeiro, avalia o próprio pixel; se achou o doce, retorna o contador (Count)
		if (pxStack.top()->Position == Doce)		// comparação de structs Coord
		{
			if (DEBUG) cout << "Achou o doce!" << endl;
			return Counter;							// Retorna quantos passos deu até agora
		}
		
		// Se não achou o doce, olha em volta, de acordo com a ordem de cada um
		// o primeiro pixel não bloqueado e não visitado que achar é marcado como visitado e posto na pilha
		// próximo loop vai encontrar [um ponteiro para] o pixel recém colocado na pilha.
		// Se não achar pixel válido em volta, nada acontece.

		// se achou na primeira direção:
		if (Look(Pessoa.Prefere.n1, Matriz[pxStack.top()->Position.X][pxStack.top()->Position.Y].Position, Matriz, MatrizAltura, MatrizLargura))
		{
			// Visita o pixel
			ptrPixel = Visit(Pessoa.Prefere.n1, Matriz[pxStack.top()->Position.X][pxStack.top()->Position.Y].Position, Matriz);
		}
		// se não, olha na segunda direção
		else if (Look(Pessoa.Prefere.n2, Matriz[pxStack.top()->Position.X][pxStack.top()->Position.Y].Position, Matriz, MatrizAltura, MatrizLargura))
		{
			ptrPixel = Visit(Pessoa.Prefere.n2, Matriz[pxStack.top()->Position.X][pxStack.top()->Position.Y].Position, Matriz);
		}
		// continua olhando
		else if (Look(Pessoa.Prefere.n3, Matriz[pxStack.top()->Position.X][pxStack.top()->Position.Y].Position, Matriz, MatrizAltura, MatrizLargura))
		{
			ptrPixel = Visit(Pessoa.Prefere.n3, Matriz[pxStack.top()->Position.X][pxStack.top()->Position.Y].Position, Matriz);
		}
		// última direção
		else if (Look(Pessoa.Prefere.n4, Matriz[pxStack.top()->Position.X][pxStack.top()->Position.Y].Position, Matriz, MatrizAltura, MatrizLargura))
		{
			ptrPixel = Visit(Pessoa.Prefere.n4, Matriz[pxStack.top()->Position.X][pxStack.top()->Position.Y].Position, Matriz);
		}
		// se não consegue mais se mover, não faz nada, só remove este elemento da pilha:
		else
		{
			pxStack.pop();
			continue;
		}
		
		// Visita o pixel, coloca na pilha e continua o loop (loop vai continuar no elemento que acabou de ser colocado
		ptrPixel->Visited = true;
		pxStack.push(ptrPixel);		// Adiciona à pilha

		// Deu um passo!
		Counter++;
		continue;
	}
	
	// passou por tudo isso, esvaziou a pilha e não encontrou o doce:
	return std::numeric_limits<int>::max();
}


int main()
{
	// Coords de cada amigo e do doce
	Pessoa Joao;
	Pessoa Maria;
	Pessoa Bruxa;
	Coord Doce;

	// O campo
	Pixel Matriz[100][100];	// i indexa a linha, j indexa a coluna

	// Os números
	int nN;
	int nAltura;
	int nLargura;
	
	// Variáveis de trabalho
	char cBuffer;
	int nWork;
	Pessoa MelhorPessoa;	// usa no fim

	// Dar nomes
	Joao.Name = "joao";
	Maria.Name = "maria";
	Bruxa.Name = "bruxa";

	// Preferências
	Joao.Prefere.n1 = 'N';
	Joao.Prefere.n2 = 'L';
	Joao.Prefere.n3 = 'S';
	Joao.Prefere.n4 = 'O';

	Maria.Prefere.n1 = 'S';
	Maria.Prefere.n2 = 'N';
	Maria.Prefere.n3 = 'O';
	Maria.Prefere.n4 = 'L';

	Bruxa.Prefere.n1 = 'L';
	Bruxa.Prefere.n2 = 'O';
	Bruxa.Prefere.n3 = 'N';
	Bruxa.Prefere.n4 = 'S';

	// A entrada
	cin >> nN;
	while (nN) // 5, 4, 3, 2, 1, break
	{
		cin >> nAltura >> nLargura;

		// ler o campo
		for (int i = 0; i < nAltura; i++)
		{
			for (int j = 0; j < nLargura; j++)
			{
				// i indexa a linha, j indexa a coluna
				cin >> cBuffer;
				if (cBuffer == 'J')
				{
					Joao.Position.X = i;
					Joao.Position.Y = j;
				}
				if (cBuffer == 'M')
				{
					Maria.Position.X = i;
					Maria.Position.Y = j;
				}
				if (cBuffer == 'B')
				{
					Bruxa.Position.X = i;
					Bruxa.Position.Y = j;
				}
				if (cBuffer == 'D')
				{
					Doce.X = i;
					Doce.Y = j;
				}
				Matriz[i][j].Position.X = i;
				Matriz[i][j].Position.Y = j;
				Matriz[i][j].Content = cBuffer;
			}
		}
		// Campo foi lido

		if (DEBUG)										////////////////DEBUG////////////////
		{												// Imprimir o campo e as pessoas
			cout << endl;
			for (int i = 0; i < nAltura; i++)
			{
				for (int j = 0; j < nLargura; j++)
					cout << Matriz[i][j].Content;
				cout << endl;
			}
			printf("%s - i%d j%d, prefere %c %c %c %c\n",
				Joao.Name.c_str(), Joao.Position.X, Joao.Position.Y, Joao.Prefere.n1, Joao.Prefere.n2, Joao.Prefere.n3, Joao.Prefere.n4);
			printf("%s - i%d j%d, prefere %c %c %c %c\n",
				Maria.Name.c_str(), Maria.Position.X, Maria.Position.Y, Maria.Prefere.n1, Maria.Prefere.n2, Maria.Prefere.n3, Maria.Prefere.n4);
			printf("%s - i%d j%d, prefere %c %c %c %c\n",
				Bruxa.Name.c_str(), Bruxa.Position.X, Bruxa.Position.Y, Bruxa.Prefere.n1, Bruxa.Prefere.n2, Bruxa.Prefere.n3, Bruxa.Prefere.n4);
			cout << endl;
		}												///////////END//DEBUG////////////////

		// Descobrir quanto cada um demorou
		Joao.DemorouQuanto = DFS(Joao, Doce, Matriz, nAltura, nLargura);

		Maria.DemorouQuanto = DFS(Maria, Doce, Matriz, nAltura, nLargura);

		Bruxa.DemorouQuanto = DFS(Bruxa, Doce, Matriz, nAltura, nLargura);


		if (DEBUG)										////////////////DEBUG////////////////
		{												// Imprimir o resultado completo
			printf("%s %d\n", Joao.Name.c_str(), Joao.DemorouQuanto);			// Se deu o menor número negativo, é porque
			printf("%s %d\n", Maria.Name.c_str(), Maria.DemorouQuanto);				// não achou o doce.
			printf("%s %d\n", Bruxa.Name.c_str(), Bruxa.DemorouQuanto);
			cout << endl;
		}												///////////END//DEBUG////////////////


		// Decidir quem foi melhor
		
		// Primeiro caso: ninguém achou o doce
		if (Joao.DemorouQuanto == std::numeric_limits<int>::max()
			&& Maria.DemorouQuanto == std::numeric_limits<int>::max()
			&& Bruxa.DemorouQuanto == std::numeric_limits<int>::max())
			cout << "ninguem" << endl;
		// Segundo caso: quaisquer dois empataram com um valor diferente do maior int, E menor que o outro
		else if ((Joao.DemorouQuanto == Maria.DemorouQuanto && Maria.DemorouQuanto != std::numeric_limits<int>::max()
					&& Joao.DemorouQuanto < Bruxa.DemorouQuanto)
			|| (Maria.DemorouQuanto == Bruxa.DemorouQuanto && Bruxa.DemorouQuanto != std::numeric_limits<int>::max()
					&& Maria.DemorouQuanto < Joao.DemorouQuanto)
			|| (Bruxa.DemorouQuanto == Joao.DemorouQuanto && Joao.DemorouQuanto != std::numeric_limits<int>::max())
					&& Bruxa.DemorouQuanto < Maria.DemorouQuanto)
			cout << "empate" << endl;
		// Terceiro caso: alguém achou o doce e foi mais rápido que os outros
		else
		{	// Terceiro caso (a): João ganhou
			if (Joao.DemorouQuanto != std::numeric_limits<int>::max()
				&& Joao.DemorouQuanto < Maria.DemorouQuanto
				&& Joao.DemorouQuanto < Bruxa.DemorouQuanto)
				cout << Joao.Name << ' ' << Joao.DemorouQuanto << endl;

			// Terceiro caso (b): Maria ganhou
			if (Maria.DemorouQuanto != std::numeric_limits<int>::max()
				&& Maria.DemorouQuanto < Joao.DemorouQuanto
				&& Maria.DemorouQuanto < Bruxa.DemorouQuanto)
				cout << Maria.Name << ' ' << Maria.DemorouQuanto << endl;

			// Terceiro caso (c): Bruxa ganhou
			if (Bruxa.DemorouQuanto != std::numeric_limits<int>::max()
				&& Bruxa.DemorouQuanto < Joao.DemorouQuanto
				&& Bruxa.DemorouQuanto < Maria.DemorouQuanto)
				cout << Bruxa.Name << ' ' << Bruxa.DemorouQuanto << endl;
		}

		nN--;
	}	// próximo caso de teste
	
	return 0;
}

