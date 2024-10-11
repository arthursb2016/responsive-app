export type Options = {
  appEntry: undefined | string,
  handleMobile: boolean | HandleMobileOptions,
  transformPixels: boolean | TransformPixelsOptions
}

export type HandleMobileOptions = {
  ignoreSelectors: string[],
  centralizeText: string[],
  breakpoint: string
}

export type TransformPixelsOptions = {
  ignoreAttributes: string[],
  ignoreSelectors: string []
}