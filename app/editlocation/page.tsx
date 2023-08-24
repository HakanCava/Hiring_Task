"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  Heading,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useAppDispatch } from "@/redux/hooks";
import { addLocation, deleteLocation } from "@/redux/features/locateSlice";



const EditLocation: React.FC<IEditLocation> = ({ searchParams }) => {

  // useEffect(()=>{
    
  //   const { isLoaded } = useJsApiLoader({
  //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  //   });
  //   if (!isLoaded) {
  //     return <SkeletonText />;
  //   }
  // },[])
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    if (!isLoaded) {
      setContent(<SkeletonText />);
    }
  }, [isLoaded]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const values = searchParams;
  const [locationValue, setLocationValue] = useState({
    lat: +values.lat,
    lng: +values.lng,
  });
  const [locationName, setLocationName] = useState({ name: "", id: "" });
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setLocationValue({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };
  useEffect(() => {
    try {
      const geocoder = new google.maps.Geocoder();

      if (locationValue.lat && locationValue.lng) {
        geocoder.geocode({ location: locationValue }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
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
  }, [locationValue, locationName]);

 

  

  const handleChangeButton = () => {
    let place_name: string;
    place_name = locationName.name.split(",")[0];
    if (place_name.split(" ").length > 1) {
      place_name = locationName.name.split(" ")[0];
    }
    const data = {
      id: locationName.id,
      lat: locationValue.lat,
      lng: locationValue.lng,
      placeName: place_name,
      placeInfo: locationName.name,
      marker: values.marker,
    };
    dispatch(deleteLocation(values.id));
    dispatch(addLocation(data));
    setLocationValue({ lat: locationValue.lat, lng: locationValue.lng });
    setLocationName({ name: "", id: "" });
    router.push("/getlocations");
  };

  return (
    <Flex width="100vw" height={`calc(100vh - 70px)`}>
      {content}
      <Flex flex={1} flexDirection="column">
        <Box width="100%">
          <Heading
            height="75px"
            color="white"
            as="h4"
            size="md"
            bg="teal"
            textAlign="center"
            p="5"
            data-testid="editHeading"
          >
            Change Location
          </Heading>
        </Box>
        {
          <>
            <Box bg="yellow" width="100%" my="5" textAlign="center">
              <Text p="3">{values.placeInfo}</Text>
              <Text>
                latitude:{values.lat} & longitude:{values.lng}
              </Text>
            </Box>

            <Box textAlign="center" bg="gray.300" p="3" mb="5">
              <Text bg="blue.400" color="whiteAlpha.900" fontWeight={500}>
                New Value
              </Text>
              {values.id !== locationName.id && (
                <Text>{locationName.name}</Text>
              )}
            </Box>

            <Box width="100%">
              <Button
                colorScheme="teal"
                width="100%"
                onClick={handleChangeButton}
              >
                Change Location
              </Button>
            </Box>
          </>
        }
      </Flex>

      <Flex flex={4}>
        <GoogleMap
          center={locationValue}
          zoom={13}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onClick={handleMapClick}
        >
          <Marker position={locationValue} />
        </GoogleMap>
      </Flex>
    </Flex>
  );
};

export default EditLocation;
