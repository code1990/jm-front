import request from '@/utils/request'

// 查询闸门监测信息列表
export function listStation(query) {
  return request({
    url: '/tool/station/list',
    method: 'get',
    params: query
  })
}

// 查询闸门监测信息详细
export function getStation(id) {
  return request({
    url: '/tool/station/' + id,
    method: 'get'
  })
}

// 新增闸门监测信息
export function addStation(data) {
  return request({
    url: '/tool/station',
    method: 'post',
    data: data
  })
}

// 修改闸门监测信息
export function updateStation(data) {
  return request({
    url: '/tool/station',
    method: 'put',
    data: data
  })
}

// 删除闸门监测信息
export function delStation(id) {
  return request({
    url: '/tool/station/' + id,
    method: 'delete'
  })
}

export function queryStation() {
  return request({
    url: '/tool/station/queryStation',
    method: 'get'
  })
}

export function queryLast(siteId) {
  return request({
    url: '/tool/station/queryLast/'+siteId,
    method: 'get'
  })
}

export function queryLastInfo(deviceId) {
  return request({
    url: '/tool/station/queryLastInfo/'+deviceId,
    method: 'get'
  })
}

export function getDict(siteId) {
  return request({
    url: '/tool/station/dict/'+siteId,
    method: 'get'
  })
}
