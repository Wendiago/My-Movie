import { Separator } from "@/components/ui/separator";
import { Copyright, Popcorn } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="px-4 py-8 md:container flex justify-between">
        <div className="flex flex-col gap-2 items-center md:max-w-96">
          <div className="w-fit flex flex-col md:flex-row items-center justify-center gap-2">
            <Popcorn className="w-9 h-9 text-violet-500" />
            <p className=" text-2xl font-bold text-violet-500 text-center">
              WENDIAGO MOVIE
            </p>
          </div>
          <p>
            <span className="text-violet-500 font-semibold">
              Wendiago Movie
            </span>{" "}
            is a movie database using TMDB API, features newest movie related
            information.
          </p>
        </div>

        <div className="hidden md:flex flex-col">
          <p className="font-bold mb-1">About us</p>
          <div className="w-full flex flex-col">
            <p>Introduction</p>
            <p>Services</p>
            <p>Contact</p>
            <p>Help center</p>
            <p>Information</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col">
          <p className="font-bold mb-1">About us</p>
          <div className="w-full flex flex-col">
            <p>Introduction</p>
            <p>Services</p>
            <p>Contact</p>
            <p>Help center</p>
            <p>Information</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col">
          <p className="font-bold mb-1">About us</p>
          <div className="w-full flex flex-col">
            <p>Introduction</p>
            <p>Services</p>
            <p>Contact</p>
            <p>Help center</p>
            <p>Information</p>
          </div>
        </div>
      </div>
      <Separator className="container" />
      <div className="py-8 container flex justify-center items-center">
        <div className="flex justify-center items-center gap-1">
          <Copyright />
          2025 by Wendiago Movie
        </div>
      </div>
    </footer>
  );
}
