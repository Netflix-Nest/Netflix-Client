"use client";
import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import MovieSlider from "../slider/movie.slider";
import HeroSection from "../hero-section/hero-section";
import { Content } from "@netflix-clone/types";
interface IProps {
  hero: Content;
  mostView: Content[];
}
const NetflixHomepage = (props: IProps) => {
  const { hero, mostView } = props;

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
          <MovieSlider title="Được xem nhiều nhất" movies={mostView} />

          {/* <MovieSlider
            title="Phim và series Trung Quốc"
            movies={chineseMovies}
          /> */}
        </Box>
      </VStack>
    </Box>
  );
};

export default NetflixHomepage;
