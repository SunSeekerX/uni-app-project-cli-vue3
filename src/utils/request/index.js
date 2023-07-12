import createRequest from './request'
import getEnv from '@/config'

export const req = createRequest(
  {
    baseUrl: getEnv('BASE_URL'),
    withCredentials: false,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  },
  true
)
