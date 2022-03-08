Player = (mark) => {
    let _turn = false;
    
    const setMark = (mark) =>{mark = mark}
    const getMark = () => mark 
    const getTurn = () => _turn;
    const setTurn = (turn) =>{_turn = turn}
    
    return{getMark,setMark,getTurn,setTurn}
}

const gameBoard = (()=>{
    let board = []

    function markPosition(position,mark){
       board[position] = mark;
           
    }

    function restartBoard (){
        board.length = 0;
    }

    function checkWinner(mark){
       const winComb = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
          ] 
                

        return winComb.some(combination => {
            return combination.every(index => {
                return board[index] === mark;
            });
          });    
                
        
    }

    function isDrawn(){
        return board.length === 9 
    }
    return{
        markPosition,
        checkWinner,
        restartBoard
    }

})();

const players = (() =>{
    let playerX = Player('X');
    let playerO = Player('O');


    function defineTurn(){
        if(playerX.getTurn() === false && playerO.getTurn() === false){
            playerX.setTurn(true);
        }else{
            if(playerX.getTurn() === true && playerO.getTurn() === false){
                playerX.setTurn(false);
                playerO.setTurn(true);
            }else{
                playerX.setTurn(true);
                playerO.setTurn(false);
               
            }  

          }
          
    }

    function playerTurn(){
        return playerX.getTurn() ? playerX : playerO;    
    } 
        
    function deletePlayers(){
        delete playerX;
        delete playerO;
    }

    return {
        defineTurn,
        playerTurn,
        deletePlayers
    }

})();

const domView = (()=>{
    const screen = document.getElementsByTagName('main');
    const gamePlaces = document.querySelectorAll('[data-block]');
    const restartBtn = document.getElementById('restartBtn');
    
 
    function startGame(){
            players.defineTurn();
            gamePlaces.forEach(place =>place.addEventListener('click',markBoard,{once:true}));
    
    }

    function markBoard(e){
        const player = players.playerTurn();
        const place = e.target;
        const playPosition = place.getAttribute('data-block');
        place.textContent = player.getMark();
        gameBoard.markPosition(playPosition,player.getMark());
        players.defineTurn();
        gameMessage(player.getMark());
    }
    
    function gameMessage (player){
        const message = document.createElement('p');
        message.textContent = `It\'s' ${player} turn`
        screen.appendChild(message);
        if(gameBoard.checkWinner(player)){
            message.textContent = `Winner's ${player}`
            screen.appendChild(message);
        }
        console.log('opora')
    }
    
    
    
          
    function restartGame(){
        gamePlaces.forEach(place =>{
            place.textContent= '';
            place.removeEventListener('click', markBoard);
        });
         gameBoard.restartBoard();
         players.deletePlayers();
         startGame();
    }

    restartBtn.addEventListener('click',restartGame);
    
    return{
        startGame
    }
})();



domView.startGame();


