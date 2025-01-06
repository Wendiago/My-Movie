"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Minus } from "lucide-react";
import { forwardRef } from "react";
import { Rating } from "react-simple-star-rating";

const StarRating = forwardRef<
  HTMLDivElement,
  { className?: string; onRating: (rating: number) => void }
>(({ className, onRating }, ref) => {
  const handleRating = (rate: number) => {
    onRating(rate);
  };

  const onPointerEnter = () => {};
  const onPointerLeave = () => {};
  const onPointerMove = (value: number, index: number) => {};

  return (
    <div
      ref={ref}
      className={cn(
        className,
        "flex items-center z-10 px-2 py-1 gap-2 border rounded-md bg-primary"
      )}
    >
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full w-4 h-4"
        onClick={() => onRating(0)}
      >
        <Minus />
      </Button>

      <Rating
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        SVGstyle={{ display: "inline-block" }}
        style={{ display: "flex", alignItems: "center" }}
        size={24}
        allowFraction={true}
      />
    </div>
  );
});

export default StarRating;
