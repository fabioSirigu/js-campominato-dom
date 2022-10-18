/* campominato */

/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
 */

const gridContainer = document.querySelector('.grid');
const playButton = document.querySelector('.btn');
const level = document.querySelector('.form-select').value;

playButton.addEventListener('click', function(){
      gridContainer.innerHTML= '';
      const cellNumber = level; // il valore del select lo uso per indicare quante celle voglio nella funzione
      generateGrid(gridContainer, cellNumber);  
});


function generateGrid (where, howMany){
      for (let i = 0; i < howMany; i++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.innerText = i+1;
            where.append(cellElement);
            if (howMany === '100'){
                  cellElement.style.width = 'calc(100% / 10)';
            } else if (howMany === '81'){
                  cellElement.style.width = 'calc(100% / 9)';
            } else {
                  cellElement.style.width = 'calc(100% / 7)';
            }
      }

      // quando clicco su ogni casella (quindi dentro un ciclo for con la lenght), la cella cliccata si colora ed emette un messaggio in console col numero della cella cliccata
      // mi faccio una variabile per selezionare la casella
      // quando clicco la casella, aggiungo una classe per il colore (o cambio il colore dirett da JS)
      const cell = document.querySelectorAll('.cell');
      for (let i = 0; i < cell.length; i++){
            const singleCell = cell[i]
            singleCell.addEventListener('click', function () {
                  singleCell.classList.toggle('background'); //uso toggle per mettere e rimuovere la classe al click
                  console.log(`la cella è la numero ${singleCell.innerHTML}`); //.innerHTML mi stampa il contenuto della singleCell
            })
      }
      
}

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// - un array per le bombe
const bombs = [];
// - un ciclo while (perchè non so quando dovrò interrompere il ciclo) per inserire con .push le bombe dentro il suo array
// scorro dentro bombs fino a quando non contiene 16 numeri
while (bombs.length !== 16) {
      // richiamo la funzione per generare un numero random
      const bomb = randomBombs(1, level)
      // se l'array NON include bomb allora aggiungo, altrimenti esco dal ciclo
      if (!bombs.includes(bomb)){
            bombs.push(bomb)
      }
}

// -log in console i numeri random
console.log(bombs);



// - uso una funzione per generare il numero random (uso una funzione per poterla richiamare all'occorrenza)
function randomBombs(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }


//nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
//La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
//Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. 