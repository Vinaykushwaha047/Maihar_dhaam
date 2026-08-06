const button = document.getElementById("exploreBtn");

button.addEventListener("click", function(){

    document.getElementById("info").scrollIntoView({

        behavior:"smooth"

    });

});


const titles = [

    "Welcome to MAIHAR",
    "Explore Nature",
    "Adventure Awaits",
    "Travel Beyond Limits",
    "Discover Hidden Beauty"

];

let i = 0;

setInterval(function(){

    i++;

    if(i>=titles.length){

        i=0;

    }

    document.getElementById("title").innerHTML = titles[i];

},3000);