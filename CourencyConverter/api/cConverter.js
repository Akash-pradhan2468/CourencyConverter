const url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
// const dropdowns=document.querySelectorAll(".dropdown select");
// // for(code in countryList){
// //     console.log(code,countryList[code])
// // }
// for(let select of dropdowns){
//     for(let currCode in countryList){
//         let newoption=document.createElement("option")
//         newoption.innerText=currCode;
//         newoption.value=currCode;
//         select.append(newoption)
//     }
const formCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select ")
const btn=document.querySelector("form button")
const dropdowns=document.querySelectorAll(".dropdown select")
for(let select of dropdowns){
    for(let currCode in countryList){
        let newoption=document.createElement("option")
        newoption.innerText=currCode
        newoption.value=currCode
        select.append(newoption)
        if(select.name=="from"&&currCode=="USD"){
            newoption.selected="selected"
        }else if(select.name==="to"&&currCode=="INR"){
            newoption.selected="selected"
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode]
    let newsrc=`https://flagsapi.com/${countryCode}/shiny/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newsrc
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input" )
    let amtVal=amount.value
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1"
    }
    const nurl=`${url}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    const response= await fetch(nurl)
    const data= await response.json()
    const rate=data[toCurr.value.toLowerCase()]
    const finalAmount=amtVal*rate
    const msg=document.querySelector(".msg")
    msg.innerText=`${amount.value} ${formCurr.value} = ${finalAmount} ${toCurr.value}`

})



    
