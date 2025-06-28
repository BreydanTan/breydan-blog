"use client";

import Link from "next/link";
import { NavDesktopMenu } from "./nav-desktop-menu";
import { NavMobileMenu } from "./nav-mobile-menu";
import GithubIcon from "@/components/icons/github";
import XiaohongshuIcon from "@/components/icons/xiaohongshu";
import XIcon from "@/components/icons/x";
import { SquareTerminal } from "lucide-react";
import { config } from "@/lib/config";

export function Header() {
  const socialLinks = [
    { title: "Github", key: "github", icon: <GithubIcon /> },
    { title: "X", key: "x", icon: <XIcon /> },
    { title: "Xiaohongshu", key: "xiaohongshu", icon: <XiaohongshuIcon /> },
  ]
    .map(item => ({
      title: item.title,
      href: config.social && config.social[item.key as keyof typeof config.social],
      icon: item.icon
    }))
    .filter(link => !!link.href);

  return (
    <header className="pt-4">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-4 max-w-4xl">
        {/* Mobile navigation */}
        <NavMobileMenu />

        {/* Logo */}
        <Link href="/" title="Home" className="flex items-center gap-2 sm:gap-4 md:order-first">
          <SquareTerminal className="w-8 h-8 sm:w-10 sm:h-10" />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:block">
          <NavDesktopMenu />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-8 mr-2 sm:mr-4">
          {socialLinks.map((link) => (
            <Link key={link.title} href={link.href} title={link.title} className="p-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6">
                {link.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
