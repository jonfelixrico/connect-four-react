import { Player } from '@typings/player.enum'

export type MatrixCellItem = Player | null

/**
 * A column contains 6 rows/items.
 */
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
 * The outer array contains the columns, and the inner array contains the rows (or cells).
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
