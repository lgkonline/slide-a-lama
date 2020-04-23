type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends ((...a: infer X) => void) ? X : never;
type GrowToSize<T, A extends Array<T>, N extends number> = { 0: A, 1: GrowToSize<T, Grow<T, A>, N> }[A['length'] extends N ? 0 : 1];

export type FixedArray<T, N extends number> = GrowToSize<T, [], N>;

export interface IItem {
    name: string;
    icon: string;
    points: number;
    x?: number;
    y?: number;
    new?: boolean;
}

export interface IItemCoordinated extends IItem {
    x: number;
    y: number;
}

export interface IPlayer {
    name: string;
    points: number;
    lamas: number;
    color: "red" | "blue";
}

export interface IColumn extends IItem {
    itemIndex: number;
}

export type ColumnArray = FixedArray<IColumn | null, 5>;

export interface IRow {
    columns: ColumnArray;
}