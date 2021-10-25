export interface Event {
  EventId: number;
  LeagueId: number;
  Name: string;
  ShortName: string;
  Season: number;
  Day: Date;
  DateTime: Date;
  Status: string;
  Active: boolean;
  Fights?: Fight[];

  players?: string[];
  bets?: Bet[];
}

export interface Fight {
  FightId: number;
  Order: number;
  Status: string;
  WeightClass: string;
  CardSegment: string;
  Referee?: any;
  Rounds: number;
  ResultClock: number;
  ResultRound: number;
  ResultType: string;
  WinnerId?: any;
  Active: boolean;
  Fighters: Fighter[];
}

export interface Fighter {
  FighterId: number;
  FirstName: string;
  LastName: string;
  PreFightWins: number;
  PreFightLosses: number;
  PreFightDraws: number;
  PreFightNoContests: number;
  Winner: boolean;
  Moneyline?: any;
  Active: boolean;
}

export interface Bet {
  fightId: number;
  fighters: {
    first: BetFighter;
    second: BetFighter;
  },
  winnerId?: number;
  betAmount: number;
}

interface BetFighter {
  id: number;
  name: string;
  players: string[];
}