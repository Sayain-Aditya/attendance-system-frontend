import AppSidebar from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <aside>
        <AppSidebar />
      </aside>
      <main className="max-md:p-3 lg:py-2 lg:mx-4 lg:pr-2 w-full">
        <SidebarTrigger className="lg:hidden" />
        {children}
      </main>
    </>
  );
}
