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

const MovieSlider = ({ title, movies, showSeeAll = true }) => {
  const slidesPerView = useBreakpointValue({
    base: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  });

  const defaultMovies = [
    {
      id: 1,
      title: "Giấc mơ người luật sư",
      poster: "/api/placeholder/300/450",
      isNew: true,
      hasWatchNow: true,
      rating: "16+",
    },
    {
      id: 2,
      title: "Thiên Ngu",
      poster: "/api/placeholder/300/450",
      isNew: true,
      hasWatchNow: true,
      rating: "13+",
      badge: true,
      topRank: 10,
    },
    {
      id: 3,
      title: "Wednesday",
      poster: "/api/placeholder/300/450",
      isNew: true,
      rating: "16+",
      badge: true,
      topRank: 10,
    },
    {
      id: 4,
      title: "Điện lư Phim hoạt Kangkung",
      poster: "/api/placeholder/300/450",
      isNew: true,
      hasWatchNow: true,
      rating: "13+",
    },
    {
      id: 5,
      title: "THG: SẠN QUY K-POP",
      poster: "/api/placeholder/300/450",
      rating: "16+",
      badge: true,
      topRank: 10,
    },
    {
      id: 6,
      title: "Nàu trí của hai chúa",
      poster: "/api/placeholder/300/450",
      isNew: true,
      hasWatchNow: true,
      rating: "18+",
      badge: true,
      topRank: 10,
    },
  ];

  const movieList = movies || defaultMovies;
  const sectionTitle = title || "Tìm kiếm nhiều nhất";

  return (
    <Container maxW="container.xl" px={{ base: 4, md: 8, lg: 12 }} py={6}>
      {/* Section Header */}
      <HStack justify="space-between" mb={4}>
        <Text
          color="white"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold">
          {sectionTitle}
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
          spaceBetween={12}
          slidesPerView={slidesPerView}
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
          {movieList.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} isFirst={index === 0} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <Box
          className={`swiper-button-prev-${
            title?.replace(/\s+/g, "-") || "default"
          }`}
          position="absolute"
          left={-6}
          top="50%"
          transform="translateY(-50%)"
          zIndex={10}
          bg="rgba(0,0,0,0.7)"
          color="white"
          w={12}
          h={12}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          opacity={0}
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s"
        />

        <Box
          className={`swiper-button-next-${
            title?.replace(/\s+/g, "-") || "default"
          }`}
          position="absolute"
          right={-6}
          top="50%"
          transform="translateY(-50%)"
          zIndex={10}
          bg="rgba(0,0,0,0.7)"
          color="white"
          w={12}
          h={12}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          opacity={0}
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s"
        />
      </Box>
    </Container>
  );
};

export default MovieSlider;
