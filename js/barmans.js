let datas= JSON.parse(FooBar.getData());

let bartendersLength = datas.bartenders.length;


function start(){

    let bartendersWrapper = document.createElement('div');
    bartendersWrapper.id = 'bartendersWrapper';
    document.body.appendChild(bartendersWrapper);
   




    for(let i= 0; i<bartendersLength; i++){
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
