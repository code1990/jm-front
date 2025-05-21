import request from '@/utils/request'

// 查询闸门监测信息列表
export function listStation(query) {
  return request({
    url: '/device/list',
    method: 'get',
    params: query
  })
}

// 查询闸门监测信息详细
export function getStation(id) {
  return request({
    url: '/device/' + id,
    method: 'get'
  })
}

// 新增闸门监测信息
export function addStation(data) {
  return request({
    url: '/device',
    method: 'post',
    data: data
  })
}

// 修改闸门监测信息
export function updateStation(data) {
  return request({
    url: '/device',
    method: 'put',
    data: data
  })
}

// 删除闸门监测信息
export function delStation(id) {
  return request({
    url: '/device/' + id,
    method: 'delete'
  })
}

export function queryStation() {
  return request({
    url: '/device/queryStation',
    method: 'get'
  })
}

export function queryLast(siteId) {
  return request({
    url: '/device/queryLast/'+siteId,
    method: 'get'
  })
}

export function getVideoDict(siteId,siteType) {
  return request({
    url: '/camera/device/dict/'+siteId+'/'+siteType,
    method: 'get',
    baseURL:process.env.VUE_APP_BASE_API2,
  })
}
