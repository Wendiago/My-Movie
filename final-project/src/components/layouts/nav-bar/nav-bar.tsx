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
import CustomImage from "@/components/ui/custom-image";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

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
      <div className="container flex justify-between items-center">
        <div className="flex items-center lg:gap-8 md:gap-4">
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-3 text-2xl">
              <CustomImage
                src={"/logo.png"}
                alt="logo"
                width={32}
                height={32}
                className="w-8 h-8"
                usePlaceholder={false}
              />
              <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#209dc2] via-[#b05f99] to-[#e85a75]">
                WENDIAGO MOVIE
              </p>
            </div>
          </Link>
          {user ? (
            <Link href="/recommend" className="flex gap-1">
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
                    className="font-bold inline-block"
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

        <div className="flex flex-row min-w-[400px] gap-1">
          <SearchBar searchType={selectValue} />
          <Select
            value={selectValue}
            onValueChange={(value) => setSelectValue(value)}
          >
            <SelectTrigger
              className={`w-[120px] bg-transparent border-foreground/50 backdrop-blur-md border text-foreground pl-4 h-[40px] focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0`}
            >
              <SelectValue placeholder="Select query" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">By title</SelectItem>
              <SelectItem value="cast">By cast</SelectItem>
              <SelectItem value="ai">By query</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <NavUser />
      </div>
    </nav>
  );
}
