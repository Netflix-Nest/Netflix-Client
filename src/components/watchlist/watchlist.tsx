import {
  Box,
  Text,
  Grid,
  VStack,
  HStack,
  Heading,
  Container,
  Separator,
} from "@chakra-ui/react";
import { Watchlist } from "@netflix-clone/types";
import { WatchlistCard } from "./watchlist.card";

export const WatchList = ({ list }: { list: Watchlist[] }) => {
  return (
    <Box bg="black" minH="100vh" py={8}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack gap={6} align="stretch" mb={10}>
          <Heading
            size="2xl"
            color="white"
            fontWeight="bold"
            textAlign="center">
            Danh sách của tôi
          </Heading>
          <Text
            color="gray.400"
            textAlign="center"
            fontSize="lg"
            maxW="2xl"
            mx="auto">
            Quản lý và khám phá các bộ sưu tập phim yêu thích của bạn
          </Text>
          <Separator borderColor="gray.700" />
        </VStack>

        {/* Stats */}
        <HStack
          justify="center"
          gap={8}
          mb={10}
          p={6}
          bg="gray.900"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.700">
          <VStack>
            <Text fontSize="2xl" fontWeight="bold" color="red.400">
              {list.length}
            </Text>
            <Text fontSize="sm" color="gray.400">
              Danh sách
            </Text>
          </VStack>
          <Box w="1px" h="40px" bg="gray.700" />
          <VStack>
            <Text fontSize="2xl" fontWeight="bold" color="red.400">
              {list.reduce((total, item) => total + item.contentIds.length, 0)}
            </Text>
            <Text fontSize="sm" color="gray.400">
              Tổng phim
            </Text>
          </VStack>
        </HStack>

        {/* Watchlist Grid */}
        {list.length > 0 ? (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={6}>
            {list.map((watchlist) => (
              <WatchlistCard key={watchlist.id} watchlist={watchlist} />
            ))}
          </Grid>
        ) : (
          <VStack gap={4} py={20}>
            <Text color="gray.400" fontSize="lg">
              Chưa có danh sách nào
            </Text>
            <Text color="gray.600" fontSize="sm">
              Tạo danh sách đầu tiên để bắt đầu sưu tập phim yêu thích
            </Text>
          </VStack>
        )}
      </Container>
    </Box>
  );
};
