import { Box, Container } from "@chakra-ui/react";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box mt={20}>{children}</Box>;
}
