"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "@/components/ui/search-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavUser from "./nav-user";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Popcorn } from "lucide-react";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectValue, setSelectValue] = useState("name");
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 flex justify-between items-center py-4 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-background" : "bg-transparent"
      }`}
    >
      <div className="container px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center lg:gap-8 md:gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-8">
            <Popcorn className="w-9 h-9 text-violet-500" />
            <p className="hidden md:block text-2xl font-bold text-violet-500">
              WENDIAGO MOVIE
            </p>
          </Link>
          {user ? (
            <Link href="/recommend" className="md:flex gap-1 hidden">
              <p
                className="font-bold inline-block"
                style={{
                  filter:
                    "drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff) drop-shadow(0 0 30px #fff)",
                }}
              >
                For You
              </p>
            </Link>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p
                    className="font-bold md:inline-block hidden"
                    style={{
                      filter:
                        "drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff) drop-shadow(0 0 30px #fff)",
                    }}
                  >
                    For You
                  </p>
                </TooltipTrigger>
                <TooltipContent className="bg-foreground text-background max-w-[100px]">
                  Log in first to see movies exclusive to you
                  <TooltipArrow className="fill-foreground" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex flex-row max-w-[250px] md:min-w-[400px] gap-1">
          <SearchBar searchType={selectValue} />
          <Select
            value={selectValue}
            onValueChange={(value) => setSelectValue(value)}
          >
            <SelectTrigger
              className={`md:h-10 w-20 md:w-[120px] bg-transparent border-foreground/50 backdrop-blur-md border text-foreground py-0 md:py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0`}
            >
              <SelectValue placeholder="Select query" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">title</SelectItem>
              <SelectItem value="cast">cast</SelectItem>
              <SelectItem value="ai">query</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <NavUser />
      </div>
    </nav>
  );
}
