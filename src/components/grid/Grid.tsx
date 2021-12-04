import { FC } from 'react'
import { Player } from '@typings/player.enum'
import { GridMatrix } from '@typings/grid.types'
import { GridColumn } from './GridColumn'

type ColorMapping = Record<Player, string> & {
  NONE: string
}

const DEFAULT_MAPPING = {
  NONE: '#e8e9f3',
  [Player.PLAYER_1]: '#ef8080',
  [Player.PLAYER_2]: '#febe48',
}

const mapColors = (
  column: Array<Player | null>,
  mapping: ColorMapping
): Array<string> => column.map((item) => mapping[item ?? 'NONE'])

export interface GridProps {
  /**
   * Outer array: columns
   * Inner array: rows
   */
  grid: GridMatrix
  itemSize?: string
  colorMapping?: ColorMapping
}

/**
 * Represents a connect 4 grid that consists of seven columns
 * with six rows each.
 */
export const Grid: FC<GridProps> = ({
  grid: columns,
  itemSize = '100px',
  colorMapping = DEFAULT_MAPPING,
}) => {
  return (
    <div className="flex flex-row justify-center">
      {columns.map((items, index) => (
        <GridColumn
          itemSize={itemSize}
          items={mapColors(items, colorMapping)}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
    </div>
  )
}
