
const gameBoard = (()=>{
    let board = []

    function checkPosition(position){
        board.forEach(place =>{return place[position] === '' ? true : false});

    }

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
        checkPosition,
        restartBoard
    }

})();

const players = (() =>{
    Player = (mark) => {
        let _turn = false;
        let _bot  = false;
        
        const setMark = (mark) =>{mark = mark}
        const getMark = () => mark 
        const getTurn = () => _turn;
        const setTurn = (turn) =>{_turn = turn}
        const getIsAbot = () => _bot;
        const setIsAbot = (bot) =>{_bot = bot};        
        return{getMark,setMark,getTurn,setTurn,getIsAbot,setIsAbot}
    }
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
    const screen = document.getElementsByTagName('main')[0];
    const options = document.getElementsByTagName('header')[0];
    const message = document.getElementById('message');
    const gamePlaces = document.querySelectorAll('[data-block]');
    const restartBtn = document.getElementById('restartBtn');
      
    function start(){
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
        if(gameBoard.checkWinner(player.getMark())){
            gameMessage(player);
            removeClick();   

        }
        if(player.getIsAbot()){
            ManageBotPlayerMark();
            return;
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
        start,
        gameMessage
    }
})();



domView.start();


