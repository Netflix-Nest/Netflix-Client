import { Box, HStack, Progress, Text, VStack } from "@chakra-ui/react";

export const VideoProgressBar = ({
  timestamp,
  duration,
}: {
  timestamp: number; // seconds
  duration: number; // minutes
}) => {
  const durationInSeconds = duration * 60;
  const progressPercentage = Math.min(
    (timestamp / durationInSeconds) * 100,
    100
  );

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <VStack gap={1} align="stretch" mt={2}>
      <Box position="relative">
        <Progress.Root
          value={progressPercentage}
          size="sm"
          colorScheme="red"
          bg="gray.700"
          borderRadius="full"
          css={{
            "& > div": {
              bg: "#e50914",
            },
          }}
        />
      </Box>
      <HStack justify="space-between" fontSize="xs" color="gray.400">
        <Text>{formatTime(timestamp)}</Text>
        <Text>{formatTime(durationInSeconds)}</Text>
      </HStack>
    </VStack>
  );
};
