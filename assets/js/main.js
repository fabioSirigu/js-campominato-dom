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
      const cellNumber = document.querySelector('.form-select').value;
      generateGrid(gridContainer, cellNumber);  
});

// genero le bombe
const bombs = generateBomb(1, level);
// -log in console i numeri random
console.log(bombs, 'questo è l array');

function generateGrid (where, howMany){
      for (let i = 1; i <= howMany; i++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.innerText = i;
            where.append(cellElement);
            if (howMany === '100'){
                  cellElement.style.width = 'calc(100% / 10)';
            } else if (howMany === '81'){
                  cellElement.style.width = 'calc(100% / 9)';
            } else {
                  cellElement.style.width = 'calc(100% / 7)';
            }
      }

      const cell = document.querySelectorAll('.cell');
      let counter = 0
      for (let i = 0; i < cell.length; i++){
            const singleCell = cell[i];
            
            singleCell.addEventListener('click', function () {
                  const cellNumber = singleCell.innerHTML;
                  console.log(cellNumber);
                  
                  singleCell.classList.add('background');
                  bombOrNot(cellNumber, singleCell)
                  
                  counter += 1;
                  const displayCount = document.querySelector('.counter');
                  displayCount.innerHTML = counter;
            })
      }   
}
function bombOrNot(number, position){
      for (let i = 0; i < bombs.length; i++) {
            const bomb = bombs[i];
            /* console.log(bomb, 'sei qui'); */
            if (number == bomb){
                  
                  position.classList.add('explosion'); //uso toggle per mettere e rimuovere la classe al click
                  if(!alert('hai perso!')){window.location.reload();}
            }
      }
}
      


function generateBomb(min, max){
      // Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
      // - un array per le bombe
      const bombs = [];
      // - un ciclo while (perchè non so quando dovrò interrompere il ciclo) per inserire con .push le bombe dentro il suo array
      // scorro dentro bombs fino a quando non contiene 16 numeri
      while (bombs.length !== 16) {
            // richiamo la funzione per generare un numero random
            const bomb = randomBombs(min, max)
            // se l'array NON include bomb allora aggiungo, altrimenti esco dal ciclo
            if (!bombs.includes(bomb)){
                  bombs.push(bomb);
            }
      }
      return bombs
}


// - uso una funzione per generare il numero random (uso una funzione per poterla richiamare all'occorrenza)
function randomBombs(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
}


//nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

//La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).


//Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. 
