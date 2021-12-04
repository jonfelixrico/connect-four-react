/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { GridMatrix } from '@typings/grid.types'
import { FC } from 'react'
import { Grid } from './Grid'

export const HistoryEntry: FC<{ grid: GridMatrix }> = ({ grid }) => {
  return (
    <div style={{ background: '#0d3b66' }} className="p-0.5 relative">
      <div className="h-full w-full absolute bg-black opacity-0 hover:opacity-10" />
      <Grid grid={grid} itemSize="20px" />
    </div>
  )
}

interface HistoryProps {
  grids: GridMatrix[]
  onClick?: (index: number) => void
}

export const History: FC<HistoryProps> = ({
  grids,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}) => {
  return (
    <div className="flex flex-row gap-x-1">
      {grids.map((grid, index) => (
        <div key={index} onClick={() => onClick(index)}>
          <HistoryEntry grid={grid} />
        </div>
      ))}
    </div>
  )
}
