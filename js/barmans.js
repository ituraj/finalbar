"use strict";


let data = JSON.parse(FooBar.getData());

let bartendersLength = data.bartenders.length;
let beersLength = data.beertypes.length;
let storageLength = data.storage.length;
let beerNames = [];
let beerPopularityArr = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);
let storageArr = [];




function compareSecondColumn(a, b) {  ////STACK OVERFLOW FUNCTION FOR SORTING 2-DIMENSIONAL ARRAYS
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}



function countPopularity(arr1, arr2){  ////creates array in which beernumber from beerlist is assigned to amount of ordered beers

    for(let i=0; i<arr1.length; i ++){
        for(let j=0; j<arr2.length; j ++){
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

    storageState();
    tapsState();
    



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
            beerNames.push(data.beertypes[i].name);

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

        newSvg.setAttribute("src", "images/" + data.bartenders[i].name + ".svg");
        newStatusDetail.innerHTML = data.bartenders[i].statusDetail;

        bartendersWrapper.appendChild(bartendersContainer);
        bartendersContainer.appendChild(newSvg);
        bartendersContainer.appendChild(newName);
        bartendersContainer.appendChild(newStatus);
        bartendersContainer.appendChild(newStatusDetail);

      

        updateTopBeers();
       
        

    }
}

function updateData(){
    data = JSON.parse(FooBar.getData());
}


function updateBartenders(){

        
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

    


    if (data.bartenders[i].status=="WORKING") {
        
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "#d85459")

    } else if (data.bartenders[i].status=="READY") {
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "green")
    } else {
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "grey")

    }

}





function tapsState(){
    let tempTapsArr=data.taps;
    let tap;
    let isInUse;
    let tapsDiv = document.getElementById("tapsDiv");
    for(let i=0; i<tempTapsArr.length; i++){
        tap= tempTapsArr[i].beer;
        isInUse = tempTapsArr[i].inUse;

            let newTapContainer = document.createElement('div');
             let newTap = document.createElement('p');
             let newTapInUse = document.createElement('p');
     
             newTapContainer.id = 'tapContainerId'+i;
            newTap.id = 'tapId'+i;
             newTapInUse.id = 'tapInUseId'+i;
             
             newTapContainer.className = 'tapContainerClass';
             newTap.className = 'tapClass';
             newTapInUse.className = 'tapInUseClass';

            newTap.innerHTML = tap;
            newTapInUse.innerHTML = isInUse;

            newTapContainer.appendChild(newTap);
            newTapContainer.appendChild(newTapInUse);
            tapsDiv.appendChild(newTapContainer);


    }


}






function storageState(){
    let tempKegsArr=data.storage;
    let keg;
    let amount;
    let kegsDiv = document.getElementById("kegsDiv");
    for(let i=0; i<storageLength; i++){
        keg= tempKegsArr[i].name;
        amount = tempKegsArr[i].amount;

            let newKegContainer = document.createElement('div');
             let newKeg = document.createElement('p');
             let newKegAmount = document.createElement('p');
     
             newKegContainer.id = 'kegContainerId'+i;
                newKeg.id = 'kegId'+i;
             newKegAmount.id = 'kegAmountId'+i;
             
             newKegContainer.className = 'kegContainerClass';
             newKeg.className = 'kegClass';
             newKegAmount.className = 'kegAmountClass';

            newKeg.innerHTML = keg;
            newKegAmount.innerHTML = amount;

            newKegContainer.appendChild(newKeg);
            newKegContainer.appendChild(newKegAmount);
            kegsDiv.appendChild(newKegContainer);


    }


}

function updateStorage(){
    let tempKegsArr=data.storage;
    let keg;
    let amount;
    let kegsDiv = document.getElementById("kegsDiv");
    for(let i=0; i<storageLength; i++){
        amount = tempKegsArr[i].amount;
        keg = document.getElementById('kegAmountId'+ i);
        keg.innerHTML = amount;
        
    }
}

function updateTaps(){
    let tempTapsArr=data.taps;
    let tap;
    let isInUse;
    let tapsDiv = document.getElementById("tapsDiv");
    for(let i=0; i<tempTapsArr.length; i++){
        isInUse = tempTapsArr[i].inUse;
        tap = document.getElementById('tapInUseId'+ i);
        tap.innerHTML = isInUse;
        
    }
}




function updateTopBeers(){

  /////////DOWNLOADED FUNCTION FOR ARRAY MERGE I DONT UNDERSTAND THE WAY ITS DECLARED
        Array.prototype.zip = function (arr) {
            return this.map(function (e, i) {
                return [e, arr[i]];
            })
        };
   
    //let tempBeerPopArr = beerPopularityArr.sort(function(a, b){return a - b});
    let tempArray = beerNames.zip(beerPopularityArr);
    let tempArraySorted = tempArray.sort(compareSecondColumn);
    // console.log(tempArraySorted);

     for(let i = 0; i< beerNames.length; i++){
     document.getElementById("topBeerSpan"+i).innerHTML = tempArraySorted[i];}
}


async function loadSvg(i) {

    let newDiv = document.createElement('div');
   
    // Load SVG

    let svgData = await fetch("images/diamond.svg");
    let mySvg = await svgData.text();
    
   
   
    newDiv.id = 'diamond'+i;
    newDiv.className = 'diamondClass';
    newDiv.innerHTML = mySvg;

    document.getElementById("diamonds").appendChild(newDiv);

}


function checkPopularity(){

    for(let i= 0; i<bartendersLength; i++){
       if(data.bartenders[i].statusDetail == "receivePayment"){
    countPopularity(data.serving[i].order, beerNames);
    // console.log(beerPopularityArr);
}

    }

}





 



window.setInterval(function(){  ///INTERVAL THAT UPDATES EVERY 1 SECS
    updateData();
    updateBartenders();
    }, 1000);

    window.setInterval(function(){  ///INTERVAL THAT UPDATES EVERY 4 SECS
        
        checkPopularity();
        updateTopBeers();
        updateStorage();
        updateTaps();
        }, 4000);





   document.addEventListener("DOMContentLoaded", start());
    
