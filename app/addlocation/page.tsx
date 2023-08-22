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

const AddLocation = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(
    () => ({ lat: 41.01317962397874, lng: 28.994509706224644 }),
    []
  );

  const locations = useAppSelector((state) => state.locate.locations);
  console.log("locations: ",locations);
  const [selectedLocation, setSelectedLocation] = useState(center);
  const dispatch = useAppDispatch();
  const [locationName, setLocationName] = useState({ name: "", id: "" });
  const [markerColor, setMarkerColor] = useState("");
  const colors = ["blue", "red", "green", "purple"];



  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  useEffect(() => {
    try {
      const geocoder = new google.maps.Geocoder();

      if (selectedLocation.lat && selectedLocation.lng) {
        geocoder.geocode({ location: selectedLocation }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
            console.log(results);
            if (results[0]) {
              setLocationName({
                ...locationName,
                name: results[0].formatted_address,
                id: results[0].place_id,
              });
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedLocation]);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const handleSaveButton = () => {
    const data = {
      id: locationName.id,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      placeName: locationName.name,
      marker: markerColor,
    };
    setSelectedLocation(center)
    setLocationName({ name: "", id: "" })
    setMarkerColor("")
    dispatch(addLocation(data))
    console.log(data);
  };

  console.log(selectedLocation);
  console.log(locationName);
  console.log("color:=>", markerColor);
  return (
    <Flex width="100vw" height={`calc(100vh - 70px)`}>
      <Flex flex={1} flexDirection="column">
        <Box width="100%">
          <Heading height="50px" color="white" as="h4" size="md" bg="teal" textAlign="center">
            Choose Location
          </Heading>
        </Box>
        {locationName.name && locationName.id && (
          <>
            <Box width="100%" my="5">
              <Text bg="yellow" p="3">
                {locationName.name}
              </Text>
            </Box>
            <Box>
              <Text textAlign="center">Choose Marker Color</Text>
              <RadioGroup
                onChange={(e: string) => setMarkerColor(e)}
                value={markerColor}
              >
                <Stack direction="row">
                  {colors.map((color, i) => (
                    <Radio key={i} value={color}>
                      {color}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
            <Box width="100%">
              
              <Button colorScheme="teal" width="100%" onClick={handleSaveButton}>
                Save Location
              </Button>
              
            </Box>{" "}
          </>
        )}
      </Flex>

      <Flex flex={4}>
        <GoogleMap
          center={center}
          zoom={13}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onClick={handleMapClick}
        >
          <Marker position={selectedLocation} />
        </GoogleMap>
      </Flex>
    </Flex>
  );
};

export default AddLocation;