import { motion } from 'framer-motion';
import SearchBar from '../common/SearchBar';

interface MatchListProps {
  leagueCards: React.ReactNode[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MatchList = ({ leagueCards, searchTerm, onSearchChange }: MatchListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="px-5 mb-5">
        <SearchBar searchTerm={searchTerm} setSearchTerm={onSearchChange} />
      </div>
      <motion.div
        className="font-sans"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          staggerChildren: 0.1,
        }}
      >
        {leagueCards.length > 0 ? (
          leagueCards
        ) : (
          <div className="text-center text-gray-500">No matches found</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MatchList;
