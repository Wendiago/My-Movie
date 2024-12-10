import React from "react";
import MainCarousel from "./_components/main-carousel";
import SubCarousel from "./_components/sub-carousel";
import { SubCarouselMovie } from "@/types/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data: SubCarouselMovie[] = Array.from({ length: 20 }, () => ({
  name: "The witch",
  imgURL: "/film.jpeg",
  status: "Hot",
}));

export default function Page() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <MainCarousel />
      <div className="pb-24 z-30 -mt-60 w-full flex flex-col justify-center items-center bg-gradient-to-b from-transparent to-foreground to-[5%] gap-8">
        <SubCarousel carouselName="Popular in Wendiago Movie" data={data} />

        <Tabs defaultValue="Today">
          <div className="flex items-center gap-3 ml-8 mb-6">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 font-bold text-2xl animate-fire-flicker">
              TRENDING
            </p>
            <TabsList className="grid grid-cols-2 max-w-[30%] bg-foreground">
              <TabsTrigger
                value="Today"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="This week"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                This week
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="Today">
            <SubCarousel data={data} />
          </TabsContent>
          <TabsContent value="This week">
            <SubCarousel data={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
