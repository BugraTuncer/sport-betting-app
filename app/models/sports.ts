export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

export interface SportNavProps {
  onSportSelect: (sport: string) => void;
  selectedSport: string;
}
