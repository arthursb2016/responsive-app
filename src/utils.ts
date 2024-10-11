import { Options } from './types'
import { appEntryPoints } from './constants'

export function isDefaultEntryPoint(options: Options, name: string): boolean {
  return !options.appEntry && appEntryPoints.some(i => name.includes(i)) && !name.includes('/server')
}