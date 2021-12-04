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

  it('detects a vertical win', () => {
    const grid = generateGrid()

    /*
     * -------
     * -------
     * x------
     * x------
     * x-o----
     * xoo----
     */
    // eslint-disable-next-line no-multi-assign
    grid[0][0] = grid[0][1] = grid[0][2] = grid[0][3] = Player.PLAYER_1
    // eslint-disable-next-line no-multi-assign
    grid[1][0] = grid[2][0] = grid[2][1] = Player.PLAYER_2

    expect(evaluateGrid(grid)).toBe(Player.PLAYER_1)
  })

  it('detects a diagonal TL-to-BR win', () => {
    const grid = generateGrid()

    /*
     * -------
     * -------
     * x------
     * ox-----
     * o-x----
     * o--x---
     */
    // eslint-disable-next-line no-multi-assign
    grid[0][0] = grid[0][1] = grid[0][2] = Player.PLAYER_2
    // eslint-disable-next-line no-multi-assign
    grid[3][0] = grid[2][1] = grid[1][2] = grid[0][3] = Player.PLAYER_1

    expect(evaluateGrid(grid)).toBe(Player.PLAYER_1)
  })

  it('detects a diagonal TL-to-BL win', () => {
    const grid = generateGrid()

    /*
     * -------
     * -------
     * ---x---
     * --x----
     * -x-----
     * xooo---
     */
    // eslint-disable-next-line no-multi-assign
    grid[0][0] = grid[1][1] = grid[2][2] = grid[3][3] = Player.PLAYER_1
    // eslint-disable-next-line no-multi-assign
    grid[1][0] = grid[2][0] = grid[3][0] = Player.PLAYER_2

    expect(evaluateGrid(grid)).toBe(Player.PLAYER_1)
  })

  it('detects if there is no win', () => {
    const grid = generateGrid() // empty grid
    expect(evaluateGrid(grid)).toBe(null)
  })
})
