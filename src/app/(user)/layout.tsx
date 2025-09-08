import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" minH="100vh">
      <Box as="header">
        <AppHeader />
      </Box>

      <Box as="main" flex="1" p={4}>
        {children}
      </Box>

      <Box as="footer" mt="auto">
        <AppFooter />
      </Box>
    </Flex>
  );
}
