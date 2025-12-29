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
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Employee List",
    url: "/employee-list",
    icon: User,
  },
  {
    title: "Attendance List",
    url: "/attendance-list",
    icon: BookCheck,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "UID Master",
    url: "/uid-master",
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
                    className="hover:[&>span]:font-semibold transition-all *:active:bg-neutral-500"
                    isActive={index === isActiveMenu}
                    onClick={() => setIsActiveMenu(index)}
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
