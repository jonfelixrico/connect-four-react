import { Player } from '@typings/player.enum'

type MatrixCellItem = Player | null

export type MatrixColumn = [
  MatrixCellItem,
  MatrixCellItem,
  MatrixCellItem,
  MatrixCellItem,
  MatrixCellItem,
  MatrixCellItem
]

/**
 * A 6 (rows) by 7 (columns) grid.
 * The outer array contains the _columns_, the inner array contains.
 */
export type GridMatrix = [
  MatrixColumn,
  MatrixColumn,
  MatrixColumn,
  MatrixColumn,
  MatrixColumn,
  MatrixColumn,
  MatrixColumn
]
