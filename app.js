
const gamePlaces = document.querySelectorAll('.blocks');









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