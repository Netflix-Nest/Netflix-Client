"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Icon,
  Container,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BiError } from "react-icons/bi";
import { MdRefresh, MdHome } from "react-icons/md";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return <div>{error.message}</div>;
}

// Netflix-style Dark Theme Version for Chakra UI v3
export function NetflixErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Netflix Clone Error:", error);
  }, [error]);

  return (
    <Box
      minH="100vh"
      bg="black"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}>
      <Stack gap={8} textAlign="center" maxW="md" align="center">
        {/* Netflix-style Error Icon */}
        <Box
          p={8}
          borderRadius="xl"
          bg="rgba(229, 9, 20, 0.1)"
          border="2px solid"
          borderColor="red.600">
          <Icon as={BiError} boxSize={20} color="red.600" />
        </Box>

        {/* Error Content */}
        <Stack gap={6} align="center">
          <Heading size="2xl" color="white" fontWeight="bold">
            Something went wrong
          </Heading>

          <Text
            fontSize="xl"
            color="gray.300"
            lineHeight="tall"
            textAlign="center">
            Sorry, we're having trouble loading this page. Please try again or
            return to browse.
          </Text>
        </Stack>

        {/* Netflix-style Buttons */}
        <Stack gap={4} w="full">
          <Button
            bg="red.600"
            color="white"
            size="lg"
            w="full"
            h="50px"
            fontSize="lg"
            fontWeight="bold"
            onClick={reset}
            _hover={{ bg: "red.700" }}
            _active={{ bg: "red.800" }}>
            Try Again
          </Button>

          <Button
            variant="outline"
            borderColor="gray.600"
            color="white"
            size="lg"
            w="full"
            h="50px"
            fontSize="lg"
            onClick={() => (window.location.href = "/")}
            _hover={{
              borderColor: "white",
              bg: "rgba(255, 255, 255, 0.1)",
            }}>
            Netflix Home
          </Button>
        </Stack>

        {/* Error Code (for development) */}
        {process.env.NODE_ENV === "development" && error.digest && (
          <Text fontSize="xs" color="gray.500" fontFamily="mono">
            Error Code: {error.digest}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
