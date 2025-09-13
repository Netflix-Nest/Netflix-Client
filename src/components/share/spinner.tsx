import { Box } from "@chakra-ui/react";

export default function Spinner() {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center">
      <Box
        width="48px"
        height="48px"
        border="4px solid"
        borderColor="red.500"
        borderTopColor="transparent"
        borderRadius="50%"
        animation="spin 1s linear infinite"
      />
    </Box>
  );
}
