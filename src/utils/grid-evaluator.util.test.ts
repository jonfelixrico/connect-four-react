import { evaluateGrid } from './grid-evaluator.util'
import { generateGrid } from './grid.utils'

describe('Grid evaluator', () => {
  it.todo('detects a horizontal win')

  it.todo('detects a vertical win')

  it.todo('detects a diagonal TL-to-BR win')

  it.todo('detects a diagonal TL-to-BL win')

  it('detects if there is no win', () => {
    const grid = generateGrid()
    const winner = evaluateGrid(grid)

    expect(winner).toBe(null)
  })
})
