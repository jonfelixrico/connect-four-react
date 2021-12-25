import { uniqueId } from 'lodash'
import { FC, useState } from 'react'

interface CellBaseProps {
  frameColor: string
  frameSize: number

  discSize: number
}

/**
 * This component will create a "cell" with a transparent center.
 */
const CellBase: FC<CellBaseProps> = ({ frameColor, frameSize, discSize }) => {
  /*
   * This is a unique id per instance and will only be instantiated if they got mounted
   * for the first time. Renders will not affect the value of this.
   *
   * This id is necessary for the mask definitions that we have in the SVG below.
   * Apparently, ids are global. If we use a single id for all instances, the mask for cells
   * with larger sizes might also be applied for those with smaller sizes.
   */
  const [id] = useState<string>(uniqueId())

  return (
    <svg width={frameSize} height={frameSize}>
      <defs>
        <mask id={id}>
          <rect width={frameSize} height={frameSize} fill="white" />
          <circle
            r={discSize / 2}
            // cx and cy determines position of the circle. it is the center of the circle.
            cx={frameSize / 2}
            cy={frameSize / 2}
            fill="black"
          />
        </mask>
      </defs>

      <rect
        width={frameSize}
        height={frameSize}
        mask={`url(#${id})`}
        fill={frameColor}
      />
    </svg>
  )
}

export interface CellProps extends Omit<CellBaseProps, 'discSize'> {
  discColor?: string
}

export const Cell: FC<CellProps> = (props) => {
  const { discColor, frameSize, frameColor } = props

  return (
    <div
      className="relative"
      // this background will make our "frame" (CellBase) appear to have the circle filled up
      style={{ background: discColor ?? 'transparent' }}
    >
      <CellBase
        frameSize={frameSize}
        discSize={frameSize * 0.95}
        frameColor={frameColor}
      />
    </div>
  )
}
