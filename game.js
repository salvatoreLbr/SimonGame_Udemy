// Set starting arrays
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function playSound(name){
    // Play sound
    var alertSound = new Audio('sounds/'+name+'.mp3');
    alertSound.play();
}

function animatePress(currentColour){
    // Add .pressed class css 
    $("#"+currentColour).addClass("pressed")

    // after 100 milliseconds remove .pressed class css
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed")
    }, (100));
}

function nextSequence(buttonColours){
    // Generate a random number
    var randomNumber = Math.floor(Math.random()*4);
    // Define the color button to select
    var randomChosenColour = buttonColours[randomNumber];
    
    // Highlight button
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // Call function that play sound
    playSound(randomChosenColour);
    
    gamePattern.push(randomChosenColour);
    level = level + 1;
    $("h1").text("Level " + level);

    return gamePattern
}

function startover(){
    level = 0;
    iAnswerUser = 0;
    userClickedPattern = [];
    gamePattern = [];
}

function checkAnswer(colorLevel){
    if (gamePattern[iAnswerUser-1] ==  colorLevel)
    {
        if (iAnswerUser == gamePattern.length)
        {
            // after 1000 milliseconds add new color
            setTimeout(() => {
                // Add new color in the gamePattern
                nextSequence(buttonColours, level);
            }, (1000));
            // Clean user pattern and number button clicked
            userClickedPattern = [];
            iAnswerUser = 0;
        }
    }else
    {
        // Play gameover sound
        var alertSound = new Audio('sounds/wrong.mp3');
        alertSound.play();
        // Add .pressed class css 
        $("body").addClass("game-over")
        $("h1").text("Game Over! The game will resume shortly")
        // after 100 milliseconds remove .pressed class css
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, (200));
        startover();
        setTimeout(() => {
            nextSequence(buttonColours);
        }, (1000));
    }
    
}

// Add event to each button
for (i=0; i<4; i++){
    $("#"+buttonColours[i]).click(function(event){
        // Define which button is clicked
        var userChosenColour = event.currentTarget.classList[1];        
        
        // Add the button to the userClickedPattern
        userClickedPattern.push(userChosenColour);
        
        // Call function that play sound
        playSound(userChosenColour);

        // Pressed button function
        animatePress(userChosenColour);

        // Check answer
        iAnswerUser = iAnswerUser + 1
        checkAnswer(userClickedPattern[iAnswerUser-1])
        
    })
}

// Starting point of the page
var replay = confirm("Do you want play?");
if (replay == true) {
    alert("Click ok and afterwards click the button that lights up");
    var level = 0;
    var iAnswerUser = 0;
    var userClickedPattern = [];
    nextSequence(buttonColours);
} else {
    alert("If you want play, refresh the page and click ok");
}


