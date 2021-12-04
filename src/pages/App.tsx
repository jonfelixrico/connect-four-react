import { cloneDeep, uniqueId } from 'lodash'
import { FC, useCallback, useEffect, useState } from 'react'
import { Player } from '@typings/player.enum'
import { GridMatrix } from '@typings/grid.types'
import { generateGrid } from '@utils/grid.utils'
import { InteractiveGrid } from '@components/grid/InteractiveGrid'
import { History } from '@components/grid/History'

interface GameState {
  grid: GridMatrix
  player: Player
}

const INIT_GAME_STATE: GameState = {
  player: Player.PLAYER_1,
  grid: generateGrid(),
}

interface HistoryEntry extends GameState {
  id: string
}
const INIT_HISTORY: HistoryEntry[] = []

export const App: FC = () => {
  const [gameState, setGameState] = useState(INIT_GAME_STATE)
  const [history, setHistory] = useState(INIT_HISTORY)

  const onClick = useCallback(
    (colIdx: number): void => {
      setGameState((state) => {
        const { player, grid } = state
        const clone = cloneDeep(grid)
        const column = clone[colIdx]

        const firstNullIdx = column.findIndex((rowCell) => rowCell === null)

        if (firstNullIdx === -1) {
          console.warn(`No more slots in col ${colIdx}.`)
          return state
        }

        column[firstNullIdx] = player

        console.debug(
          `Player ${player} has placed a token on (${colIdx}, ${firstNullIdx}).`
        )
        return {
          player:
            player === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1,
          grid: clone,
        }
      })
    },
    [setGameState]
  )

  useEffect(() => {
    setHistory((historyState) => [
      ...historyState,
      {
        ...gameState,
        id: uniqueId(),
      } as HistoryEntry,
    ])
  }, [gameState])

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="flex flex-grow justify-center items-center">
        <InteractiveGrid grid={gameState.grid} onClick={onClick} />
      </div>
      <div className="flex flex-row overflow-auto">
        <History grids={history.map((entry) => entry.grid)} />
      </div>
    </div>
  )
}
