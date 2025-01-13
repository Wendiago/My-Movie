"use client";

import React from "react";

type LoadingOverlayProps = {
  isVisible?: boolean;
  spinner: React.ReactNode;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible = true,
  spinner,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {spinner}
    </div>
  );
};

export default LoadingOverlay;
