import handleCss from '../src/cssHandler'
import { optionDefaults } from '../src/options'
import { ignoreResponsiveAppClass, browserFontSizeDiffVarName, cssOpeningQuoteStatements } from '../src/constants'
import { handleMobileDefaults } from '../src/options'

describe('handleCss with default transformations', () => {
  const styles = '.my-font-size { font-size: 16px }; my-padding { padding: 8px }'
  const expected = `.my-font-size:not(.${ignoreResponsiveAppClass}){font-size:calc(1rem + var(${browserFontSizeDiffVarName}))}my-padding:not(.${ignoreResponsiveAppClass}){padding:0.5000rem}`
  const opening = cssOpeningQuoteStatements[0]
  const cssCode = `${opening}${styles}"`
  const result = handleCss({ ...optionDefaults, handleMobile: false }, cssCode, 'default-styles.css')
  test('styles are correctly transformed', () => {
    expect(result?.transformations).toBe(expected)
  })
  test('code is correctly placed', () => {
    expect(result?.code).toBe(`${opening}${styles}${expected}"`)
  })
  test('source map is generated', () => {
    const { map } = result || { map: null }
    expect(typeof map).toBe('object')
    expect(map!.constructor.name).toBe('SourceMap')
  })
})

describe('handleCss with default mobile handling', () => {
  const styles = '.my-row { display: flex };'
  const expected = `@media only screen and (max-width: ${handleMobileDefaults.breakpoint}) and (orientation: portrait){.my-row:not(.${ignoreResponsiveAppClass}){flex-direction: column; flex-wrap: nowrap; margin-left: 0; margin-right: 0}}`
  const result = handleCss({ ...optionDefaults, transformPixels: false }, styles, 'mobile-styles.css')
  test('mobile styles are correctly handled', () => {
    expect(result?.transformations).toBe(expected)
  })
  test('code is correctly placed', () => {
    expect(result?.code).toBe(`${styles}${expected}`)
  })
})

describe('handleCss with bypassed options', () => {
  const styles = '.my-style { display: flex; margin-top: 64px };'
  const result = handleCss({ ...optionDefaults, transformPixels: false, handleMobile: false }, styles, 'mobile-styles.css')
  test('no transformations at all', () => {
    expect(result).toBe(null)
  })
})
