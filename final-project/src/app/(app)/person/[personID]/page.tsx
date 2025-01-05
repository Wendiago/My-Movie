import { Suspense } from "react";
import PersonInfo from "./_components/person-info";
import { getCastByID } from "@/api/cast/cast";
import PersonInfoSkeleton from "./_components/person-info-skeleton";

export default async function page({
  params,
}: {
  params: Promise<{ personID: string }>;
}) {
  const personID = (await params).personID;
  const personDetailResponse = getCastByID(personID);
  return (
    <div className="mt-[72px] w-full flex flex-col flex-1 pt-10 pb-10 px-16">
      <Suspense fallback={<PersonInfoSkeleton />}>
        <PersonInfo data={personDetailResponse} />
      </Suspense>
    </div>
  );
}
