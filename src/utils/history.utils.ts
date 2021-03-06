import { GridMatrix } from '@typings/grid.types'
import { Player } from '@typings/player.enum'
import { dropDisc, generateGrid } from './grid.utils'

export interface PlayerMove {
  colIdx: number
  player: Player
}

export function generateGridSnapshots(
  moves: PlayerMove[],
  startState?: GridMatrix
): GridMatrix[] {
  const timeline: GridMatrix[] = [startState ?? generateGrid()]

  for (const { player, colIdx } of moves) {
    const lastState = timeline[timeline.length - 1]
    timeline.push(dropDisc(lastState, player, colIdx))
  }

  return timeline
}
