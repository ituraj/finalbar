document.addEventListener("DOMContentLoaded", loadKeg);

let data = JSON.parse(FooBar.getData());
let beersLength = data.beertypes.length;
let toAdd = document.createElement('div');

for(let i= 0; i<beersLength; i++){
    let newButton = document.createElement('button');
    newButton.id = 'buttonBeerId'+i;
    newButton.className = 'buttonBeer';
    newButton.innerHTML = data.beertypes[i].name;
    document.body.appendChild(newButton);
    $(newButton).on('click',  
        function(){
            document.getElementById("bName").innerHTML = data.beertypes[i].name;
            document.getElementById("bAlc").innerHTML = data.beertypes[i].alc + "%";
            document.getElementById("bCategory").innerHTML = data.beertypes[i].category;
            document.getElementById("bAppearance").innerHTML = "<b>Appearance</b>" + "<br>" + data.beertypes[i].description.appearance;
            document.getElementById("bAroma").innerHTML = "<b>Aroma</b>" + "<br>" + data.beertypes[i].description.aroma;
            document.getElementById("bFlavor").innerHTML = "<b>Flavor</b>" + "<br>" + data.beertypes[i].description.flavor;
            document.getElementById("bMouthfeel").innerHTML = "<b>Mouthfeel</b>" + "<br>" + data.beertypes[i].description.mouthfeel;
            document.getElementById("bOverallImpression").innerHTML = "<b>Overall impression</b>" + "<br>" + data.beertypes[i].description.overallImpression;
            // document.getElementById("bPopularity").innerHTML = "<b>Popularity: </b>" + data.beertypes[i].popularity;
            // document.getElementById("bPouringSpeed").innerHTML = "<b>Pouring Speed: </b>" + data.beertypes[i].pouringSpeed;
        }
    );
    $( ".buttons" ).append(newButton);
}

// Load SVGs

async function loadKeg() {
    let svgKeg = await fetch ("images/parentkeg.svg");
    let svgGlass = await fetch ("images/beer.svg");
    let myKeg = await svgKeg.text();
    let myGlass = await svgGlass.text();
    document.querySelector("#graphic").innerHTML = myKeg;
    document.querySelector("#glass").innerHTML = myGlass;
    let liquid = document.querySelector("#liquid");

document.querySelector("#handle").addEventListener("click", function() {
let handle = document.querySelector("#handle");
handle.style.fill = "grey";
handle.style.transform="rotate(90deg)";
handle.style.transformOrigin="55% 38% 0px";
});

document.querySelector("#buttonBeerId0").addEventListener("click", function() {
    liquid.style.fill = "#f8b64c";
});

document.querySelector("#buttonBeerId1").addEventListener("click", function() {
    liquid.style.background = "brown";
});

document.querySelector("#buttonBeerId2").addEventListener("click", function() {
    liquid.style.background = "green";
});

document.querySelector("#buttonBeerId3").addEventListener("click", function() {
    liquid.style.background = "black";
});

document.querySelector("#buttonBeerId4").addEventListener("click", function() {
    liquid.style.background = "aqua";
});

}

// let z = 0;

function tapButton(){
    for (let i = 0; i < 10; i++) {
        document.querySelector("#buttonBeerId" + i).addEventListener("click", function() {
            let brandClick = document.querySelector("#labelBeer" + i);
            brandClick.style.visibility = "visible";
            console.log(brandClick)
            });
        // document.querySelector("#buttonBeerId" + i).addEventListener("click", function() {
        //     document.querySelector("#labelBeer" + i).style.zIndex = ++z;
    //  });
 }
}

tapButton();