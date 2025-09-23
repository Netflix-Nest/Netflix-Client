import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import { userApi } from "@/utils/api";
import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await userApi.getAccount();
  return (
    <Flex direction="column" minH="100vh">
      <Box as="header">
        <AppHeader user={res.data!} />
      </Box>

      <Box as="main" flex="1">
        {children}
      </Box>

      <Box as="footer" mt="auto">
        <AppFooter />
      </Box>
    </Flex>
  );
}
