import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '~/store';
import { clearBasket } from '~/store/slices/betSlice';
import Button from '../common/Button';
import DeleteIcon from 'public/icons/DeleteIcon';
import BetBasketList from './BetBasketList';
import EmptyBetBasket from './EmptyBasketList';
import ConfirmationModal from '../common/ConfirmationModal';

const BetBasket: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const bets = useSelector((state: RootState) => state.bet.basket);
  const dispatch = useDispatch();

  const totalOdds = useMemo(() => {
    return bets.reduce((acc, curr) => acc * curr.outcome.price, 1);
  }, [bets]);

  const handleClearBasket = () => {
    dispatch(clearBasket());
    setIsOpen(false);
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="fixed bottom-4 right-1 sm:right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <span>{bets.length} Maç</span>
          <span>{totalOdds.toFixed(2)}</span>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-full right-0 mb-2 w-95.5 bg-white rounded-lg shadow-2xl border border-gray-300 "
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Bet Details</h3>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    Close
                  </Button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bets.length === 0 ? (
                    <EmptyBetBasket setIsOpen={setIsOpen} />
                  ) : (
                    bets.map((bet) => (
                      <BetBasketList key={bet.eventId} bet={bet} dispatch={dispatch} />
                    ))
                  )}
                </div>

                {bets.length > 0 && (
                  <>
                    <div className="mt-4 space-y-2 border-t pt-4">
                      <div className="flex justify-between">
                        <span>Total Match</span>
                        <span>{bets.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Odds</span>
                        <span>{totalOdds.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-around items-center mt-5">
                      <div onClick={() => setShowConfirmModal(true)} className="cursor-pointer">
                        <DeleteIcon width={30} height={30} />
                      </div>
                      <Button
                        style={{ marginTop: '10px', width: '200px' }}
                        onClick={() => console.log('clicked')}
                      >
                        PLAY NOW
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleClearBasket}
        title="Delete Bets"
        message="Are you sure you want to delete all bets?"
      />
    </>
  );
};

export default BetBasket;
