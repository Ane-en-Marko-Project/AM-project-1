document.querySelector(".question-btn").addEventListener("click",function(){
    document.querySelector(".htp-container").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
});
document.addEventListener("keydown",function(event){
    if(event.key==="Escape"){
        closeWindow()
    }
})
document.querySelector(".overlay").addEventListener("click",closeWindow);
document.querySelector(".close-btn").addEventListener("click",closeWindow);
function closeWindow(){
    document.querySelector(".htp-container").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
}