import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MovieReview } from "@/types/api";
import { formatDate } from "@/utils/utils";
import { Star } from "lucide-react";
import React from "react";

export default function MovieReviewItem({ data }: { data: MovieReview }) {
  return (
    <Card className="bg-secondary">
      <CardHeader className="flex flex-row items-center gap-2 justify-start">
        <Avatar>
          <AvatarImage src={data.author_details.avatar_path}></AvatarImage>
          <AvatarFallback className="bg-primary">AT</AvatarFallback>
        </Avatar>
        <div className="">
          <h1 className="font-bold text-xl pb-1">
            A review by {data.author_details.name || "unknown person"}
          </h1>
          <div className="flex items-center gap-2">
            <Badge className="gap-1 text-foreground" variant="outline">
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
              {data.author_details.rating * 10 || 0}%
            </Badge>
            <p className="text-sm font-light">
              Written by {data.author_details.name || "unknown person"} on{" "}
              {typeof data.created_at == "string"
                ? formatDate(data.created_at)
                : "unknown date"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{data.content}</p>
      </CardContent>
    </Card>
  );
}
