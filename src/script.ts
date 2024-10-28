import { Options } from './types'
import { browserFontSizeDiffVarName } from './constants'

export default (mobileQueries: string | null, transformations: string | null) => {
  return `
    if (typeof window !== 'undefined') {
      const baseFontSize = 16
      const segments = { width: 80, height: 45 }
      const preciseBreakpoints = { width: 1320, height: 720 }

      function getVirtualRemFontSize(width, height) {
        const isLandscape = width > height
        const widthSegment = isLandscape ? segments.width : segments.height
        const heightSegment = isLandscape ? segments.height : segments.width
        const preciseWidthBreakpoint = isLandscape ? preciseBreakpoints.width : preciseBreakpoints.height
        const preciseHeightBreakpoint = isLandscape ? preciseBreakpoints.height : preciseBreakpoints.width
        let X = width > preciseWidthBreakpoint ? widthSegment : widthSegment - Math.floor((preciseWidthBreakpoint - width) / (widthSegment / 2))
        let Y = height > preciseHeightBreakpoint ? heightSegment : heightSegment - Math.floor((preciseHeightBreakpoint - height) / (heightSegment / 2))
        return Math.round(((width / X) + (height / Y)) / 2)
      }

      const setBrowserFontSizeDiff = function(htmlElement) {
        htmlElement.style.removeProperty('font-size');
        const browserFontSize = window.getComputedStyle(htmlElement).getPropertyValue('font-size');
        const browserDifference = Number(browserFontSize.replace('px', '')) - baseFontSize;
        document.documentElement.style.setProperty('${browserFontSizeDiffVarName}', browserDifference + 'px')
      }

      const setVirtualRemFontSize = function(htmlElement) {
        const vRem = getVirtualRemFontSize(window.innerWidth, window.innerHeight)
        htmlElement.style.setProperty('font-size', vRem + 'px')
      }

      const updateHtmlFontSize = function() {
        const htmlElement = document.querySelector('html');
        setBrowserFontSizeDiff(htmlElement)
        setVirtualRemFontSize(htmlElement)
      }

      const addMobileCentralization = function() {
        if ('${mobileQueries}' === 'null' || '${mobileQueries}' === null) return
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.setAttribute('data-responsive-app-mobile', 'true')
        style.textContent = \"${(mobileQueries || '').replace(/\n/g, '')}\"
        document.head.appendChild(style)
      }

      const addTransformations = function() {
        if ('${transformations}' === 'null' || '${transformations}' === null) return
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.setAttribute('data-responsive-app-transformations', 'true')
        style.textContent = \"${(transformations || '').replace(/\n/g, '')}\"
        document.head.appendChild(style)
      }

      const initResponsive = function() {
        window.addEventListener('resize', updateHtmlFontSize)
        addMobileCentralization()
        addTransformations()
        updateHtmlFontSize()
      }

      if (window.document.readyState !== 'loading') {
        initResponsive();
      } else {
        window.document.addEventListener('DOMContentLoaded', function() {
          initResponsive();
        });
      }
    }`
}