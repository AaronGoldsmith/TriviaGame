
var chosen = false;
var qList = ["Question #1","Question #2","Question #3","Question #4","Question #5","Question #6","Question #7","Question #8","Question #9","Question #10"]
var ans = [];
var qIndex = 0;
($(document)).ready(function(){
    $("#question").text(qList[qIndex]);
    $("tr").on("click",function(){
        if($(this).find("i").hasClass("fas")||!chosen){
            var btn = $(this).find("i");
            var txt = $(this).find("span")
            btn.toggleClass('far fas');
            txt.toggleClass("text-light text-dark")
            chosen = !chosen;
        }
        else if(chosen){
            $(".fas").toggleClass("far fas");
            $(this).find("i").toggleClass("far fas");
        }
    });


})
