import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Text,
  Flex,
  HStack,
  Avatar,
  AvatarIcon,
  Collapsible,
} from "@chakra-ui/react";
import { FaReply, FaHeart, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Comment, CommentClient, Content } from "@netflix-clone/types";

export const CommentItem = ({
  comment,
  level = 0,
  onReply,
}: {
  comment: CommentClient;
  level?: number;
  onReply?: (commentId: string) => void;
}) => {
  const [showReplies, setShowReplies] = useState(true);
  const [liked, setLiked] = useState(false);
  const maxLevel = 2;

  const getIndentationStyle = (level: number) => {
    return {
      marginLeft: `${level * 20}px`,
      borderLeft: level > 0 ? "2px solid rgba(255, 255, 255, 0.1)" : "none",
      paddingLeft: level > 0 ? "12px" : "0",
    };
  };

  return (
    <Box style={getIndentationStyle(level)} mb={4}>
      <Flex gap={3} align="start">
        <Avatar.Root>
          <Avatar.Fallback name="avtar" />
          <Avatar.Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${process.env.NEXT_PUBLIC_DEFAULT_AVATAR}`}
          />
        </Avatar.Root>

        <Box flex={1}>
          <Flex align="center" gap={2} mb={1}>
            <Text fontSize="sm" fontWeight="semibold" color="gray.200">
              {comment.fullName}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
            </Text>
          </Flex>

          <Text fontSize="sm" color="gray.300" lineHeight="1.4" mb={2}>
            {comment.content}
          </Text>

          <HStack gap={4} fontSize="xs">
            <Button
              variant="ghost"
              size="xs"
              color="gray.400"
              _hover={{ color: "red.400" }}
              onClick={() => setLiked(!liked)}>
              {liked ? "Đã thích" : "Thích"}
              <FaHeart color={liked ? "red" : "currentColor"} />
            </Button>

            {level < maxLevel && onReply && (
              <Button
                variant="ghost"
                size="xs"
                color="gray.400"
                _hover={{ color: "white" }}
                onClick={() => onReply(comment._id)}>
                Trả lời
                <FaReply />
              </Button>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="xs"
                color="gray.400"
                _hover={{ color: "white" }}
                onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? "Ẩn" : "Hiển thị"} {comment.replies.length} trả
                lời
                {showReplies ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
            )}
          </HStack>
        </Box>
      </Flex>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && showReplies && (
        <Collapsible.Root>
          <Box mt={3}>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                level={level + 1}
                onReply={onReply}
              />
            ))}
          </Box>
        </Collapsible.Root>
      )}
    </Box>
  );
};
