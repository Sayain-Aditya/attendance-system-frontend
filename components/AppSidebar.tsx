"use client";

import {
  BookCheck,
  ClipboardClock,
  // Calendar,
  Home,
  Search,
  // Settings,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Employee List",
    url: "/admin/employee-list",
    icon: User,
  },
  {
    title: "Attendance List",
    url: "/admin/attendance-list",
    icon: BookCheck,
  },
  {
    title: "UID Master",
    url: "/admin/uid-master",
    icon: Search,
  },
  {
    title: "Leave Applications",
    url: "/admin/leave-applications",
    icon: ClipboardClock,
  },
  {
    title: "Complaints",
    url: "/admin/complaints",
    icon: ClipboardClock,
  },
  {
    title: "Notice Board",
    url: "/admin/notice-board",
    icon: ClipboardClock,
  },
];

export default function AppSidebar() {
  const { toggleSidebar, isMobile } = useSidebar();
  const pathname = usePathname();

  const handleMobileToggle = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="pl-3 pt-3 border-b font-semibold">
        <div className="flex items-center gap-3 text-wrap">
          <Image src="/images/logo.png" alt="logo" height={80} width={80} />
          <span>MMS Attendance System</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} onClick={handleMobileToggle}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === pathname}
                    size="lg"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
