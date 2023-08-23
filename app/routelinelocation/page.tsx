"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { Flex, SkeletonText, Heading, Text, Box } from "@chakra-ui/react";
import MarkerInfo from "@/components/marker/Marker";

const RouteLine = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [textDistance, setTextDistance] = useState("");
  const [textDuration, setTextDuration] = useState("");

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
            py="3"
          >
            Distance
          </Heading>
        </Box>
        <Box p="3">
          <Text>
            <Heading as="h4" size="md">
              Your Distance:
            </Heading>
            {textDistance}
          </Text>
          <Text>
            <Heading as="h4" size="md">
              Your Duration:
            </Heading>
            {textDuration}
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
              setTextDistance={setTextDistance}
              setTextDuration={setTextDuration}
            />
          ))}
        </GoogleMap>
      </Flex>
    </Flex>
  );
};

export default RouteLine;
