import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

  const [weather,setWeather] = useState({
    current: {
      temp_c : 15,
      humidity: 19,
      wind_kph: 10,
      condition: {
        icon : "//cdn.weatherapi.com/weather/64x64/day/176.png",
        text : "Cloudy"
      },
      last_updated: "17/03/24"
    }
  }) ;
  const [windspeed,setwindspeed] = useState(0) ;
  const [temp, settemp] = useState(35) ;
  const [humidity,sethumidity] = useState(90) ;
  const [condition, setcondition] = useState("cloudy") ;
  const [img,setimg] = useState("//cdn.weatherapi.com/weather/64x64/day/176.png") ;
  const [time, settime] = useState("17/03/24") ;

  let cityref = useRef() ;
  let city = "" ;

  let searchhandle = async() => {
    let text = cityref.current.value ;
    console.log(text);
    city = text ;
    try {
      let data  = await fetch(`http://api.weatherapi.com/v1/current.json?key=18a65c77ab604e6f8c254336241703&q=${city}&aqi=no`);
      let details = await data.json() ;
      if(!details.error) setWeather(details) ;
      console.log(details);
    } catch (error) {
      alert(error) ;
    }
  }

  useEffect(() => {
    settemp(weather.current.temp_c) ;
    sethumidity(weather.current.humidity) ;
    setcondition(weather.current.condition.text) ;
    setimg(weather.current.condition.icon) ; 
    setwindspeed(weather.current.wind_kph) ;
    settime(weather.current.last_updated) ;
    console.log();
  },[searchhandle])

  return (
    <>
      <div className="container w-[300px] bg-slate-400 mx-auto my-24 flex flex-col items-center rounded-md">
        <div className="searchbox mt-6">
          <div className='flex'>
            <input type="text" ref={cityref} className='bg-white outline-none rounded-l-lg p-2' placeholder='Enter city name'
            />
            <button className='bg-red-600 rounded-r-lg px-4 font-bold text-white'onClick={searchhandle}>Search</button>
          </div>
        </div>
        <div className="boxes flex justify-between gap-8 my-3 items-center">
          <div className="leftbox flex flex-col gap-1 items-center">
            {/* Icon chahiye */}
            <img src= {img} alt="" className='w-28 h-28' />
            <span className='text-lg font-bold'>{condition}</span>
          </div>
          <div className="rightbox flex flex-col items-center font-bold">
            <div className="temp text-2xl">{temp}<sup>o</sup>C</div>
            <div className="wind flex flex-col justify-between">
              <span>WindSpeed : {windspeed}</span>
              <span>Humidity: {humidity}%</span>
            </div>
          </div>
        </div>
        <div className="timestamp">
          <span className='font-bold text-lg'>Last Updated: {time}</span>
        </div>
      </div>
    </>
  )
}

export default App
