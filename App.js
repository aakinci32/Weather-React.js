import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [clockState, setClockState] = useState();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  useEffect(() => {
    setInterval(() => {
        const date = new Date();
        setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <div className="app">
      <header className = 'title'>
        <h2>Weather App</h2>
        <p>Created by Arda Akinci</p>
      </header>
      <div className = "summary">
        <p>Enter a city name and press "Enter" to get
          the current weather forecast</p>
      </div>
        <hr></hr>
        <div className="search">
        <p>Enter a City Name:</p>
        <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
        </div>
      <hr></hr>
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <p>Feels Like {data.main.feels_like.toFixed()}°F</p>
            </div>
            <div className="humidity">
              <p>Humidity {data.main.humidity}%</p>
            </div>
            <div className="wind">
            <p>Wind Speed {data.wind.speed.toFixed()} MPH</p>
            </div>
            <br></br>
            <div style ={ {fontSize: '25px'}}> 
            {clockState}
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;