"use client";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Stack,
  Link,
  IconButton,
  Spacer,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { Search, Bell } from "lucide-react";

export default function AppHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={10}
      right={12}
      zIndex={1000}
      transition="background-color 0.3s ease"
      bg={scrolled ? "black" : "transparent"}
      px={0}
      py={0}>
      <Flex align="center">
        <Image
          src={
            "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
          }
          alt="Netflix"
          width={90}
          height={90}
        />
        {/* Menu */}
        <Stack
          direction="row"
          ml={10}
          fontSize="md"
          fontWeight="unset"
          spaceX={3}>
          <Link as={NextLink} href="/">
            Trang chủ
          </Link>
          <Link as={NextLink} href="/series">
            Series
          </Link>
          <Link as={NextLink} href="/movies">
            Phim
          </Link>
          <Link as={NextLink} href="/new">
            Mới & Phổ biến
          </Link>
          <Link as={NextLink} href="/my-list">
            Danh sách của tôi
          </Link>
          <Link as={NextLink} href="/browse-by-lang">
            Duyệt theo ngôn ngữ
          </Link>
        </Stack>

        <Spacer />

        {/* Icons */}
        <Stack direction="row">
          <IconButton aria-label="Search" variant="ghost">
            <Search size={20} />
          </IconButton>
          <IconButton aria-label="Notifications" variant="ghost">
            <Bell size={20} />
          </IconButton>
          <Avatar.Root size={"sm"} key={10} shape={"square"}>
            <Avatar.Fallback name="Avatar" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
        </Stack>
      </Flex>
    </Box>
  );
}
