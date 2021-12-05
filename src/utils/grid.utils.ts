import { GridMatrix, MatrixColumn } from '@typings/grid.types'
import { Player } from '@typings/player.enum'
import { cloneDeep, findLastIndex } from 'lodash'

/**
 * Generates a 7 (columns) by 6 (rows) grid. All items of the inner array are `null`s.
 * @returns
 */
export const generateGrid = (): GridMatrix =>
  new Array(7)
    .fill(null)
    .map(() => new Array(6).fill(null) as MatrixColumn) as GridMatrix

export class ColumnFullError extends Error {
  constructor(colIdx: number) {
    super(`No more slots on column ${colIdx}.`)
  }
}

/**
 * Given a `colIdx`, a disc is "dropped" onto that colum of the grid. It will occupy the
 * item in the column which has a value of `null` closest to the "bottom" of the column (index 0).
 *
 * @param grid The grid to perform the operation on. This is treated as immutable.
 * @param player The player who drpped the disc.
 * @param colIdx The column where the disc was dropped.
 * @returns The new state of the `grid`. This does not reuse the same `grid` passed -- all
 * references here are fresh.
 */
export function dropDisc(
  grid: GridMatrix,
  player: Player,
  colIdx: number
): GridMatrix {
  const column = grid[colIdx]
  const highestPoint = findLastIndex(column, (item) => item !== null)

  if (highestPoint === column.length - 1) {
    throw new ColumnFullError(colIdx)
  }

  const gridClone = cloneDeep(grid)
  gridClone[colIdx][highestPoint + 1] = player

  return gridClone
}
