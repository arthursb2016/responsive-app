import { OutputOptions, OutputBundle, Plugin } from 'rollup'
import { createFilter } from '@rollup/pluginutils'

import { Options } from './types'
import { optionDefaults } from './options'
import handleCss from './cssHandler'
import handleJs from './jsHandler'
import { isDefaultEntryPoint } from './utils'

export {
  handleCss,
  handleJs,
  isDefaultEntryPoint,
  optionDefaults,
  Options
}