import { useState, useEffect } from "react";

interface ChangingProgressProviderProps {
  values: [number, number]; // The start and end values for the animation
  children: (value: number) => JSX.Element; // A function that renders the CircularProgressbar with the current value
}

const ChangingProgressProvider: React.FC<ChangingProgressProviderProps> = ({
  values,
  children,
}) => {
  const [progress, setProgress] = useState(values[0]);

  useEffect(() => {
    const start = values[0];
    const end = values[1];
    const step = (end - start) / 10; // How much the value should increment
    let currentProgress = start;

    // Set up an interval to animate the progress
    const interval = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= end) {
        currentProgress = end;
        clearInterval(interval); // Stop the animation once we reach the end
      }
      setProgress(currentProgress);
    }, 20); // Adjust the interval for speed

    return () => clearInterval(interval); // Cleanup the interval when component unmounts
  }, [values]);

  const roundedProgress = Math.round(progress);
  return children(roundedProgress);
};

export default ChangingProgressProvider;
