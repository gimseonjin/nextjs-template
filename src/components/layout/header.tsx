"use client";

import Link from "next/link";
import { APP_NAME } from "@/constants/app";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

export function Header() {
  const { setTheme, theme } = useTheme();
  const mounted = useMounted();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">{APP_NAME}</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/example"
              className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              예시
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 