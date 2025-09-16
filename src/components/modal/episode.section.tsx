import { AspectRatio, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Content } from "@netflix-clone/types";
import { useRouter } from "next/navigation";

export default function EpisodeSection({ movie }: { movie: Content }) {
  const router = useRouter();
  return (
    <Box mt={8}>
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
            gap={4}
            onClick={() => router.push(`/watch/${episode.fileName}`)}>
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
  );
}
