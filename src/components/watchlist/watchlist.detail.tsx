import { Box, Text } from "@chakra-ui/react";
import { Content, Watchlist } from "@netflix-clone/types";

export const WatchListDetail = ({
  watchlist,
  movies,
}: {
  watchlist: Watchlist;
  movies: Content[];
}) => {
  return (
    <>
      This is detail wl: {watchlist.name}
      <Box>
        {movies.map((movie) => (
          <Text>{movie.title}</Text>
        ))}
      </Box>
    </>
  );
};
