"use client";
import React, { useState, useRef, useEffect } from "react";
import "./marker.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SkeletonText } from "@chakra-ui/react";

interface Props {
  id: number | string;
  lat: number;
  lng: number;
  placeName: string;
  placeInfo: string;
  marker: string;
}

type IMarkerInfo = {
  location: Props;
  userLocation: GeolocationPosition | any;
  setTextDistance: React.Dispatch<React.SetStateAction<string>>;
  setTextDuration: React.Dispatch<React.SetStateAction<string>>;
};

type Fnc = (lat1: number, lng1: number, lat2: number, lng2: number) => any;

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
  //!==============
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState(""); //!mesafe
  const [duration, setDuration] = useState(""); //!süre

  const originRef = useRef<HTMLInputElement>(null);
  const destiantionRef = useRef<HTMLInputElement>(null);

  const calculateRoute = async () => {
    // if (!originRef.current || !destiantionRef.current) {
    //   return;
    // }
    
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
    console.log(results);
    setDirectionsResponse(results);
    if (
      results.routes[0].legs[0].distance &&
      results.routes[0].legs[0].duration
    ) {
      setTextDistance(results.routes[0].legs[0].distance.text); //!mesafe
      setTextDuration(results.routes[0].legs[0].duration.text); //!süre
    }
  };
  const clearRoute = () => {
    setDirectionsResponse(null);
    setTextDistance(""); //!mesafe
    setTextDuration(""); //!süre
    // if (originRef.current) {
    //   originRef.current.value = "";
    // }
    // if (destiantionRef.current) {
    //   destiantionRef.current.value = "";
    // }
  };
  //!==============



  console.log(startMarker);
  const handleDistance: Fnc = (lat1, lng1, lat2, lng2) => {
    try {
      const R = 6371000; // Dünya yarıçapı in metre
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lng2 - lng1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = Math.round(R * c);
      console.log(`Mesafe: ${distance} metre`);
      // setTextDistance(`${distance}`);
      return distance;
    } catch (error) {
      console.log(error);
    }
  };
  //     const handleDistance2 = () => {
  //       try {
  //         const distance =
  //           window.google.maps.geometry.spherical.computeDistanceBetween(
  //             startMarker,
  //             endMarker
  //           );
  //         console.log(`Mesafe: ${distance} metre`);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  if (!isLoaded) {
    return <SkeletonText />;
  }

  console.log(userLocation);
  return (
    <>
      <Marker
        position={{ lat: location.lat, lng: location.lng }}
        icon={{
          url: `https://maps.google.com/mapfiles/ms/icons/${location.marker}-dot.png`,
          scaledSize: new window.google.maps.Size(50, 50),
        }}
        // label={{
        //   text: toggle ? location.placeInfo : " ",
        //   className: `labelStyle ` + (!toggle && "styl"),
        // }}
        title={location.placeName}
        onClick={() => {
         
          setToggle((pre) => !pre);
          // handleDistance(
          //   userLocation && userLocation.coords
          //     ? userLocation.coords.latitude
          //     : 41.01317962397874,
          //   userLocation && userLocation.coords
          //     ? userLocation.coords.longitude
          //     : 28.994509706224644,
          //   location.lat,
          //   location.lng
          // );
          // handleDistance2()
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
