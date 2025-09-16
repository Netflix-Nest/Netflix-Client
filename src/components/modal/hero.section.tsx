import {
  AspectRatio,
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Content } from "@netflix-clone/types";
import { useRouter } from "next/navigation";
import { FaPlay, FaPlus, FaThumbsUp } from "react-icons/fa";

export default function HeroSectionModal({
  movie,
  isVideoLoaded,
}: {
  movie: Content;
  isVideoLoaded: boolean;
}) {
  const router = useRouter();
  return (
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
                router.push(`watch/${movie.video && movie.video[0].fileName}`)
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
  );
}
