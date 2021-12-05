import { GridMatrix } from '@typings/grid.types'
import { Player } from '@typings/player.enum'
import { toGridMatrix } from './grid.test-utils'
import { ColumnFullError, dropDisc, generateGrid } from './grid.utils'

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

describe('dropDisc', () => {
  it('must not allow dropping to a full column', () => {
    const initialGrid = toGridMatrix([
      'O------',
      'X------',
      'O------',
      'X------',
      'O------',
      'X------',
    ])

    expect(() => {
      dropDisc(initialGrid, Player.PLAYER_1, 0)
    }).toThrowError(ColumnFullError)
  })

  it('must drop discs to the bottom of the column', () => {
    const beforeDrop = toGridMatrix([
      '-------',
      '-------',
      '-------',
      '--X----',
      'O-O----',
      'XOXOXOX',
    ])

    const dropTo = 0
    const afterDrop = toGridMatrix([
      '-------',
      '-------',
      '-------',
      'X-X----',
      'O-O----',
      'XOXOXOX',
    ])

    expect(dropDisc(beforeDrop, Player.PLAYER_1, dropTo)).toStrictEqual(
      afterDrop
    )
  })
})
