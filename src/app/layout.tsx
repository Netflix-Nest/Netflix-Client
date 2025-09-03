import { Provider } from "@/components/ui/provider";
import NextAuthWrapper from "@/utils/next.auth.wrapper";
import NProgressWrapper from "@/utils/nprogress.wrapper";
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
