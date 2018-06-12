
let datas= JSON.parse(FooBar.getData());

let bartendersLength = datas.bartenders.length;
let beersLength = datas.beertypes.length;
let beerNames = [];



function shuffle(a) {  //// downloaded function that shuffles arrays
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function start(){

    let bartendersWrapper = document.createElement('div');
    bartendersWrapper.id = 'bartendersWrapper';
    document.body.appendChild(bartendersWrapper);



    for(let i= 0; i<beersLength; i++){ //
            let newTopBeer = document.createElement('p');
            newTopBeer.id = 'topBeer'+i;
            newTopBeer.className = 'topBeer'
            newTopBeer.innerHTML = i + '. <span id = "topBeerSpan'+i+'"></span>'  ;
            blackboardDiv.appendChild(newTopBeer);

            beerNames.push(datas.beertypes[i].name);

    }
  


    
   




    for(let i= 0; i<bartendersLength; i++){    //loop that populates bartenders with their details
        let bartendersContainer = document.createElement('div');

        let newDiamond = document.createElement('object');
        let newSvg = document.createElement('img');
        let newName = document.createElement('p');

         let newStatus = document.createElement('p');
         let newStatusDetail = document.createElement('p');
         


        newSvg.id = 'bartenderSvg'+i;
        newStatus.id = 'status'+i;
        newName.id = 'bartenderName'+i;
        newStatusDetail.id = 'statusDetail'+i;
        bartendersContainer.id = 'bartendersContainer';
        newDiamond.id = 'diamond' + i;



        newSvg.className = 'bartenderSvg';
        newStatus.className = 'status';
        newStatusDetail.className = 'statusDetail';
        newName.className = 'bartenderName';
        newDiamond.className = 'diamond';

        newSvg.setAttribute("src", "images/" + datas.bartenders[i].name + ".svg");
        newDiamond.setAttribute("data", "images/diamond.svg");
        newDiamond.setAttribute("type", "image/svg+xml");

        newStatusDetail.innerHTML = datas.bartenders[i].statusDetail;

        bartendersWrapper.appendChild(bartendersContainer);
        bartendersContainer.appendChild(newDiamond);
        bartendersContainer.appendChild(newSvg);
        bartendersContainer.appendChild(newName);
        bartendersContainer.appendChild(newStatus);
        bartendersContainer.appendChild(newStatusDetail);


       
        

    }
}

function updateData(){
    return JSON.parse(FooBar.getData());
}


function updateBartenders(){

        
         let data = updateData();
         let currentStatus;

    for(let i= 0; i<bartendersLength; i++){

        currentStatus = data.bartenders[i].status;

    
        document.getElementById("status"+i).innerHTML = data.bartenders[i].status;
        document.getElementById("bartenderName"+ i).innerHTML = data.bartenders[i].name;
        document.getElementById("statusDetail"+ i).innerHTML = data.bartenders[i].statusDetail;

    
    }

}


function updateTopBeers(){
    let data = updateData();
    let tempBeerArr= shuffle(beerNames);

    for(let i = 0; i< beerNames.length; i++){
    document.getElementById("topBeerSpan"+i).innerHTML = tempBeerArr[i];
}
}


 



window.setInterval(function(){
    updateData();
    updateBartenders();
    updateTopBeers();
    
 
    
   }, 3000);

   start();