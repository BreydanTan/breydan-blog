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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-anthropic flex h-16 items-center justify-between">
        {/* Mobile navigation */}
        <div className="md:hidden">
          <NavMobileMenu />
        </div>

        {/* Logo */}
        <Link 
          href="/" 
          title="Home" 
          className="flex items-center gap-3 transition-anthropic hover:opacity-80 md:order-first"
        >
          <SquareTerminal className="w-7 h-7 text-primary" />
          <span className="hidden sm:inline-block font-semibold text-lg text-primary tracking-tight">
            {config.site.title.split(' ')[0]}
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavDesktopMenu />
        </div>

        {/* Right side social links */}
        <div className="flex items-center space-x-1">
          {socialLinks.map((link) => (
            <Link 
              key={link.title} 
              href={link.href} 
              title={link.title} 
              className="inline-flex items-center justify-center w-9 h-9 rounded-md text-muted hover:text-primary hover:bg-subtle transition-anthropic"
            >
              <div className="w-5 h-5">
                {link.icon}
              </div>
              <span className="sr-only">{link.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
