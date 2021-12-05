import { Player } from '@typings/player.enum'
import { EasyGrid, toGridMatrix } from './grid.test-utils'
import { generateGrid } from './grid.utils'

describe('toGridMatrix', () => {
  it('must convert rows correctly', () => {
    const easyGrid: EasyGrid = [
      '-------',
      '-------',
      '-------',
      '-------',
      '-------',
      'X-O-X-O',
    ]

    const { PLAYER_1, PLAYER_2 } = Player

    const gameGrid = generateGrid()
    gameGrid[0][0] = PLAYER_1
    gameGrid[2][0] = PLAYER_2
    gameGrid[4][0] = PLAYER_1
    gameGrid[6][0] = PLAYER_2

    const transformed = toGridMatrix(easyGrid)
    expect(transformed).toStrictEqual(gameGrid)
  })

  it('must convert columns correctly', () => {
    const easyGrid: EasyGrid = [
      'O------',
      'X------',
      '-------',
      'O------',
      '-------',
      'X------',
    ]

    const { PLAYER_1, PLAYER_2 } = Player

    const gameGrid = generateGrid()
    gameGrid[0][0] = PLAYER_1
    gameGrid[0][2] = PLAYER_2
    gameGrid[0][4] = PLAYER_1
    gameGrid[0][5] = PLAYER_2

    const transformed = toGridMatrix(easyGrid)
    expect(transformed).toStrictEqual(gameGrid)
  })
})
