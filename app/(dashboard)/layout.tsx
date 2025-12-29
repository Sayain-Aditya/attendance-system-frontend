import AppSidebar from "@/components/app-sidebar";
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
      <main className="py-2 mx-4 pr-2 w-full">
        <SidebarTrigger className="lg:hidden" />
        {children}
      </main>
    </>
  );
}
