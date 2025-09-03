import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Start your experience !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
