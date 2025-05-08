import Button from '../common/Button';

const EmptyBetSlipList = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <p className="text-lg font-medium text-gray-600 mb-4">There are no matches in your basket.</p>
      <Button
        onClick={() => setIsOpen(false)}
        className="border-2 border-gray-300 text-gray-600 rounded-lg px-8 py-3 hover:bg-gray-50 cursor-pointer"
      >
        Add Match
      </Button>
    </div>
  );
};

export default EmptyBetSlipList;
