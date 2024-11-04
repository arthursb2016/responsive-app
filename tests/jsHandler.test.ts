import handleJs from '../src/jsHandler'
import { optionDefaults } from '../src/options'
import { ignoreResponsiveAppClass, browserFontSizeDiffVarName } from '../src/constants'
import getResponsiveScript from '../src/script'
import { getMobileQueries } from '../src/cssHandler'

describe('handleJs with all the options', () => {
  const code = 'import bundle.js\n'
  const transformations = `.my-font-size:not(.${ignoreResponsiveAppClass}){font-size:calc(1rem + var(${browserFontSizeDiffVarName}))}my-padding:not(.${ignoreResponsiveAppClass}){padding:0.5000rem}`
  const result = handleJs(optionDefaults, code, 'main.js', transformations)
  test('script is correctly bundled', () => {
    expect(result.iife.includes(getResponsiveScript(getMobileQueries(optionDefaults), transformations))).toBeTruthy()
  })
})

describe('handleJs with disabled mobile queries and no transformations', () => {
  const options = { ...optionDefaults, handleMobile: false }
  const code = 'import bundle.js\n'
  const result = handleJs(options, code, 'main.js')
  test('script is correctly bundled', () => {
    expect(result.iife.includes(getResponsiveScript(getMobileQueries(options), null))).toBeTruthy()
  })
})

describe('handleJs into a HTML entry point', () => {
  const options = { ...optionDefaults, handleMobile: false }
  const code = '<html><head></head><body></body></html>'
  const result = handleJs(options, code, '/index.html')
  test('script is correctly bundled', () => {
    expect(result.code.includes(`<script>${getResponsiveScript(getMobileQueries(options), null)}</script></body>`)).toBeTruthy()
  })
})