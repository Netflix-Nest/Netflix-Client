"use client";
import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  Badge,
  HStack,
  VStack,
  Tooltip,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaStar, FaClock, FaPlay, FaTrash } from "react-icons/fa";
import { History, Video } from "@netflix-clone/types";
import { useRouter } from "next/navigation";

const HistoryCard = ({
  video,
  history,
  onRemove,
  onPlay,
}: {
  video: Video;
  history: History;
  onRemove: (id: number) => void;
  onPlay: (id: number) => void;
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const cardWidth = useBreakpointValue({
    base: "100%",
    md: "320px",
    lg: "360px",
  });

  const calculateProgress = (watched: number, total?: number) => {
    const defaultDuration = video.duration! * 60;
    const totalDuration = total || defaultDuration;
    return Math.min((watched / totalDuration) * 100, 100);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    return "Vừa xong";
  };

  const progressPercentage = calculateProgress(
    history.duration,
    video.duration
  );
  const remainingTime = video.duration ? video.duration - history.duration : 0;

  return (
    <Box
      w={cardWidth}
      bg="gray.900"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition="all 0.3s ease"
      onClick={() =>
        router.push(`/watch/${video.fileName}?duration=${history.duration}`)
      }
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        cursor: "pointer",
      }}>
      {/* Thumbnail Container */}
      <Box position="relative" w="100%" paddingTop="56.25%" bg="gray.800">
        <Image
          src={`/api/media/images/${video.contents?.thumbnail}`}
          alt={video.contents?.title}
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          objectFit="cover"
        />

        {/* Progress bar */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="4px"
          bg="whiteAlpha.300">
          <Box
            h="100%"
            bg="red.500"
            width={`${progressPercentage}%`}
            transition="width 0.3s ease"
            boxShadow="0 0 8px rgba(229, 9, 20, 0.6)"
          />
        </Box>

        {/* Episode badge */}
        {video.episodeNumber && video.seasonNumber && (
          <Badge
            position="absolute"
            top={2}
            left={2}
            colorScheme="blackAlpha"
            bg="blackAlpha.700"
            color="white"
            fontSize="xs"
            px={2}
            py={1}>
            S{video.seasonNumber} E{video.episodeNumber}
          </Badge>
        )}

        {/* Delete button */}
        <IconButton
          aria-label="Remove from history"
          size="sm"
          position="absolute"
          top={2}
          right={2}
          colorScheme="blackAlpha"
          bg="blackAlpha.700"
          color="white"
          rounded="full"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
          onClick={() => onRemove(history.id)}
          _hover={{ bg: "red.600" }}>
          <FaTrash />
        </IconButton>
      </Box>

      {/* Content Info */}
      <VStack align="stretch" p={4} gap={3}>
        {/* Title */}
        <Text
          color="white"
          fontSize="lg"
          fontWeight="bold"
          maxHeight={1}
          pb={4}>
          {video.contents?.title}
        </Text>

        {/* Metadata row */}
        <HStack gap={3} fontSize="sm" color="gray.400">
          <HStack gap={1}>
            <FaStar color="#ffd700" />
            <Text>
              {video.contents?.ratingCount
                ? (
                    video.contents.totalScoreRating / video.contents.ratingCount
                  ).toFixed(1)
                : "N/A"}
            </Text>
          </HStack>

          <Text>•</Text>

          <HStack gap={1}>
            <FaClock />
            <Text>{formatTimeAgo(history.watchedAt)}</Text>
          </HStack>
        </HStack>

        {/* Progress info */}
        <HStack justify="space-between" fontSize="sm">
          <Tooltip.Root
          // label={`Đã xem ${formatDuration(
          //   history.duration
          // )} / ${formatDuration(video.duration || 2700)}`}
          // placement="top"
          >
            <Text color="gray.400">
              {progressPercentage.toFixed(0)}% đã xem
            </Text>
          </Tooltip.Root>

          {remainingTime > 0 && (
            <Text color="red.400" fontWeight="medium">
              Còn {formatDuration(remainingTime)}
            </Text>
          )}
        </HStack>

        {/* Device info */}
        <Text fontSize="xs" color="gray.500">
          {history.deviceInfo}
        </Text>
      </VStack>
    </Box>
  );
};

export default function HistoryMain({
  videosData,
  historiesData,
}: {
  videosData: Video[];
  historiesData: History[];
}) {
  const [videos, setVideos] = useState(videosData);
  const [histories] = useState(historiesData);

  const historyMap = histories.reduce((acc, history) => {
    acc[history.videoId] = history;
    return acc;
  }, {} as Record<number, History>);

  const handleRemove = (historyId: number) => {
    const history = histories.find((h) => h.id === historyId);
    if (history) {
      setVideos((prev) => prev.filter((v) => v.id !== history.videoId));
    }
  };

  const handlePlay = (videoId: number) => {
    console.log("Playing video:", videoId);
  };

  return (
    <Box bg="black" minH="100vh" p={8}>
      <VStack align="stretch" gap={6} maxW="1400px" mx="auto">
        {/* Header */}
        <Box>
          <Text color="white" fontSize="3xl" fontWeight="bold" mb={2}>
            Lịch sử xem
          </Text>
          <Text color="gray.400" fontSize="md">
            {videos.length} video trong lịch sử
          </Text>
        </Box>

        {/* Grid */}
        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={6}>
          {videos.map((video) => {
            const history = historyMap[video.id];
            if (!history) return null;

            return (
              <HistoryCard
                key={video.id}
                video={video}
                history={history}
                onRemove={handleRemove}
                onPlay={handlePlay}
              />
            );
          })}
        </Box>

        {videos.length === 0 && (
          <Box textAlign="center" py={20}>
            <Text color="gray.500" fontSize="xl">
              Chưa có lịch sử xem nào
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
