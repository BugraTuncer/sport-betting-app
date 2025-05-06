import CrossIcon from 'public/icons/CrossIcon';
import Button from './Button';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Match or league search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-gray-600 focus:ring-3 focus:ring-gray-600/20 bg-white placeholder-gray-400"
      />
      {searchTerm && (
        <Button
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
        >
          <CrossIcon />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
