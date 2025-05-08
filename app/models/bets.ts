import type { Outcome } from './matches';

export interface Bet {
  eventId: string;
  outcome: Outcome;
}

export interface BetSlice {
  eventId: string;
  outcome: {
    name: string;
    price: number;
    point?: number;
  };
  home_team: string;
  away_team: string;
}

export interface BetBasketProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  showConfirmModal: boolean;
  setShowConfirmModal: (show: boolean) => void;
  bets: BetSlice[];
  totalOdds: number;
  onClearBasket: () => void;
  onRemoveBet: (eventId: string) => void;
  onUndo: () => void;
  undoMatch: { bet: BetSlice; timer: NodeJS.Timeout } | null;
}

export interface BetBasketListProps {
  bet: BetSlice;
  onRemove: (eventId: string) => void;
}
