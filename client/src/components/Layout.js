import { Box, Center, Heading } from "@chakra-ui/react";

export function Layout({ children }) {
  return (
    <>
      <Center h="80px" mb="50px">
        <Heading>D&amp;D Crafter</Heading>
      </Center>
      <Center>
        <Box>{children}</Box>
      </Center>
    </>
  );
}
