"use client";
import React, { useState, useEffect } from "react";
import "./marker.css";
import {
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { SkeletonText } from "@chakra-ui/react";


const MarkerInfo: React.FC<IMarkerInfo> = ({
  location,
  userLocation,
  setTextDistance,
  setTextDuration
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });
  const [content, setContent] = useState<any>(null);
  useEffect(() => {
    if (!isLoaded) {
      setContent(<SkeletonText />);
    }
  }, [isLoaded]);
  const [toggle, setToggle] = useState(false);
  const startMarker = new google.maps.LatLng(
    userLocation && userLocation.coords
      ? userLocation.coords.latitude
      : 41.01317962397874,
    userLocation && userLocation.coords
      ? userLocation.coords.longitude
      : 28.994509706224644
  );

  const endMarker = new google.maps.LatLng(location.lat, location.lng);

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);


  const calculateRoute = async () => {
    
  if(toggle){
    clearRoute()
    return
  }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      // origin: originRef.current.value,
      origin: startMarker,
      destination: endMarker,
      // destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    if (
      results.routes[0].legs[0].distance &&
      results.routes[0].legs[0].duration
    ) {
      setTextDistance(results.routes[0].legs[0].distance.text); 
      setTextDuration(results.routes[0].legs[0].duration.text); 
    }
  };
  const clearRoute = () => {
    setDirectionsResponse(null);
    setTextDistance(""); 
    setTextDuration(""); 
  };

  // if (!isLoaded) {
  //   return <SkeletonText />;
  // }

  return (
    <>
    {content}
      <Marker
        position={{ lat: location.lat, lng: location.lng }}
        icon={{
          url: `https://maps.google.com/mapfiles/ms/icons/${location.marker}-dot.png`,
          scaledSize: new window.google.maps.Size(50, 50),
        }}
 
        title={location.placeName}
        onClick={() => {
          setToggle((pre) => !pre);
          calculateRoute()
        }}
      />
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </>
  );
};

export default MarkerInfo;
