"use client";

import { Popcorn } from "lucide-react";
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

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectValue, setSelectValue] = useState("name");

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
      className={`px-16 fixed top-0 z-50 flex justify-between items-center py-4 w-full transition-all duration-1000 ease-in-out ${
        isScrolled ? "bg-background" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center lg:gap-8 md:gap-4">
          <Link href="/home" className="flex items-center">
            <div className="flex items-center gap-3 text-2xl">
              <Popcorn className="text-primary size-8" />
              <p className="font-bold text-primary">WENDIAGO MOVIE</p>
            </div>
          </Link>
          <Link href="/recommend" className="flex gap-1">
            <p
              className="font-bold inline-block animate-glowing"
              style={{
                filter:
                  "drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff) drop-shadow(0 0 30px #fff)",
              }}
            >
              For You
            </p>
          </Link>
        </div>

        <div className="flex flex-row min-w-[400px] gap-1">
          <SearchBar searchType={selectValue} />
          <Select
            value={selectValue}
            onValueChange={(value) => setSelectValue(value)}
          >
            <SelectTrigger
              className={`w-[120px] bg-transparent border-foreground/50 backdrop-blur-md border text-foreground pl-4 h-[40px] `}
            >
              <SelectValue placeholder="Select query" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">By title</SelectItem>
              <SelectItem value="cast">By cast</SelectItem>
              <SelectItem value="natural-query">By query</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <NavUser />
      </div>
    </nav>
  );
}
