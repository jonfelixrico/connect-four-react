import { cloneDeep, uniqueId } from 'lodash'
import { FC, useCallback, useState } from 'react'
import { Grid } from './grid/Grid'
import { Player } from './grid/player.enum'

type Grid = Array<Array<Player>>
interface HistoryEntry {
  grid: Grid
  id: string
}

const INIT_GRID: Array<Array<Player>> = new Array(7)
  .fill(null)
  .map(() => new Array(6).fill(null))

const INIT_HISTORY: HistoryEntry[] = [
  {
    grid: INIT_GRID,
    id: uniqueId(),
  },
]

export const App: FC = () => {
  const [grid, setGrid] = useState(INIT_GRID)
  const [player, setPlayer] = useState(Player.PLAYER_1)
  const [history, setHistory] = useState(INIT_HISTORY)

  const onClick = useCallback(
    (colIdx: number): void => {
      setGrid((gridState) => {
        const clone = cloneDeep(gridState)
        const column = clone[colIdx]

        const firstNullIdx = column.findIndex((rowCell) => rowCell === null)

        if (firstNullIdx === -1) {
          console.warn(`No more slots in col ${colIdx}.`)
          return gridState
        }

        column[firstNullIdx] = player

        console.debug(
          `Player ${player} has placed a token on (${colIdx}, ${firstNullIdx}).`
        )

        setPlayer(
          player === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1
        )
        setHistory((historyState) => [
          ...historyState,
          {
            grid: clone,
            id: uniqueId(),
          },
        ])

        return clone
      })
    },
    [player]
  )

  return (
    <div className="h-screen w-screen">
      <div>
        <Grid
          grid={grid}
          onClick={onClick}
          className="px-5"
          columnClassName="py-5"
        />
        <div
          style={{ transform: 'scale(0.1)' }}
          className="pointer-events-none flex flex-row"
        >
          {history.map((historyEntry) => (
            <Grid grid={historyEntry.grid} key={historyEntry.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
