import { Popcorn } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-foreground/95 py-6">
      <div className="container lg:grid lg:grid-cols-4 md:flex md:justify-between">
        <div className="flex items-center gap-2">
          <Popcorn className="text-primary" />
          <p className="text-background font-bold ">WENDIAGO MOVIE</p>
        </div>
        <div className="flex flex-col gap-1 text-background">
          <p className="font-bold mb-1">About us</p>
          <p>Introduction</p>
          <p>Services</p>
          <p>Contact</p>
          <p>Help center</p>
          <p>Information</p>
        </div>
        <div className="flex flex-col gap-1 text-background">
          <p className="font-bold mb-1">About us</p>
          <p>Introduction</p>
          <p>Services</p>
          <p>Contact</p>
          <p>Help center</p>
          <p>Information</p>
        </div>
        <div className="flex flex-col gap-1 text-background">
          <p className="font-bold mb-1">About us</p>
          <p>Introduction</p>
          <p>Services</p>
          <p>Contact</p>
          <p>Help center</p>
          <p>Information</p>
        </div>
      </div>
    </footer>
  );
}
