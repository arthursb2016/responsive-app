import MagicString from 'magic-string'
import { indexHtmlFile, ignoreResponsiveAppClass } from './constants'
import { Options } from './types'
import { handleMobileDefaults } from './options'
import getResponsiveScript from './script'

function getMobileQueries(options: Options): string | null {
  if (!options.handleMobile) return null
  const params = {
    ...handleMobileDefaults,
    ...(typeof options.handleMobile === 'object' ? options.handleMobile : {})
  }
  let queries = `@media (orientation: portrait) and (max-width: ${params.breakpoint}) {`
  params.centralizeText.forEach(function (selector) {
    queries += `${selector}:not(.${ignoreResponsiveAppClass}) { text-align: center }`
  })
  queries += '}'
  return queries
  
}

export default (options: Options, code: string, id: string) => {
  const magicString = new MagicString(code)
  const isHtmlFile = id.includes(indexHtmlFile)
  const mobileQueries = getMobileQueries(options)
  if (isHtmlFile) {
    const index = code.indexOf('</body>')
    magicString.prependLeft(index, `<script>${getResponsiveScript(mobileQueries)}</script>`)
  } else {
    magicString.append(`\n\n(function() {\n${getResponsiveScript(mobileQueries)}\n}())`)
  }

  return {
    code: magicString.toString(),
    map: magicString.generateMap({
      source: id,
      file: id,
      includeContent: true
    })
  }
}