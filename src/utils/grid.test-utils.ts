import { GridMatrix, MatrixCellItem } from '@typings/grid.types'
import { Player } from '@typings/player.enum'
import { generateGrid } from './grid.utils'

type GridToken = 'X' | 'O' | '-'

/**
 * This represents an entire row on the grid.
 * Each character in this string represents a column/cell.
 */
type TransformedGridRow =
  `${GridToken}${GridToken}${GridToken}${GridToken}${GridToken}${GridToken}${GridToken}`

/**
 * This is pretty much `GridMatrix` but transformed in two ways:
 * - The inner array is now a string (let's still call this "inner array" for this discussion)
 * - The inner array now represents an entire row instead of an entire column.
 *
 * This was created because we wanted a more human-readable way of creating matrices for
 * tests.
 */
type TransformedGrid = [
  TransformedGridRow,
  TransformedGridRow,
  TransformedGridRow,
  TransformedGridRow,
  TransformedGridRow,
  TransformedGridRow
]

const TOKEN_TO_CELLITEM: Record<GridToken, MatrixCellItem> = {
  '-': null,
  O: Player.PLAYER_2,
  X: Player.PLAYER_1,
}

export function toGridMatrix(toTrans: TransformedGrid): GridMatrix {
  const splitRows = toTrans.map((strRow) => strRow.split('')) as GridToken[][]

  const transformed = generateGrid()
  for (let column = 0; column < 7; column += 1) {
    for (let row = 0; row < 6; row += 1) {
      const token = splitRows[row][column]
      transformed[column][row] = TOKEN_TO_CELLITEM[token]
    }
  }

  return transformed
}
