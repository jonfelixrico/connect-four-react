/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
  <div className="flex-1 relative" onClick={onClick}>
    <div
      className="absolute h-full w-full
    bg-white opacity-0 hover:opacity-10"
    />
    <div className={classNames('flex flex-col pointer-events-none', className)}>
      {rows
        .map((row, rowIndex) => <Cell key={rowIndex} player={row} />)
        .reverse()}
    </div>
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
    <div
      className={classNames('Grid flex flex-row px-5', className)}
      style={style}
    >
      {columns.map((rows, colIndex) => (
        <ColumnRows
          rows={rows}
          key={colIndex}
          onClick={() => onClick(colIndex)}
          className="py-5"
        />
      ))}
    </div>
  )
}
