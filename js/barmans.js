
let datas= JSON.parse(FooBar.getData());

let bartendersLength = datas.bartenders.length;


function start(){
    
    let bartendersContainer = document.createElement('div');


    for(let i= 0; i<bartendersLength; i++){
        let bartendersContainer = document.createElement('div');


        let newSvg = document.createElement('img');
        let newName = document.createElement('p');

         let newStatus = document.createElement('p');
         let newStatusDetail = document.createElement('p');
         


        newSvg.id = 'bartenderSvg'+i;
        newStatus.id = 'status'+i;
        newName.id = 'bartenderName'+i;
        newStatusDetail.id = 'statusDetail'+i;

        newSvg.className = 'bartenderSvg';
        newStatus.className = 'status';
        newStatusDetail.className = 'statusDetail';
        newName.className = 'bartenderName';

        newSvg.setAttribute("src", "images/" + datas.bartenders[i].name + ".svg");
        console.log(datas.bartenders[i].name);

        newStatusDetail.innerHTML = datas.bartenders[i].statusDetail;

        document.body.appendChild(bartendersContainer);
        bartendersContainer.appendChild(newSvg);
        bartendersContainer.appendChild(newName);
        bartendersContainer.appendChild(newStatus);
        bartendersContainer.appendChild(newStatusDetail);
       
        

    }
}


function updateBartenders(){

         datas = FooBar.getData();
         let data = JSON.parse(datas);

    for(let i= 0; i<bartendersLength; i++){
    
        document.getElementById("status"+i).innerHTML = data.bartenders[i].status;
        document.getElementById("bartenderName"+ i).innerHTML = data.bartenders[i].name;
        document.getElementById("statusDetail"+ i).innerHTML = data.bartenders[i].statusDetail;

    
    }



}



window.setInterval(function(){
    updateBartenders();
    
 
    
   }, 3000);

   start();