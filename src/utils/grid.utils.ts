import { GridMatrix, MatrixColumn } from '@typings/grid.types'
import { Player } from '@typings/player.enum'
import { cloneDeep, findLastIndex } from 'lodash'

export const generateGrid = (): GridMatrix =>
  new Array(7)
    .fill(null)
    .map(() => new Array(6).fill(null) as MatrixColumn) as GridMatrix

export function dropDisc(
  grid: GridMatrix,
  player: Player,
  colIdx: number
): GridMatrix {
  const column = grid[colIdx]
  const highestPoint = findLastIndex(column, (item) => item !== null)

  if (highestPoint === column.length - 1) {
    throw new Error(`No more slots on colum ${colIdx}`)
  }

  const gridClone = cloneDeep(grid)
  gridClone[colIdx][highestPoint + 1] = player

  return gridClone
}
