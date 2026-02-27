import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/contexts/userContext";
import { getCurrentUser } from "@/lib/session";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MMS Attendance App",
  description: "Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <UserProvider user={user}>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster
            duration={2000}
            richColors
            theme="light"
            closeButton
          />
        </UserProvider>
      </body>
    </html>
  );
}
