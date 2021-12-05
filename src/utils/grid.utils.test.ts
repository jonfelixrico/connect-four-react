import { GridMatrix } from '@typings/grid.types'
import { generateGrid } from './grid.utils'

describe('generateGrid', () => {
  let grid: GridMatrix

  beforeEach(() => {
    grid = generateGrid()
  })

  it('must have 7 columns', () => {
    expect(grid.length).toBe(7)
  })

  it('must have 6 rows per column', () => {
    expect(grid.map((column) => column.length)).toStrictEqual([
      6, 6, 6, 6, 6, 6, 6,
    ])
  })
})
