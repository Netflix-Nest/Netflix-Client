import { Provider } from "@/components/ui/provider";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import NProgressWrapper from "@/lib/nprogress.wrapper";
import { defaultSystem } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Netflix Lite",
  description: "The peak movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          backgroundColor: "#141414",
          color: "white",
          padding: 0,
        }}>
        <NProgressWrapper>
          <NextAuthWrapper>
            <Provider>{children}</Provider>
          </NextAuthWrapper>
        </NProgressWrapper>
      </body>
    </html>
  );
}
