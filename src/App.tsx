import { cloneDeep } from 'lodash'
import { FC, useCallback, useState } from 'react'
import { Grid } from './grid/Grid'
import { Player } from './grid/player.enum'

const INIT_GRID: Array<Array<Player>> = new Array(7)
  .fill(null)
  .map(() => new Array(6).fill(null))

export const App: FC = () => {
  const [grid, setGrid] = useState(INIT_GRID)
  const [player, setPlayer] = useState(Player.PLAYER_1)

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

        return clone
      })

      setPlayer(player === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1)
    },
    [player]
  )

  return (
    <div className="h-screen w-screen">
      <Grid grid={grid} onClick={onClick} />
    </div>
  )
}
