"use client";
import { Flex, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex alignItems="center" justifyContent="center" border="5px" borderColor="red.200"width="100vw" height={`calc(100vh - 70px)`}>
      <Heading bg="teal" color="white" boxShadow='dark-lg' p='6' rounded='md' data-testid="heading">Hiring Map :)</Heading>
    </Flex>
  );
}
