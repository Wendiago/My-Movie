import CustomImage from "@/components/ui/custom-image";
import { auth } from "@/auth";
import { RatingCircle } from "@/components/ui/rating-circle/rating-circle";
import UserMenuBar from "./_components/user-menu-bar";
import { Separator } from "@/components/ui/separator";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await auth()).user;
  return (
    <div className="flex-1 flex flex-col">
      <div
        className="w-full bg-cover flex"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://media.themoviedb.org/t/p/w3840_and_h1200_multi_faces_filter(duotone,00192f,00baff)/xpba0Dxz3sxV3QgYLR8UIe1LAAX.jpg")`,
        }}
      >
        <div className="container pt-[112px] pb-10 mx-auto flex items-center gap-10">
          <CustomImage
            unoptimized
            priority
            src={user?.image}
            alt="avatar placeholder"
            width={150}
            height={150}
            className="w-[150px] h-[150px] rounded-full"
            errorSrc="/avatar.jpeg"
          />
          <div className="flex flex-col gap-4 min-w-0">
            <h1 className="flex font-bold text-2xl w-full break-all overflow-hidden">
              {user?.email}
            </h1>
            <div className="flex items-center gap-3">
              <RatingCircle
                value={50}
                customStyles={{ root: { width: "60px", height: "60px" } }}
                background
              />
              <div className="w-24">Average movie score</div>
            </div>
          </div>
        </div>
      </div>
      <UserMenuBar />
      <Separator orientation="horizontal" />
      <section className="flex-1 flex flex-col">{children}</section>
    </div>
  );
}
