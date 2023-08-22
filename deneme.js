// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { Flex, Input, Button } from '@chakra-ui/react';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const defaultCenter = {
//   lat: -34.397,
//   lng: 150.644
// };

// const MapComponent: React.FC = () => {
//   const [locations, setLocations] = useState<Array<{ lat: number; lng: number; name: string }>>([]);
//   const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
//   const [locationName, setLocationName] = useState('');

//   const handleMapClick = (event: google.maps.MouseEvent) => {
//     const newLocation = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//       name: locationName
//     };

//     setLocations([...locations, newLocation]);
//   };

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLocationName(event.target.value);
//   };

//   return (
//     <Flex direction="column" align="center">
//       <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={selectedLocation}
//           zoom={10}
//           onClick={handleMapClick}
//         >
//           {locations.map((loc, index) => (
//             <Marker key={index} position={{ lat: loc.lat, lng: loc.lng }} />
//           ))}
//         </GoogleMap>
//       </LoadScript>

//       <Input
//         placeholder="Location Name"
//         value={locationName}
//         onChange={handleNameChange}
//         my={2}
//       />

//       <Button colorScheme="teal" my={2}>
//         Save Location
//       </Button>
//     </Flex>
//   );
// };

// export default MapComponent;


// //////////////////////////////////!

// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { Flex } from '@chakra-ui/react';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const defaultCenter = {
//   lat: -34.397,
//   lng: 150.644
// };

// const MapComponent: React.FC = () => {
//   const [selectedLocation, setSelectedLocation] = React.useState(defaultCenter);
//   const [selectedLocationName, setSelectedLocationName] = React.useState('');

//   const handleMapClick = async (event: google.maps.MouseEvent) => {
//     const geocoder = new google.maps.Geocoder();

//     const latLng = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng()
//     };

//     geocoder.geocode({ location: latLng }, (results, status) => {
//       if (status === google.maps.GeocoderStatus.OK) {
//         if (results[0]) {
//           setSelectedLocationName(results[0].formatted_address);
//         }
//       }
//     });

//     setSelectedLocation(latLng);
//   };

//   return (
//     <Flex direction="column" align="center">
//       <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={selectedLocation}
//           zoom={10}
//           onClick={handleMapClick}
//         >
//           <Marker position={selectedLocation} />
//         </GoogleMap>
//       </LoadScript>

//       {selectedLocationName && <p>Selected Location: {selectedLocationName}</p>}
//     </Flex>
//   );
// };

// export default MapComponent;
