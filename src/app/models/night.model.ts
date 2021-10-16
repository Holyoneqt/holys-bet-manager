import { Fight } from './fight.model';

export interface Night {
    id: string;
    timestamp: number;
    name: string;
    players: string[];
    fights: Fight[];
}