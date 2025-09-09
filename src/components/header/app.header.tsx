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
      left={0}
      right={0}
      zIndex={1000}
      transition="background-color 0.3s ease"
      bg={
        scrolled
          ? "black"
          : "linear-gradient(to bottom,rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100% )"
      }
      px={19}
      paddingRight={10}
      py={0}>
      <Flex align="center">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/images/${process.env.NEXT_PUBLIC_LOGO_HEADER}`}
          alt="Netflix"
          width={141}
          height={55}
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
