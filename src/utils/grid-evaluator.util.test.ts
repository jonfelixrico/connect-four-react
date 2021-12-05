import { Player } from '@typings/player.enum'
import { evaluateGrid } from './grid-evaluator.util'
import { toGridMatrix } from './grid.test-utils'
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
    const grid = toGridMatrix([
      '-------',
      '-------',
      '-------',
      '-------',
      'OOO----',
      'XXXX---',
    ])

    expect(evaluateGrid(grid)).toBe(Player.PLAYER_1)
  })

  it('detects a vertical win', () => {
    const grid = toGridMatrix([
      '-------',
      '-------',
      'X------',
      'X------',
      'X--O---',
      'X-OO---',
    ])

    expect(evaluateGrid(grid)).toBe(Player.PLAYER_1)
  })

  it('detects a diagonal TL-to-BR win', () => {
    const grid = toGridMatrix([
      '-------',
      '-------',
      'X------',
      'OX-----',
      'OXX----',
      'OOOX---',
    ])

    expect(evaluateGrid(grid)).toBe(Player.PLAYER_1)
  })

  it('detects a diagonal TL-to-BL win', () => {
    const grid = toGridMatrix([
      '-------',
      '-------',
      '---X---',
      '--XX---',
      '-XXO---',
      'XOOO-O-',
    ])

    expect(evaluateGrid(grid)).toBe(Player.PLAYER_1)
  })

  it('detects if there is no win for an empty grid', () => {
    const grid = generateGrid() // empty grid
    expect(evaluateGrid(grid)).toBe(null)
  })

  it('detects if there is no win', () => {
    const grid = toGridMatrix([
      'O------',
      'X------',
      'O------',
      'X------',
      'O----OX',
      'X-X-OXO',
    ])

    expect(evaluateGrid(grid)).toBe(null)
  })
})
