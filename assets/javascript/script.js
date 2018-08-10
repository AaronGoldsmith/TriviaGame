
var chosen = false;
var remaining= 30;
var playing = false;
var countdown;

var Questionlist = [
    {question:"Which of the following does not belong?",
    choiceList:["Bengal","Siamese","Aegean","Borzoi"], ans: 3},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}];
var qList = ["Question #1","Question #2","Question #3","Question #4","Question #5","Question #6","Question #7","Question #8","Question #9","Question #10"]
var choiceList = [
    ["Choice 1","Choice 2", "Choice 3","Choice 4"],
    ["Choice 1b","Choice 2b", "Choice 3b","Choice 4b"],
    ["Choice 1c","Choice 2c", "Choice 3c","Choice 4c"],
    ["Choice 1d","Choice 2d", "Choice 3d","Choice 4d"],
    ["Choice 1e","Choice 2e", "Choice 3e","Choice 4e"],
    ["Choice 1f","Choice 2f", "Choice 3f","Choice 4f"],
    ["Choice 1g","Choice 2g", "Choice 3g","Choice 4g"],
    ["Choice 1h","Choice 2h", "Choice 3h","Choice 4h"],
    ["Choice 1i","Choice 2i", "Choice 3i","Choice 4i"],
    ["Choice 1j","Choice 2j", "Choice 3j","Choice 4j"],
]
var ans = [];
var INDEX = 0;
function nextQuestion(){
    ++INDEX;
    // remaining
    clearInterval(countdown);
    setUpQuestion();
}
function prevQuestion(){
    --INDEX;
    setUpQuestion();
}
function setUpQuestion(){
    // update question field
    $("#question").text(qList[INDEX]);
    // get the list of options to choose from
    var options = choiceList[INDEX];
    // select for all the rows in the table
    var tableRows = $("tbody tr")
    var choiceLabels = tableRows.find(".choice");
    choiceLabels.empty();
    // add choices to choice labels
    for(choice in choiceLabels){
        var data = choiceLabels[choice];
        var dataLabel = options[choice];
        data.textContent=(dataLabel)
    } 
}


function toggleRadio(button){
    var btn = button.find("i").toggleClass('far fas')
    var txt = button.find("span").toggleClass("text-light text-dark")
    chosen = !chosen;
}
function isSelected(btn){
   return $(btn).find("i").hasClass("fas");
}

$(document).ready(function(){
    // RADIO BUTTON click
    $("tr").on("click",function(){
        if(isSelected($(this))||!chosen){
           toggleRadio($(this));
        } 
        else if(chosen){
            // SWITCHING CHOICE OF RADIO BUTTON
            $(".fas").toggleClass("far fas");
            $(this).find("i").toggleClass("far fas");
        }
    });

   
})
document.onkeyup = function(event){
    var keyVal = event.key;
    
    if(keyVal != "ArrowRight" && keyVal != "ArrowLeft"){
        console.log("change with arrow keys")
    }
    else if(keyVal==="ArrowRight" && INDEX <= 10){    
        ++INDEX;
        remaining = 30;
        setUpQuestion();

    }
}
function run() {
    clearInterval(countdown);
    countdown = setInterval(tick, 1000);
}

$("#startGame").on("click",function(){
    setUpQuestion();

    run();
    $("#instructions").empty();
    $(this).remove();
    setUpQuestion();

    $("#questionHeader").removeAttr("hidden")
    $("table").removeAttr("hidden")
})
function tick(){
    $("#timeLeft").empty();
    var time = remaining.toString();
    var s = ("Seconds left 00:"+time);
    if((remaining<10)){s=("Seconds left 00:0"+time)}
    $("#timeLeft").append(s)
    if(remaining==0){
        clearInterval(countdown)
    }
    remaining--;


}