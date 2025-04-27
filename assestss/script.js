//fetch the data
const YourWeather=document.querySelector(".yourweather");
const SearchWeather=document.querySelector(".searchweather");
const grantlocnt=document.querySelector(".grandlocation");
const formcont=document.querySelector(".formconatiner");
const lodingcontainer=document.querySelector(".lodingcontainer");
const userinputcontainer=document.querySelector(".userinputcontainer");


const API_KEY="8df8b6ff848495b3953c704e3e5e951e";
let currentTab=YourWeather;
//currentTab.classList.add("current-Tab");
getcoordinatesdisplay();
function switchTab(clickedTab){
   if(clickedTab!=currentTab){
      //currentTab.classList.remove("current-Tab");
      currentTab=clickedTab;
      //currentTab.classList.add("current-Tab");
   
   //ager m search tab active nhi h
   if(!formcont.classList.contains("active")){
      //its means ye hide h to ise visible krao
      grantlocnt.classList.remove("active");
      userinputcontainer.classList.remove("active");
      formcont.classList.add("active");

   }
   //form conatiner visible h to uslo hide kro
   else{
        formcont.classList.remove("active");
        userinputcontainer.classList.remove("active");
        getcoordinatesdisplay();
        
   }
}
}
// if(currentTab==clickedTab){
//    clickedTab= currentTab;
// }


YourWeather.addEventListener('click',()=>{
   switchTab(YourWeather);
})
SearchWeather.addEventListener('click',()=>{
   switchTab(SearchWeather);
});
function getcoordinatesdisplay(){
   let coordinates=sessionStorage.getItem("get-container");
   if(!coordinates){
      grantlocnt.classList.add("active");

   }
   else{
      let localcoordinates=JSON.parse(coordinates);
      fetchweathercall(localcoordinates);
     
   }
   console.log('giii');
   
}
// function getfromSessionStorage() {
//    const localCoordinates = sessionStorage.getItem("user-coordinates");
//    if(!localCoordinates) {
//        //agar local coordinates nahi mile
//        grantAccessContainer.classList.add("active");
//    }
//    else {
//        const coordinates = JSON.parse(localCoordinates);
//        fetchUserWeatherInfo(coordinates);
//    }

// }
//api call
async function fetchweathercall(localcoordinates){
    //show loader
    //take coordinates
    const {lat, lon} = localcoordinates;
   //  console.log(localcoordinates);
    
   //  localcoordinates=lon;
   //  localcoordinates=lat;
    grantlocnt.classList.remove("active");
    lodingcontainer.classList.add("active");
    try{
      const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
       );
       console.log(response);
       
    let data=await response.json();
    console.log(data);
    
    lodingcontainer.classList.remove("active");
    userinputcontainer.classList.add("active");
    //render
    renderusercontainer(data);
    }catch(e){
      lodingcontainer.classList.add("active");
    }


}
console.log('everthing is fine');

function renderusercontainer(weatherInfo){
   let cityName=document.querySelector(".name");
   let cityicon=document.querySelector(".citycode");
   let des=document.querySelector(".description");
   let whimg=document.querySelector(".wheaterimg");
   let temp=document.querySelector(".datatemp");
   let windsp=document.querySelector(".parametervalue");
   let humidity=document.querySelector(".parameterhumidity");
   
   console.log(weatherInfo);
   let clouds=document.querySelector(".parameterclouds");
   cityName.innerText=weatherInfo?.name;
   cityicon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
   des.innerText = weatherInfo?.weather?.[0]?.description;
   whimg.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
   temp.innerText=`${weatherInfo?.main?.temp} °C`;
   windsp.innerText=`${weatherInfo?.wind?.speed} m/s`;
   humidity.innerText=`${weatherInfo?.main?.humidity}%`;
   clouds.innerText= `${weatherInfo?.clouds?.all}%`;
   
}
//access 
console.log('fine too');

function getlocation(){
   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
   }
   else{

   }
}
console.log('fine 3');

function showPosition(position){
   const userCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
  }

   sessionStorage.setItem("get-container",JSON.stringify(userCoordinates));
   fetchweathercall(userCoordinates);

}
console.log('fine 4');




let accessbutt=document.querySelector(".grantaccess");
accessbutt.addEventListener('click',getlocation);
let searchbut=document.querySelector(".searchbutt")
// const searchForm = document.querySelector("[data-searchForm]");
let search=document.querySelector(".datasearch");
searchbut.addEventListener("click", (e) => {
   e.preventDefault();
   let cityName = search.value;

   if(cityName === "")
       return;
   else 
       fetchSearchWeatherInfo(cityName);
})




async function  fetchSearchWeatherInfo(city) {
    lodingcontainer.classList.add("active");
    userinputcontainer.classList.remove("active");
    grantlocnt.classList.remove("active");
   
   try{

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    console.log(response);
    
    const data= await response.json();
    lodingcontainer.classList.remove("active");
    userinputcontainer.classList.add("active");
    renderusercontainer(data);
   }
   catch(e){
      userinputcontainer.classList.remove("active");
   }

   
}