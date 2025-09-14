import React, { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Box,
  Text,
  Image,
  Flex,
  Badge,
  IconButton,
  VStack,
  HStack,
  AspectRatio,
  Grid,
  GridItem,
  Avatar,
  Textarea,
  Collapsible,
  Separator,
} from "@chakra-ui/react";
import {
  FaPlay,
  FaPlus,
  FaThumbsUp,
  FaDownload,
  FaShare,
  FaReply,
  FaHeart,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Comment, CommentClient, Content } from "@netflix-clone/types";
import { IoIosStar } from "react-icons/io";
import { useRouter } from "next/navigation";
import { movieApi } from "@/utils/api";
import { CommentItem } from "./comment.box";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth.options";
import { useSession } from "next-auth/react";

const NetflixMovieDialog = ({
  movie,
  isOpen,
  setIsOpen,
  isVideoLoaded,
}: {
  movie: Content;
  isOpen: boolean;
  setIsOpen: (e) => void;
  isVideoLoaded: boolean;
}) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentClient[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(true);

  // Pagination states
  const [totalComments, setTotalComments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const commentsPerPage = 10;
  const hasMoreComments = comments.length < totalComments;

  useEffect(() => {
    const getComments = async (
      current: number,
      pageSize: number,
      id: number
    ) => {
      try {
        const cmts = await movieApi.getComments(current, pageSize, id);
        if (cmts.data) {
          setComments(cmts.data);
          setTotalComments(cmts.data.length);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (isOpen) {
      setCurrentPage(1);
      setComments([]);
      getComments(1, commentsPerPage, movie.id);
    }
  }, [isOpen]);

  const loadMoreComments = async () => {
    if (isLoadingMore || !hasMoreComments) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const cmts = await movieApi.getComments(
        nextPage,
        commentsPerPage,
        movie.id
      );

      if (cmts.data) {
        setComments((prevComments) => [...prevComments, ...cmts.data]);
        setCurrentPage(nextPage);

        if (cmts.data.length) {
          setTotalComments(cmts.data.length);
        }
      }
    } catch (error) {
      console.error("Error loading more comments:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const router = useRouter();

  const handleSubmitComment = async () => {
    if (newComment.trim()) {
      try {
        console.log("Submitting comment:", newComment);
        // submit comment
        setNewComment("");
        setReplyingTo(null);

        const cmts = await movieApi.getComments(1, commentsPerPage, movie.id);
        if (cmts.data) {
          setComments(cmts.data);
          setCurrentPage(1);
          setTotalComments(cmts.data.length);
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    setShowComments(true);
  };

  return (
    <Dialog.Root
      motionPreset="slide-in-bottom"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      size="xl"
      scrollBehavior="outside">
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.800" />
        <Dialog.Positioner style={{ transitionDuration: "0.5s" }}>
          <Dialog.Content
            bg="gray.900"
            color="white"
            borderRadius="xl"
            overflow="visible"
            maxH="90vh">
            {/* Hero Section */}
            <Box position="relative">
              <AspectRatio ratio={16 / 9} maxH="400px">
                {isVideoLoaded ? (
                  <Box position="relative" w="100%" h="100%">
                    <video
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedData={() => {
                        console.log("Video loaded successfully");
                      }}
                      onError={(e) => {
                        console.log("Video error:", e);
                      }}>
                      <source
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/videos/${movie.trailer}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${movie.thumbnail}`}
                    alt={movie.title}
                    objectFit="cover"
                    w="100%"
                  />
                )}
              </AspectRatio>

              {/* Gradient overlay */}
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                h="200px"
                bgGradient="linear(to-t, gray.900, transparent)"
              />

              {/* Close button */}
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  position="absolute"
                  top="4"
                  right="4"
                  size="lg"
                  bg="blackAlpha.600"
                  borderRadius={"50%"}
                  color="white"
                  _hover={{ bg: "blackAlpha.800" }}
                />
              </Dialog.CloseTrigger>

              {/* Title and controls overlay */}
              <Box position="absolute" bottom="6" left="6" right="6">
                <VStack align="start" gap={10}>
                  <Text
                    fontSize="4xl"
                    fontWeight="semibold"
                    textShadow="2px 2px 4px rgba(0,0,0,0.8)">
                    {movie.title}
                  </Text>

                  <HStack gap={2}>
                    <Button
                      colorScheme="white"
                      variant="solid"
                      size="2xl"
                      fontSize={24}
                      width={"150px"}
                      bg="white"
                      color="black"
                      _hover={{ bg: "gray.200" }}
                      onClick={() =>
                        router.push(
                          `watch/${movie.video && movie.video[0].fileName}`
                        )
                      }>
                      <FaPlay />
                      Phát
                    </Button>

                    <IconButton
                      variant="outline"
                      colorScheme="white"
                      size="2xl"
                      borderColor="gray.400"
                      bgColor={"rgba(42,42,42,.6)"}
                      borderRadius={"50%"}
                      _hover={{ borderColor: "white" }}
                      aria-label="Thêm vào danh sách">
                      <FaPlus />
                    </IconButton>

                    <IconButton
                      variant="outline"
                      colorScheme="white"
                      size="2xl"
                      borderRadius={"50%"}
                      bgColor={"rgba(42,42,42,.6)"}
                      borderColor="gray.400"
                      _hover={{ borderColor: "white" }}
                      aria-label="Thích">
                      <FaThumbsUp />
                    </IconButton>
                  </HStack>
                </VStack>
              </Box>
            </Box>

            <Dialog.Body px={6} py={6}>
              <Grid templateColumns="2fr 1fr" gap={8}>
                {/* Left Column - Main Info */}
                <GridItem>
                  <VStack align="start" gap={6}>
                    <HStack gap={4} flexWrap="wrap">
                      <Badge
                        colorScheme="red"
                        fontSize="sm"
                        border={"1px solid #aaa"}>
                        T{movie.ageRating}
                      </Badge>
                      <Badge
                        colorScheme="gray"
                        fontSize="sm"
                        border={"1px solid #aaa"}>
                        {movie.quality}
                      </Badge>
                      <Text fontSize="sm">{movie.year}</Text>

                      {movie.series?.totalSeasonNumber ?? 1 > 1 ? (
                        <Text fontSize="sm">
                          {movie.series?.totalSeasonNumber} mùa
                        </Text>
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
                            {(
                              movie.totalScoreRating / movie.ratingCount
                            ).toFixed(1)}
                          </Badge>
                        )}
                      </HStack>
                    </HStack>

                    <Text fontSize="md" lineHeight="tall" color="gray.300">
                      {movie.description}
                    </Text>
                  </VStack>
                </GridItem>

                {/* Right Column - Details */}
                <GridItem>
                  <VStack align="start" gap={4} fontSize="sm">
                    <Box>
                      <Text color="gray.400" mb={1}>
                        Diễn viên:
                      </Text>
                      <Text>
                        {movie
                          .actors!.map((actor) => actor.fullName)
                          .join(", ")}
                      </Text>
                    </Box>

                    <Box>
                      <Text color="gray.400" mb={1}>
                        Thể loại:
                      </Text>
                      <Text>
                        {movie.genres!.map((genre) => genre.name).join(", ")}
                      </Text>
                    </Box>

                    <Box>
                      <Text color="gray.400" mb={1}>
                        Series này:
                      </Text>
                      <Text>
                        {movie.tags!.map((tag) => tag.name).join(", ")}
                      </Text>
                    </Box>

                    <Box>
                      <Text color="gray.400" mb={1}>
                        Đạo diễn:
                      </Text>
                      <Text>{movie.director}</Text>
                    </Box>

                    <Box>
                      <Text color="gray.400" mb={1}>
                        Studio:
                      </Text>
                      <Text>{movie.studio}</Text>
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>

              {/* Episodes Section */}
              <Box mt={8}>
                {movie.series && (
                  <Flex justify="space-between" align="center" mb={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      Tập
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      Hiện ngữ
                    </Text>
                  </Flex>
                )}
                {movie.series &&
                  movie.video!.map((episode, index) => (
                    <Flex
                      key={episode.id}
                      p={4}
                      borderRadius="md"
                      _hover={{ bg: "gray.800" }}
                      cursor="pointer"
                      align="start"
                      gap={4}
                      onClick={() => router.push(`/watch/${episode.fileName}`)}>
                      <Text fontSize="lg" fontWeight="bold" minW="40px">
                        {index + 1}
                      </Text>

                      <AspectRatio ratio={16 / 9} w="160px" flexShrink={0}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${movie.thumbnail}`}
                          borderRadius="md"
                          objectFit="cover"
                        />
                      </AspectRatio>

                      <Box flex={1}>
                        <Flex justify="space-between" align="start" mb={2}>
                          <Text fontWeight="semibold" fontSize="md">
                            Tập {episode.episodeNumber}
                          </Text>
                          <Text fontSize="sm" color="gray.400" flexShrink={0}>
                            {episode.duration}p
                          </Text>
                        </Flex>
                        <Text fontSize="sm" color="gray.400" lineHeight="short">
                          {/* {episode.description} */}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
              </Box>

              {/* Comments Section */}
              <Box mt={8}>
                <Separator borderColor="gray.700" mb={6} />

                <Flex justify="space-between" align="center" mb={6}>
                  <Text fontSize="xl" fontWeight="bold">
                    Bình luận ({totalComments})
                  </Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    _hover={{ color: "white" }}
                    onClick={() => setShowComments(!showComments)}>
                    {showComments ? <FaChevronUp /> : <FaChevronDown />}
                    {showComments ? "Ẩn bình luận" : "Hiển thị bình luận"}
                  </Button>
                </Flex>

                {showComments && (
                  <Collapsible.Root>
                    {/* Comment Input */}
                    {session && (
                      <Box mb={6}>
                        <Flex gap={3} align="start">
                          <Avatar.Root>
                            <Avatar.Fallback name="avatar" />
                          </Avatar.Root>
                          <Box flex={1}>
                            <Textarea
                              placeholder={
                                replyingTo
                                  ? "Viết trả lời..."
                                  : "Viết bình luận..."
                              }
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              bg="gray.800"
                              border="1px solid"
                              borderColor="gray.600"
                              _hover={{ borderColor: "gray.500" }}
                              _focus={{ borderColor: "red.500" }}
                              resize="vertical"
                              minH="80px"
                            />
                            <Flex justify="space-between" align="center" mt={2}>
                              {replyingTo && (
                                <Button
                                  size="xs"
                                  variant="ghost"
                                  color="gray.400"
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setNewComment("");
                                  }}>
                                  Hủy trả lời
                                </Button>
                              )}
                              <Button
                                size="sm"
                                colorScheme="red"
                                ml="auto"
                                disabled={!newComment.trim()}
                                onClick={handleSubmitComment}>
                                {replyingTo ? "Trả lời" : "Bình luận"}
                              </Button>
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    )}

                    {/* Comments List */}
                    <VStack align="stretch" gap={0}>
                      {comments.map((comment) => (
                        <CommentItem
                          key={comment._id}
                          comment={comment}
                          onReply={handleReply}
                        />
                      ))}
                    </VStack>

                    {/* Load More Button */}
                    {hasMoreComments && (
                      <Box textAlign="center" mt={6}>
                        <Button
                          variant="ghost"
                          color="gray.400"
                          _hover={{ color: "white" }}
                          onClick={loadMoreComments}
                          disabled={isLoadingMore}
                          size="sm">
                          {isLoadingMore
                            ? "Đang tải..."
                            : "Hiển thị thêm bình luận"}
                        </Button>
                      </Box>
                    )}

                    {/* Show current count */}
                    {comments.length > 0 && (
                      <Box textAlign="center" mt={2}>
                        <Text fontSize="xs" color="gray.500">
                          Hiển thị {comments.length} / {totalComments} bình luận
                        </Text>
                      </Box>
                    )}
                  </Collapsible.Root>
                )}

                {comments.length === 0 && showComments && (
                  <Box textAlign="center" py={8}>
                    <Text color="gray.500" fontSize="sm">
                      Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                    </Text>
                  </Box>
                )}
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NetflixMovieDialog;
