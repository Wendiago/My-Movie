"use client";
import { cn } from "@/utils/cn";

interface RatingCircleProps {
  size?: number; // Diameter of the circle
  strokeWidth?: number; // Thickness of the progress stroke
  progress: number; // Progress value (0 to 100)
  bgClassName?: string; // Tailwind classes for background circle
  progressClassName?: string; // Tailwind classes for progress circle,
  remainingProgressColor?: string;
  textClassName?: string; // Tailwind classes for text
  text?: string; // Optional custom text inside the circle
  showPercentage?: boolean; // Show percentage inside the circle
  className?: string; // Additional CSS classes for the SVG wrapper
}

export const RatingCircle: React.FC<RatingCircleProps> = ({
  size = 60,
  strokeWidth = 5,
  progress,
  bgClassName = "fill-none",
  progressClassName = "stroke-primary",
  textClassName = "text-foreground",
  remainingProgressColor = "text-progressBarBg",
  text,
  showPercentage = true,
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={cn("relative", className, remainingProgressColor)}
      style={{ transform: "rotate(-90deg)" }} // Rotate to start at the top
    >
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className={cn(bgClassName)}
      />

      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap={"round"}
        className={cn(
          progressClassName,
          "fill-none transition-[stroke-dashoffset] duration-500 ease-in-out"
        )}
      />
      {/* Text */}
      {showPercentage && (
        <text
          x="50%"
          y="50%"
          fill="currentColor"
          textAnchor="middle"
          dominantBaseline="middle"
          className={cn(textClassName)}
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "center",
          }} // Re-rotate for text
        >
          <tspan>{text || Math.round(progress)}</tspan>
          <tspan className={cn(textClassName, "text-[8px]")} dy="-0.4em">
            %
          </tspan>
        </text>
      )}
    </svg>
  );
};
