"use client";
import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import MovieSlider from "../slider/movie.slider";
import HeroSection from "../hero-section/hero-section";
import { Content } from "@netflix-clone/types";
interface IProps {
  hero: Content;
}
const NetflixHomepage = (props: IProps) => {
  const { hero } = props;
  const trendingMovies = [
    {
      id: 1,
      title: "Giấc mơ người luật sư",
      poster: "/api/placeholder/300/450",
      isNew: true,
      hasWatchNow: true,
    },
    {
      id: 2,
      title: "Thiên Ngu",
      poster: "/api/placeholder/300/450",
      isNew: true,
      hasWatchNow: true,
      topRank: 10,
    },
    {
      id: 3,
      title: "Wednesday",
      poster: "/api/placeholder/300/450",
      isNew: true,
      topRank: 10,
    },
    {
      id: 4,
      title: "Điện lư Phim hoạt Kangkung",
      poster: "/api/placeholder/300/450",
      isNew: true,
      hasWatchNow: true,
    },
    {
      id: 5,
      title: "THG: SẠN QUY K-POP",
      poster: "/api/placeholder/300/450",
      topRank: 10,
    },
    {
      id: 6,
      title: "Nàu trí của hai chúa",
      poster: "/api/placeholder/300/450",
      isNew: true,
      hasWatchNow: true,
      topRank: 10,
    },
  ];

  const chineseMovies = [
    {
      id: 7,
      title: "Khom lung",
      poster: "/api/placeholder/300/450",
    },
    {
      id: 8,
      title: "Quất bại tầm sủi vào cùng chỗa",
      poster: "/api/placeholder/300/450",
    },
    {
      id: 9,
      title: "Khổ do danh",
      poster: "/api/placeholder/300/450",
    },
    {
      id: 10,
      title: "DAO HÒA ANH GIẢNG SÓNH",
      poster: "/api/placeholder/300/450",
    },
    {
      id: 11,
      title: "Lấy đoán nghỉa ngươi nhờ",
      poster: "/api/placeholder/300/450",
    },
    {
      id: 12,
      title: "Suốt nhọ của năng dạu long",
      poster: "/api/placeholder/300/450",
    },
  ];

  return (
    <Box bg="black" minH="100vh">
      <VStack align="stretch">
        <HeroSection movieData={hero} />

        <Box bg="black" pt={8}>
          <MovieSlider title="Tìm kiếm nhiều nhất" movies={trendingMovies} />

          <MovieSlider
            title="Phim và series Trung Quốc"
            movies={chineseMovies}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default NetflixHomepage;
