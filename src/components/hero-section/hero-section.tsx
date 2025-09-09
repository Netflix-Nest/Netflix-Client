import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Button,
  HStack,
  VStack,
  Flex,
  Badge,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { Play, Info } from "lucide-react";
import { Content } from "@netflix-clone/types";

const HeroSection = ({ movieData }: { movieData: Content }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const containerPadding = useBreakpointValue({ base: 2, md: 4, lg: 8 });
  const titleSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "6xl" });

  const data = movieData;

  useEffect(() => {
    // Simulate loading trailer after 3 seconds
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
      console.log("video load...");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      position="relative"
      h={{ base: "80vh", md: "90vh", lg: "100vh" }}
      w="100%"
      overflow="hidden">
      <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={0}>
        {isVideoLoaded ? (
          <Box position="relative" w="100%" h="100%">
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => {
                console.log("Video loaded successfully");
              }}
              onError={(e) => {
                console.log("Video error:", e);
              }}>
              <source
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/videos/${movieData.trailer}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Box>
        ) : (
          <Box w="100%" h="100%" position="relative">
            <Box
              w="100%"
              h="100%"
              bgImage={`url(${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${movieData.thumbnail})`}
              bgSize="cover"
              bgPos={"center"}
              bgRepeat="no-repeat"
            />
          </Box>
        )}

        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bgGradient="linear(to-r, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          w="100%"
          h="200px"
          bgGradient="linear(to-t, rgba(0,0,0,0.9) 0%, transparent 100%)"
        />
      </Box>

      {/* Content */}
      <Container
        maxW="container.xl"
        h="100%"
        px={containerPadding}
        margin={"24"}>
        <Flex
          direction="column"
          justify="center"
          h="100%"
          maxW={{ base: "100%", md: "60%", lg: "45%" }}>
          <HStack mb={4}>
            <Image
              width={25}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${process.env.NEXT_PUBLIC_SYMBOL_NETFLIX}`}
            />
            {movieData.genres?.map((genre) => (
              <Text
                color="white"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider">
                {genre.name} |
              </Text>
            ))}
          </HStack>

          {/* Title */}
          <Text
            fontSize={titleSize}
            fontWeight="bold"
            color="white"
            lineHeight="shorter"
            mb={6}
            textShadow="2px 2px 4px rgba(0,0,0,0.8)">
            {data.title}
          </Text>

          {/* Description */}
          <Text
            color="white"
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="tall"
            mb={8}
            maxW="500px"
            textShadow="1px 1px 2px rgba(0,0,0,0.8)">
            {data.description}
          </Text>

          {/* Buttons */}
          <HStack mb={6}>
            <Button
              bg="white"
              color="black"
              size="lg"
              fontWeight="bold"
              px={8}
              _hover={{
                bg: "gray.200",
                transform: "scale(1.05)",
              }}
              transition="all 0.2s">
              <Play size={20} />
              Phát
            </Button>

            <Button
              variant="outline"
              colorScheme="whiteAlpha"
              size="lg"
              fontWeight="bold"
              px={6}
              _hover={{
                bg: "whiteAlpha.200",
                transform: "scale(1.05)",
              }}
              transition="all 0.2s">
              <Info size={20} />
              Thông tin khác
            </Button>
          </HStack>

          {/* Rating Badge */}
          <Box>
            <Badge
              bg="gray.700"
              color="white"
              px={3}
              py={1}
              fontSize="sm"
              fontWeight="bold"
              borderRadius="md">
              {data.ageRating}
            </Badge>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection;
