"use client";
import { Content } from "@netflix-clone/types";
import MovieCard from "../slider/movie.card";
import { Box, Container, Heading, Text, Grid, Flex } from "@chakra-ui/react";
import { Search } from "lucide-react";

export default function SearchMain({
  q,
  result,
}: {
  q: string;
  result: Content[];
}) {
  return (
    <Box minH="100vh" bg="black" pt="100px" pb="60px">
      <Container maxW="1400px" px={8}>
        {/* Search Header */}
        <Box mb={8}>
          <Flex align="center" gap={3} mb={3}>
            <Search size={28} color="white" />
            <Heading as="h1" fontSize="2xl" fontWeight="bold" color="white">
              Kết quả tìm kiếm
            </Heading>
          </Flex>

          <Text color="gray.400" fontSize="lg">
            Tìm thấy{" "}
            <Text as="span" color="white" fontWeight="semibold">
              {result.length}
            </Text>{" "}
            kết quả cho "{q}"
          </Text>
        </Box>

        {/* Results Grid */}
        {result.length > 0 ? (
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
              "2xl": "repeat(6, 1fr)",
            }}
            gap={4}>
            {result.map((ctn) => (
              <Box
                key={ctn.id}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.05)",
                  zIndex: 10,
                }}>
                <MovieCard
                  movie={ctn}
                  removeMovie={() => {}}
                  disableDialog={false}
                />
              </Box>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" py={20} px={4}>
            <Text color="gray.500" fontSize="xl" mb={2}>
              Không tìm thấy kết quả nào
            </Text>
            <Text color="gray.600" fontSize="md">
              Hãy thử tìm kiếm với từ khóa khác
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
}
