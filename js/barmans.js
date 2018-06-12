"use strict";


let datas= JSON.parse(FooBar.getData());

let bartendersLength = datas.bartenders.length;
let beersLength = datas.beertypes.length;
let beerNames = [];
let beerPopularityArr = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);




function shuffle(a) {  //// downloaded function that shuffles arrays
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function countPopularity(arr1, arr2){
    for(let i=0; i<arr1.length; i ++){
        for(let j=0; j<arr1.length; j ++){
            if(arr1[i]==arr2[j]){
                beerPopularityArr[j]++;
            }
        }
    }

}


function start(){

    let bartendersWrapper = document.createElement('div');
    bartendersWrapper.id = 'bartendersWrapper';
    document.body.appendChild(bartendersWrapper);
    



    for(let i= 0; i<beersLength; i++){ //populating blackboard with most popular beers
            let newTopBeer = document.createElement('p');
            newTopBeer.id = 'topBeer'+i;
            newTopBeer.className = 'topBeer'
            newTopBeer.innerHTML = i+1 + '. <span id = "topBeerSpan'+i+'"></span>'  ;

            if(i<5){
            row1.appendChild(newTopBeer);
            }
            else{
            row2.appendChild(newTopBeer);
            }
            beerNames.push(datas.beertypes[i].name);

    }
  



    
   




    for(let i= 0; i<bartendersLength; i++){    //loop that populates bartenders with their details
        let bartendersContainer = document.createElement('div');

        let newSvg = document.createElement('img');
        let newName = document.createElement('p');

         let newStatus = document.createElement('p');
         let newStatusDetail = document.createElement('p');



        loadSvg(i);

        newSvg.id = 'bartenderSvg'+i;
        newStatus.id = 'status'+i;
        newName.id = 'bartenderName'+i;
        newStatusDetail.id = 'statusDetail'+i;
        bartendersContainer.id = 'bartendersContainer';



        newSvg.className = 'bartenderSvg';
        newStatus.className = 'status';
        newStatusDetail.className = 'statusDetail';
        newName.className = 'bartenderName';

        newSvg.setAttribute("src", "images/" + datas.bartenders[i].name + ".svg");
        newStatusDetail.innerHTML = datas.bartenders[i].statusDetail;

        bartendersWrapper.appendChild(bartendersContainer);
        bartendersContainer.appendChild(newSvg);
        bartendersContainer.appendChild(newName);
        bartendersContainer.appendChild(newStatus);
        bartendersContainer.appendChild(newStatusDetail);

      

        updateTopBeers();
       
        

    }
}

function updateData(){
    return JSON.parse(FooBar.getData());
}


  
async function loadSvg(i) {

    let newDiv = document.createElement('div');
    
    // Load SVG

    let svgData = await fetch("images/diamond.svg");
    let mySvg = await svgData.text();
    console.log(i);
    
    
    newDiv.id = 'diamond'+i;
    newDiv.innerHTML = mySvg;

    document.getElementById("diamonds").appendChild(newDiv);

}

function updateBartenders(){

        
         let data = updateData();
         let currentStatus;

    for(let i= 0; i<bartendersLength; i++){

        currentStatus = data.bartenders[i].status;

    
        document.getElementById("status"+i).innerHTML = data.bartenders[i].status;
        document.getElementById("bartenderName"+ i).innerHTML = data.bartenders[i].name;
        document.getElementById("statusDetail"+ i).innerHTML = data.bartenders[i].statusDetail;

        diamondColour(i);
    }


}


function diamondColour(i){

    let data = updateData();


    if (data.bartenders[i].status=="WORKING") {
        
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "red")

    } else if (data.bartenders[i].statusDetail=="READY") {
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "green")
    } else {
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "aqua")

    }

}



function updateTopBeers(){
    let data = updateData();
    let tempBeerArr= shuffle(beerNames);

    for(let i = 0; i< beerNames.length; i++){
    document.getElementById("topBeerSpan"+i).innerHTML = tempBeerArr[i];
}
}

async function loadSvg(i) {

    let newDiv = document.createElement('div');
   
    // Load SVG

    let svgData = await fetch("images/diamond.svg");
    let mySvg = await svgData.text();
    
   
   
    newDiv.id = 'diamond'+i;
    newDiv.innerHTML = mySvg;

    document.getElementById("diamonds").appendChild(newDiv);

}


<<<<<<< HEAD
function checkPopularity(){
    let data = updateData();

    for(let i= 0; i<bartendersLength; i++){
       
    countPopularity(data.serving[i].order, beerNames);
    }

}


=======
>>>>>>> 90143b4a628a2cecb6a0a7674c8fbbaab08575fd
 



window.setInterval(function(){  ///INTERVAL THAT UPDATES EVERY 3 SECS
    updateData();
    console.log(updateData())
    updateBartenders();
    checkPopularity();
    }, 3000);





    window.setInterval(function(){  ////INTERVAL THAT UPDATES EVERY 20 SECS
        updateTopBeers();
        }, 20000);


   document.addEventListener("DOMContentLoaded", start());
