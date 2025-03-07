"use client";

import { useState } from "react";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({ searchType }: { searchType: string }) {
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
        placeholder="Search anything..."
        name="keyword"
        className="h-9 py-0 md:py-2 md:h-10  bg-transparent border-foreground/50 backdrop-blur-md border text-foreground placeholder:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
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
