import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { Play, Star } from "lucide-react";
import React from "react";

export default function MovieOverview({ className }: { className?: string }) {
  return (
    <div className={cn(className, "flex flex-col max-w-[40%]")}>
      <h1 className="md:text-[2rem] lg:text-[4rem] font-extrabold text-background">
        THE WITCH
      </h1>
      <div className="mb-4">
        <Badge>NEW</Badge>
      </div>
      <div className="flex items-center gap-2 h-4 mb-4">
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" />
          <p className="text-yellow-500 font-semibold">9.8</p>
        </div>
        <Separator orientation="vertical" />
        <p className="text-background">2020</p>
        <Separator orientation="vertical" />
        <p className="text-background">T16</p>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Badge variant="outline" key={index}>
            Horror
          </Badge>
        ))}
      </div>
      <p className="text-background">
        Heaven is always justice, evil will be punished
      </p>

      <div className="mt-6">
        <Button size="icon" className="rounded-full h-16 w-16 [&_svg]:size-8">
          <Play />
        </Button>
      </div>
    </div>
  );
}
