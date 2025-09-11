"use client";
import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import MovieSlider from "../slider/movie.slider";
import HeroSection from "../hero-section/hero-section";
import { Content } from "@netflix-clone/types";
interface IProps {
  hero: Content;
  mostView: Content[];
  thisYear: Content[];
  forYou: Content[];
}
const NetflixHomepage = (props: IProps) => {
  const { hero, mostView, thisYear, forYou } = props;

  return (
    <Box bg="black" minH="100vh">
      <VStack align="stretch">
        <HeroSection movieData={hero} />

        <Box bg="black" pt={8}>
          <MovieSlider title="Được xem nhiều nhất" movies={mostView} />

          <MovieSlider title="Hot trong năm nay" movies={thisYear} />
          <MovieSlider title="Đề xuất cho bạn" movies={forYou} />
        </Box>
      </VStack>
    </Box>
  );
};

export default NetflixHomepage;
