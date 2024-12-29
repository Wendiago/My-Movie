"use client";
import LogoutButton from "@/app/(auth)/_components/logout-button";
import { Popcorn } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "@/components/ui/search-bar";
import GenreFilter from "./_components/genre-filter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
        <div className="flex flex-row min-w-[400px]">
          <Select>
            <SelectTrigger className="w-[60px]">
              <SelectValue placeholder="S" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <SearchBar searchType={"natural-query"}/>
        </div>
        <GenreFilter />
        <LogoutButton />
      </div>
    </nav>
  );
}
