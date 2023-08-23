"use client";
import { useEffect, useState } from "react";

type Fnc=()=>object|string
export const useCurrentPosition = () => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );

  const getUserPosition:Fnc = () => {
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation(position);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }, []);

    if (userLocation) {
      const data = {
        Latitude: userLocation.coords.latitude,
        Longitude: userLocation.coords.longitude,
      };
      return data;
    }else{
      return "Please check your location settings "
    }
  };

  return getUserPosition;
};
