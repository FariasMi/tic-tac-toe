
const gamePlaces = document.querySelectorAll('.blocks');


function gameBoard (playerObj){
    let board = new Array(9);
    board.splice(playerObj.position,0,playerObj.player);
    console.log(board);
}

const player = (name,mark)=>{
    return{name,mark}    
}


function restart (){
    const plays = document.getElementsByClassName('playing');
    while(plays[0]) {
        plays[0].parentNode.removeChild(plays[0]);
    }
    
        
}

function playingTurn(){
    gamePlaces.forEach(place =>place.addEventListener('click',()=>{
        if(place.querySelector('p')!=null){return}
        const playing = document.createElement('p');
        playing.classList.add('playing');
        playing.textContent = 'X';
        place.appendChild(playing);
        
    }));

}
playingTurn();
document.getElementById('restartBtn'). addEventListener('click',restart)

