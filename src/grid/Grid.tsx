/* eslint-disable jsx-a11y/click-events-have-key-events */ // enable this later
import classNames from 'classnames'
import { CSSProperties, FC } from 'react'
import { Player } from './player.enum'

interface CellProps {
  player: Player | null
}
const Cell: FC<CellProps> = ({ player }) => {
  return (
    <div className="flex justify-center items-center Cell container">
      <div
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
  onClick: () => void
}

/**
 * Represents a column
 */
const ColumnRows: FC<ColumnRowsProps> = ({ rows, onClick }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div className="flex flex-col gap-y-1" onClick={onClick}>
    {rows.map((row, rowIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <Cell key={rowIndex} player={row} />
    ))}
  </div>
)

export interface GridProps {
  /**
   * Outer array: columns
   * Inner array: rows
   */
  grid: Array<Array<Player>>
  onClick: (colIndex: number) => void
  className?: string
  style?: CSSProperties
}

/**
 * Represents a connect 4 grid that consists of seven columns
 * with six rows each.
 */
export const Grid: FC<GridProps> = ({
  grid: columns,
  onClick,
  className,
  style,
}) => {
  if (columns.length !== 7 || !columns.every((rows) => rows.length === 6)) {
    throw new Error('Invalid grid dimensions!')
  }

  return (
    <div
      className={classNames('flex flex-row gap-x-1', className)}
      style={style}
    >
      {columns.map((rows, colIndex) => (
        <ColumnRows
          rows={rows}
          // eslint-disable-next-line react/no-array-index-key
          key={colIndex}
          onClick={() => onClick(colIndex)}
        />
      ))}
    </div>
  )
}
