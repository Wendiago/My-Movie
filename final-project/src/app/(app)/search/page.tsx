import { Suspense } from "react";
import SearchResults from "./_components/search-results";

const SearchPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="bg-foreground pt-[72px]">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchPage;
