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

    function isDrawn(mark){
        let plays = 0;
       board.forEach(place =>{
           if(place !=''){
            plays += 1; 
           }
       })
      return !checkWinner(mark) && plays === 9;
            
         
    }
    return{
        markPosition,
        checkWinner,
        isDrawn,
        restartBoard
    }

})();

const players = (() =>{
    let playerX = Player('X');
    let playerO = Player('O');


    function defineTurn(){
        if(playerX.getTurn() === false && playerO.getTurn() === false){
            playerX.setTurn(true);
            domView.gameMessage(playerX);
        }else{
            if(playerX.getTurn() === true && playerO.getTurn() === false){
                playerX.setTurn(false);
                playerO.setTurn(true);
                domView.gameMessage(playerO);
            }else{
                playerX.setTurn(true);
                playerO.setTurn(false);
                domView.gameMessage(playerX);
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
    const message = document.getElementById('message');
    const gamePlaces = document.querySelectorAll('[data-block]');
    const restartBtn = document.getElementById('restartBtn');
    const boot = document.getElementById('AI');
    const player = document.getElementById('player');
    
 
    function startGame(){
            players.defineTurn();
            gameMessage(players.playerTurn());
             gamePlaces.forEach(place =>place.addEventListener('click',markBoard,{once:true}));
    
    }

 

    function markBoard(e){
        const player = players.playerTurn();
        const place = e.target;
        const playPosition = place.getAttribute('data-block');
        place.textContent = player.getMark();
        gameBoard.markPosition(playPosition,player.getMark());
        players.defineTurn();
        if(gameBoard.checkWinner(player.getMark())){
            gameMessage(player);
            removeClick();          

        }
        
    }
    
    function gameMessage (player){
        let playerMark = player.getMark();
        if(gameBoard.checkWinner(playerMark)){
            message.textContent = `${playerMark} is the Winner`
         }else{
            if(gameBoard.isDrawn(playerMark)){
                message.textContent = 'It\'s a tie!!'
            }else{
            message.textContent = `It\'s ${player.getMark()} turn`;
            }
       }
    }
    
    function removeClick(){
        gamePlaces.forEach(place =>place.removeEventListener('click',markBoard));
    }
    
          
    function restartGame(){
         gameBoard.restartBoard();
         players.deletePlayers();
         window.location.reload();
        }

    restartBtn.addEventListener('click',restartGame);
    
    return{
        startGame,
        gameMessage
    }
})();



domView.startGame();


