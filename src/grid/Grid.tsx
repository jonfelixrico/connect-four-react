import { FC } from 'react'
import { Player } from './player.enum'

interface CellProps {
  player: Player | null
}
const Cell: FC<CellProps> = ({ player }) => {
  if (player ?? true) {
    // TODO transparent thing
    return <div>?</div>
  }

  // TODO disc thing
  return <div>{player}</div>
}

interface ColumnRowsProps {
  rows: Array<Player>
}

/**
 * Represents a column
 */
const ColumnRows: FC<ColumnRowsProps> = ({ rows }) => (
  <div>
    {rows.map((rowCell, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Cell key={index} player={rowCell} />
    ))}
  </div>
)

export interface GridProps {
  /**
   * Outer array: columns
   * Inner array: rows
   */
  grid: Array<Array<Player>>
}

/**
 * Represents a connect 4 grid that consists of seven columns
 * with six rows each.
 */
export const Grid: FC<GridProps> = ({ grid: columns }) => {
  if (columns.length !== 7 || !columns.every((rows) => rows.length === 6)) {
    throw new Error('Invalid grid dimensions!')
  }

  return (
    <div>
      {columns.map((rows, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ColumnRows rows={rows} key={index} />
      ))}
    </div>
  )
}
