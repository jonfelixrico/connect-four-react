import { GridMatrix, MatrixColumn } from '@typings/grid.types'

export const generateGrid = (): GridMatrix =>
  new Array(7)
    .fill(null)
    .map(() => new Array(6).fill(null) as MatrixColumn) as GridMatrix
