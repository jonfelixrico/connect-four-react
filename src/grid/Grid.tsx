/* eslint-disable jsx-a11y/click-events-have-key-events */ // enable this later
import classNames from 'classnames'
import { FC } from 'react'
import { Player } from './player.enum'

interface CellProps {
  player: Player | null
  onClick: () => void
}
const Cell: FC<CellProps> = ({ player, onClick: origOnClick }) => {
  const isVacant = player ?? true
  const onClick = (): void => {
    if (isVacant) {
      return
    }

    origOnClick()
  }

  return (
    <div className="flex justify-center items-center Cell container">
      <div
        onClick={onClick}
        role="button"
        aria-label="cell"
        tabIndex={0}
        className={classNames('h-50 w-50 disk', {
          'player-1': player === Player.PLAYER_1,
          'player-2': player === Player.PLAYER_2,
        })}
      />
    </div>
  )
}

interface ColumnRowsProps {
  rows: Array<Player>
  onClick: (rowIndex: number) => void
}

/**
 * Represents a column
 */
const ColumnRows: FC<ColumnRowsProps> = ({ rows, onClick }) => (
  <div className="flex flex-col gap-y-1">
    {rows.map((row, rowIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <Cell key={rowIndex} player={row} onClick={() => onClick(rowIndex)} />
    ))}
  </div>
)

export interface GridProps {
  /**
   * Outer array: columns
   * Inner array: rows
   */
  grid: Array<Array<Player>>
  onClick: (colIndex: number, rowIndex: number) => void
}

/**
 * Represents a connect 4 grid that consists of seven columns
 * with six rows each.
 */
export const Grid: FC<GridProps> = ({ grid: columns, onClick }) => {
  if (columns.length !== 7 || !columns.every((rows) => rows.length === 6)) {
    throw new Error('Invalid grid dimensions!')
  }

  return (
    <div className="flex flex-row gap-x-1">
      {columns.map((rows, colIndex) => (
        <ColumnRows
          rows={rows}
          // eslint-disable-next-line react/no-array-index-key
          key={colIndex}
          onClick={(rowIndex) => onClick(colIndex, rowIndex)}
        />
      ))}
    </div>
  )
}
