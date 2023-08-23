"use client";
import { useAppSelector } from "@/redux/hooks";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import Locations from "@/components/locations/Locations";

const GetLocations = () => {
  const locations = useAppSelector((state) => state.locate.locations);
  return (
    <Flex
      width="100vw"
      height={`calc(100vh - 70px)`}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Flex>
        <Button>Show Route</Button>
      </Flex>
      <Flex
        width="90%"
        height="90%"
        p="1"
        justifyContent="center"
        my="2"
      >
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th border="1px">Place Name</Th>
                <Th border="1px">Place Info</Th>
                <Th border="1px">Icon</Th>
                <Th border="1px">Edit</Th>
                <Th border="1px">Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {locations?.map((location) => (
                <Locations key={location.id} location={location} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

export default GetLocations;
