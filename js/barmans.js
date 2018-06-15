"use strict";


let data = JSON.parse(FooBar.getData());

let bartendersLength = data.bartenders.length;
let beersLength = data.beertypes.length;
let storageLength = data.storage.length;
let queueLength = data.queue.length;
let beerNames = [];
let beerPopularityArr = Array.apply(null, Array(10)).map(Number.prototype.valueOf,0);
let storageArr = [];
let barman = data.bartenders;



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
    queueState();
    loadKeg();
    setTimeout(function(){loadTapLabels();}, 1500);
    tapsOnMainBar();



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
        $("#diamond"+i+">#diamond>#inside").css("fill", "#d85459")


    } else if (data.bartenders[i].status=="READY") {
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "#59D854")
        $("#diamond"+i+">#diamond>#inside").css("fill", "#59D854")
    } else {
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "#d3d3d3")
        $("#diamond"+i+">#diamond>#inside").css("fill", "#d3d3d3")

    }

}


function queueState(){
    let queueDiv = document.getElementById("queueDiv");
    let newQueueNumber = document.createElement('p');

    newQueueNumber.id = 'queueNumberId';

    newQueueNumber.innerHTML = queueLength;

    queueDiv.appendChild(newQueueNumber);


}


function tapsState(){
    let tempTapsArr=data.taps;
    let tap;
    let isInUse;
    let tapsDiv = document.getElementById("tapsDiv");

    console.log(tempTapsArr);
    for(let i=0; i<tempTapsArr.length; i++){
        tap= tempTapsArr[i].beer;
        isInUse = tempTapsArr[i].inUse;

            let newTapContainer = document.createElement('div');
            let newSvgContainer = document.createElement('div');

             let newTap = document.createElement('p');
             let newTapInUse = document.createElement('p');
     
             newTapContainer.id = 'tapContainerId'+i;
             newSvgContainer.id = 'svgContainerId'+i;

            newTap.id = 'tapId'+i;
             newTapInUse.id = 'tapInUseId'+i;
             
             newTapContainer.className = 'tapContainerClass';
             newSvgContainer.className = 'svgContainerClass';
             newTap.className = 'tapClass';
             newTapInUse.className = 'tapInUseClass';

            newTap.innerHTML = tap;
            newTapInUse.innerHTML = isInUse;


 
        
            newTapContainer.appendChild(newTap);
            newTapContainer.appendChild(newTapInUse);
            newTapContainer.appendChild(newSvgContainer);
            tapsDiv.appendChild(newTapContainer);


    }


}

let breakCounterArr = Array.apply(null, Array(bartendersLength)).map(Number.prototype.valueOf,0);

function checkIfBoredomBreak(){

    for(let i=0;i<bartendersLength; i++){

    if(data.bartenders[i].status == "READY"){
        console.log("is working");
        breakCounterArr[i]++;
    }
    else{
        breakCounterArr[i] = 0;
    }
    
    if(breakCounterArr[i]==5){
        console.log(data.bartenders[i].name +" is taking a break out of boredom");
    }

    if(breakCounterArr[i]>0)
    console.log(data.bartenders[i].name + " " +breakCounterArr[i])

}
}

function checkIfTimeForBreak(){

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
     
             newKegContainer.id = 'kegContainerId'+i;
                newKeg.id = 'kegId'+i;
             
             newKegContainer.className = 'kegContainerClass';
             newKeg.className = 'kegClass';

            newKeg.innerHTML = keg;

            newKegContainer.appendChild(newKeg);
            for(let j = 0; j<amount; j++){
                let newSvg = document.createElement('img');
                newSvg.id = 'barrelSvg'+j;
                newSvg.className = 'barrelSvg';
                newSvg.setAttribute("src", "images/barrel"+ i+".svg");
                newKegContainer.appendChild(newSvg);
            }
            kegsDiv.appendChild(newKegContainer);


    }


}

function updateStorage(){
    let tempKegsArr=data.storage;
    let keg;
    let amount;
    let kegsDiv = document.getElementById("kegsDiv");
    $('#kegsDiv div').find('img').remove()
    for(let i=0; i<storageLength; i++){
        amount = tempKegsArr[i].amount;
        for(let j = 0; j<amount; j++){
            let newKegContainer = document.getElementById('kegContainerId'+ i);
            let newSvg = document.createElement('img');
            newSvg.id = 'barrelSvg'+j;
                newSvg.className = 'barrelSvg';
                newSvg.setAttribute("src", "images/barrel"+ i+".svg");
                newKegContainer.appendChild(newSvg);
        }
        
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
        let handle = $("#svgContainerId"+i+">#Layer_1>#hand>#handle")

        if(isInUse==true){
        handle.css("fill", "grey");
        handle.css("transform", "rotate(90deg)");
        handle.css("transformOrigin", "55% 38% 0px");
    }
        else{
        handle.css("fill", "black");
        handle.css("transform", "rotate(0deg)");
        handle.css("transformOrigin", "-55% -38% 0px");
        }
    
        
    }
}



async function loadKeg() {

    let tempTapsArr=data.taps;


    for(let i=0; i<tempTapsArr.length; i++){
        let svgKeg = await fetch ("images/parentkeg2.svg");
        let myKeg = await svgKeg.text();
    let svgConDiv = document.getElementById("svgContainerId"+i); ///putting kegs on zoomed bar
    svgConDiv.innerHTML = myKeg;
    }


    for(let i=0; i<bartendersLength; i++){
        let svgKeg = await fetch ("images/parentkeg2.svg");
        let myKeg = await svgKeg.text();
        let tapMainConDiv = document.getElementById("tapMainContainerId"+i); ///putting kegs on main bar
        tapMainConDiv.innerHTML = myKeg;

    }

}

function loadTapLabels(){
    let tempTapsArr=data.taps;
    


    console.log(tempTapsArr);

    for(let i=0; i<tempTapsArr.length; i++){
        let beerLabelNr;
    for(let j= 0; j<beersLength;j++)//checking id of label for this beer
    {
        
        if(tempTapsArr[i].beer==data.beertypes[j].name){
            beerLabelNr=j;
        }
    }
    let x = $("#svgContainerId"+i+">#Layer_1>#keg>#lbl"+ beerLabelNr);

    
    x.css("visibility", "visible");
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

function tapsOnMainBar(){
    let mainTapsD = document.getElementById("mainTapsDiv");
    for(let i = 0; i<bartendersLength; i++){
        let newTapContainer = document.createElement('div');
        newTapContainer.id = 'tapMainContainerId'+i;
        newTapContainer.className = 'tapMainContainerClass';
mainTapsD.appendChild(newTapContainer);
    }
}


function checkPopularity(){

    for(let i= 0; i<bartendersLength; i++){
       if(data.bartenders[i].statusDetail == "receivePayment"){
    countPopularity(data.serving[i].order, beerNames);
}

    }

}


<<<<<<< HEAD
function USD(){
    for(let i= 0; i<bartendersLength; i++){
        if(data.bartenders[i].statusDetail == "receivePayment"){

            document.querySelector("#dollar"+i).style.display="inline-block";

            setTimeout(function(){ 
            document.querySelector("#dollar"+i).style.display="none";
            }, 4000);
        }
    }
=======
function animateBeerPouring(){
    for(let i= 0; i<bartendersLength; i++){
        let handle = $("#tapMainContainerId"+i+">#Layer_1>#hand>#handle")

        if(data.bartenders[i].statusDetail == "pourBeer"){

           
            handle.css("fill", "grey");
            handle.css("transform", "rotate(90deg)");
            handle.css("transformOrigin", "55% 38% 0px");
        }
            else{
            handle.css("fill", "black");
            handle.css("transform", "rotate(0deg)");
            handle.css("transformOrigin", "-55% -38% 0px");
            }
        }
    
>>>>>>> 93de70eb8366f09dc7044c417f88f27f6373d782
}

function updateQueue(){
    let queueNumber = document.getElementById("queueNumberId");
    queueLength = data.queue.length;

    queueNumber.innerHTML = queueLength;
}



function updateData(){
    data = JSON.parse(FooBar.getData());
}






 



window.setInterval(function(){  ///INTERVAL THAT UPDATES EVERY 1 SECS
    updateData();
    updateBartenders();
    checkIfBoredomBreak();
    updateQueue();
<<<<<<< HEAD
    USD();
=======
    animateBeerPouring();
>>>>>>> 93de70eb8366f09dc7044c417f88f27f6373d782
    
    }, 1000);

    window.setInterval(function(){  ///INTERVAL THAT UPDATES EVERY 4 SECS
        
        checkPopularity();
        updateTopBeers();
        updateStorage();
        updateTaps();
        
       
        }, 4000);





   document.addEventListener("DOMContentLoaded", start());
    
