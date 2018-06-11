let data = JSON.parse(FooBar.getData());
let beersLength = data.beertypes.length;


console.log(data.beertypes.length);
console.log(data.beertypes["0"].alc);




var toAdd = document.createElement('div');

for(let i= 0; i<beersLength; i++){
    var newButton = document.createElement('button');
    newButton.id = 'buttonBeerId'+i;
    newButton.className = 'buttonBeer';
    newButton.innerHTML = data.beertypes[i].name;
    document.body.appendChild(newButton);
    $(newButton).on('click',  
        function(){
            document.getElementById("bName").innerHTML = "<b>Name: </b>" + data.beertypes[i].name;
            document.getElementById("bAlc").innerHTML = "<b>Alcohol: </b>" + data.beertypes[i].alc;
            document.getElementById("bCategory").innerHTML = "<b>Category: </b>" + data.beertypes[i].category;
            document.getElementById("bAppearance").innerHTML = "<b>Appearance: </b>" + data.beertypes[i].description.appearance;
            document.getElementById("bAroma").innerHTML = "<b>Aroma: </b>" + data.beertypes[i].description.aroma;
            document.getElementById("bFlavor").innerHTML = "<b>Flavor: </b>" + data.beertypes[i].description.flavor;
            document.getElementById("bMouthfeel").innerHTML = "<b>Mouthfeel: </b>" + data.beertypes[i].description.mouthfeel;
            document.getElementById("bOverallImpression").innerHTML = "<b>Overall impression: </b>" + data.beertypes[i].description.overallImpression;
            document.getElementById("bPopularity").innerHTML = "<b>Popularity: </b>" + data.beertypes[i].popularity;
            document.getElementById("bPouringSpeed").innerHTML = "<b>Pouring Speed: </b>" + data.beertypes[i].pouringSpeed;
        }
    )

}

