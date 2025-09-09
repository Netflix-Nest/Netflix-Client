import React from "react";
import {
  Box,
  Text,
  Image,
  Badge,
  HStack,
  VStack,
  Button,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MovieCard = ({ movie, isFirst = false }) => {
  const cardWidth = useBreakpointValue({
    base: "200px",
    md: "250px",
    lg: isFirst ? "300px" : "250px",
  });

  return (
    <Box
      position="relative"
      w={cardWidth}
      h={isFirst ? "400px" : "350px"}
      borderRadius="md"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.05)",
        zIndex: 10,
      }}>
      {/* Movie Poster */}
      <Image
        src={movie.poster}
        alt={movie.title}
        w="100%"
        h="100%"
        objectFit="cover"
      />

      {/* Overlay */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg="linear-gradient(transparent, rgba(0,0,0,0.8))"
        p={4}>
        <VStack align="flex-start">
          <Text
            color="white"
            fontSize={isFirst ? "lg" : "md"}
            fontWeight="bold">
            {movie.title}
          </Text>

          <HStack>
            {movie.isNew && (
              <Badge bg="red.500" color="white" fontSize="xs">
                Tập mới
              </Badge>
            )}
            {movie.badge && (
              <Badge bg="yellow.500" color="black" fontSize="xs">
                TOP 10
              </Badge>
            )}
            <Badge variant="outline" colorScheme="whiteAlpha" fontSize="xs">
              {movie.rating}
            </Badge>
          </HStack>

          {movie.hasWatchNow && (
            <Button
              size="sm"
              bg="red.500"
              color="white"
              fontSize="xs"
              _hover={{ bg: "red.600" }}>
              Xem ngay
            </Button>
          )}
        </VStack>
      </Box>

      {/* Top 10 Badge */}
      {movie.badge && (
        <Box
          position="absolute"
          top={2}
          right={2}
          bg="red.500"
          color="white"
          px={2}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          borderRadius="sm">
          TOP {movie.topRank}
        </Box>
      )}
    </Box>
  );
};

export default MovieCard;
