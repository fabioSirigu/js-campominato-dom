/* campominato */

/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
 */

const gridContainer = document.querySelector('.grid');
const playButton = document.querySelector('.btn');

playButton.addEventListener('click', function(){
      gridContainer.innerHTML= '';
      const cellNumber = document.querySelector('.form-select').value; // il valore del select lo uso per indicare quante celle voglio nella funzione
      generateGrid(gridContainer, cellNumber);  
});


function generateGrid (where, howMany){
      for (let i = 0; i < howMany; i++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.innerText = i+1;
            where.append(cellElement);
            if (howMany === '100'){
                  cellElement.style.width = 'calc(100% / 10 )';
            } else if (howMany === '81'){
                  cellElement.style.width = 'calc(100% / 9)';
            } else {
                  cellElement.style.width = 'calc(100% / 7) ';
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
