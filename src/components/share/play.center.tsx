import { Box, IconButton } from "@chakra-ui/react";
import { Play } from "lucide-react";

export default function CenterPlayButton({
  togglePlay,
}: {
  togglePlay: () => void;
}) {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)">
      <IconButton
        aria-label="Play"
        variant="plain"
        color="white"
        size="lg"
        p="6"
        onClick={togglePlay}>
        <Play size={60} style={{ width: "78px", height: "78px" }} />
      </IconButton>
    </Box>
  );
}
