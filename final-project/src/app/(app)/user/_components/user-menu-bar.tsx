"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function UserMenuBar() {
  return (
    <div className="w-full flex justify-center items-center gap-6 py-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center focus-visible:border-none focus-visible:outline-none">
          <div className="p-2">Overview</div>
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={"/user/profile"} className="flex-1">
                Main
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/user/favourites"} className="flex-1">
                Favourites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/recommend"} className="flex-1">
                Recommendation
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={"/user/edit"} className="flex-1">
                Edit profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link className="p-2 cursor-pointer" href={"/user/lists"}>
        Lists
      </Link>
      <Link className="p-2 cursor-pointer" href={"/user/ratings"}>
        Ratings
      </Link>
      <Link className="p-2 cursor-pointer" href={"/user/watchlist"}>
        Watchlist
      </Link>
    </div>
  );
}
