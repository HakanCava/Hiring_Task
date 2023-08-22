"use client";
import { useAppSelector } from "@/redux/hooks";
import {
  Flex,
  Heading,
  ListIcon,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Icon,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { useState } from "react";
import Locations from "@/components/locations/Locations";

const GetLocations = () => {
  const locations = useAppSelector((state) => state.locate.locations);
  console.log(locations);
  const [toggle, setToggle] = useState(false);
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
        border="1px"
        borderColor="red"
        p="1"
        justifyContent="center"
        my="2"
      >
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th border="1px">Place Name</Th>
                <Th border="1px">Icon</Th>
                {toggle && <Th></Th>}
                <Th border="1px">Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {locations?.map((location) => (
                <Tr key={location.id}>
                  <Td>{location.placeName}</Td>
                  <Td>
                    <FaMapMarkerAlt onClick={()=>setToggle(pre=>!pre)} color={location.marker} fontSize="1.5rem" />
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
              ))} */}
              {locations?.map((location) => (
              <Locations key={location.id} location={location}/>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

export default GetLocations;
