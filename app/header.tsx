import { ModeToggle } from "@/components/ui/mode-toggle";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { HeaderActions } from "./header-actions";

export function Header() {
  return (
    <div className="bg-zinc-950 py-1 fixed top-0 left-0 right-0 z-50 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center pl-3 pr-2">
        {/* Logo and OrganizationSwitcher */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-2xl font-bold tracking-widest"
          >
            <Image src="/brain.png" width={50} height={50} alt="logo" />
            BigHead
          </Link>
          <OrganizationSwitcher />
        </div>

        {/* Center Links */}
        <div className="flex gap-8">
          <Link
            href="#about"
            className="text-white hover:text-yellow-400 transition-colors duration-0"
          >
            About
          </Link>
          <Link
            href="#features"
            className="text-white hover:text-yellow-400 transition-colors duration-0"
          >
            Features
          </Link>
          <Link
            href="#faq"
            className="text-white hover:text-yellow-400 transition-colors duration-0"
          >
            FAQ
          </Link>
        </div>

        {/* Mode Toggle and Header Actions */}
        <div className="flex gap-6 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}