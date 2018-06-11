
let datas= JSON.parse(FooBar.getData());

let bartendersLength = datas.bartenders.length;


function start(){

    let bartendersWrapper = document.createElement('div');
    bartendersWrapper.id = 'bartendersWrapper';
    document.body.appendChild(bartendersWrapper);
   




    for(let i= 0; i<bartendersLength; i++){
        let bartendersContainer = document.createElement('div');

        let newDiamond = document.createElement('img');
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
        newDiamond.setAttribute("src", "images/diamond.svg");
        newStatusDetail.innerHTML = datas.bartenders[i].statusDetail;

        bartendersWrapper.appendChild(bartendersContainer);
        bartendersContainer.appendChild(newDiamond);
        bartendersContainer.appendChild(newSvg);
        bartendersContainer.appendChild(newName);
        bartendersContainer.appendChild(newStatus);
        bartendersContainer.appendChild(newStatusDetail);


       
        

    }
}


function updateBartenders(){

         datas = FooBar.getData();
         let data = JSON.parse(datas);
         let currentStatus;

    for(let i= 0; i<bartendersLength; i++){

        currentStatus = data.bartenders[i].status;

    
        document.getElementById("status"+i).innerHTML = data.bartenders[i].status;
        document.getElementById("bartenderName"+ i).innerHTML = data.bartenders[i].name;
        document.getElementById("statusDetail"+ i).innerHTML = data.bartenders[i].statusDetail;

    
    }



}

// function setDiamondColor(diamond, color){
//     diamond.
// }



window.setInterval(function(){
    updateBartenders();
    
 
    
   }, 3000);

   start();