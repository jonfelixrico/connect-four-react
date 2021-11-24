/* eslint-disable jsx-a11y/click-events-have-key-events */ // enable this later
import classNames from 'classnames'
import { CSSProperties, FC } from 'react'
import { Player } from './player.enum'
import './Grid.css'

interface CellProps {
  player: Player | null
}
const Cell: FC<CellProps> = ({ player }) => {
  return (
    <div
      className="flex flex-col justify-center
        items-center Cell"
    >
      <div
        className={classNames('disk rounded-full', {
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
  className?: string
}

/**
 * Represents a column
 */
const ColumnRows: FC<ColumnRowsProps> = ({ rows, onClick, className }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className={classNames('flex-1 flex flex-col', className)}
    onClick={onClick}
  >
    {rows
      .map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={rowIndex} player={row} />
      ))
      .reverse()}
  </div>
)

ColumnRows.defaultProps = {
  className: '',
}

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
    <div className={classNames('Grid flex flex-row', className)} style={style}>
      {columns.map((rows, colIndex) => (
        <ColumnRows
          rows={rows}
          // eslint-disable-next-line react/no-array-index-key
          key={colIndex}
          onClick={() => onClick(colIndex)}
          className={classNames('py-5', {
            'pl-5': colIndex === 0,
            'pr-5': colIndex === columns.length - 1,
          })}
        />
      ))}
    </div>
  )
}
