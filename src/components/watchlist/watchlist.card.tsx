import {
  Badge,
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Watchlist } from "@netflix-clone/types";
import { FiCalendar, FiEye } from "react-icons/fi";

export const WatchlistCard = ({ watchlist }: { watchlist: Watchlist }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };
  return (
    <Link href={`/my-list/${watchlist.id}`} _hover={{ textDecoration: "none" }}>
      <Box
        bg="gray.900"
        borderRadius="xl"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          zIndex: 10,
        }}
        position="relative"
        cursor="pointer"
        role="group">
        {/* Image */}
        <Box position="relative" overflow="hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${
              watchlist.thumbnailUrl
                ? watchlist.thumbnailUrl
                : process.env.NEXT_PUBLIC_DEFAULT_BACKGROUND
            }`}
            alt={watchlist.name}
            w="100%"
            h="200px"
            objectFit="cover"
            transition="transform 0.3s ease"
            _groupHover={{
              transform: "scale(1.1)",
            }}
          />

          {/* Content Count Badge */}
          <Badge
            position="absolute"
            top={3}
            right={3}
            colorScheme="red"
            variant="solid"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
            fontWeight="bold">
            {watchlist.contentIds.length}{" "}
            {watchlist.contentIds.length === 1 ? "video" : "videos"}
          </Badge>
        </Box>

        {/* Content */}
        <Box p={6}>
          <VStack align="stretch" gap={3}>
            <Heading
              size="md"
              color="white"
              fontWeight="bold"
              maxHeight={2}
              mb={2}>
              {watchlist.name}
            </Heading>

            <HStack gap={4} fontSize="sm" color="gray.400">
              <HStack gap={1}>
                <FiEye />
                <Text>{watchlist.contentIds.length} phim</Text>
              </HStack>
              <HStack gap={1}>
                <FiCalendar />
                <Text>{formatDate(watchlist.updatedAt)}</Text>
              </HStack>
            </HStack>

            <Text fontSize="xs" color="gray.500" mt={2}>
              Cập nhật lần cuối: {formatDate(watchlist.updatedAt)}
            </Text>
          </VStack>
        </Box>

        {/* Hover Effect Bottom Glow */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="4px"
          bg="linear-gradient(90deg, #E50914 0%, #B20710 100%)"
          transform="scaleX(0)"
          transformOrigin="center"
          transition="transform 0.3s ease"
          _groupHover={{ transform: "scaleX(1)" }}
        />
      </Box>
    </Link>
  );
};
