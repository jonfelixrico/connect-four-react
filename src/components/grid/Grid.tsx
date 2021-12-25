import { createContext, FC, useContext, useMemo } from 'react'
import { Player } from '@typings/player.enum'
import { GridMatrix } from '@typings/grid.types'
import { Cell } from './Cell'

type ColorMapping = Record<Player, string> & {
  NONE: string
}

const mapColors = (
  column: Array<Player | null>,
  mapping: ColorMapping
): Array<string> => column.map((item) => mapping[item ?? 'NONE'])

interface GridContextData {
  frameColor: string
  frameSize: number
}

const DEFAULT_MAPPING = {
  NONE: 'transparent',
  [Player.PLAYER_1]: '#ef8080',
  [Player.PLAYER_2]: '#febe48',
}
const DEFAULT_BG_COLOR = 'white'
const DEFAULT_FRAME_COLOR = 'black'
const DEFAULT_FRAME_SIZE = 100

const GridContext = createContext<GridContextData>({
  frameColor: DEFAULT_FRAME_COLOR,
  frameSize: DEFAULT_FRAME_SIZE,
})

interface ColumnItemProps {
  background: string
}

const ColumnItem: FC<ColumnItemProps> = ({ background }) => {
  const { frameColor, frameSize } = useContext(GridContext)
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
  frameSize?: number
  colorMapping?: ColorMapping
  frameColor?: string
  backgroundColor?: string
}

/**
 * Represents a connect 4 grid that consists of seven columns
 * with six rows each.
 */
export const Grid: FC<GridProps> = ({
  grid: columns,
  frameSize = DEFAULT_FRAME_SIZE,
  colorMapping = DEFAULT_MAPPING,
  frameColor = DEFAULT_FRAME_COLOR,
  backgroundColor = DEFAULT_BG_COLOR,
}) => {
  const columnItemContextData = useMemo<GridContextData>(
    () => ({
      frameColor,
      frameSize,
    }),
    [frameColor, frameSize]
  )

  return (
    <GridContext.Provider value={columnItemContextData}>
      <div className="flex flex-row justify-center" style={{ backgroundColor }}>
        {columns.map((items, index) => (
          <GridColumn
            items={mapColors(items, colorMapping)}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </div>
    </GridContext.Provider>
  )
}
