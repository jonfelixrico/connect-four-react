import { GridMatrix, MatrixCellItem } from '@typings/grid.types'
import { Player } from '@typings/player.enum'
import { generateGrid } from './grid.utils'

type EasyGridToken = 'X' | 'O' | '-'

/**
 * This represents an entire row on the grid.
 * Each character in this string represents a column/cell.
 */
type EasyGridRow =
  // eslint-disable-next-line max-len
  `${EasyGridToken}${EasyGridToken}${EasyGridToken}${EasyGridToken}${EasyGridToken}${EasyGridToken}${EasyGridToken}`

/**
 * This is pretty much `GridMatrix` but transformed in two ways:
 * - The inner array is now a string (let's still call this "inner array" for this discussion)
 * - The inner array now represents an entire row instead of an entire column.
 *
 * This was created because we wanted a more human-readable way of creating matrices for
 * tests.
 */
export type EasyGrid = [
  EasyGridRow,
  EasyGridRow,
  EasyGridRow,
  EasyGridRow,
  EasyGridRow,
  EasyGridRow
]

const TOKEN_TO_CELLITEM: Record<EasyGridToken, MatrixCellItem> = {
  '-': null,
  O: Player.PLAYER_2,
  X: Player.PLAYER_1,
}

export function toGridMatrix(toTrans: EasyGrid): GridMatrix {
  const splitRows = toTrans.map((strRow) =>
    strRow.split('')
  ) as EasyGridToken[][]

  const transformed = generateGrid()
  for (let row = 0; row < 6; row += 1) {
    for (let item = 0; item < 7; item += 1) {
      const toCellItem = TOKEN_TO_CELLITEM[splitRows[row][item]]
      /*
       * We have to subtract by 5 becuase the last row in `splitRows` represent
       * the bottom-most row in the grid.
       *
       * For GridMatrix, the bottom-most row is in the 0 index of each column,
       * so they're quite inverse.
       */
      transformed[item][5 - row] = toCellItem
    }
  }

  return transformed
}
