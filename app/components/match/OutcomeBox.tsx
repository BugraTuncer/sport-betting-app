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
        backgroundColor: '#f3f4f6',
        transition: { duration: 0.2 },
      }}
      className={
        'w-[70px] h-15 rounded-md overflow-hidden flex flex-col items-center justify-center cursor-pointer'
      }
      onClick={onClick}
    >
      <div
        style={{
          backgroundColor: selected ? '#d1b93e' : 'transparent',
        }}
        className={classNames(
          'text-lg font-bold  w-full h-full text-center rounded-tl-md rounded-tr-md'
        )}
      >
        {outcome.price.toFixed(2)}
      </div>
      <div className="text-xs text-gray-600 bg-gray-300 px-1 py-0.5  w-full text-center whitespace-nowrap rounded-bl-md rounded-br-md ">
        {label}
      </div>
    </motion.div>
  );
};
