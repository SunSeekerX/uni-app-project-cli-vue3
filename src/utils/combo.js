import dayjs from 'dayjs'

import utools from '@/uni_modules/limm-utools'
import * as api from '@/apis'
import { i18n } from '@/i18n'
import * as store from '@/store'
import getEnv from '@/config'
import * as defaultConfig from '@/config/default'
import * as constant from '@/constant'
import * as util from '@/utils'

export default { utools, api, util, t: i18n.global.t, store, getEnv, defaultConfig, constant, dayjs, i18n }
