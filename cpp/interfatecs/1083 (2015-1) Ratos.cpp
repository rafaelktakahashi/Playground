

// Rafael Kenji Takahashi, FATEC Mogi das Cruzes

// Problema H - Aritmética modular

// DEBUG 1 é mais legal

#include <iostream>
#include <cstdio>
#include <string>
#include <cstdio>
#define DEBUG 0

using namespace std;

int Play(int Offset, int nPlayers)
{
    // They're all here
    bool Players[100];
    // Set the wheel to 0
    int Pointer = 0;
    // Set round number to 0
    int Round = 0;
    // Call the referee
    int PlayersPlaying = nPlayers;
    // Get all players in their seats
    for (int i = 0; i < 100; i++)
         Players[i] = true;
    // Fire repeatedly!
    while (Round <= 100000)
    {
        // New round
        Round++;
        if(DEBUG)cout << "Round " << Round << endl;
        // Spin the wheel
        Pointer += Offset;
        Pointer %= nPlayers;
        if(DEBUG)cout << "Pointer landed on " << Pointer << endl;
        // Shoot the unlucky bastard (if there's one there)
        if (Players[Pointer] == true)
        {
            if(DEBUG)cout << "Player has died!" << endl;
            Players[Pointer] = false;
            PlayersPlaying--;
            if(DEBUG)cout << PlayersPlaying << " players left" << endl;
            // Merry go round
            if (Pointer == 0)
                Pointer = nPlayers - 1;
            else
                Pointer--;
            if(DEBUG)cout << "Pointer currently at " << Pointer << endl;
        
            // Is there one person alive?
            if (PlayersPlaying == 1)
            {
                if(DEBUG)cout << "One player left; looking for him" << endl;
                // look for the survivor
                for (int k = 0; k < nPlayers; k++)
                {
                    if (Players[k] == true)
                    {
                        // Found you. You're coming with us.
                        if(DEBUG)printf("Game lasted %d rounds. ", Round);
                        else printf("apos %d rodadas quem levou a bolada foi ", Round);
                        return k;
                    }
                }
                // there's no one here, sir!
               cout << "!!!" << Round << endl;
                return 1000;
            }
        }
        else if(DEBUG)cout << "No one to shoot. Next round!" << endl;
        

    }
    printf("AAAAHHH!");
}

int main()
{
    int nOffset;
    int nPlayers;
    string Player[100];
    int nSurvivor;

    while (cin >> nPlayers)
    {
        // get names
        for (int i = 0; i < nPlayers; i++)
        {
            cin >> Player[i];
        }
        cin >> nOffset;
        
        // play
        nSurvivor = Play(nOffset, nPlayers);
        if(DEBUG)cout << "SURVIVOR: " << Player[nSurvivor] << endl;
        else cout << Player[nSurvivor] << endl;
    }

    return 0;
}

