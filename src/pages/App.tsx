import { cloneDeep, uniqueId } from 'lodash'
import { FC, useCallback, useEffect, useState } from 'react'
import { Grid } from '@components/grid/Grid'
import { Player } from '@typings/player.enum'
import { GridMatrix } from '@typings/grid.types'
import { generateGrid } from '@utils/grid.utils'

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
        <Grid
          grid={gameState.grid}
          onClick={onClick}
          className="px-5"
          columnClassName="py-5"
        />
      </div>
      <div className="flex flex-row overflow-auto">
        {history.map((historyEntry) => (
          <Grid
            className="p-1 pointer-events-none"
            cellSize={20}
            grid={historyEntry.grid}
            key={historyEntry.id}
          />
        ))}
      </div>
    </div>
  )
}
