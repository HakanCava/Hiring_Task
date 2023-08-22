"use client";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  id: number | string;
  lat: number; 
  lng: number; 
  placeName: string;
  placeInfo:string;
  marker: string;
}

type ILocations={
  location:Props
}

const Locations:React.FC<ILocations> = ({location}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      
        <Tr key={location.id}>
          <Td>{location.placeName}</Td>
          <Td>
            <FaMapMarkerAlt
              onClick={() => setToggle((pre) => !pre)}
              color={location.marker}
              fontSize="1.5rem"
            />
          </Td>
          {toggle && (
            <Td>
              latitude:{location.lat} & longitude:{location.lng}
            </Td>
          )}
          <Td>
            <BsBoxArrowInUpRight color="red" fontSize="1.3rem" />
          </Td>
        </Tr>
  
    </>
  );
};

export default Locations;
