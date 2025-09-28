import { changeExistenceAction } from "@/lib/server-action/change-existence-movie-in-watchlist";
import { FastToaster } from "@/lib/toaster.noti";
import { engagementApi } from "@/utils/api";
import {
  AspectRatio,
  Box,
  Button,
  CheckboxGroup,
  Checkbox,
  CloseButton,
  Dialog,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  Portal,
} from "@chakra-ui/react";
import { Content, Watchlist } from "@netflix-clone/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus, FaThumbsUp } from "react-icons/fa";
import { MdDone } from "react-icons/md";

export default function HeroSectionModal({
  movie,
  isVideoLoaded,
  watchlist,
}: {
  movie: Content;
  isVideoLoaded: boolean;
  watchlist: Watchlist[];
}) {
  const [existInList, setExistInList] = useState<Watchlist[]>([]);
  const [isWatchlistDialogOpen, setIsWatchlistDialogOpen] = useState(false);
  const [selectedWatchlists, setSelectedWatchlists] = useState<number[]>([]);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    const movieWatchlists = watchlist.filter((lst) =>
      lst.contentIds.includes(movie.id)
    );
    setExistInList(movieWatchlists);
    // Initially selected watchlists
    setSelectedWatchlists(movieWatchlists.map((wl) => wl.id));
  }, [watchlist, movie.id]);

  const router = useRouter();

  const handleOpenWatchlistDialog = () => {
    setIsWatchlistDialogOpen(true);
  };

  const handleSave = async () => {
    setDisable(true);
    const res = await changeExistenceAction(
      existInList,
      selectedWatchlists,
      movie.id,
      watchlist
    );
    setDisable(false);
    if (res?.success) {
      FastToaster("success", "Cập nhật thành công!");
      setExistInList(res.newSelectedList);
    } else {
      FastToaster(
        "error",
        "Cập nhật thất bại!",
        "Có lỗi xảy ra. Vui lòng thử lại sau!"
      );
    }
    setIsWatchlistDialogOpen(false);
  };

  const handleCancel = () => {
    setSelectedWatchlists(existInList.map((wl) => wl.id));
    setIsWatchlistDialogOpen(false);
  };

  return (
    <>
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
                  src={`/api/media/videos/${movie.trailer}`}
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
                    `/watch/${movie.video && movie.video[0].fileName}`
                  )
                }>
                <FaPlay />
                Phát
              </Button>

              <IconButton
                variant="outline"
                colorScheme={existInList.length > 0 ? "light" : "white"}
                size="2xl"
                borderColor="gray.400"
                bgColor={
                  existInList.length > 0
                    ? "whiteAlpha.400"
                    : "rgba(42,42,42,.6)"
                }
                borderRadius={"50%"}
                _hover={{ borderColor: "white" }}
                aria-label={
                  existInList.length > 0
                    ? "Xóa khỏi danh sách"
                    : "Thêm vào danh sách"
                }
                onClick={handleOpenWatchlistDialog}>
                {existInList.length > 0 ? (
                  <MdDone style={{ width: 30, height: 30 }} />
                ) : (
                  <FaPlus />
                )}
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

      {/* Watchlist Dialog */}
      <Dialog.Root
        closeOnEscape={true}
        open={isWatchlistDialogOpen}
        onOpenChange={() => setIsWatchlistDialogOpen}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              maxW="md"
              bg="gray.900"
              color="white"
              borderRadius="lg"
              p={6}>
              <Dialog.Header>
                <Dialog.Title fontSize="xl" fontWeight="bold">
                  Quản lý danh sách phim
                </Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton />
                </Dialog.CloseTrigger>
              </Dialog.Header>

              <Dialog.Body py={4}>
                <Text mb={4} color="gray.300">
                  Chọn danh sách muốn thêm "{movie.title}":
                </Text>

                <CheckboxGroup
                  value={selectedWatchlists.map(String)}
                  onValueChange={(v) => setSelectedWatchlists(v.map(Number))}>
                  {/* <VStack align="start" gap={3}> */}
                  {watchlist.map((wl) => (
                    <Checkbox.Root
                      key={wl.id}
                      value={wl.id.toString()}
                      size="lg"
                      colorScheme="red">
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label fontSize="md">{wl.name}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                  {/* </VStack> */}
                </CheckboxGroup>
              </Dialog.Body>

              <Dialog.Footer>
                <HStack gap={3} w="full" justify="flex-end">
                  <Button
                    variant="outline"
                    colorScheme="gray"
                    disabled={disable}
                    onClick={handleCancel}>
                    Hủy
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleSave}
                    disabled={disable}>
                    Lưu thay đổi
                  </Button>
                </HStack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
