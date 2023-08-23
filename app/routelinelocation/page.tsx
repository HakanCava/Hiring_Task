"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  LoadScript,
} from "@react-google-maps/api";
import {
  Button,
  Flex,
  Input,
  SkeletonText,
  Heading,
  Divider,
  Text,
  Box,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { addLocation } from "@/redux/features/locateSlice";
import { text } from "stream/consumers";
import MarkerInfo from "@/components/marker/Marker";

type LatLngLiteral = google.maps.LatLngLiteral;

const RouteLine = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [textDistance, setTextDistance] = useState("");

  const [userLocation, setUserLocation] = useState<GeolocationPosition | any>();

  useEffect(() => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  const locations = useAppSelector((state) => state.locate.locations);
  console.log("locations: ", locations);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  return (
    <Flex width="100vw" height={`calc(100vh - 70px)`}>
      <Flex flex={1} flexDirection="column">
        <Box width="100%">
          <Heading
            height="50px"
            color="white"
            as="h4"
            size="md"
            bg="teal"
            textAlign="center"
          >
            Distance
          </Heading>
        </Box>
        <Box>
          <Text>
            <Heading as="h4"
            size="md">Your Distance:</Heading>
            {textDistance} metre
          </Text>
        </Box>
      </Flex>

      <Flex flex={4}>
        <GoogleMap
          center={{
            lat:
              userLocation && userLocation.coords
                ? userLocation.coords.latitude
                : 41.01317962397874,
            lng:
              userLocation && userLocation.coords
                ? userLocation.coords.longitude
                : 28.994509706224644,
          }}
          zoom={13}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          // onClick={handleMapClick}
        >
          <Marker
            position={{
              lat:
                userLocation && userLocation.coords
                  ? userLocation.coords.latitude
                  : 41.01317962397874,
              lng:
                userLocation && userLocation.coords
                  ? userLocation.coords.longitude
                  : 28.994509706224644,
            }}
            title="user position"
          />
          {locations.map((location) => (
            <MarkerInfo
              key={location.id}
              location={location}
              userLocation={userLocation}
              textDistance={textDistance}
              setTextDistance={setTextDistance}
            />
          ))}
        </GoogleMap>
      </Flex>
    </Flex>
  );
};

export default RouteLine;
