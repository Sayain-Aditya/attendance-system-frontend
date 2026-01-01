"use client";

import {
  BookCheck,
  Calendar,
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
import Link from "next/link";
import { useState } from "react";

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
    title: "Calendar",
    url: "/admin/calendar",
    icon: Calendar,
  },
  {
    title: "UID Master",
    url: "/admin/uid-master",
    icon: Search,
  },
];

export default function AppSidebar() {
  const { toggleSidebar, isMobile } = useSidebar();
  const [isActiveMenu, setIsActiveMenu] = useState(0);

  const handleMobileToggle = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="pl-3 pt-3 border-b">
        Welcome, Admin
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title} onClick={handleMobileToggle}>
                  <SidebarMenuButton
                    asChild
                    isActive={index === isActiveMenu}
                    onClick={() => setIsActiveMenu(index)}
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
