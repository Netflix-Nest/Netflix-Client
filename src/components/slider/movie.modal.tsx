import React, { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Box,
  Text,
  Image,
  Flex,
  Badge,
  IconButton,
  VStack,
  HStack,
  AspectRatio,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  FaPlay,
  FaPlus,
  FaThumbsUp,
  FaDownload,
  FaShare,
} from "react-icons/fa";
import { Content } from "@netflix-clone/types";
import { IoIosStar } from "react-icons/io";

const NetflixMovieDialog = ({
  movie,
  isOpen,
  setIsOpen,
  isVideoLoaded,
}: {
  movie: Content;
  isOpen: boolean;
  setIsOpen: (e) => void;
  isVideoLoaded: boolean;
}) => {
  return (
    // <Box p={8} bg="gray.900" minH="100vh">
    <Dialog.Root
      motionPreset="slide-in-bottom"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      size="xl"
      scrollBehavior="outside">
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.800" />
        <Dialog.Positioner style={{ transitionDuration: "0.5s" }}>
          <Dialog.Content
            bg="gray.900"
            color="white"
            borderRadius="xl"
            overflow="visible"
            maxH="90vh">
            {/* Hero Section */}
            <Box position="relative">
              <AspectRatio ratio={16 / 9} maxH="400px">
                {isVideoLoaded ? (
                  <Box position="relative" w="100%" h="100%">
                    <video
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      autoPlay
                      // muted={isMuted}
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
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/videos/${movie.trailer}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${movie.thumbnail}`}
                    alt={movie.title}
                    objectFit="cover"
                    w="100%"
                  />
                )}
              </AspectRatio>

              {/* Gradient overlay */}
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                h="200px"
                bgGradient="linear(to-t, gray.900, transparent)"
              />

              {/* Close button */}
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  position="absolute"
                  top="4"
                  right="4"
                  size="lg"
                  bg="blackAlpha.600"
                  borderRadius={"50%"}
                  color="white"
                  _hover={{ bg: "blackAlpha.800" }}
                />
              </Dialog.CloseTrigger>

              {/* Title and controls overlay */}
              <Box position="absolute" bottom="6" left="6" right="6">
                <VStack align="start" gap={10}>
                  <Text
                    fontSize="4xl"
                    fontWeight="semibold"
                    textShadow="2px 2px 4px rgba(0,0,0,0.8)">
                    {movie.title}
                  </Text>

                  <HStack gap={2}>
                    <Button
                      colorScheme="white"
                      variant="solid"
                      size="2xl"
                      fontSize={24}
                      width={"150px"}
                      bg="white"
                      color="black"
                      _hover={{ bg: "gray.200" }}>
                      <FaPlay />
                      Phát
                    </Button>

                    <IconButton
                      variant="outline"
                      colorScheme="white"
                      size="2xl"
                      borderColor="gray.400"
                      bgColor={"rgba(42,42,42,.6)"}
                      borderRadius={"50%"}
                      _hover={{ borderColor: "white" }}
                      aria-label="Thêm vào danh sách">
                      <FaPlus />
                    </IconButton>

                    <IconButton
                      variant="outline"
                      colorScheme="white"
                      size="2xl"
                      borderRadius={"50%"}
                      bgColor={"rgba(42,42,42,.6)"}
                      borderColor="gray.400"
                      _hover={{ borderColor: "white" }}
                      aria-label="Thích">
                      <FaThumbsUp />
                    </IconButton>
                  </HStack>
                </VStack>
              </Box>
            </Box>

            <Dialog.Body px={6} py={6}>
              <Grid templateColumns="2fr 1fr" gap={8}>
                {/* Left Column - Main Info */}
                <GridItem>
                  <VStack align="start" gap={6}>
                    <HStack gap={4} flexWrap="wrap">
                      <Badge
                        colorScheme="red"
                        fontSize="sm"
                        border={"1px solid #aaa"}>
                        T{movie.ageRating}
                      </Badge>
                      <Badge
                        colorScheme="gray"
                        fontSize="sm"
                        border={"1px solid #aaa"}>
                        {movie.quality}
                      </Badge>
                      <Text fontSize="sm">{movie.year}</Text>

                      {movie.series?.totalSeasonNumber ?? 1 > 1 ? (
                        <Text fontSize="sm">
                          {movie.series?.totalSeasonNumber} mùa
                        </Text>
                      ) : (
                        <></>
                      )}

                      <HStack>
                        {movie.totalScoreRating / movie.ratingCount === 5 ? (
                          <Badge size={"lg"}>
                            <IoIosStar />
                            {movie.totalScoreRating / movie.ratingCount}
                          </Badge>
                        ) : (
                          <Badge>
                            <IoIosStar />
                            {(
                              movie.totalScoreRating / movie.ratingCount
                            ).toFixed(1)}
                          </Badge>
                        )}
                      </HStack>
                    </HStack>

                    <Text fontSize="md" lineHeight="tall" color="gray.300">
                      {movie.description}
                    </Text>
                  </VStack>
                </GridItem>

                {/* Right Column - Details */}
                <GridItem>
                  <VStack align="start" gap={4} fontSize="sm">
                    <Box>
                      <Text color="gray.400" mb={1}>
                        Diễn viên:
                      </Text>
                      <Text>
                        {movie
                          .actors!.map((actor) => actor.fullName)
                          .join(", ")}
                      </Text>
                    </Box>

                    <Box>
                      <Text color="gray.400" mb={1}>
                        Thể loại:
                      </Text>
                      <Text>
                        {movie.genres!.map((genre) => genre.name).join(", ")}
                      </Text>
                    </Box>

                    <Box>
                      <Text color="gray.400" mb={1}>
                        Series này:
                      </Text>
                      <Text>
                        {movie.tags!.map((tag) => tag.name).join(", ")}
                      </Text>
                    </Box>

                    <Box>
                      <Text color="gray.400" mb={1}>
                        Đạo diễn:
                      </Text>
                      <Text>{movie.director}</Text>
                    </Box>

                    <Box>
                      <Text color="gray.400" mb={1}>
                        Studio:
                      </Text>
                      <Text>{movie.studio}</Text>
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>

              {/* <Divider my={6} borderColor="gray.700" /> */}

              {/* Episodes Section */}
              <Box>
                {movie.series && (
                  <Flex justify="space-between" align="center" mb={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      Tập
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      Hiện ngữ
                    </Text>
                  </Flex>
                )}
                {movie.series &&
                  movie.video!.map((episode, index) => (
                    <Flex
                      key={episode.id}
                      p={4}
                      borderRadius="md"
                      _hover={{ bg: "gray.800" }}
                      cursor="pointer"
                      align="start"
                      gap={4}>
                      <Text fontSize="lg" fontWeight="bold" minW="40px">
                        {index + 1}
                      </Text>

                      <AspectRatio ratio={16 / 9} w="160px" flexShrink={0}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${movie.thumbnail}`}
                          borderRadius="md"
                          objectFit="cover"
                        />
                      </AspectRatio>

                      <Box flex={1}>
                        <Flex justify="space-between" align="start" mb={2}>
                          <Text fontWeight="semibold" fontSize="md">
                            Tập {episode.episodeNumber}
                          </Text>
                          <Text fontSize="sm" color="gray.400" flexShrink={0}>
                            {episode.duration}p
                          </Text>
                        </Flex>
                        <Text fontSize="sm" color="gray.400" lineHeight="short">
                          {/* {episode.description} */}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    // </Box>
  );
};

export default NetflixMovieDialog;
