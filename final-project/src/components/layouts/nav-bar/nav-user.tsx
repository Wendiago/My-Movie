"use client";

import { useLogout, useUser } from "@/api/auth/auth";
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
import { toast } from "@/hooks/use-toast";
import { paths } from "@/lib/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavUser() {
  const router = useRouter();
  const { data, status } = useUser();
  //   console.log("User data: ", data);
  //   console.log("User data status: ", status);
  const logoutMutation = useLogout({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Log out successfully",
        description: "Redirected to login page",
      });
      router.push(paths.auth.login.getHref());
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Log out failed",
        description: error.message,
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CustomImage
          src="/avatar.jpeg"
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
        {status == "success" ? (
          <>
            {" "}
            <DropdownMenuLabel>
              <div className="font-bold">{data.data.name}</div>
              <Link href={`/user/profile`} className="text-textGrey text-sm">
                View profile
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={`/user/lists`} className="flex-1">
                  Lists
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/user/favourites`} className="flex-1">
                  Favourites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/user/ratings`} className="flex-1">
                  Ratings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/user/watchlists`} className="flex-1">
                  Watchlists
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
          </>
        ) : (
          <DropdownMenuGroup>
            <div>You have to log in first</div>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
