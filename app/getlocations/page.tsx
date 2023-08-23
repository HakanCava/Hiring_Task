"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
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
import { ArrowForwardIcon } from "@chakra-ui/icons";

const GetLocations = () => {
  const locations = useAppSelector((state) => state.locate.locations);
  const router = useRouter();
  return (
    <Flex
      width="100vw"
      height={`calc(100vh - 70px)`}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Flex>
        <Button
          onClick={() => router.push("/routelinelocation")}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
        >
          Show Route
        </Button>
      </Flex>
      <Flex width="90%" height="90%" p="1" justifyContent="center" my="2">
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th border="1px">Place Name</Th>
                <Th border="1px" display={{ base: "none", lg: "block" }} >Place Info</Th>
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
