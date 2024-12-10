import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Star } from "lucide-react";
import React from "react";

export default function MovieDetail() {
  return (
    <div className="flex flex-col lg:w-[500px] mb-8">
      <h1 className="text-[2rem] font-semibold line-clamp-1 text-background mb-3">
        We are criminal police We are criminal police
      </h1>
      <div className="flex items-center gap-2 mb-3">
        <Badge>Hot</Badge>
        <Badge>New episode</Badge>
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
        <Separator orientation="vertical" />
        <p className="text-background">27/38 Episodes</p>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Badge variant="outline" key={index}>
            Horror
          </Badge>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-background">
          <span className="text-textGrey">Release date: {""}</span>
          20/12/2003
        </p>
        <p className="text-background">
          <span className="text-textGrey">Director: {""}</span>
          Hui Kai Dong
        </p>
        {/* add to prevent overflow max-h-[63px] line-clamp-2 */}
        <p className="text-background max-h-[63px] line-clamp-2 ">
          <span className="text-textGrey">Cast: {""}</span>
          Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu
          He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He
          Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei,
          ...
        </p>
        {/* add to prevent overflow max-h-[63px] line-clamp-2 */}
        <p className="text-background max-h-[63px] line-clamp-2 ">
          <span className="text-textGrey">Description: {""}</span>
          Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu
          He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He
          Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei,
          Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu
          He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He
          Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei,
          Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu
          He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He
          Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei,
          Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu
          He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He
          Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei, Yu He Wei,
        </p>
        <div>
          <Button className="flex justify-center items-center gap-2 ">
            <Play /> Play
          </Button>
        </div>
      </div>
    </div>
  );
}
