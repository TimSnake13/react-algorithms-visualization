export enum columnType {
  Current,
  CompareTo,
  Sorted,
  Default,
}

export enum horizontalMovementType {
  None,
  Left,
  Right,
}

export type Operation = {
  current?: number;
  compareTo?: number;
  sorted?: number[];
  moveLeft?: number;
  moveRight?: number;
  array: number[];
};
