import React, { useEffect, useState } from 'react';
import clearImg from './Assets/clear.png';
import cloudImg from './Assets/cloud.png';
import drizzleImg from './Assets/drizzle.png';
import humidityImg from './Assets/humidity.png';
import rainImg from './Assets/rain.png';
import searchImg from './Assets/search.png';
import snowImg from './Assets/snow.png';
import windImg from './Assets/wind.png';
const Quotes = () => {
  let apiKey = '3f950926c0eb74540d96a70ed71f22c7';
  
  
  const [temp,setTemp] = useState(null);
  
  const [inputVal , setInputVal] = useState();
  const [wicon,setWicon] = useState(clearImg);
  const [weather,setWeather] = useState(false)
 
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=${apiKey}`;
  const change = () => {
      if(inputVal=== ''){
        return 0;
      }
      setWeather(true)
      const fetchData = async () => {
         let res = await fetch(url);
         let data = await res.json();
         setTemp(data)
      }
      fetchData()
      fetchData().then(() => {
       
        if (temp && temp.weather && temp.weather.length > 0) {
          if(temp.weather[0].icon === '01d' || temp.weather[0].icon === '01n' ){
            setWicon(clearImg)
          }else if(temp.weather[0].icon === '02d' || temp.weather[0].icon === '02n' ){
            setWicon(cloudImg)
          }else if(temp.weather[0].icon === '03d' || temp.weather[0].icon === '03n' ){
            setWicon(drizzleImg)
          }else if(temp.weather[0].icon === '04d' || temp.weather[0].icon === '04n' ){
            setWicon(drizzleImg)
          }else if(temp.weather[0].icon === '09d' || temp.weather[0].icon === '09n' ){
            setWicon(rainImg)
          }else if(temp.weather[0].icon === '10d' || temp.weather[0].icon === '10n' ){
            setWicon(rainImg)
          }else if(temp.weather[0].icon === '13d' || temp.weather[0].icon === '013n' ){
            setWicon(snowImg)
          }else{
            setWicon(clearImg)
          }
        }
        
      })
      
  }
  const handlechange = (e) => {
    setInputVal(e.target.value)
  }
  
  return (
    <div className='box'>
      <div className="input-box">
         <input className='inputVal' value={inputVal}  type="text" placeholder='Enter city name' onChange={handlechange} />
         <div onClick={change}  className="img-box">


         <img src={searchImg} alt="" />
         </div>
      </div>
      {weather && (
        <>
<img src={wicon} className='body-img'/>
      {temp && <h1>{temp.main.temp}°C</h1>}
      {temp && <h2>{temp.name}</h2>}
      <div className="bottom">
         <div className="btm-left">
           <div className="info">
             <img src={humidityImg} alt="" />
             {temp && <h3>{temp.main.humidity}%</h3>}
           </div>
           <p>Humidity</p>
         </div>
         <div className="btm-right">
         <div className="info">
             <img src={windImg} alt="" />
             {temp && <h3>{temp.wind.speed}%</h3>}
           </div>
           <p>Wind</p>
         </div>
      </div>
        </>
      )}
        
          
      
      
    </div>
  )
}

export default Quotes;
