import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({
  showControls,
}: {
  showControls: boolean;
}) {
  const router = useRouter();
  return (
    <Box
      position="absolute"
      boxSize={""}
      top="0"
      left="0"
      right="0"
      bgGradient="linear(to-b, blackAlpha.700, transparent)"
      opacity={showControls ? 1 : 0}
      transition="opacity 0.3s">
      <Flex justifyContent="space-between" alignItems="center" p="4">
        <IconButton
          size={"lg"}
          aria-label="Back"
          variant="plain"
          color="white"
          _hover={{ color: "gray.300" }}
          onClick={() => router.back()}>
          <ChevronLeft size={24} style={{ width: "48px", height: "48px" }} />
        </IconButton>
      </Flex>
    </Box>
  );
}
