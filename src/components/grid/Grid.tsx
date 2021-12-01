/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */ // enable this later

import classNames from 'classnames'
import { CSSProperties, FC } from 'react'
import { Player } from '@enums/player.enum'
import './Grid.css'

interface CellProps {
  player: Player | null
  cellSize?: number
}
const Cell: FC<CellProps> = ({ player, cellSize }) => {
  return (
    <div
      className="flex flex-col justify-center
        items-center Cell"
      style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
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
  cellSize?: number
}

/**
 * Represents a column
 */
const ColumnRows: FC<ColumnRowsProps> = ({
  rows,
  onClick,
  className,
  cellSize,
}) => (
  <div className="relative" onClick={onClick}>
    <div
      className="absolute h-full w-full
    bg-white opacity-0 hover:opacity-10"
    />
    <div className={classNames('flex flex-col pointer-events-none', className)}>
      {rows
        .map((row, rowIndex) => (
          <Cell cellSize={cellSize} key={rowIndex} player={row} />
        ))
        .reverse()}
    </div>
  </div>
)

export interface GridProps {
  /**
   * Outer array: columns
   * Inner array: rows
   */
  grid: Array<Array<Player>>
  onClick?: (colIndex: number) => void

  /**
   * Classes to be applied to the grid
   */
  className?: string

  /**
   * Classes to be applied to each individual column
   */
  columnClassName?: string

  style?: CSSProperties
  cellSize?: number
}

/**
 * Represents a connect 4 grid that consists of seven columns
 * with six rows each.
 */
export const Grid: FC<GridProps> = ({
  grid: columns,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  className,
  style,
  cellSize = 100,
  columnClassName,
}) => {
  if (columns.length !== 7 || !columns.every((rows) => rows.length === 6)) {
    throw new Error('Invalid grid dimensions!')
  }

  return (
    <div
      className={classNames('Grid', className)}
      style={{ ...style, display: 'inline-block' }}
    >
      <div
        className="flex flex-row justify-center"
        style={{ width: `${7 * cellSize}px` }}
      >
        {columns.map((rows, colIndex) => (
          <ColumnRows
            rows={rows}
            key={colIndex}
            onClick={() => onClick(colIndex)}
            cellSize={cellSize}
            className={columnClassName}
          />
        ))}
      </div>
    </div>
  )
}
