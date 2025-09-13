import { Box, Button } from "@chakra-ui/react";

const SkipIntro = ({
  currentTime,
  skip,
}: {
  currentTime: number;
  skip: (number) => void;
}) => {
  return (
    <Box position="absolute" bottom="40" right="10">
      <Button
        bg="whiteAlpha.200"
        color="white"
        size="md"
        fontSize={18}
        borderRadius="sm"
        _hover={{ bg: "whiteAlpha.300" }}
        onClick={() => skip(90 - currentTime)}>
        Bỏ qua Giới thiệu
      </Button>
    </Box>
  );
};

export default SkipIntro;
