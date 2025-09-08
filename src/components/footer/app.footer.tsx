"use client";

import { Box, Flex, HStack, Stack, Link, Text, Icon } from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function AppFooter() {
  return (
    <Box
      bg="black"
      color="gray.400"
      py={10}
      px={{ base: 6, md: 20 }}
      marginLeft={386}
      marginRight={312}
      marginTop={20}
      paddingBottom={4}>
      {/* Social Icons */}
      <HStack spaceX={6} mb={8}>
        <Link href="https://facebook.com">
          <Icon as={FaFacebookF} boxSize={5} />
        </Link>
        <Link href="https://instagram.com">
          <Icon as={FaInstagram} boxSize={5} />
        </Link>
        <Link href="https://twitter.com">
          <Icon as={FaTwitter} boxSize={5} />
        </Link>
        <Link href="https://youtube.com">
          <Icon as={FaYoutube} boxSize={5} />
        </Link>
      </HStack>

      {/* Footer Links */}
      <Flex
        direction={{ base: "column", md: "row" }}
        // justify="space-between"
        flexWrap="wrap"
        gapX={20}>
        <Stack spaceX={0}>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Mô tả âm thanh
          </Link>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Quan hệ với nhà đầu tư
          </Link>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Thông báo pháp lý
          </Link>
        </Stack>

        <Stack spaceX={0}>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Trung tâm trợ giúp
          </Link>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Việc làm
          </Link>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Tùy chọn cookie
          </Link>
        </Stack>

        <Stack spaceX={0}>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Thẻ quà tặng
          </Link>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Điều khoản sử dụng
          </Link>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Thông tin doanh nghiệp
          </Link>
        </Stack>

        <Stack spaceX={0}>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Trung tâm đa phương tiện
          </Link>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Quyền riêng tư
          </Link>
          <Link href="#" fontSize={14} color={"dimgray"}>
            Liên hệ với chúng tôi
          </Link>
        </Stack>
      </Flex>

      {/* Copyright */}
      <Text fontSize={12} mt={10}>
        © 1997–2025 Netflix, Inc.
      </Text>
    </Box>
  );
}
