import { DialogContent } from "@/components/ui/dialog";

export default function MediaPlayerPopup({
  trailerUrl,
}: {
  trailerUrl: string;
}) {
  //console.log('trailer', trailerUrl);

  return (
    <DialogContent className="p-0 pt-11 bg-black min-w-[70vw] min-h-0">
      <div className="min-w-[70vw] min-h-[80vh]">
        <iframe
          src={trailerUrl}
          title="Trailer Player"
          className="w-full h-full rounded-b-md"
          allow="autoplay; fullscreen"
        />
      </div>
    </DialogContent>
  );
}
