import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LionSTour - Authentic Israeli Tourism Experiences",
  description: "Postwar Israel Tourism Experience Platform – authentic, story-driven, safe travel with local veterans & diverse communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
