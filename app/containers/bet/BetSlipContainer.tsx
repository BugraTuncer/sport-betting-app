import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '~/store';
import { addToBasket, clearBasket, removeFromBasket } from '~/store/slices/betSlice';
import type { BetSlice } from '~/models/bets';
import BetSlip from '~/components/bet/BetSlip';

const BetSlipContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const bets = useSelector((state: RootState) => state.bet.basket);
  const dispatch = useDispatch();
  const [undoMatch, setUndoMatch] = useState<{ bet: BetSlice; timer: NodeJS.Timeout } | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePlayNow = () => {
    setShowSuccessModal(true);
    dispatch(clearBasket());
    setIsOpen(false);
  };

  const totalOdds = useMemo(() => {
    return bets.reduce((acc, curr) => acc * curr.outcome.price, 1);
  }, [bets]);

  const handleClearBasket = () => {
    dispatch(clearBasket());
    setIsOpen(false);
    setShowConfirmModal(false);
  };

  const handleRemoveBet = (eventId: string) => {
    const removedBet = bets.find((bet) => bet.eventId === eventId);
    if (removedBet) {
      dispatch(removeFromBasket(eventId));
      const timer = setTimeout(() => setUndoMatch(null), 5000);
      setUndoMatch({ bet: removedBet, timer });
    }
  };

  const handleUndo = () => {
    if (undoMatch?.bet) {
      clearTimeout(undoMatch.timer);
      dispatch(addToBasket(undoMatch.bet));
      setUndoMatch(null);
    }
  };

  return (
    <BetSlip
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      showConfirmModal={showConfirmModal}
      setShowConfirmModal={setShowConfirmModal}
      bets={bets}
      totalOdds={totalOdds}
      onClearBasket={handleClearBasket}
      onRemoveBet={handleRemoveBet}
      onUndo={handleUndo}
      undoMatch={undoMatch}
      handlePlayNow={handlePlayNow}
      showSuccessModal={showSuccessModal}
      setShowSuccessModal={setShowSuccessModal}
    />
  );
};
export default BetSlipContainer;
