import { Badge, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import { Content } from "@netflix-clone/types";
import { IoIosStar } from "react-icons/io";

export default function LeftContent({ movie }: { movie: Content }) {
  return (
    <GridItem>
      <VStack align="start" gap={6}>
        <HStack gap={4} flexWrap="wrap">
          <Badge colorScheme="red" fontSize="sm" border={"1px solid #aaa"}>
            T{movie.ageRating}
          </Badge>
          <Badge colorScheme="gray" fontSize="sm" border={"1px solid #aaa"}>
            {movie.quality}
          </Badge>
          <Text fontSize="sm">{movie.year}</Text>

          {movie.series?.totalSeasonNumber ?? 1 > 1 ? (
            <Text fontSize="sm">{movie.series?.totalSeasonNumber} mùa</Text>
          ) : (
            <></>
          )}

          <HStack>
            {movie.totalScoreRating / movie.ratingCount === 5 ? (
              <Badge size={"lg"}>
                <IoIosStar />
                {movie.totalScoreRating / movie.ratingCount}
              </Badge>
            ) : (
              <Badge>
                <IoIosStar />
                {(movie.totalScoreRating / movie.ratingCount).toFixed(1)}
              </Badge>
            )}
          </HStack>
        </HStack>

        <Text fontSize="md" lineHeight="tall" color="gray.300">
          {movie.description}
        </Text>
      </VStack>
    </GridItem>
  );
}
