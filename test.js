//maak n bullet vir die HQ
let ID = "hjk"
let position = {row:10,collumn:10}
$("body").prepend('<img id="'+ID+'" class="arrow" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqxOOeTKinvlPQGBbEGH1i5oHjF72NiVB7FQ&usqp=CAU" alt="">');
// console.log(document.querySelector("#"+ID).style.top);
document.querySelector("#"+ID).style.top = "1000px"
document.querySelector("#"+ID).style.left = position.collumn*100;
// console.log(document.querySelector("#"+ID).style);
console.log(ID)
console.log(document.querySelector("#"+ID));