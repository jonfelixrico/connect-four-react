/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react'

type ColumnItems = [string, string, string, string, string, string]

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
      className="flex flex-col justify-center items-center"
    >
      {/* Disc */}
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

interface GridColumnProps extends ColumnItemContainerProps {
  items: ColumnItems
  onClick: () => void
}

export const GridColumn: FC<GridColumnProps> = ({
  items,
  onClick,
  itemSize,
  discSize,
}) => {
  return (
    <div onClick={onClick}>
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
