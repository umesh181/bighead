"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ClipboardPen, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideNav() {
  // Set collapsed to true by default
  const [collapsed, setCollapsed] = useState(true); 
  const pathname = usePathname();
  const navItems = [
    { icon: Search, label: "Search", href: "/dashboard/Search" },
    { icon: FilesIcon, label: "Documents", href: "/dashboard/documents" },
    { icon: ClipboardPen, label: "Notes", href: "/dashboard/notes" },
  ];

  return (
    <nav
      className={cn(
        "flex flex-col h-screen bg-neutral-950 text-white transition-all duration-300",
        { "w-16": collapsed, "w-60": !collapsed }
      )}
    >
      <ul className="space-y-0.5 mt-20 flex-grow">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              className={cn(
                "flex items-center gap-4 p-3 rounded-r-full hover:bg-neutral-900 transition-colors",
                {
                  "bg-neutral-800": pathname.includes(item.href),
                }
              )}
              href={item.href}
            >
              <item.icon size={18} className="min-w-[18px]" />
              <span
                className={cn(
                  "text-l transition-opacity duration-300",
                  { "opacity-0": collapsed, "opacity-100": !collapsed }
                )}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 hover:bg-neutral-800 transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </nav>
  );
}
