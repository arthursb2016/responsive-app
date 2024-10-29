/*!
  * The responsive-app package <https://www.npmjs.com/package/responsive-app>
  * @author   Arthur Borba <https://arthurborba.dev>
  * @license  MIT
  */
import handleCss, { getMobileQueries } from './cssHandler'
import handleJs from './jsHandler'
import { handleMobileDefaults, transformPixelsDefault } from './options'

(function() {
  const defaultOptions = {
    appEntry: undefined,
    handleMobile: handleMobileDefaults,
    transformPixels: transformPixelsDefault
  }

  function responsiveApp() {
    let transformations = ''

    Array.from(document.styleSheets).forEach((styleSheet: CSSStyleSheet) => {
      try {
        const cssRules = styleSheet.cssRules
        Array.from(cssRules).forEach((rule, index) => {
          const transformedRule = handleCss(defaultOptions, rule.cssText, `css-rule-${index}`)
          if (transformedRule) transformations += transformedRule.transformations
        })
      } catch (error) {
        console.warn('Could not access stylesheet rules:', error)
      }
    })

    const script = handleJs(defaultOptions, '', '', transformations).iife
    const scriptTag = document.createElement('script')
    scriptTag.textContent = script
    document.head.appendChild(scriptTag)
  }

  if (window.document.readyState !== 'loading') {
    responsiveApp()
  } else {
    window.document.addEventListener('DOMContentLoaded', function() {
      responsiveApp()
    });
  }
})()