import LoadingOverlay from "@/components/ui/loading/loading-overlay";
import { SolarSystem } from "@/components/ui/loading/solar-system";
import React from "react";

export default function Loading() {
  return <LoadingOverlay spinner={<SolarSystem />} />;
}
