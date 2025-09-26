import { Box, Link, Text } from "@chakra-ui/react";
import { Watchlist } from "@netflix-clone/types";
import MovieSlider from "../slider/movie.slider";

export const WatchList = ({ list }: { list: Watchlist[] }) => {
  return (
    <Box mt={20}>
      My list page
      <Box>
        {list.map((lst) => (
          <Link href={`/my-list/${lst.id}`} padding={20}>
            {lst.name}
          </Link>
        ))}
      </Box>
    </Box>
  );
};
