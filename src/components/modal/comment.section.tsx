import {
  Avatar,
  Box,
  Button,
  Collapsible,
  Flex,
  Separator,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  CommentClient,
  Content,
  CreateCommentDto,
  UserMention,
} from "@netflix-clone/types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CommentItem } from "./comment.box";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { movieApi, userApi } from "@/utils/api";
import { COMMON_ERROR } from "@/constants/response.message";
import { FastToaster } from "@/lib/toaster.noti";

export default function CommentSection({
  movie,
  isOpen,
}: {
  isOpen: boolean;
  movie: Content;
}) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");
  const [mention, setMention] = useState("");
  const [debouncedMention, setDebounceMention] = useState("");
  const [users, setUsers] = useState<UserMention[] | []>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // comment pagination
  const [comments, setComments] = useState<CommentClient[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;
  const hasMoreComments = comments.length < totalComments;

  useEffect(() => {
    const atIndex = newComment.lastIndexOf("@");
    if (atIndex !== -1) {
      const usernamePart = newComment.slice(atIndex + 1);
      if (usernamePart && !usernamePart.includes(" ")) {
        setMention(usernamePart);
      } else {
        setMention("");
      }
    } else {
      setMention("");
    }
  }, [newComment]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceMention(mention);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [mention]);

  useEffect(() => {
    const searchUser = async () => {
      const resUsers = await userApi.getUsernames(debouncedMention);
      setUsers(resUsers.data);
    };
    searchUser();
  }, [debouncedMention]);

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
        setComments((prevComments: CommentClient[]) => [
          ...prevComments,
          ...cmts.data,
        ]);
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

  const handleSubmitComment = async () => {
    if (newComment.trim()) {
      try {
        console.log("Submitting comment:", newComment);
        if (!session?.user.id) {
          FastToaster("error", "Đã xảy ra lỗi!");
        }
        const createCommentDto: CreateCommentDto = {
          content: newComment,
          contentId: movie.id,
          userId: session?.user.id!,
          fullName: session?.user.fullName!,
        };
        if (replyingTo) {
          createCommentDto.parentId = replyingTo;
        }
        const res = await movieApi.submitComment(createCommentDto);
        setNewComment("");
        setReplyingTo(null);

        // const cmts = await movieApi.getComments(1, commentsPerPage, movie.id);
        // if (cmts.data) {
        //   setComments(cmts.data);
        //   setCurrentPage(1);
        //   setTotalComments(cmts.data.length);
        // }

        // Due to new comment cannot get immediately when is just created, we mock it temporarily
        const newCmt: CommentClient = {
          _id: "",
          content: newComment,
          contentId: movie.id,
          mentions: [],
          parentId: replyingTo,
          userId: session?.user.id!,
          replies: [],
          fullName: session?.user.fullName!,
          createdAt: "30-04-1975" as unknown as Date,
          updatedAt: "30-04-1975" as unknown as Date,
        };
        setComments((prevCmts: CommentClient[]) => [...prevCmts, newCmt]);
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
            <Box mb={6} position="relative">
              <Flex gap={3} align="start">
                <Avatar.Root>
                  <Avatar.Fallback name="avatar" />
                </Avatar.Root>
                <Box flex={1} position="relative">
                  <Textarea
                    placeholder={
                      replyingTo ? "Viết trả lời..." : "Viết bình luận..."
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

                  {/* User Mentions Dropdown */}
                  {mention && users.length > 0 && (
                    <Box
                      position="absolute"
                      bottom="100%"
                      left={0}
                      right={0}
                      mb={1}
                      bg="gray.900"
                      border="1px solid"
                      borderColor="gray.600"
                      borderRadius="md"
                      boxShadow="0 -4px 20px rgba(0, 0, 0, 0.4)"
                      zIndex={1000}
                      maxH="200px"
                      overflowY="auto"
                      css={{
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "transparent",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#4A5568",
                          borderRadius: "2px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#718096",
                        },
                      }}>
                      {users.map((user: UserMention, index) => (
                        <Flex
                          key={user.id}
                          align="center"
                          p={3}
                          cursor="pointer"
                          _hover={{
                            bg: "red.600",
                            transform: "translateX(2px)",
                            transition: "all 0.2s ease",
                          }}
                          _active={{ bg: "red.700" }}
                          borderBottom={
                            index < users.length - 1 ? "1px solid" : "none"
                          }
                          borderBottomColor="gray.700"
                          onClick={() => {
                            const atIndex = newComment.lastIndexOf("@");
                            const beforeAt = newComment.slice(0, atIndex);
                            const afterMention = newComment.slice(
                              atIndex + mention.length + 1
                            );
                            setNewComment(
                              `${beforeAt}@${user.username} ${afterMention}`
                            );
                            setMention("");
                            setUsers([]);
                          }}>
                          <Avatar.Root size="sm" mr={3}>
                            <Avatar.Image
                              src={
                                user.avatar
                                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${user.avatar}`
                                  : `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${process.env.NEXT_PUBLIC_DEFAULT_AVATAR}`
                              }
                              alt={user.username}
                            />
                            <Avatar.Fallback
                              name={user.username}
                              bg="red.600"
                              color="white"
                              fontSize="xs"
                            />
                          </Avatar.Root>
                          <Box flex={1}>
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              color="white"
                              mb={0.5}>
                              {user.username}
                            </Text>
                            {user.fullName && (
                              <Text
                                fontSize="xs"
                                color="gray.400"
                                lineHeight="1.2">
                                {user.fullName}
                              </Text>
                            )}
                          </Box>
                        </Flex>
                      ))}
                    </Box>
                  )}

                  {/* Mention hint when typing @ */}
                  {newComment[newComment.length - 1] === "@" &&
                    mention === "" && (
                      <Box
                        position="absolute"
                        bottom="100%"
                        left={0}
                        right={0}
                        mb={1}
                        bg="gray.800"
                        border="1px solid"
                        borderColor="gray.600"
                        borderRadius="md"
                        p={3}
                        zIndex={999}>
                        <Flex align="center" gap={2}>
                          <Text fontSize="sm" color="gray.400">
                            💡 Gõ tên người dùng để mention
                          </Text>
                        </Flex>
                      </Box>
                    )}

                  <Flex justify="space-between" align="center" mt={2}>
                    {replyingTo && (
                      <Button
                        size="xs"
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: "white" }}
                        onClick={() => {
                          setReplyingTo(null);
                          setNewComment("");
                          setMention("");
                          setUsers([]);
                        }}>
                        Hủy trả lời
                      </Button>
                    )}
                    <Button
                      size="sm"
                      colorScheme="red"
                      ml="auto"
                      disabled={!newComment.trim()}
                      onClick={handleSubmitComment}
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(229, 62, 62, 0.4)",
                      }}
                      transition="all 0.2s ease">
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
                _hover={{
                  color: "white",
                  transform: "translateY(-1px)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                }}
                onClick={loadMoreComments}
                disabled={isLoadingMore}
                size="sm"
                transition="all 0.2s ease">
                {isLoadingMore ? "Đang tải..." : "Hiển thị thêm bình luận"}
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
  );
}
