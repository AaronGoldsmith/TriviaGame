var correct = 0;
var skips = 0;
var incorrect = 0;
var chosen = false;
var remaining= 30;
var countdown;
var pause;

var Questionlist = [
    {question:"Which of the following does not belong?",
     choiceList:["Bengal","Siamese","Aegean","Borzoi"], ans: 3},
    {question:"Which organ can regenerate itself?",
     choiceList:["Liver","Appendix","Brain","Gallbladdaer"], ans: 0},
    {question: "What is the length of a marathon? (In miles)",
     choiceList:["9.5","16","26","30"], ans: 2},
    {question:"What is the youngest one must be to run for president?",
     choiceList:["N/A","25","35","37"], ans: 2},
    {question:"Which of the following rappers is made up?",
     choiceList:["Lil Snupe","Lil Pump","Lil Xan","Lil Stoop"], ans: 3},
    {question:"23 individuals sign up for an experiment. What is the probability two people in the group will share the same birthday",
      choiceList:["5%","99%","20%","50%"],ans: 3},
    {question:"Which item will be the last to hit the ground if dropped in a vaccum (no air resistance)?",
      choiceList:["Bowling Ball","Tennis Ball","Feather","None. All hit ground at identical time"], ans: 3},
    {question: "What does an average Game of Thrones episode cost to make?", 
    choiceList:["600k","2million","6million","20million"],ans:2},
    {question:"How many wives has Trump had?", choiceList:["5","2","1","3"], ans:3},
    {question:"The Late Show _______",
     choiceList:["with Trevor Noah","with Steven Colbert","with Jerry Seinfeld","with John Oliver"], ans: 1}
];

var ans = [];
var INDEX = 0;
function nextQuestion(){
    if(INDEX<Questionlist.length-1){
        setUpQuestion();

        // clear out selected button
        $(".fas").toggleClass("far fas");

        //reset time
        remaining = 30;
        clearInterval(countdown);
        countdown = setInterval(tick, 1000);
    }
    else{
        $("tr").empty();
        $("#questionHeader").empty();
        var results = "<p>Skips:"+skips+"</p>";
        results += "<p>Correct:"+correct+"</p><p>Incorrect: "+incorrect+"</p>";
        var final = $("div")
        final.html(results);
        final.addClass("text-light")
        $("#main").append(final)
    }
}

function setUpQuestion(){
    // update question field
    ++INDEX;
    $("#question").text(Questionlist[INDEX].question);
    // get the list of options to choose from
    var options = Questionlist[INDEX].choiceList;
    // select for all the rows in the table
    var tableRows = $("tbody tr")
    var choiceLabels = tableRows.find(".choice");
    choiceLabels.empty();
    // add choices to choice-labels
    for(choice in choiceLabels){
        var data = choiceLabels[choice];
        var dataLabel = options[choice];
        data.textContent=(dataLabel)
    } 
}


function toggleRadio(button){
    clearInterval(countdown)
    var btn = button.find("i").toggleClass('far fas')
    var txt = button.find("span").toggleClass("text-light text-dark")
}
function isSelected(btn){
   return $(btn).find("i").hasClass("fas");
}

$(document).ready(function(){
    // RADIO BUTTON click
    $("tr").on("click",function(){
         
           var ansChoice = $(this).attr("data-value")
           toggleRadio($(this));
           $("#options").empty();
           $("#timeLeft").empty();
           if(ansChoice==Questionlist[INDEX].ans){
               $("#question").text("THATS RIGHT!")
               correct++;
           }
           else{
               console.log("incorrect")
               $("#question").text("Sorry, you're wrong!")
               incorrect--;
           }
           setTimeout(nextQuestion,3000);
        });
    });

document.onkeyup = function(event){
    var keyVal = event.key;

    if(keyVal==="ArrowRight" && INDEX <= 10){    
        remaining = 30;
        nextQuestion();
        ++skips;
    }
    
}
function run() {
    clearInterval(countdown);
    countdown = setInterval(tick, 1000);
}

$("#startGame").on("click",function(){
    setUpQuestion();
    run();
    // clear out instructions & remove start button
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
        nextQuestion();
    }
    remaining--;


}