import classNames from 'classnames';
import type { Outcome } from '~/models/matches';
import { motion } from 'framer-motion';

export const OutcomeBox = ({
  label,
  outcome,
  selected,
  onClick,
}: {
  label: string;
  outcome: Outcome | undefined;
  selected: boolean;
  onClick: () => void;
}) => {
  if (!outcome) return null;

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: selected ? '#e7c84a' : '#f3f4f6',
        transition: { duration: 0.2 },
      }}
      className={classNames(
        'w-[70px] h-16 rounded flex flex-col items-center justify-center cursor-pointer',
        {
          'border border-[#efd055]': selected,
        }
      )}
      onClick={onClick}
    >
      <motion.div
        animate={{
          backgroundColor: selected ? '#d1b93e' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
        className={classNames('text-lg font-bold mb-1 w-full h-full text-center')}
      >
        {outcome.price.toFixed(2)}
      </motion.div>
      <div className="text-xs text-gray-600 bg-gray-300 px-1.5 py-0.5 rounded w-full text-center">
        {label}
      </div>
    </motion.div>
  );
};
