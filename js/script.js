/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati 
- abbiamo calpestato una bomba 
- la cella si colora di rosso e la partita termina, altrimenti la cella 
cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo 
possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di
 volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle


/* FUNCTIONS */

const getRandomNumber = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;


/* RECUPERO GLI ELEMENTI DAL DOM E CREO LE VARIABILI CHE MI SERVONO */
const selectElement = document.getElementById('select');

const play = ( selectedValue , gridElement ) =>
{
    let points = 0;
    

    const showBombs = (bombs,totalCells) =>
    {
        const cells = document.querySelectorAll('.cells');

        for(let i = 0;i<totalCells;i++)
        {
                const cell = cells[i];

                if(bombs.includes(parseInt(cell.innerText)))
                {
                    cell.innerText='';
                    cell.classList.add('bomb');
                }     
                
               cell.removeEventListener('click',cell.fn,false);
        }
   
    }

    const gameOver = (bombs,totalCells) => 
    {
        showBombs(bombs,totalCells);
        const MAX_POINTS = totalCells - bombs.length;
        const messageElement = document.getElementById('message');
        let message = `Mi dispiace hai perso! Punti: ${points}`
        if(MAX_POINTS === points)
        {
            message = "Complimenti hai vinto!";
        }

        messageElement.innerText = message;
        
    }
    const createBombs = ( totalCells ) =>
    {
        const NUMBER_BOMBS = 16;
        const bombs = [];

        while(bombs.length < NUMBER_BOMBS)
        {
            const rdnNumber = getRandomNumber(1,totalCells);

            if(!bombs.includes(rdnNumber) )
            {
                bombs.push(rdnNumber);
            }
        }

        return bombs;

    }
    const createGrid = ( side , gridElement ) =>
    {
        const totalCells = side * side;
        const bombs = createBombs(totalCells);

        for(let i = 0;i < totalCells;i++)
        {
            const cell = document.createElement('div');
            const dimensions = `calc( 100% / ${side}`
            cell.style.width = dimensions;
            cell.style.height = dimensions;
            cell.className = 'cells';
            const number  = i + 1
            cell.innerText = number; 
            gridElement.appendChild(cell);
            
            console.log(number);
            cell.addEventListener("click", cell.fn=function fn() {
            if(bombs.includes(number))
            {
                //GAME OVER gameOver();
                gameOver(bombs,side * side,points);
            }
            else
            {
                cell.classList.add('clicked');
                points++;
            } 
            }, false);
        }

    }

    if(selectedValue)
    {
        switch(selectedValue)
        {
            case '1':
                createGrid(10,gridElement);
            break;

            case '2':
                createGrid(9,gridElement);
            break;

            case '3': 
                createGrid(7,gridElement);
            break;
        }
    }
}

selectElement.addEventListener('change',(e) => {

    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    play(e.target.value,gridElement);
});