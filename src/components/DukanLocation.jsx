import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import customMarkerIcon from '../assets/shope2.png'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { color } from 'chart.js/helpers';
import Button from '@mui/material/Button';

const MyLocation = ({ onLocationSelected }) => {
  const [location, setLocation] = useState({ lat: 20.8059764093009, lng: 72.7061033038038 });
  const [city, setCity] = useState('');
  const [disrict, setDistrict] = useState('');
  const [province, setProvince] = useState('');

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    getcurrentLoaction()
    console.log("for city",location)
    // reverseGeocodeLocation(location.lat, location.lng)
    //       .then(cityName => setCity(cityName));
    //       console.log(city)

  };
  const { isLoaded, loadedError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBb11wIoRaw0VNEEC0rozsqIbbZpmqFzcA"
  });
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;

  }, [Location])
  // ..
  // Function to reverse geocode a location (get city from lat/lng)
  const reverseGeocodeLocation = async (lat, lng) => {
    const apiKey = 'AIzaSyBb11wIoRaw0VNEEC0rozsqIbbZpmqFzcA';  // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;

        // Extract city, district, and province
        const city = addressComponents.find(component =>
          component.types.includes('locality')
        )?.long_name || '';
        setCity(city)

        const district = addressComponents.find(component =>
          component.types.includes('administrative_area_level_2')
        )?.long_name || '';
        setDistrict(district)


        const province = addressComponents.find(component =>
          component.types.includes('administrative_area_level_1')
        )?.long_name || '';

        setProvince(province)

        console.log('City:', city);
        console.log('District:', district);
        console.log('Province:', province);

        return { city, district, province };
      }
    } catch (error) {
      console.error('Error with reverse geocoding:', error);
    }
  };

  // ....


  //   useEffect(() => {
  //     // Get user's current location
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLocation({ lat: latitude, lng: longitude });

  //         // Reverse geocoding to get the city name
  //         fetch(
  //           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
  //         )
  //           .then((response) => response.json())
  //           .then((data) => {
  //             if (data.results.length > 0) {
  //               const addressComponents = data.results[0].address_components;
  //               const cityName = addressComponents.find((component) =>
  //                 component.types.includes('locality')
  //               )?.long_name || '';
  //               setCity(cityName);
  //             }
  //           })
  //           .catch((error) => console.error('Error fetching city name:', error));
  //       },
  //       (error) => console.error('Error getting location:', error)
  //     );
  //   }, []);\\\



  // ///////////////

  useEffect(() => {
    getcurrentLoaction()

  }, []);
  function getcurrentLoaction() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
console.log("onclic loction",position)

        // Reverse geocode the new location to get the city
        reverseGeocodeLocation(latitude, longitude)
         

        if (mapRef.current) {
          mapRef.current.panTo(location);
          mapRef.current.setZoom(14);
        }


      },
      (error) => console.error('Error getting location:', error),
      { enableHighAccuracy: true } // Optional: Improve accuracy of the location
    );

  }

  if (loadedError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;
  const handleMarkerDragEnd = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setLocation(newLocation);
console.log("changes drag",newLocation)

    // Reverse geocode the new location to get the city
    reverseGeocodeLocation(newLocation.lat, newLocation.lng)
   


    // Update your Dukan data state with the new location if needed
    // setDukandata((prevData) => ({
    //   ...prevData,
    //   shopLatitude: newLocation.lat,
    //   shopLongitude: newLocation.lng,
    // }));
  };
console.log("location",location)
  return (

    <div className='md:w-[70%] w-full mb-5'>
      <div className="flex flex-col space-y-2 items-center bg-gray-100 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-medium text-gray-800">Your Location</h2>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-600">Latitude:</p>
          <p className="text-sm text-gray-800">{location.lat}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-600">Longitude:</p>
          <p className="text-sm text-gray-800">{location.lng}</p>
        </div>

        <Button onClick={(() => { onLocationSelected(location,city,disrict,province) })} variant="contained" className=' bg-yellow-300   mb-9  h-9 p-3'>Confirm Location</Button>

      </div>


      <div>

        <GoogleMap
          ref={mapRef}
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={location}
          onLoad={onMapLoad}
          zoom={20}
        >
          {/* <MarkerF position={location}
          icon={{
            url: customMarkerIcon,
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 50),
          }}
          /> */}

          <MarkerF
            position={location}
            icon={{
              url: customMarkerIcon,
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 50), // Set the icon size
              // Anchor point (where the marker is placed relative to the icon)
            }}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}

          />
          <div className="absolute z-50 right-2 bottom-[50%]"> {/* Positioned bottom-right */}
            <button
              className=" bg-white text-black px-2 py-2 rounded-md hover:bg-slate-400 focus:outline-none    "
              onClick={getcurrentLoaction}
            >
              <MyLocationIcon style={{ color: isClicked ? 'blue' : 'black' }}
                onClick={handleClick} />
            </button>
          </div>
        </GoogleMap>
      </div>
    </div>

  );
};

export default MyLocation;
