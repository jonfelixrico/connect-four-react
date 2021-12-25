import { createContext } from 'react'

export interface ColumnItemContextData {
  frameColor: string
  frameSize: number
}

export const ColumnItemContext = createContext<ColumnItemContextData>({
  frameColor: 'black',
  frameSize: 100,
})
