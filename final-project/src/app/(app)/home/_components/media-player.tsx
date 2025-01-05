import { DialogContent } from "@/components/ui/dialog";

export default function MediaPlayerPopup({ trailerUrl }: { trailerUrl: string }) {
  console.log('trailer', trailerUrl);

  return (
    <DialogContent className="max-w-[600px] max-h-[600px] bg-foreground">
      <div className="p-6 min-w-[400px] min-h-[320px] aspect-w-16 aspect-h-9">
        <iframe
          src={trailerUrl}
          title="Trailer Player"
          className="w-full h-full rounded-md"
          allow="autoplay; fullscreen"
        />
      </div>
    </DialogContent>
  );
}
