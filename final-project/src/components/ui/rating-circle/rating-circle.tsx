"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import { CircularProgressbarWrapperProps } from "react-circular-progressbar/dist/types";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./changing-progress-provider";
import tinycolor from "tinycolor2";

interface RatingCircleProps extends CircularProgressbarWrapperProps {
  value: number;
  backgroundColor?: string;
  textColor?: string;
  pathColor?: string;
  backgroundPadding?: number;
  textSize?: string; // Allow custom text size
  textWeight?: string; // Allow custom text weight
  trailLightenPercentage?: number; // Control how much to lighten the trail color
  customStyles?: {
    root?: React.CSSProperties;
    path?: React.CSSProperties;
    background?: React.CSSProperties;
    trail?: React.CSSProperties;
    text?: React.CSSProperties;
  };
}

export const RatingCircle: React.FC<RatingCircleProps> = ({
  value,
  backgroundColor = "hsl(var(--background))",
  textColor = "hsl(var(--foreground))",
  pathColor,
  backgroundPadding = 6,
  textSize = "24px",
  textWeight = "bold",
  trailLightenPercentage = 20,
  customStyles = {},
  ...props
}) => {
  if (value < 40) {
    pathColor = "hsl(var(--bad-rating))"; // For values less than 40%
  } else if (value >= 40 && value <= 60) {
    pathColor = "hsl(var(--average-rating))"; // For values between 40% and 60%
  } else {
    pathColor = "hsl(var(--good-rating))"; // For values greater than 60%
  }

  const darkenedTrailColor =
    tinycolor(pathColor).lighten(trailLightenPercentage).toString() ||
    "hsl(var(--secondary))";

  // Define the customizable styles object
  const styles = {
    root: {
      width: "100%", // Ensure it takes up its own space
      height: "100%",
      ...customStyles.root, // Allow for additional root styles
    },
    text: {
      fontSize: textSize, // Customize text size
      fontWeight: textWeight, // Customize text weight
      fill: textColor,
      ...customStyles.text, // Allow for additional text styles
    },
    path: {
      stroke: pathColor,
      ...customStyles.path, // Allow for additional path styles
    },
    background: {
      fill: backgroundColor,
      ...customStyles.background, // Allow for additional background styles
    },
    trail: {
      stroke: darkenedTrailColor, // Darkened trail color
      ...customStyles.trail, // Allow for additional trail styles
    },
  };

  return (
    <ChangingProgressProvider values={[0, value]}>
      {(progressValue: number) => (
        <CircularProgressbar
          value={progressValue}
          text={`${progressValue}%`}
          backgroundPadding={backgroundPadding}
          styles={styles} // Apply custom styles
          {...props}
        />
      )}
    </ChangingProgressProvider>
  );
};
