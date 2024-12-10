import SearchBar from '@/components/ui/search-bar';
import SearchResults from './_components/search-results';

const SearchPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex my-4">
        <SearchBar />
      </div>
      <div className="flex my-4">
        <SearchResults />
      </div>
    </div>
  );
};

export default SearchPage;
