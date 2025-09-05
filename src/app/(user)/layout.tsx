import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* header */}
      {children}
      {/* footer */}
    </>
  );
}
