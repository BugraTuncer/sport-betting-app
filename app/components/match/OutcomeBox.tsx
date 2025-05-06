import classNames from 'classnames';
import type { Outcome } from '~/models/matches';

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
    <div
      className={classNames(
        'w-[70px] h-16 rounded bg-gray-100 flex flex-col items-center justify-center cursor-pointer transition-colors',
        {
          'border border-[#efd055] hover:bg-[#e7c84a]': selected,
          'hover:bg-gray-200': !selected,
        }
      )}
      onClick={onClick}
    >
      <div
        className={classNames('text-lg font-bold mb-1', {
          'bg-[#d1b93e] w-full h-full text-center': selected,
        })}
      >
        {outcome.price.toFixed(2)}
      </div>
      <div className="text-xs text-gray-600 bg-gray-300 px-1.5 py-0.5 rounded w-full text-center">
        {label}
      </div>
    </div>
  );
};
