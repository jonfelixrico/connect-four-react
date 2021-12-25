import { FC, useContext } from 'react'
import { Cell } from './Cell'
import { ColumnItemContext } from './ColumnItemContext'

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

export const GridColumn: FC<GridColumnProps> = ({ items }) => {
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
