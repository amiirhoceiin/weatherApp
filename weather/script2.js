let getLocapi =async ()=>{
 let getData = await fetch('http://ip-api.com/json/');
 if(getData.status===200){
    let data =  await getData.json();
    return data;
 }
} 


let getWeatherapi = async (lat,lon)=>{
    const apiKey = '979ae4a2dd0e48b9a0b72713242608';
    let getData = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`)
    if(getData.status ===200){
        let data = await getData.json();
        return data
    }
}


let loc = document.querySelector('.location');
let weatherimg = document.querySelector('.weatherimg');
let weatherTemp = document.querySelector('.weatherTemp'); 
let button = document.querySelector('.btn-primary');
let weatherstatus = document.querySelector('.weatherStatus');


function locationFunc(city,country){
 let loc1 = `${city} / ${country}`;   
 loc.innerHTML = loc1;
}

function conditionImage(condition, img, dayOrNight) { 
    switch (condition) {
        case 'Sunny':
            img.src = 'image/day_clear.png';
            break;
        case 'Clear':
            img.src = 'image/night_clear.png';
            break;
        case 'Partly cloudy':
            if (dayOrNight) {
                img.src = 'image/day_partial_cloud.png';
            } else {
                img.src = 'image/night_cloud.png';
            }
            break;
        case 'Cloudy':
        case 'Overcast':
            img.src = 'image/cloudy.png';
            break;
        case 'Mist':
            img.src = 'image/mist.png';
            break;
        case 'Patchy rain possible':
        case 'Patchy light drizzle':
        case 'Light drizzle':
        case 'Freezing drizzle':
        case 'Heavy freezing drizzle':
        case 'Patchy light rain':
        case 'Light rain':
        case 'Moderate rain at times':
        case 'Moderate rain':
        case 'Light rain shower':
          if(dayOrNight){
            img.src = 'image/rain.png';
          }else {
            img.src = 'image/night_rain.png';
          }
          break;
        case 'Heavy rain at times':
        case 'Heavy rain':
        case 'Patchy light rain with thunder':
        case 'Moderate or heavy rain with thunder':
        case 'Thundery outbreaks possible':
            img.src = 'image/rain_thunder.png';
            break;
        case 'Fog':
        case 'Freezing fog':
            img.src = 'image/fog.png';
            break;
        case 'Light sleet':
        case 'Moderate or heavy sleet':
        case 'Ice pellets':
        case 'Light sleet showers':
        case 'Moderate or heavy sleet showers': 
        case 'Light showers of ice pellets':
        case 'Moderate or heavy showers of ice pellets':
            img.src = 'image/sleet.png';
            break;    
        case 'Thunderstorms':
            img.src = 'image/thunder.png';
            break;
        case 'Wind': 
            img.src = 'image/wind.png';
            break;
        case 'Blowing snow':
        case 'Blizzard':
        case 'Light snow':
        case 'Patchy moderate snow':
        case 'Moderate snow':
        case 'Patchy heavy snow':
        case 'Heavy snow':
        case 'Light snow showers':
            if(dayOrNight){
                img.src = 'image/snow.png';
            }else {
                img.src = 'image/night_snow.png';
            }
            break;
        case 'Patchy light snow with thunder':
        case 'Moderate or heavy snow with thunder':
            img.src = 'image/snow_thunder.png';    

    }
}


function temp(tempC,tempF){
 weatherTemp.innerHTML = `${tempC}&degC`;
 let temptoggle = true;
 button.addEventListener('click',()=>{
    if(temptoggle){
        weatherTemp.innerHTML = `${tempF}&degF`
        button.innerHTML = 'centigrade';
        temptoggle=false;
    }else{
        weatherTemp.innerHTML = `${tempC}&degC`
        button.innerHTML = 'Fahrenheit';
        temptoggle=true;
    }
 })
}


getLocapi()
.then((data)=>{
  locationFunc(data.city,data.country);
 console.log(data);

 getWeatherapi(data.lat,data.lon)
 .then((wedata)=>{
    console.log(wedata);
    
    let condition = wedata.current.condition.text;
    console.log(condition);
    
    let dayOrNight = wedata.current.is_day;
    conditionImage(condition,weatherimg,dayOrNight)
    let temp_c = Math.floor(wedata.current.temp_c);
    let temp_F = Math.floor(wedata.current.temp_f);
    temp(temp_c,temp_F);
     weatherstatus.innerHTML = condition || "Data not available";
 })
})

// (async () => {
//     try {
//       let locationData = await getLocapi();
//       locationFunc(locationData.city, locationData.country);
//       console.log(locationData);
  
//       let weatherData = await getWeatherapi(locationData.lat, locationData.lon);
//       console.log(weatherData);
  
//       let condition = weatherData.current.condition.text;
//       let dayOrNight = weatherData.current.is_day;
//       conditionImage(condition, weatherimg, dayOrNight);
  
//       let temp_c = Math.floor(weatherData.current.temp_c);
//       let temp_f = Math.floor(weatherData.current.temp_f);
//       temp(temp_c, temp_f);
//       console.log(condition);
      
//       weatherstatus.innerHTML = condition;
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();


