
var chosen = false;

($(document)).ready(function(){

    $("tr").on("click",function(){
        if($(this).find("i").hasClass("fas")||!chosen){
            var btn = $(this).find("i");
            var txt = $(this).find("span")
            btn.toggleClass('far fas');
            txt.toggleClass("text-light text-dark")
            chosen = !chosen;
        }
    });
   
})
