import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'



const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState({
        humidity: 0,
        windSpeed: 0,
        temp: 0,
        location: "",
        icon:''
    });

    const search = async (city)=>{

        if(city ===""){
            alert("Enter city name! ");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);


            // const icon = allIcons[data.weather[0].icon] || clear_icon;

            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: iconUrl
                // icon : data.weather[0].icon


            });


        } catch (error){
            
            console.error("Error in featching data", error);
            alert("Error fetching weather data. Please try again.");
        } 
    };

    useEffect(()=>{
        search("Kolkata")
    },[])


  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={()=> search(inputRef.current.value)} />
      </div>
            {weatherData?<>
        <img src={weatherData.icon} alt="Weather - Icon" className='weather-icon'/>            
      <p className='temp'>{weatherData.temp} °C </p>
      <p className='city'>{weatherData.location}</p>


      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windSpeed}Kmph</p>
                <span>Wind speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather
