import MagicString from 'magic-string'
import { indexHtmlFile, ignoreResponsiveAppClass } from './constants'
import { Options } from './types'
import { handleMobileDefaults } from './options'
import getResponsiveScript from './script'
import { getMobileQueries } from './cssHandler'

export default (options: Options, code: string, id: string, transformations?: string) => {
  const magicString = new MagicString(code)
  const isHtmlFile = id.includes(indexHtmlFile)
  const mobileQueries = getMobileQueries(options)
  const responsiveScript = getResponsiveScript(mobileQueries, transformations || null)
  const iife = `(function() {\n${responsiveScript}\n}())`
  if (isHtmlFile) {
    const index = code.indexOf('</body>')
    magicString.prependLeft(index, `<script>${responsiveScript}</script>`)
  } else {
    magicString.append(`\n\n${iife}`)
  }

  return {
    code: magicString.toString(),
    iife,
    map: magicString.generateMap({
      source: id,
      file: id,
      includeContent: true
    })
  }
}