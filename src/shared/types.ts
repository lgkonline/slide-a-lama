export interface IItem {
    name: string;
    icon: string;
    points: number;
    x?: number;
    y?: number;
    new?: boolean;
}

export interface IPlayer {
    name: string;
    points: number;
    lamas: number;
    color: "red" | "blue";
}