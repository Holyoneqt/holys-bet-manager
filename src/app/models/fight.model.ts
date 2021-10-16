export interface Fight {
  id: string;
  firstFighter: Fighter;
  secondFighter: Fighter;
  winner?: string;
  bet: number;

  /** just for animation */
  isOpen?: boolean;
}

export interface Fighter {
  name: string;
  players: string[];
}