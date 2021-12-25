import { createContext, FC, useContext, useMemo } from 'react'
import { Player } from '@typings/player.enum'
import { GridMatrix } from '@typings/grid.types'
import { Cell } from './Cell'

type ColorMapping = Record<Player, string> & {
  NONE: string
}

const DEFAULT_MAPPING = {
  NONE: 'transparent',
  [Player.PLAYER_1]: '#ef8080',
  [Player.PLAYER_2]: '#febe48',
}

const mapColors = (
  column: Array<Player | null>,
  mapping: ColorMapping
): Array<string> => column.map((item) => mapping[item ?? 'NONE'])

interface ColumnItemContextData {
  frameColor: string
  frameSize: number
}

const ColumnItemContext = createContext<ColumnItemContextData>({
  frameColor: 'black',
  frameSize: 100,
})

interface ColumnItemProps {
  background: string
}

const ColumnItem: FC<ColumnItemProps> = ({ background }) => {
  const { frameColor, frameSize } = useContext(ColumnItemContext)
  return (
    <Cell
      discColor={background}
      frameColor={frameColor}
      frameSize={frameSize}
    />
  )
}

interface GridColumnProps {
  items: Array<string>
}

const GridColumn: FC<GridColumnProps> = ({ items }) => {
  return (
    <div className="flex flex-col-reverse self-center">
      {items.map((color, index) => (
        <ColumnItem
          background={color}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
    </div>
  )
}

export interface GridProps {
  /**
   * Outer array: columns
   * Inner array: rows
   */
  grid: GridMatrix
  itemSize?: number
  colorMapping?: ColorMapping
  itemColor?: string
  backgroundColor?: string
}

/**
 * Represents a connect 4 grid that consists of seven columns
 * with six rows each.
 */
export const Grid: FC<GridProps> = ({
  grid: columns,
  itemSize = 100,
  colorMapping = DEFAULT_MAPPING,
  itemColor = 'rgb(13, 59, 102)',
  backgroundColor = '#e8e9f3',
}) => {
  const columnItemContextData = useMemo<ColumnItemContextData>(
    () => ({
      frameColor: itemColor || 'black',
      frameSize: itemSize,
    }),
    [itemColor, itemSize]
  )

  return (
    <ColumnItemContext.Provider value={columnItemContextData}>
      <div className="flex flex-row justify-center" style={{ backgroundColor }}>
        {columns.map((items, index) => (
          <GridColumn
            items={mapColors(items, colorMapping)}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </div>
    </ColumnItemContext.Provider>
  )
}
