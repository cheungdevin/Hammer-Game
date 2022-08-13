let timeRemaining = 3;          // Amount of time remaining for the countdown

let timeToShowMonster = 2000;   // Amount of time to show the monster
let timeToHideMonster = 2000;   // Amount of time to hide the monster

let hideMonsterTimeout;         // Timeout id for hiding the monster

let life = 3;                   // The player's life

function hideMonster() {
    // Change the life and the colour of the holes
    life--;
    if(life==2){
        $(".hole").css("border-color", "yellow");
    }
    if(life==1){
        $(".hole").css("border-color", "red");
    }

    // If the game is over show the game over screen
    if(life==0){
        $("#gameover").fadeIn(1000);
    }

    // Hide the monster
    $("#monster").hide();

    // Show the monster later again
    setTimeout(showMonster, timeToShowMonster);
}

function showMonster() {
    // Find the target div randomly and move the monster
    // to that div
    let div = $(".hole").eq(parseInt(Math.floor(Math.random()*9)));
    $("#monster").appendTo(div);

    // Show the monster
    $("#monster").show();

    // Hide the monster later
    hideMonsterTimeout = setTimeout(hideMonster,timeToHideMonster);
}

function startGame() {
    // Hide the countdown timer
    $("#countdown").fadeOut(1000);

    // Show the monster the first time
    setTimeout(showMonster, timeToShowMonster);
    // Set up the click handler of the monster
    $("#monster").on("click", function(){
        // - Clear the previous timeout
        clearTimeout(hideMonsterTimeout);
        
        // - Hide the monster
        $("#monster").hide();

        // - Adjust the monster time
        if(timeToShowMonster > 600){
            timeToShowMonster -= 200;
            timeToHideMonster -= 200;
        }

        // - Show the monster later again
        setTimeout(showMonster, timeToShowMonster);

    })


}

function countdown() {
    // Decrease the remaining time
    timeRemaining--;

    // Continue the countdown if there is still time;
    // otherwise, start the game when the time is up
    if(timeRemaining > 0){
        $("#countdown").text(timeRemaining)
        setTimeout(countdown, 1000);
    }else{
        $("#countdown").text("Start");
        startGame();
    }

    
}

$(document).ready(function() {
    // Start the countdown screen
    setTimeout(countdown, 1000);

});