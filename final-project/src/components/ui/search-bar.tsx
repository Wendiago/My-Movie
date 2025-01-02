"use client";

import { useState } from "react";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({ searchType } : { searchType: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      const form = document.getElementById("searchForm") as HTMLFormElement;
      if (form) form.submit();
    }
  };

  return (
    <Form
      id="searchForm"
      action="/search"
      className="relative flex-1 max-w-[400px]"
      onSubmit={(e) => {
        if (!searchTerm.trim()) e.preventDefault();
      }}
    >
      <Input
        placeholder="Search movies"
        name="keyword"
        className="pl-4 bg-background/80 backdrop-blur-md text-foreground border-none placeholder:text-foreground"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Input type="hidden" name="type" value={searchType} />
      <Search
        onClick={handleSearchClick}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-50 w-4 h-4 text-foreground"
      />
    </Form>
  );
}
