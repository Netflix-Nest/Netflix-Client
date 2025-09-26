"use client";
import {
  Box,
  Text,
  Container,
  Heading,
  VStack,
  HStack,
  Grid,
  Image,
  Badge,
  IconButton,
  Flex,
  Button,
  Separator,
  Link,
} from "@chakra-ui/react";
import {
  FiPlay,
  FiHeart,
  FiShare2,
  FiMoreVertical,
  FiClock,
  FiEye,
  FiCalendar,
  FiStar,
  FiTrendingUp,
  FiEdit3,
  FiTrash2,
  FiSave,
} from "react-icons/fi";
import { Content, Watchlist } from "@netflix-clone/types";
import MovieCard from "../slider/movie.card";
import { toaster } from "../ui/toaster";
import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { IoIosSave } from "react-icons/io";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { engagementApi } from "@/utils/api";

export const WatchListDetail = ({
  watchlist,
  movies,
}: {
  watchlist: Watchlist;
  movies: Content[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [moviesState, setMoviesState] = useState(movies);
  const [disable, setDisable] = useState(false);
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const totalViews = movies.reduce((sum, movie) => sum + movie.view, 0);
  const avgRating =
    movies.length > 0
      ? movies.reduce((sum, movie) => {
          const movieRating =
            movie.ratingCount > 0
              ? movie.totalScoreRating / movie.ratingCount
              : 0;
          return sum + movieRating;
        }, 0) / movies.length
      : 0;
  const handleSave = async () => {
    setDisable(true);
    const res = await engagementApi.removeMoviesFromWatchlist(
      watchlist.id.toString(),
      moviesState.map((m) => m.id)
    );

    if (res && res.data) {
      toaster.create({
        type: "success",
        title: "Cập nhật danh sách thành công!",
        closable: true,
        duration: 1500,
      });
    } else {
      toaster.create({
        type: "error",
        title: "Cập nhật danh sách thất bại!",
        description: "Có lỗi xảy ra! Vui lòng thử lại.",
        closable: true,
        duration: 1500,
      });
      setMoviesState(movies);
    }
    setDisable(false);
    setIsEditing(false);
  };

  const removeMovie = (id: number) => {
    setMoviesState(moviesState.filter((m) => m.id !== id));
  };
  return (
    <Box bg="black" minH="100vh">
      {/* Hero Section */}
      <Box
        bgImage={watchlist.thumbnailUrl}
        bgSize="cover"
        backgroundPosition="center"
        position="relative">
        {/* Overlay */}
        <Box
          bg="linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%)"
          py={20}>
          <Container maxW="7xl">
            <VStack align="stretch" gap={6} color="white">
              {/* Breadcrumb */}
              <HStack fontSize="sm" color="gray.300" gap={2}>
                <Link href="/my-list" _hover={{ color: "red.400" }}>
                  Danh sách của tôi
                </Link>
                <Text>›</Text>
                <Text color="white">{watchlist.name}</Text>
              </HStack>

              <Heading size="2xl" fontWeight="bold" maxW="4xl">
                {watchlist.name}
              </Heading>

              <HStack gap={6} flexWrap="wrap">
                <HStack gap={2}>
                  <FiCalendar />
                  <Text fontSize="sm">
                    Tạo: {formatDate(watchlist.createdAt)}
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <FiClock />
                  <Text fontSize="sm">
                    Cập nhật: {formatDate(watchlist.updatedAt)}
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <FiEye />
                  <Text fontSize="sm">{formatViews(totalViews)} lượt xem</Text>
                </HStack>
              </HStack>

              {/* Action Buttons */}
              <HStack gap={4}>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    borderColor="gray.500"
                    color="white"
                    _hover={{ bg: "whiteAlpha.200" }}
                    onClick={() => setIsEditing(true)}>
                    <FiEdit3 /> Chỉnh sửa
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      borderColor="gray.500"
                      color="white"
                      _hover={{ bg: "whiteAlpha.200" }}
                      disabled={disable}
                      onClick={() => handleSave()}>
                      <IoIosSave />
                      Lưu
                    </Button>
                    <Button
                      variant="outline"
                      borderColor="gray.500"
                      color="white"
                      _hover={{ bg: "whiteAlpha.200" }}
                      disabled={disable}
                      onClick={() => {
                        setIsEditing(false);
                        setMoviesState(movies);
                      }}>
                      <MdOutlineCancelPresentation />
                      Hủy
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  color="gray.300"
                  _hover={{ color: "white", bg: "whiteAlpha.200" }}
                  onClick={() => {
                    toaster.create({
                      title: "Feature under development!",
                      type: "info",
                      closable: true,
                    });
                  }}>
                  <FiShare2 />
                  Chia sẻ
                </Button>
                <IconButton
                  aria-label="More options"
                  variant="ghost"
                  color="gray.300"
                  _hover={{ color: "white", bg: "whiteAlpha.200" }}>
                  <FiMoreVertical />
                </IconButton>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </Box>

      <Container maxW="7xl" py={8}>
        {/* Stats Section */}
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={6}
          mb={8}>
          <Box bg="gray.900" p={6} borderRadius="xl" textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="red.400">
              {movies.length}
            </Text>
            <Text color="gray.400" fontSize="sm">
              Tổng phim
            </Text>
          </Box>
          <Box bg="gray.900" p={6} borderRadius="xl" textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.400">
              {formatViews(totalViews)}
            </Text>
            <Text color="gray.400" fontSize="sm">
              Lượt xem
            </Text>
          </Box>
          <Box bg="gray.900" p={6} borderRadius="xl" textAlign="center">
            <HStack justify="center" gap={1}>
              <FiStar color="#FFD700" />
              <Text fontSize="2xl" fontWeight="bold" color="yellow.400">
                {avgRating.toFixed(1)}
              </Text>
            </HStack>
            <Text color="gray.400" fontSize="sm">
              Đánh giá TB
            </Text>
          </Box>
          <Box bg="gray.900" p={6} borderRadius="xl" textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.400">
              {movies.filter((m) => m.type === "series").length}/
              {movies.filter((m) => m.type === "single").length}
            </Text>
            <Text color="gray.400" fontSize="sm">
              Series/Phim
            </Text>
          </Box>
        </Grid>

        <Separator borderColor="gray.700" mb={8} />

        {/* Movies Section */}
        <VStack align="stretch" gap={6}>
          <HStack justify="space-between" align="center">
            <Heading size="lg" color="white">
              Danh sách phim ({movies.length})
            </Heading>
          </HStack>

          {movies.length > 0 ? (
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              }}
              gap={6}>
              {moviesState.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isEdit={isEditing}
                  removeMovie={removeMovie}
                />
              ))}
            </Grid>
          ) : (
            <Box
              textAlign="center"
              py={20}
              bg="gray.900"
              borderRadius="xl"
              border="2px dashed"
              borderColor="gray.700">
              <VStack gap={4}>
                <Text color="gray.400" fontSize="lg">
                  Danh sách trống
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Chưa có phim nào trong danh sách này
                </Text>
                <Button colorScheme="red" size="sm">
                  Thêm phim
                </Button>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};
