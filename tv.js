import {Navbar,CategoryPanel,footer} from "./components.js"
document.getElementById(`Navbar`).innerHTML=Navbar();
document.getElementById(`Category-Panel`).innerHTML=CategoryPanel();
document.getElementById("footer").innerHTML=footer();
document.getElementById(`Profile`).textContent=` ${JSON.parse(localStorage.getItem(`Profile`))}`;
if(JSON.parse(localStorage.getItem(`Profile`))==null){
    document.getElementById(`Profile`).textContent=` Login`;
}
const GetCartProducts=async()=>{
    let Response=await fetch(`https://636df0bbb567eed48acd7f24.mockapi.io/cart-product`);
    let Data=await Response.json();
    if(Data.length!=0){
        document.getElementById(`Cart-Count`).textContent=Data.length;
    }
}
GetCartProducts()
const cards = async () => {

 let res = await fetch(`https://636d5048b567eed48abef381.mockapi.io/tv`);

 let data = await res.json();

 append_cards( data);
   
}

cards();

 const append_cards = async (data) => {
  
    let card_div = document.getElementById('cards');
    
    card_div.innerHTML= null;

    data.forEach((el) => {

        let div= document.createElement('div');
        div.onclick=()=>{
            showcarddetails(el);
        }
        div.setAttribute('class','item');

        let img= document.createElement('img');
        img.src = el.imageURL;

        let nameof= document.createElement('p');
        nameof.innerText = el.title;
        nameof.setAttribute('class','name');
        
        let productCount= document.createElement('p');
        productCount.innerText ="Only "+el.quantity+" left";
        productCount.setAttribute('class','quantity');


        let priceof= document.createElement('p');
        priceof.innerText= "Price : "+el.price;
        priceof.style.color="black";
        priceof.style.marginTop="10px";
        priceof.style.fontWeight="bold";

        let btn= document.createElement('button');
        btn.setAttribute('class','offers');
        btn.innerText="Offers Available";
        

        div.append(img,nameof,priceof,productCount,btn);

       card_div.append(div);


        
    });


 }

 const showcarddetails=async(data)=>{
    let arr=[];
    arr.push(data);    
        localStorage.setItem("showdetails",JSON.stringify(arr));
    
        window.location.href="./showcarddetails.html";
    }
        //   sorting 

 let relevanc = document.getElementById('relevance');
relevanc.onclick= () => {
    cards();
}

let low = document.getElementById('low');
low.onclick = async () => {

    let res = await fetch(`https://636d5048b567eed48abef381.mockapi.io/tv`)
    let data = await res.json();
    data.sort((a,b) => a.price-b.price)
    append_cards(data);
}

let high = document.getElementById('high');
high.onclick = async () => {

    let res = await fetch(`https://636d5048b567eed48abef381.mockapi.io/tv`)
    let data = await res.json();
    data.sort((a,b) => b.price-a.price)
    append_cards(data);
}


