"use client";
import React from 'react'
import { Flex, Box, Link, Icon } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <Flex height="70px" bg="blue.400">
      <Flex flex={1} alignItems="center" justifyContent="center">
        <Link href="/">
          <Icon as={FaMapMarkerAlt} w={8} h={8} color="red.500" />
        </Link>
      </Flex>
      <Flex flex={4} justifyContent="space-evenly" alignItems="center" color="white">
        <Box  display="flex" alignItems="center">
          <Link href="/addlocation">Add Location</Link>
        </Box>
        
        <Box display="flex" alignItems="center">
            <Link href="/getlocations">
          Get Locations
            </Link>
        </Box>
        <Box display="flex" alignItems="center">
            <Link href="/routelinelocation">
          Location Route Line
            </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
