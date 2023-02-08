let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let flag='create'
let tempIndex; // stor the id of update product
let searchMod="byTitle" ;
/*====================================================================*/
//---------------------------------------------------------------------
let array=[];
if(localStorage.getItem("products")!=null){
    array=JSON.parse(localStorage.getItem("products"));
}
    
//-----------------------Add & update  Products-------------------------------------
submit.onclick=()=>{
    product = {
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value
        };
        if(flag=="create"){ //-----create 
    
            if(product.title==""||product.price==""||product.count==""||product.category==""){
            alert("There is a lack of information");
            }
            else{
            for(i=1;i<=count.value;i++){    
            array.push(product);
            localStorage.setItem("products",JSON.stringify(array));
            }
        
        }
        }else{ //----- update 
            if(product.title==""||product.price==""||product.count==""||product.category==""){
                alert("There is a lack of information");
                }
                else{
                   
                 array[tempIndex]=(product);
                 localStorage.setItem("products",JSON.stringify(array));
                 count.style.display="block"
                 submit.innerHTML="Create"
                 flag="create"
                 inputs=document.querySelectorAll(".inputs input");
                 inputs.forEach((element)=>{
                 element.style.color="white "
                                          })
                }

        }
        clearData()
        showData()
        getTotal()

}
//-----------------------calcule Total---------------------------------
getTotal=function(){
    
    if (price.value!=""){
        let result =(+price.value+ +taxes.value + +ads.value )- +discount.value; 
        total.innerHTML=result;
        total.style.backgroundColor=" rgb(121, 121, 44)"

    }
    else{ 
        total.innerHTML=0;
        total.style.backgroundColor=" rgb(90, 7, 7)"
    }
}
//-----------------------Clear & dhow Data-------------------------------

function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
};

function showData(){
    let trs="";
    array.forEach((element,index) => {
             trs+=`<tr>
                    <td>${index}</td>
                    <td>${element.title}</td>
                    <td>${element.price}</td>
                    <td>${element.taxes}</td>
                    <td>${element.ads}</td>
                    <td>${element.discount}</td>
                    <td>${element.total}</td>
                    <td>${element.category}</td>
                    <td><button id="update" onclick=" updateProduct(${index})" >Update</button></td>
                    <td><button id="delete" onclick=" deleteProduct(${index})">Delete</button></td>
                </tr> `;
        
             
      });
     document.getElementById("tbody").innerHTML=trs;
  
     if(array.length>0){
       btn=` <button id="deleteAll" onclick="deleteAll()" >
              delete All (${array.length})
            </button>`;
       document.getElementById("btn-continer2").innerHTML=btn;}
    else{
        document.getElementById("btn-continer2").innerHTML="----------------------";
    }

};
showData()

//-------------------------------Delete---------------------------------
function deleteProduct(index){
    array.splice(index, 1);
    localStorage.setItem("products",JSON.stringify(array));
    showData()

}
//------------------------------UpdateProduct(button)----------------------------------
function updateProduct(index){
        tempIndex=index;
        title.value=array[index].title;
        price.value=array[index].price;
        taxes.value=array[index].taxes;
        ads.value=array[index].ads;
        discount.value=array[index].discount;
        total.innerHTML=array[index].total;
        count.value=1;
        category.value=array[index].category;

        inputs=document.querySelectorAll(".inputs input");
        inputs.forEach((element)=>{
            element.style.color="red "
        })
        count.style.display='none'
        submit.innerHTML="Update"
        flag='update'
       scroll({top:0,behavior:"smooth"})
        
}

//----------------------------Delete All--------------------------------
function deleteAll(){
    localStorage.removeItem("products");
    array=[]
    showData()

}
//-----------------------------get search mode-----------------------
function getSearchMode(id) {
 let searchBar=document.getElementById('search');
 searchBar.focus();
 if(id=="search-title"){
    searchBar.placeholder="Search by Title";
    searchMod="byTitle"
 }else{
    searchBar.placeholder="Search by Category";
    searchMod="byCategory"
 }

}
//----------------------------Search----------------------------------
function search(){
    let searchValue=document.getElementById('search').value;
 if(searchMod=="byTitle"){
    newarray=array.filter(element=>{
    if(element.title.includes(searchValue)){
        return element ;
    }
   })
}

else{
    newarray=array.filter(element=>{
        if(element.category.includes(searchValue)){
            return element ;
        }
       })
}
//--
let tempa =array
array=newarray
showData();
array=tempa

}