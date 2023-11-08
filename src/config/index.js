import { defaultEnv } from './default'
import dev from './env.dev'
import prod from './env.prod'

export const ENVS = {
  dev,
  prod,
}

export const ENV = defaultEnv

export default function getEnv(key) {
  const val = ENVS[ENV][key]
  if (![null, undefined].includes(val)) {
    return val
  } else {
    console.error(`ENV: Cannot get the ${key} value!`)
    return null
  }
}
