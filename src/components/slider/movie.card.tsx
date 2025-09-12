import React, { useEffect, useState } from "react";
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
import { FaStar } from "react-icons/fa";

import { Content } from "@netflix-clone/types";
import NetflixMovieDialog from "./movie.modal";

const MovieCard = ({ movie }: { movie: Content }) => {
  const cardWidth = useBreakpointValue({
    base: "200px",
    md: "250px",
    lg: "289px",
  });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVideoLoaded(true);
        console.log("video load...");
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setIsVideoLoaded(false);
    }
  }, [isOpen]);
  return (
    <>
      <Box
        position="relative"
        w={cardWidth}
        h={"163px"}
        borderRadius="md"
        overflow="hidden"
        cursor="pointer"
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.05)",
        }}
        onClick={() => setIsOpen(true)}>
        {/* Movie Poster */}
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${movie.thumbnail}`}
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
            <Text color="white" fontSize={"md"} fontWeight="bold">
              {movie.title}
            </Text>

            <HStack>
              <Badge variant="plain" colorScheme="whiteAlpha" fontSize="xs">
                {(movie.totalScoreRating / movie.ratingCount).toFixed(1) || 5}{" "}
                <FaStar />
              </Badge>
            </HStack>

            {/* {movie.hasWatchNow && (
            <Button
              size="sm"
              bg="red.500"
              color="white"
              fontSize="xs"
              _hover={{ bg: "red.600" }}>
              Xem ngay
            </Button>
          )} */}
          </VStack>
        </Box>

        {/* Top 10 Badge */}
        {/* {movie.badge && (
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
      )} */}
      </Box>
      <NetflixMovieDialog
        movie={movie}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isVideoLoaded={isVideoLoaded}
      />
    </>
  );
};

export default MovieCard;
