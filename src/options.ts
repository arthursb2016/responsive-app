import { Options, HandleMobileOptions, TransformPixelsOptions } from './types'

export const optionDefaults: Options = {
  appEntry: undefined,
  handleMobile: true,
  transformPixels: true
}

export const handleMobileDefaults: HandleMobileOptions = {
  ignoreSelectors: [],
  centralizeText: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
  breakpoint: '480px'
}

export const transformPixelsDefault: TransformPixelsOptions = {
  ignoreAttributes: [],
  ignoreSelectors: []
}