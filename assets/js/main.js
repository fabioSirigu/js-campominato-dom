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
      displayCount.innerHTML = `` // i punteggi si sommano ai precedenti, bisogna refreshare la pagina    
      
});
const bombs = generateBomb(1, level);
console.log(bombs, 'questo è l array');

const displayCount = document.querySelector('.counter');
let counter = 0;


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
      
      const allCell = document.querySelectorAll('.cell');
      
      for (let i = 0; i < allCell.length; i++) {
            const singleCell = allCell[i];
            
            singleCell.addEventListener('click', function () {
                  bombOrNot(bombs, singleCell, allCell);
            });
            
      }
      
}

function bombOrNot(array, singleCell, allCell) {
      if (array.includes(Number(singleCell.textContent))){
            /* const displayCount = document.querySelector('.counter'); */
            for (let i = 0; i < allCell.length; i++) {
                  const singleCell = allCell[i];
                  singleCell.style.pointerEvents = 'none'; //questo mi rende non cliccabili le celle
                  if (array.includes(Number(singleCell.textContent))){
                        singleCell.classList.add('explosion');
                        displayCount.innerHTML = `Hai perso! il tuo punteggio è ${counter}`;
                  }
            }
      } else {
            singleCell.classList.add("survived");
            singleCell.style.pointerEvents = 'none'
            
            counter += 1;
            if (counter === (Number(level - 16))) {
                  /* const displayCount = document.querySelector('.counter'); */
                  displayCount.innerHTML = `Hai vinto! il tuo punteggio è ${counter}`;
            }
      } 
      
}

/* ****PRIMA VERSIONE DELLA FUNZIONE *** */
/* function bombOrNot(arrayBombs, number, position){
      for (let i = 0; i < arrayBombs.length; i++) {
            const bomb = arrayBombs[i];
            // console.log(bomb, 'sei qui');
            if (number == bomb){
                  position.classList.add('explosion');
                  console.log('Hai perso!', number -1, 'è il tuo punteggio!');
                  
            }
      }
} */

/* *** PRIMA VERSIONE DELLA FUNZIONE CLICK *** */
/* function singleCellClick (cell){
      for (let i = 0; i < cell.length; i++){
            const singleCell = cell[i];
            
            singleCell.addEventListener('click', function () {
                  const cellNumber = singleCell.innerHTML;
                  singleCell.classList.add('survived');
                  
                  bombOrNot(bombs, cellNumber, singleCell)
                  
                  counter += 1;
                  const displayCount = document.querySelector('.counter');
                  displayCount.innerHTML = counter;
                  
            })
      }   
} */

function counterClick(number, position){
      number += 1;
      position.innerHTML = number;
}

function generateBomb(min, max){
      const bombs = [];
      
      while (bombs.length !== 16) {
            const bomb = randomBombs(min, max)
            if (!bombs.includes(bomb)){
                  bombs.push(bomb);
            }
      }
      return bombs
}

function randomBombs(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
}


//nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

//La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).


//Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. 
