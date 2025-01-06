import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="px-16 py-6 mx-auto w-full">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl">My Lists</h1>
        <Button>Create List</Button>
      </div>
      <div className=""></div>
    </div>
  );
}
