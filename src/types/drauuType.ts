import { Brush, DrawingMode } from 'drauu'

type drauuSvgType = {
  drauuDump: Record<string, string>
  drawingMode: Record<string, DrawingMode | 'arrow'>
  brush: Record<string, Brush>
}

export type { drauuSvgType }
