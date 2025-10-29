/*alert("works");*/

/*console.log(document); /*logs info in the browser console*/

window.onload = function(){
let board = document.getElementById('board');
let guessButton = document.getElementById('guessButton');
let guessInput = document.getElementById('guessInput');

/*console.log(board);*/
    for(let i=0; i<6; i++)
    {
        let row = document.createElement('div');
        row.classList.add('row');
        board.append(row);
        for (let j=0; j<5; j++)
            {
                let cell = this.document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', i);
                cell.setAttribute('data-column', j);
                row.append(cell);

            }
    }

let word = 'media';
let tries = 0;
let gameOver = 0;


guessButton.addEventListener('click', function(){
    if (gameOver == true)
    {
        alert("The game is over.");
    }
    
    
    let guess = guessInput.value;

    for(let i=0; i<5; i++)
    {
        let currentCell = document.querySelector
        (
            `[data-row="${tries}"][data.column="${i}"]`
        );

        let currentLetter = document.createTextNode(guess[i]);
        currentCell.append(currentLetter);


        if(word[i]==guess[i])
        {
            currentCell.classList.add('green');
        }
        else
        {
            if(word.indexOf(guess[i])<0) //false value is -1, <0 is used to assure this works across multiple browser types
            {
                currentCell.classList.add('red');
            }
            else
            {
                currentCell.classList.add('yellow');
            }
        }
    }

    if(word == guess){
        alert("You won!");
        gameOver = true;
        //guessButton.setAttribute('disabled', 'disabled');
        return;
    }

    if(tries = 5)
    {
        alert("You lost!");
        gameOver = true;
    }


    tries++;

})

}




