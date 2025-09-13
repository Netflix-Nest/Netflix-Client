import { Box } from "@chakra-ui/react";
interface IProps {
  progressBarRef: any;
  handleProgressClick: (e) => void;
  bufferedPercentage: number;
  progressPercentage: number;
}
const ProgressBarVideo = (props: IProps) => {
  const {
    progressBarRef,
    bufferedPercentage,
    handleProgressClick,
    progressPercentage,
  } = props;
  return (
    <Box px="8" pb="8">
      <Box
        ref={progressBarRef}
        height="8px"
        bg="whiteAlpha.400"
        borderRadius="full"
        cursor="pointer"
        onClick={(e) => {
          setTimeout(() => {
            handleProgressClick(e);
          }, 50);
        }}
        position="relative"
        _hover={{
          "& > div": {
            height: "8px",
          },
        }}>
        {/* Background Track */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="8px"
          bg="whiteAlpha.400"
          borderRadius="full"
        />

        <Box
          position="absolute"
          top="0"
          left="0"
          width={`${bufferedPercentage}%`}
          height="8px"
          bg="whiteAlpha.600"
          borderRadius="full"
          transition="width 0.2s"
        />

        <Box
          position="absolute"
          top="0"
          left="0"
          width={`${progressPercentage}%`}
          height="8px"
          bg="red.500"
          borderRadius="full"
          transition="height 0.2s, width 0.1s"
        />

        <Box
          position="absolute"
          top="50%"
          left={`${progressPercentage}%`}
          transform="translate(-50%, -50%)"
          width="12px"
          height="12px"
          bg="red.500"
          borderRadius="full"
          opacity="0"
          transition="opacity 0.2s"
          _groupHover={{ opacity: 1 }}
        />
      </Box>
    </Box>
  );
};

export default ProgressBarVideo;
