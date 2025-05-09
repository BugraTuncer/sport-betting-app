export interface MatchDetailEventParams {
  match_id: string;
  match_name: string;
  league?: string;
}

export interface CartEventParams {
  bet_id: string;
  match_id: string;
  odds: number;
  selection: string;
  amount?: number;
}
