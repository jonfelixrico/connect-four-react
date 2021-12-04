/* eslint-disable react/no-array-index-key */
import { GridMatrix } from '@typings/grid.types'
import { FC } from 'react'
import { Grid } from './Grid'

interface HistoryProps {
  grids: GridMatrix[]
}

export const History: FC<HistoryProps> = ({ grids }) => {
  return (
    <div className="flex flex-row gap-x-1">
      {grids.map((grid, index) => (
        <div style={{ background: '#0d3b66' }} className="p-0.5">
          <Grid key={index} grid={grid} itemSize="20px" />
        </div>
      ))}
    </div>
  )
}
