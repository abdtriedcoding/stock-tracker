import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full flex flex-row items-center gap-4 justify-between py-4">
      <h1 className="text-lg font-semibold">Stock Tracker</h1>
      <div className="flex flex-row gap-2 items-center">
        <Link
          href="https://github.com/abdtriedcoding/stock-tracker"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
              })
            )}
          >
            <Github className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
