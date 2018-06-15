"use strict";


let data = JSON.parse(FooBar.getData());    //fetching data 

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


function start(){   /// function that populates all of the areas on page load



    storageState();             //calling all the different functions populating different "bar areas"
    tapsState();
    queueState();
    loadKeg();
    tapsOnMainBar();
    createBartenders();
    topBeersState();
    setTimeout(function(){loadTapLabels();}, 2500);

 
}





function topBeersState(){  //populating blackboard with most popular beers

    for(let i= 0; i<beersLength; i++){ 
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

}




function createBartenders(){   //main bar gets the bartenders


    let bartendersWrapper = document.createElement('div');
    bartendersWrapper.id = 'bartendersWrapper';
    document.body.appendChild(bartendersWrapper);


    for(let i= 0; i<bartendersLength; i++){    //loop that populates bartenders with their details
        let bartendersContainer = document.createElement('div');

        let newSvg = document.createElement('img'); //svg in form of img because we dont need to manipulate any of the components
        let newName = document.createElement('p');





        loadSvg(i);

        newSvg.id = 'bartenderSvg'+i;
        newName.id = 'bartenderName'+i;
        bartendersContainer.id = 'bartendersContainer';



        newSvg.className = 'bartenderSvg';
        newName.className = 'bartenderName';

        newSvg.setAttribute("src", "images/" + data.bartenders[i].name + ".svg");  //trick so it was easier to populate

        newName.innerHTML = data.bartenders[i].name;

        bartendersWrapper.appendChild(bartendersContainer);
        bartendersContainer.appendChild(newSvg);
        bartendersContainer.appendChild(newName);


    }


}


function updateDiamonds(){              //updating diamond colors depending on the bartender

    for(let i= 0; i<bartendersLength; i++){
        diamondColour(i);
    }


}


function diamondColour(i){  ///based on state it shows different colors of diamond above bartenders head

    if (data.bartenders[i].status=="WORKING") {  //if he is busy its red
        
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "#d85459")
        $("#diamond"+i+">#diamond>#inside").css("fill", "#d85459")


    } else if (data.bartenders[i].status=="READY") {  //if he is ready for work its green
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "#59D854")
        $("#diamond"+i+">#diamond>#inside").css("fill", "#59D854")
    } else {                                                            //else it is grey(it's for the future)
        $("#diamond"+i+">#diamond>#dcolour").css("fill", "#d3d3d3")
        $("#diamond"+i+">#diamond>#inside").css("fill", "#d3d3d3")

    }

}


function queueState(){                                      //simply fetches the number of people(groups?) in the queue
    let queueDiv = document.getElementById("queueDiv");
    let newQueueNumber = document.createElement('p');

    newQueueNumber.id = 'queueNumberId';

    newQueueNumber.innerHTML = queueLength;

    queueDiv.appendChild(newQueueNumber);


}


function tapsState(){                                       //function that populates the taps on the zoom bar
    let tempTapsArr=data.taps;
    let tap;
    let tapsDiv = document.getElementById("tapsDiv");

    for(let i=0; i<tempTapsArr.length; i++){
        tap= tempTapsArr[i].beer;

            let newTapContainer = document.createElement('div');
            let newSvgContainer = document.createElement('div');

             let newTap = document.createElement('p');
     
             newTapContainer.id = 'tapContainerId'+i;
             newSvgContainer.id = 'svgContainerId'+i;

            newTap.id = 'tapId'+i;
             
             newTapContainer.className = 'tapContainerClass';
             newSvgContainer.className = 'svgContainerClass';
             newTap.className = 'tapClass';

            newTap.innerHTML = tap;


 
        
            newTapContainer.appendChild(newTap);
            newTapContainer.appendChild(newSvgContainer);
            tapsDiv.appendChild(newTapContainer);


    }


}

let breakCounterArr = Array.apply(null, Array(bartendersLength)).map(Number.prototype.valueOf,0); /// it populates the array with zeroes basing on bartenders length

function checkIfBoredomBreak(){   ///if bartender is without any work for 5 seconds he informs that he is going to a break (console), we didn't manage to implement the actual break

    for(let i=0;i<bartendersLength; i++){

    if(data.bartenders[i].status == "READY"){
        breakCounterArr[i]++;
    }
    else{
        breakCounterArr[i] = 0;
    }
    
    if(breakCounterArr[i]==5){
        console.log(data.bartenders[i].name +" is taking a break out of boredom");
    }



}
}





function storageState(){            ///function that populates the storage section on the website basing on state of it on page load
    let tempKegsArr=data.storage;
    let keg;
    let amount;
    let kegsDiv = document.getElementById("kegsDiv");
    for(let i=0; i<storageLength; i++){         ///loop that creates divs and adds names of beers in subsections
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
            for(let j = 0; j<amount; j++){      ///this loop takes care of multiplying the keg images according to their amount in storage
                let newSvg = document.createElement('img');
                newSvg.id = 'barrelSvg'+j;
                newSvg.className = 'barrelSvg';
                newSvg.setAttribute("src", "images/barrel"+ i+".svg");
                newKegContainer.appendChild(newSvg);
            }
            kegsDiv.appendChild(newKegContainer);


    }


}

function updateStorage(){           //function that takes care of updating the storage
    let tempKegsArr=data.storage;
    let keg;
    let amount;
    let kegsDiv = document.getElementById("kegsDiv");
    $('#kegsDiv div').find('img').remove()          //removes all of the old images in the div
    for(let i=0; i<storageLength; i++){
        amount = tempKegsArr[i].amount;             //checks for the current amount of kegs
        for(let j = 0; j<amount; j++){              //and with the help of a loop inside of a loop populates subsections with right amount of kegs
            let newKegContainer = document.getElementById('kegContainerId'+ i);
            let newSvg = document.createElement('img');
            newSvg.id = 'barrelSvg'+j;
                newSvg.className = 'barrelSvg';
                newSvg.setAttribute("src", "images/barrel"+ i+".svg");
                newKegContainer.appendChild(newSvg);
        }
        
    }
}

function updateTaps(){              //funciton that shows the current state of taps depending if they are being used right now
    let tempTapsArr=data.taps;
    let tap;
    let isInUse;
    let tapsDiv = document.getElementById("tapsDiv");

    for(let i=0; i<tempTapsArr.length; i++){
        isInUse = tempTapsArr[i].inUse;                 //is it being used right now?

        let handle = $("#svgContainerId"+i+">#Layer_1>#hand>#handle")       //difficult selection of deeply hidden svg layer through closest placed (unique obviously) id

        if(isInUse==true){                              //if it is in use, animate the handle
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



async function loadKeg() {                  //ASYNC function that allows us to place svg image in DOM with ability to access its children

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

function loadTapLabels(){               //function that makes labels of particular beers on currently used taps visible, while the others are hidden
    let tempTapsArr=data.taps;
    



    for(let i=0; i<tempTapsArr.length; i++){
        let beerLabelNr;
    for(let j= 0; j<beersLength;j++)//checking id of label for this beer
    {
        
        if(tempTapsArr[i].beer==data.beertypes[j].name){
            beerLabelNr=j;
        }
    }
    let x = $("#svgContainerId"+i+">#Layer_1>#keg>#lbl"+ beerLabelNr);      //three hours of struggling with this, didn't work because we tried to access it through async function

    
    x.css("visibility", "visible");
}
    
}


function updateTopBeers(){      //puts two arrays into one so we can populate blackboard with amount of concrete beers bought in this session

  /////////DOWNLOADED FUNCTION FOR ARRAY MERGE I DONT UNDERSTAND THE WAY ITS DECLARED
        Array.prototype.zip = function (arr) {
            return this.map(function (e, i) {
                return [e, arr[i]];
            })
        };
   
    let tempArray = beerNames.zip(beerPopularityArr);
    let tempArraySorted = tempArray.sort(compareSecondColumn);

     for(let i = 0; i< beerNames.length; i++){
     document.getElementById("topBeerSpan"+i).innerHTML = tempArraySorted[i][0] + " ("+tempArraySorted[i][1]+ ")";} //accessing two-dimensional array
}


async function loadSvg(i) {     ///this function takes care of loading diamonds(current state indicators) for each bartender

    let newDiv = document.createElement('div');
   
    // Load SVG

    let svgData = await fetch("images/diamond.svg");
    let mySvg = await svgData.text();
    
   
   
    newDiv.id = 'diamond'+i;
    newDiv.className = 'diamondClass';
    newDiv.innerHTML = mySvg;

    document.getElementById("diamonds").appendChild(newDiv);

}

function tapsOnMainBar(){                                       ////used to place svg taps on main bar, they indicate if the beer is being poured currently
    let mainTapsD = document.getElementById("mainTapsDiv");
    for(let i = 0; i<bartendersLength; i++){
        let newTapContainer = document.createElement('div');
        newTapContainer.id = 'tapMainContainerId'+i;
        newTapContainer.className = 'tapMainContainerClass';
mainTapsD.appendChild(newTapContainer);
    }
}


function checkPopularity(){             ///whenever the payment is being received, it pulls data about last order to beer popularity stats

    for(let i= 0; i<bartendersLength; i++){
       if(data.bartenders[i].statusDetail == "receivePayment"){
    countPopularity(data.serving[i].order, beerNames);
}

    }

}


function USD(){                             ///// graphically shows that bartender is receiving payment
    for(let i= 0; i<bartendersLength; i++){
        if(data.bartenders[i].statusDetail == "receivePayment"){

            document.querySelector("#dollar"+i).style.display="inline-block";

            setTimeout(function(){                                      ///after the animation it hides so the animation could start again with next payment
            document.querySelector("#dollar"+i).style.display="none";
            }, 4000);
        }
    }}
function animateBeerPouring(){                      ////whenever bartender pours the beer the handle is animated
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
    
}

function updateQueue(){         ////updates the number of orders in queue
    let queueNumber = document.getElementById("queueNumberId");
    queueLength = data.queue.length;

    queueNumber.innerHTML = queueLength;
}



function updateData(){                  ///updates the data from which all of the necessary information is being gathered
    data = JSON.parse(FooBar.getData());
}






 



window.setInterval(function(){  ///INTERVAL THAT UPDATES EVERY 1 SECS
    updateData();
    updateDiamonds();
    checkIfBoredomBreak();
    updateQueue();
    USD();
    animateBeerPouring();
    
    }, 1000);

    window.setInterval(function(){  ///INTERVAL THAT UPDATES EVERY 4 SECS
        
        checkPopularity();
        updateTopBeers();
        updateStorage();
        updateTaps();
        loadTapLabels();
       
        }, 4000);



   document.addEventListener("DOMContentLoaded", start());          /// calls the start function when the dom content is loaded
    
