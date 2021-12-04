import { uniqueId } from 'lodash'
import { FC, useCallback, useMemo, useState } from 'react'
import { Player } from '@typings/player.enum'
import { GridMatrix } from '@typings/grid.types'
import { dropDisc } from '@utils/grid.utils'
import { InteractiveGrid } from '@components/grid/InteractiveGrid'
import { History } from '@components/grid/History'
import { generateGridSnapshots, PlayerMove } from '@utils/history.utils'
import { useTranslation } from 'react-i18next'

interface AuditEntry extends PlayerMove {
  id: string
}

interface Snapshot {
  id: string
  move?: PlayerMove
  grid: GridMatrix
  turn: Player
}

const INIT_MOVE_HISTORY: AuditEntry[] = []

export const App: FC = () => {
  const [moves, setMoves] = useState(INIT_MOVE_HISTORY)

  const { t } = useTranslation()

  const snapshots = useMemo(() => {
    const [initialState, ...others] = generateGridSnapshots(moves)
    return [
      {
        grid: initialState,
        turn: Player.PLAYER_1,
        id: 'ROOT',
      },
      ...others.map((grid, index) => {
        const move = moves[index]
        return {
          grid,
          move,
          id: move.id,
          turn:
            move.player === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1,
        }
      }),
    ] as Snapshot[]
  }, [moves])

  const lastSnapshot = snapshots[snapshots.length - 1]
  const turnText =
    lastSnapshot.turn === Player.PLAYER_1
      ? t('turn.player1')
      : t('turn.player2')

  const onPlayerMove = useCallback(
    (colIdx: number): void => {
      try {
        const { grid, turn } = lastSnapshot
        dropDisc(grid, turn, colIdx)

        setMoves((state) => [
          ...state,
          {
            id: uniqueId(),
            player: turn,
            colIdx,
          },
        ])
      } catch (e) {
        const err = e as Error
        console.log(`Move did not proceed: ${err.message}`)
      }
    },
    [setMoves, lastSnapshot]
  )

  const onHistoryEntryClick = useCallback(
    (index: number) => {
      setMoves((state) => state.slice(0, index))
    },
    [setMoves]
  )

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="flex flex-col flex-grow justify-center items-center">
        <div>{turnText}</div>
        <InteractiveGrid grid={lastSnapshot.grid} onClick={onPlayerMove} />
      </div>
      <div className="flex flex-row overflow-auto">
        <History
          grids={snapshots.map(({ grid }) => grid)}
          onClick={onHistoryEntryClick}
        />
      </div>
    </div>
  )
}
