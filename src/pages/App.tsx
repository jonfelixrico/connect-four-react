import { cloneDeep, findLastIndex, uniqueId } from 'lodash'
import { FC, useCallback, useState } from 'react'
import { Player } from '@typings/player.enum'
import { GridMatrix } from '@typings/grid.types'
import { generateGrid } from '@utils/grid.utils'
import { InteractiveGrid } from '@components/grid/InteractiveGrid'
import { History } from '@components/grid/History'

interface HistoryEntry {
  id: string
  grid: GridMatrix
  player: Player
}

const INIT_HISTORY: HistoryEntry[] = [
  {
    id: uniqueId(),
    player: Player.PLAYER_1,
    grid: generateGrid(),
  },
]

export const App: FC = () => {
  const [history, setHistory] = useState(INIT_HISTORY)
  const state = history[history.length - 1]

  const onPlayerMove = useCallback(
    (colIdx: number): void => {
      const { player, grid } = state
      const highestPoint = findLastIndex(grid[colIdx], (item) => item !== null)

      if (highestPoint === 5) {
        console.warn(`No more slots in col ${colIdx}.`)
        return
      }

      const clone = cloneDeep(grid)
      const column = clone[colIdx]

      column[highestPoint + 1] = player
      console.debug(
        `Player ${player} has placed a token on (${colIdx}, ${
          highestPoint + 1
        }).`
      )

      const newState = {
        id: uniqueId(),
        player: player === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1,
        grid: clone,
      }

      setHistory((historyState) => [...historyState, newState])
    },
    [setHistory, state]
  )

  const onHistoryEntryClick = useCallback(
    (index: number) => {
      setHistory((historyState) => historyState.slice(0, index + 1))
    },
    [setHistory]
  )

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="flex flex-grow justify-center items-center">
        <InteractiveGrid grid={state.grid} onClick={onPlayerMove} />
      </div>
      <div className="flex flex-row overflow-auto">
        <History
          grids={history.map((entry) => entry.grid)}
          onClick={onHistoryEntryClick}
        />
      </div>
    </div>
  )
}
