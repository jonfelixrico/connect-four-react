import { FC } from 'react'

interface ColumnItemContainerProps {
  itemSize: string
  discSize: string
}

interface ColumnItemProps extends ColumnItemContainerProps {
  background: string
}

const ColumnItem: FC<ColumnItemProps> = ({
  itemSize,
  discSize,
  background,
}) => {
  return (
    <div
      style={{
        width: itemSize,
        height: itemSize,
      }}
      className="flex justify-center items-center"
    >
      <div
        className="rounded-full"
        style={{
          width: discSize,
          height: discSize,
          background,
        }}
      />
    </div>
  )
}

interface GridColumnProps extends Omit<ColumnItemContainerProps, 'discSize'> {
  items: Array<string>
  discSize?: string
}

export const GridColumn: FC<GridColumnProps> = ({
  items,
  itemSize,
  discSize = '90%',
}) => {
  return (
    <div className="flex flex-col-reverse self-center">
      {items.map((color) => (
        <ColumnItem
          background={color}
          itemSize={itemSize}
          discSize={discSize}
        />
      ))}
    </div>
  )
}
