// types/quagga.d.ts

declare module 'quagga' {
  interface QuaggaConfig {
    inputStream?: {
      name?: string
      type: string
      target?: HTMLElement | string
      constraints?: MediaTrackConstraints
      area?: {
        top?: string
        right?: string
        left?: string
        bottom?: string
      }
    }
    locator?: {
      patchSize?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
      halfSample?: boolean
    }
    numOfWorkers?: number
    decoder: {
      readers: string[]
    }
    locate?: boolean
    frequency?: number
    src?: string
  }

  interface ResultPoint {
    x: number
    y: number
  }

  interface BarcodeResult {
    codeResult: {
      code: string
      format: string
    }
    line: ResultPoint[]
  }

  namespace Quagga {
    function init (config: QuaggaConfig, cb: (err: any) => void): void
    function start (): void
    function stop (): void
    function onDetected (callback: (result: BarcodeResult) => void): void
    function offDetected (callback: (result: BarcodeResult) => void): void
    function decodeSingle (
      config: QuaggaConfig,
      callback: (result: BarcodeResult | null) => void
    ): void
  }

  export = Quagga
}
