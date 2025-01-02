"use client";
import LogoutButton from "@/app/(auth)/_components/logout-button";
import { Popcorn } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "@/components/ui/search-bar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        isScrolled ? "bg-foreground" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <Link href="/home" className="flex gap-1 text-2xl">
          <Popcorn className="text-primary size-8" />
          <p className="font-bold text-primary">WENDIAGO MOVIE</p>
        </Link>
        <Link href="/recommend" className="flex gap-1 text-2xl">
          <p className="font-bold text-primary">For You</p>
        </Link>
        <div className="flex flex-row min-w-[400px] gap-1">
          <SearchBar searchType={selectValue}/>
          <Select
            value={selectValue}
            onValueChange={(value) => setSelectValue(value)}
          >
            <SelectTrigger className={`w-[120px] bg-background/80 text-foreground border-none pl-4 h-[40px] backdrop-blur-md `}>
              <SelectValue placeholder="Select query" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">By title</SelectItem>
              <SelectItem value="cast">By cast</SelectItem>
              <SelectItem value="natural-query">By query</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
}
