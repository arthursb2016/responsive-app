import handleJs from '../src/jsHandler'
import { optionDefaults } from '../src/options'
import { ignoreResponsiveAppClass, browserFontSizeDiffVarName, cssOpeningQuoteStatements } from '../src/constants'
import { handleMobileDefaults } from '../src/options'

describe('handleJs on JavaScript file entry point', () => {
  const code = 'import bundle.js\n'
  const transformations = `.my-font-size:not(.${ignoreResponsiveAppClass}){font-size:calc(1rem + var(${browserFontSizeDiffVarName}))}my-padding:not(.${ignoreResponsiveAppClass}){padding:0.5000rem}`
  const result = handleJs(optionDefaults, code, 'main.js', transformations)
  test('script is correctly bundled', () => {
    expect(typeof result.iife).toBe('string')
  })
})