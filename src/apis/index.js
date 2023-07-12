import { req } from '@/utils/request'

// 查询用户信息
export const userinfoSelectApi = (data) => req({ url: '/api/users/userinfo/select', method: 'POST', data })

export const getApi = () => req({ url: '/get', method: 'GET', header: { headerParam1: 'headerParam1' } })
export const postApi = () => req({ url: '/post', method: 'POST' })
export const putApi = () => req({ url: '/put', method: 'PUT' })
export const deleteApi = () => req({ url: '/delete', method: 'DELETE' })
export const uploadApi = () => req({ url: '/upload', method: 'UPLOAD' })
