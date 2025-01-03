import { getUser } from "@/api/auth/auth";
import CustomImage from "@/components/ui/custom-image";
import { RatingCircle } from "@/components/ui/rating-circle";
import { redirect } from "next/navigation";

export default async function layout() {
  try {
    const userResponse = await getUser();
    const user = userResponse.data;
    if (!user) {
      redirect("/login");
    }
    return (
      <div className="flex-1 mt-[72px]">
        <div
          className="w-full bg-cover"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/profilebanner.jpeg")`,
          }}
        >
          <div className="px-16 py-10 mx-auto flex items-center gap-10">
            <CustomImage
              src={user.photo}
              alt="avatar placeholder"
              width={150}
              height={150}
              className="w-[150px] h-[150px] rounded-full"
              errorSrc="/avatar.jpeg"
              placeholderSrc="/avatar.jpeg"
            />
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-2xl">{user.email}</h1>
              <div className="flex items-center gap-3">
                <RatingCircle
                  progress={50}
                  showPercentage
                  bgClassName="fill-background"
                  textClassName="text-foreground"
                  progressClassName="stroke-primary"
                  size={60}
                  className="text-muted"
                />
                <div className="w-24">Average movie score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    redirect("/login");
  }
}
