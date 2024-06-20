var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function startGame(){
    if(!started){
        $("h1").text("Level " + level);
        $("a").fadeOut(300);
        nextSequence();
        started = true;
    }
}


function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function isTablet() {
    return /iPad|Tablet|PlayBook|Silk/i.test(navigator.userAgent) || (isMobile() && (screen.width >= 768 && screen.height >= 768));
}

if (isTouchDevice() || isMobile() || isTablet()) {
    $("h1").text("Press the button below to start!");
        $("#startBtn").click(function () { 
            startGame();
            $("#startBtn").fadeOut();
        });
}
else {
    $("h1").text("Press a key to start!");
        $("#startBtn").hide();
}

function updateText(){
    if($(window).width() <= 800){
        
    }
    else{
        
    }
}
updateText();
$(window).resize(updateText);

$(document).keypress(function () { 
    startGame();
});

$('.btn').click(function () { 
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    $("#"+userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColour).removeClass("pressed");
    },100)

    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
             nextSequence();
            }, 1000);
     }
    }

    else{
        $("body").css("background-color", "red");
        setTimeout(function(){
            $("body").css("background-color", "#061C39")
        },200);
        
        if(isTouchDevice() || isMobile() || isTablet()){
            $("h1").text("Game Over! Press the button below to start again!");
            $("#startBtn").fadeIn();
        }
        else{
            $("h1").text("Game Over! \n Press a key to start!");
        }

        playSound("wrong");
        startOver();
    }
}

function nextSequence() {  
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);

    $('#'+randomChosenColours).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColours);
}

function playSound(name){
    var audio = new Audio('./Assets/Sounds/' + name + '.mp3');
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


