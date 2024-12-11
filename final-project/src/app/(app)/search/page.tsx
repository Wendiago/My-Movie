import SearchResults from "./_components/search-results";

const SearchPage = async ({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) => {
  const keyword = (await params).keyword;
  console.log(keyword);
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="bg-foreground pt-[72px]">
        <SearchResults />
      </div>
    </div>
  );
};

export default SearchPage;
