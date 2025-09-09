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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "./movie.card";
import { Content } from "@netflix-clone/types";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const MovieSlider = ({
  title,
  movies,
  showSeeAll = true,
}: {
  title: string;
  movies: Content[];
  showSeeAll?: boolean;
}) => {
  const slidesPerView = useBreakpointValue({
    base: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  });

  return (
    <Container
      maxW="100%"
      px={{ base: 4, md: 8, lg: 12 }}
      py={6}
      // margin={"auto"}
    >
      {/* Section Header */}
      <HStack justify="space-between" mb={4}>
        <Text
          color="white"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold">
          {title}
        </Text>

        {showSeeAll && (
          <Button
            variant="ghost"
            color="blue.400"
            size="sm"
            fontWeight="normal"
            _hover={{ color: "blue.300" }}>
            Khám phá tất cả
          </Button>
        )}
      </HStack>

      {/* Swiper Slider */}
      <Box>
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          loop={true}
          spaceBetween={30}
          slidesPerView={slidesPerView}
          slidesPerGroup={3}
          navigation={{
            nextEl: `.swiper-button-next-${
              title?.replace(/\s+/g, "-") || "default"
            }`,
            prevEl: `.swiper-button-prev-${
              title?.replace(/\s+/g, "-") || "default"
            }`,
          }}
          mousewheel={true}
          grabCursor={true}
          style={{
            paddingLeft: "0px",
            paddingRight: "0px",
            marginLeft: "0px",
            marginRight: "0px",
          }}>
          {movies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <Box
          className={`swiper-button-prev-${
            title?.replace(/\s+/g, "-") || "default"
          }`}
          position="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%)"
          zIndex={10}
          bg="rgba(0,0,0,1)"
          color="white"
          w={12}
          h={12}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          opacity={0.5}
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s">
          <MdNavigateBefore size={96} />
        </Box>

        <Box
          className={`swiper-button-next-${
            title?.replace(/\s+/g, "-") || "default"
          }`}
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          zIndex={10}
          bg="rgba(0,0,0,1)"
          color="white"
          w={12}
          h={12}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          opacity={0.5}
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s">
          <MdNavigateNext size={96} />
        </Box>
      </Box>
    </Container>
  );
};

export default MovieSlider;
