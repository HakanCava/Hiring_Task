"use client";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useAppDispatch } from "@/redux/hooks";
import { deleteLocation } from "@/redux/features/locateSlice";

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
  const dispatch = useAppDispatch();
  const params = {
    id: location.id ,
    lat:location.lat ,
    lng:location.lng ,
    placeName:location.placeName ,
    placeInfo:location.placeInfo,
    marker:location.marker ,
  };
  const handleDelete=(id:number|string)=>{
dispatch(deleteLocation(id))
  }
  return (
    <>
      
        <Tr key={location.id}>
          <Td>{location.placeName}</Td>
          <Td>{location.placeInfo}</Td>
          <Td>
            <FaMapMarkerAlt
              onClick={() => setToggle((pre) => !pre)}
              color={location.marker}
              fontSize="1.5rem"
            />{toggle && (
             <>
                latitude:{location.lat} & longitude:{location.lng}
             </>
              
            )}
          </Td>
         
          <Td>
            <Link href={{ pathname: '/editlocation', query: params }}>
            <BsBoxArrowInUpRight color="red" fontSize="1.3rem" />
            </Link>
          </Td>
          <Td>
            <AiFillDelete onClick={()=>handleDelete(location.id)} color="red" fontSize="1.3rem" />
          </Td>
        </Tr>
  
    </>
  );
};

export default Locations;
