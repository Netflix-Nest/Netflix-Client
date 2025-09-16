import { Box, GridItem, Text, VStack } from "@chakra-ui/react";
import { Content } from "@netflix-clone/types";

export default function RightContent({ movie }: { movie: Content }) {
  return (
    <GridItem>
      <VStack align="start" gap={4} fontSize="sm">
        <Box>
          <Text color="gray.400" mb={1}>
            Diễn viên:
          </Text>
          <Text>{movie.actors!.map((actor) => actor.fullName).join(", ")}</Text>
        </Box>

        <Box>
          <Text color="gray.400" mb={1}>
            Thể loại:
          </Text>
          <Text>{movie.genres!.map((genre) => genre.name).join(", ")}</Text>
        </Box>

        <Box>
          <Text color="gray.400" mb={1}>
            Series này:
          </Text>
          <Text>{movie.tags!.map((tag) => tag.name).join(", ")}</Text>
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
  );
}
