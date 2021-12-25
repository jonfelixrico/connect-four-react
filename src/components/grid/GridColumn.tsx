import { FC } from 'react'
import { Cell } from './Cell'

interface ColumnItemContainerProps {
  itemSize: number
}

interface ColumnItemProps extends ColumnItemContainerProps {
  background: string
}

const ColumnItem: FC<ColumnItemProps> = ({ itemSize, background }) => {
  return <Cell discColor={background} frameColor="blue" frameSize={itemSize} />
}

interface GridColumnProps extends Omit<ColumnItemContainerProps, 'discSize'> {
  items: Array<string>
}

export const GridColumn: FC<GridColumnProps> = ({ items, itemSize }) => {
  return (
    <div className="flex flex-col-reverse self-center">
      {items.map((color, index) => (
        <ColumnItem
          background={color}
          itemSize={itemSize}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        />
      ))}
    </div>
  )
}
