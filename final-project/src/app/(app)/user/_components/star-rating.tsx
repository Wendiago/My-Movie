"use client";

import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import { Rating } from "@/components/ui/star-rating";

const StarRating = forwardRef<
  HTMLDivElement,
  { className?: string; onRating: (rating: number) => void }
>(({ className, onRating }, ref) => {
  const handleRating = (rate: number) => {
    onRating(rate);
  };

  return (
    <div
      ref={ref}
      className={cn(
        className,
        "flex items-center z-10 px-2 py-1 gap-2 border rounded-md bg-primary"
      )}
    >
      <Rating
        onClick={handleRating}
        SVGstyle={{ display: "inline-block" }}
        size={24}
        allowFraction={true}
        tooltipArray={[
          "10",
          "20",
          "30",
          "40",
          "50",
          "60",
          "70",
          "80",
          "90",
          "100",
        ]}
        showTooltip={true}
        tooltipStyle={{
          marginLeft: "10px",
          display: "flex",
          whiteSpace: "nowrap",
        }}
      />
    </div>
  );
});
StarRating.displayName = "StarRating";
export default StarRating;
