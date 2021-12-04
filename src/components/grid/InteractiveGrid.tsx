/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { range } from 'lodash'
import { FC } from 'react'
import { Grid, GridProps } from './Grid'

interface InteractiveGridProps extends GridProps {
  onClick: (colIdx: number) => void
}

const RANGE = range(7)

export const InteractiveGrid: FC<InteractiveGridProps> = ({
  onClick,
  grid,
  colorMapping,
  itemSize,
}) => {
  return (
    <div className="px-5" style={{ background: '#0d3b66' }}>
      <div className="relative">
        <div className="py-5">
          <Grid grid={grid} colorMapping={colorMapping} itemSize={itemSize} />
        </div>
        <div
          className="absolute h-full w-full flex flex-row"
          style={{ top: 0 }}
        >
          {RANGE.map((idx) => (
            <div
              className="flex-grow bg-white opacity-0 hover:opacity-5"
              onClick={() => onClick(idx)}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
