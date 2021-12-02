import { Player } from '@typings/player.enum'
import { evaluateGrid } from './grid-evaluator.util'
import { generateGrid } from './grid.utils'

// this is a template for visualization
/*
 * -------
 * -------
 * -------
 * -------
 * -------
 * -------
 */

describe('Grid evaluator', () => {
  it('detects a horizontal win', () => {
    const grid = generateGrid()

    /*
     * -------
     * -------
     * -------
     * -------
     * ooo----
     * xxxx---
     */
    // eslint-disable-next-line no-multi-assign
    grid[0][0] = grid[1][0] = grid[2][0] = grid[3][0] = Player.PLAYER_1
    // eslint-disable-next-line no-multi-assign
    grid[0][1] = grid[1][1] = grid[2][1] = Player.PLAYER_2

    expect(evaluateGrid(grid)).toBe(Player.PLAYER_1)
  })

  it.todo('detects a vertical win')

  it.todo('detects a diagonal TL-to-BR win')

  it.todo('detects a diagonal TL-to-BL win')

  it('detects if there is no win', () => {
    const grid = generateGrid() // empty grid
    expect(evaluateGrid(grid)).toBe(null)
  })
})
