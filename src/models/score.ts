export interface Score {
  beatmap_id: string;
  rank_global?: number | string;
  id: string;
  score: string;
  maxcombo: string;
  count50: string;
  count100: string;
  count300: string;
  countmiss: string;
  countkatu?: string;
  countgeki?: string;
  perfect: string;
  enabled_mods: string;
  user_id: string;
  date: Date;
  rank: string;
  pp: string;
  replay_available: string;
  passed?: boolean;
  accuracy: string | number;
}
