import { FC } from 'react'

interface CellBaseProps {
  frameColor: string
  frameSize: number

  discSize: number
}

/**
 * This component will create a "cell" with a transparent center.
 */
const CellBase: FC<CellBaseProps> = ({ frameColor, frameSize, discSize }) => {
  return (
    <svg width={frameSize} height={frameSize}>
      <defs>
        <mask id="hole">
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
        mask="url(#hole)"
        color={frameColor}
      />
    </svg>
  )
}

export interface CellProps extends Omit<CellBaseProps, 'discSize'> {
  discColor: string
}

export const Cell: FC<CellProps> = (props) => {
  const { discColor, frameSize, frameColor } = props

  return (
    <div
      className="relative"
      // this background will make our "frame" (CellBase) appear to have the circle filled up
      style={{ background: discColor }}
    >
      <CellBase
        frameSize={frameSize}
        discSize={frameSize * 0.95}
        frameColor={frameColor}
      />
    </div>
  )
}
