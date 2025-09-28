"use client";
import React, { useState } from "react";
import {
  Badge,
  Box,
  Text,
  Grid,
  Container,
  VStack,
  HStack,
  Progress,
  Flex,
  CloseButton,
  Dialog,
  Portal,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Bookmark, Video } from "@netflix-clone/types";
import MovieCard from "../slider/movie.card";
import { VideoProgressBar } from "../share/progress.bar.card";
import { FaStar } from "react-icons/fa";
import { engagementApi } from "@/utils/api";
import { toaster } from "../ui/toaster";
import { FastToaster } from "@/lib/toaster.noti";
import { deleteBookmarkAction } from "@/lib/server-action/delete-bookmark";

export default function BookmarkMain({
  bookmarks,
  videos,
}: {
  bookmarks: Bookmark[];
  videos: Video[];
}) {
  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const { open, onOpen, onClose } = useDisclosure();

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(
    null
  );

  const handleDeleteClick = (video: Video, bookmark: Bookmark) => {
    setSelectedVideo(video);
    setSelectedBookmark(bookmark);
    onOpen();
  };

  const handleDeleteBookmark = async () => {
    if (!selectedBookmark) return;

    setDisable(true);
    try {
      const res = await deleteBookmarkAction(selectedBookmark.id);
      if (res.success) {
        FastToaster("success", res.message);
      } else {
        FastToaster("error", res.message, "Có lỗi xảy ra. Vui lòng thử lại!");
      }
      // set lại bookmark
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    } finally {
      setDisable(false);
      onClose();
      // Reset selected states
      setSelectedVideo(null);
      setSelectedBookmark(null);
    }
  };

  return (
    <Box minH="100vh" py={8} alignItems={"center"}>
      <Container maxW="7xl">
        <VStack gap={8} align="stretch">
          {/* Header Section */}
          <VStack gap={4} align="flex-start" alignItems={"center"}>
            <Badge
              bg="red.600"
              color="white"
              px={6}
              py={3}
              borderRadius="full"
              fontSize="lg"
              fontWeight="bold"
              textTransform="none">
              Các khoảnh khắc bạn thấy tuyệt vời
            </Badge>

            <Text color="gray.300" fontSize="lg" maxW="6xl">
              Tiếp tục xem từ những thời điểm bạn đã đánh dấu. Nhấp vào bất kỳ
              video nào để tiếp tục từ đúng thời điểm bạn đã lưu lại.
            </Text>
          </VStack>

          {/* Video Grid */}
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={6}>
            {videos.map((video) => {
              const bookmark = bookmarks.find((bm) => bm.videoId === video.id);
              return (
                <VStack
                  key={video.id}
                  gap={3}
                  align="stretch"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{ transform: "translateY(-4px)" }}>
                  {/* Movie Card */}
                  <Box position="relative">
                    <Box
                      onClick={() => {
                        console.log("before redirect:", video.fileName);
                        router.push(
                          `/watch/${video.fileName}?duration=${
                            bookmark ? bookmark.timestamp : 0
                          }`
                        );
                      }}>
                      <MovieCard
                        isEdit={false}
                        movie={video.contents!}
                        removeMovie={() => {}}
                        disableDialog={true}
                      />
                    </Box>

                    {/* Overlay Badge */}
                    {bookmark && (
                      <Badge
                        position="absolute"
                        top={2}
                        left={2}
                        bg="blackAlpha.800"
                        color="white"
                        fontSize="xs"
                        borderRadius="md">
                        Đã lưu
                      </Badge>
                    )}

                    <CloseButton
                      position="absolute"
                      top="2"
                      right="2"
                      size="sm"
                      bg="blackAlpha.600"
                      borderRadius={"50%"}
                      color="white"
                      _hover={{ bg: "blackAlpha.800" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (bookmark) {
                          handleDeleteClick(video, bookmark);
                        }
                      }}
                    />
                  </Box>

                  {/* Video Info */}
                  <VStack gap={2} align="stretch">
                    <Text
                      color="white"
                      fontSize="md"
                      fontWeight="semibold"
                      maxHeight={2}
                      lineHeight="1.3">
                      {bookmark?.note}
                    </Text>

                    {/* Progress Bar */}
                    {bookmark && video.duration && (
                      <VideoProgressBar
                        timestamp={bookmark.timestamp}
                        duration={video.duration}
                      />
                    )}

                    {/* Additional Info */}
                    <HStack
                      justify="space-between"
                      color="gray.400"
                      fontSize="sm">
                      <Text>{video.duration} phút</Text>
                      {video.contents && (
                        <HStack gap={1}>
                          <FaStar color="yellow" />
                          <Text>
                            {(
                              video.contents.totalScoreRating /
                              video.contents.ratingCount
                            ).toFixed(1)}
                          </Text>
                        </HStack>
                      )}
                    </HStack>
                  </VStack>
                </VStack>
              );
            })}
          </Grid>

          {/* Empty State */}
          {videos.length === 0 && (
            <VStack gap={4} py={16}>
              <Text color="gray.500" fontSize="xl" textAlign="center">
                Chưa có video nào được đánh dấu
              </Text>
              <Text color="gray.600" textAlign="center" maxW="md">
                Bắt đầu xem video và đánh dấu những khoảnh khắc yêu thích của
                bạn
              </Text>
            </VStack>
          )}
        </VStack>
      </Container>

      {/* Single Dialog outside the loop */}
      <Dialog.Root role="alertdialog" open={open}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title color={"gray.400"}>
                  Xóa đánh dấu phim {selectedVideo?.contents?.title}?
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Footer>
                <Button variant="outline" onClick={onClose} disabled={disable}>
                  Cancel
                </Button>
                <Button
                  colorPalette="red"
                  onClick={handleDeleteBookmark}
                  disabled={disable}
                  loading={disable}>
                  Delete
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={onClose} disabled={disable} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
