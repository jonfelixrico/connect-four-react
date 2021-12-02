import { GridMatrix } from '@typings/grid.types'
import { Player } from '@typings/player.enum'

function find4Consecutive(arr: Array<Player>): Player | null {
  let player: Player | null = null
  let streak = 0

  for (const arrMember of arr) {
    if (!player || arrMember !== player) {
      // this is the first iteration or a different symbol from the prev iteration was encountered
      player = arrMember
      streak = 0
    } else if (player === arrMember) {
      streak += 1
    }

    if (streak >= 4) {
      return player
    }
  }

  return null
}

function findHighestPoint(grid: GridMatrix): number {
  const highestPointPerColumn = grid.map((column) => {
    /*
     * The more pieces are in a column, the farther in the array the null or the "empty space"
     * will be. Imagine a can where you just drop pieces in; stuff will accumulate at the bottom.
     * See the visual representation below:
     *
     * | | 4
     * | | 3
     * |x| 2
     * |x| 1
     * |x| 0
     *
     * We've dropped three times, so the last two indeces of the "can" is occupied. The unoccupied
     * space are nulls. If we use findIndex, our highest point would be 2 and anything above
     * it will be null; so by taking the first null we encounter and subtracting 1, we find the
     * highest point.
     */
    return column.findIndex((row) => row === null) - 1
  })

  return Math.max(...highestPointPerColumn)
}

function evaluateRows(grid: GridMatrix, lastIndex: number): Player | null {
  for (let i = 0; i <= lastIndex; i += 1) {
    const row = grid.map((column) => column[i])
    const winner = find4Consecutive(row)

    if (winner !== null) {
      return winner
    }
  }

  return null
}

function evaluateColumns(grid: GridMatrix, lastIndex: number): Player | null {
  for (const column of grid) {
    const trimmed = column.slice(0, lastIndex + 1) // had to +1 because end is exclusive

    const winnerOfColumn = find4Consecutive(trimmed)
    if (winnerOfColumn) {
      return winnerOfColumn
    }
  }

  return null
}

function evaluateTopToRight(
  grid: GridMatrix,
  highestPoint: number
): Player | null {
  for (let colIdx = 0; colIdx <= grid.length - 4; colIdx += 1) {
    for (let rowIdx = highestPoint; rowIdx >= 3; rowIdx -= 1) {
      const diagonalTopToRight = [
        grid[colIdx][rowIdx],
        grid[colIdx - 1][rowIdx + 1],
        grid[colIdx - 2][rowIdx + 2],
        grid[colIdx - 3][rowIdx + 3],
      ]

      const winner = find4Consecutive(diagonalTopToRight)
      if (winner) {
        return winner
      }
    }
  }

  return null
}

function evaluateTopToLeft(
  grid: GridMatrix,
  highestPoint: number
): Player | null {
  for (
    // start from the 4th column because we want to evaluate the diagonal line from top to left
    let colIdx = 3;
    colIdx < grid.length;
    colIdx += 1
  ) {
    // Keep descending as long as there are at 3 "cells" below `rowIdx`
    for (let rowIdx = highestPoint; rowIdx >= 3; rowIdx -= 1) {
      const diagonalTopToRight = [
        grid[colIdx][rowIdx],
        grid[colIdx - 1][rowIdx - 1],
        grid[colIdx - 2][rowIdx - 2],
        grid[colIdx - 3][rowIdx - 3],
      ]

      const winner = find4Consecutive(diagonalTopToRight)
      if (winner) {
        return winner
      }
    }
  }

  return null
}

export function evaluateGrid(grid: GridMatrix): Player | null {
  const highestPoint = findHighestPoint(grid)

  if (highestPoint === -1) {
    // board is empty, don't bother evaluating
    return null
  }

  const winnerByRows = evaluateRows(grid, highestPoint)
  if (winnerByRows) {
    return winnerByRows
  }

  if (highestPoint < 3) {
    // not eligible for vertical nor diagonal evaluation
    return null
  }

  const winnerByColumns = evaluateColumns(grid, highestPoint)
  if (winnerByColumns) {
    return winnerByColumns
  }

  // diagonal evaluators

  const winnerByTopToLeft = evaluateTopToLeft(grid, highestPoint)
  if (winnerByTopToLeft) {
    return winnerByTopToLeft
  }

  const winnerByTopToRight = evaluateTopToRight(grid, highestPoint)
  if (winnerByTopToRight) {
    return winnerByTopToRight
  }

  return null
}
