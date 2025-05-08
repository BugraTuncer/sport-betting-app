import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BetBasketProps, BetSlice } from '~/models/bets';
import Button from '../common/Button';
import DeleteIcon from 'public/icons/DeleteIcon';
import BetBasketList from './BetBasketList';
import EmptyBetBasket from './EmptyBasketList';
import ConfirmationModal from '../common/ConfirmationModal';

const BetBasket: React.FC<BetBasketProps> = ({
  isOpen,
  setIsOpen,
  showConfirmModal,
  setShowConfirmModal,
  bets,
  totalOdds,
  onClearBasket,
  onRemoveBet,
  onUndo,
  undoMatch,
}) => {
  return (
    <>
      <div className="fixed bottom-4 right-0 sm:right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`${bets.length > 2 ? 'bg-primary' : 'bg-red-600'} text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg cursor-pointer`}
        >
          <span>{bets.length} Match</span>
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
                {undoMatch && (
                  <div className="bg-gray-800 text-white px-4 py-2 rounded-md flex justify-between items-center mb-4">
                    <p className="text-sm">
                      Match {undoMatch.bet.home_team} - {undoMatch.bet.away_team} has been removed
                      from your coupon.
                    </p>
                    <Button
                      onClick={onUndo}
                      className="bg-gray-800  text-primary px-4 py-2 border-none rounded-md whitespace-nowrap cursor-pointer"
                    >
                      Undo
                    </Button>
                  </div>
                )}
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
                      <BetBasketList key={bet.eventId} bet={bet} onRemove={onRemoveBet} />
                    ))
                  )}
                </div>

                {bets.length > 0 && (
                  <>
                    <div className="mt-2 sm:mt-4 space-y-2 border-t pt-4">
                      <div className="flex justify-between">
                        <span>Total Match</span>
                        <span>{bets.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Odds</span>
                        <span>{totalOdds.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-around items-center mt-1 sm:mt-5">
                      <div onClick={() => setShowConfirmModal(true)} className="cursor-pointer">
                        <DeleteIcon width={30} height={30} color="black" />
                      </div>
                      <Button
                        style={{ marginTop: '10px', width: '200px' }}
                        onClick={() => console.log('PLAY NOW')}
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
        onConfirm={onClearBasket}
        title="Delete Bets"
        message="Are you sure you want to delete all bets?"
      />
    </>
  );
};

export default BetBasket;
