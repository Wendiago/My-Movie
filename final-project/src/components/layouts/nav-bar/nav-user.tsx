"use client";

import CustomImage from "@/components/ui/custom-image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/routes";

export default function NavUser() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogin = () => {
    router.push(paths.auth.login.getHref());
  };

  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      {session === null ? (
        <Button
          onClick={handleLogin}
          className="text-sm font-bold bg-gradient-to-r from-[#209dc2] to-[#e85a75] hover:bg-opacity-80"
        >
          Log In
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CustomImage
              src={user?.photo || "/avatar.jpeg"}
              alt="avatar placeholder"
              width="40"
              height="40"
              className="cursor-pointer h-full aspect-square rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-40 rounded-lg bg-background text-foreground"
            side="bottom"
            sideOffset={4}
            align="end"
          >
            <DropdownMenuLabel>
              <div className="font-bold">{user?.name}</div>
              <Link href={`/user/profile`} className="text-textGrey text-sm">
                View profile
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={`/user/favourites`} className="flex-1">
                  Favorites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/user/ratings`} className="flex-1">
                  Ratings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/user/watchlist`} className="flex-1">
                  Watchlist
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="">Edit profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
