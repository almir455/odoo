// Live Date & Time

function updateTime(){

const now=new Date();

document.getElementById("datetime").innerHTML=

now.toLocaleDateString()+" | "+now.toLocaleTimeString();

}

setInterval(updateTime,1000);

updateTime();


// Animated Counter

function counter(id,target){

let count=0;

let speed=25;

let interval=setInterval(()=>{

count++;

document.getElementById(id).innerHTML=count;

if(count>=target){

clearInterval(interval);

}

},speed);

}

counter("available",245);

counter("allocated",178);

counter("maintenance",14);

counter("bookings",35);

counter("transfers",12);

counter("returns",27);


// Quick Action Buttons

document.querySelectorAll(".actions button").forEach(button=>{

button.addEventListener("click",()=>{

alert(button.innerText+" Clicked!");

});

});