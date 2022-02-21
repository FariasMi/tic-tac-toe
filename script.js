Player = (mark) => {
    let turn = false;
    const getMark = () => mark;
    const setMark = () => mark;
    const setTurn = () => turn;
    return{getMark,setMark, setTurn}
}

gameBoard = (()=>{
    const gamePlaces = document.querySelectorAll('.block');
 
    let board = new Array(9);
    function choseMarkPlayer(){
   

    }
            
    function verifyPlayer(){
          if(typeof playerX == 'undefined' && typeof playerO == 'undefined'){
            return false;           
        }else{
            if(typeof playerO == 'undefined'){
                                  
        }
                 
    }

    function createPlayer(mark){
        if(mark === 'X'){
            const playerX = Player(mark);
            playerX.setTurn(true);
        }else{
            const playerO= Player(mark);
            playerO.setTurn(true);
        }

    }

    function playing(){
        gamePlaces.forEach(place =>place.addEventListener('click',createMark(place),{once:true}));
        
    }

    function createMark(place){
        
        playing.classList.add('playing');
        playing.textContent = player.getMark;
        place.appendChild(playing);
    }
   
    return{
        playing
    }

});

const init = gameBoard();

init.playing();