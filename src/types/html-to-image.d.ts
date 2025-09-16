declare module "html-to-image" {
  export interface ToImageOptions {
    quality?: number;
    backgroundColor?: string;
    width?: number;
    height?: number;
    style?: Partial<CSSStyleDeclaration>;
    pixelRatio?: number;
    filter?: (node: HTMLElement) => boolean;
    canvasWidth?: number;
    canvasHeight?: number;
    skipAutoScale?: boolean;
  }
  export function toPng(
    node: HTMLElement,
    options?: ToImageOptions
  ): Promise<string>;
}
