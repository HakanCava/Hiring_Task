"use client";
import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { deleteLocation } from "@/redux/features/locateSlice";

const Locations: React.FC<ILocations> = ({ location }) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useAppDispatch();
  const params = {
    id: location.id,
    lat: location.lat,
    lng: location.lng,
    placeName: location.placeName,
    placeInfo: location.placeInfo,
    marker: location.marker,
  };
  const handleDelete = (id: number | string) => {
    dispatch(deleteLocation(id));
  };
  return (
    <>
      <Tr key={location.id}>
        <Td data-testid="placeName">{location.placeName}</Td>
        <Td display={{ base: "none", lg: "block" }}>{location.placeInfo}</Td>
        <Td>
          <FaMapMarkerAlt
            onClick={() => setToggle((pre) => !pre)}
            color={location.marker}
            fontSize="1.5rem"
          />
          {toggle && (
            <>
              latitude:{location.lat} & longitude:{location.lng}
            </>
          )}
        </Td>

        <Td>
          <Link href={{ pathname: "/editlocation", query: params }}>
            <BsBoxArrowInUpRight color="red" fontSize="1.3rem" />
          </Link>
        </Td>
        <Td>
          <AiFillDelete
            data-testid="deleteBtn"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(location.id)}
            color="red"
            fontSize="1.3rem"
          />
        </Td>
      </Tr>
    </>
  );
};

export default Locations;
