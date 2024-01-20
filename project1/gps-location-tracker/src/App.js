import './App.css';
import React,{useState} from "react";


function App() {

  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();
  const [address, setAddress] = useState();
  const geo = navigator.geolocation;

  // Get user current location
  geo.getCurrentPosition(userCords);
  function userCords(position){
    let userLatitude = position.coords.latitude;
    let userLongitude = position.coords.longitude;
    console.log(userLatitude,userLongitude);
    setLatitude(userLatitude);
    setLongitude(userLongitude);
  }
  const getUserAddress = async()=>{
    let url = `https://api.opencagedata.com/geocode/v1/json?key=f1d8dc2106704a8cb9b391c49af3b3dc&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
    const loc = await fetch(url);
    const data = await loc.json()
    console.log("User Adress: ",data);
    setAddress(data.results[0].formatted);
  }
  const handlGetAddress = ()=>{
    getUserAddress();
  }

  return (
    <div className="App">
      <h1>
        Current Location
      </h1>
      <h2>{latitude}</h2>
      <h2>{longitude}</h2>
      <h2>{address}</h2>
      <button onClick={handlGetAddress}> Get Address</button>

    </div>
  );
}

export default App;
