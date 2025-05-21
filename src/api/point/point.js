import request from '@/utils/request'

// 查询测流点信息列表
export function listPoint(query) {
  return request({
    url: '/tool/point/list',
    method: 'get',
    params: query
  })
}

// 查询测流点信息详细
export function getPoint(id) {
  return request({
    url: '/tool/point/' + id,
    method: 'get'
  })
}

// 新增测流点信息
export function addPoint(data) {
  return request({
    url: '/tool/point',
    method: 'post',
    data: data
  })
}

// 修改测流点信息
export function updatePoint(data) {
  return request({
    url: '/tool/point',
    method: 'put',
    data: data
  })
}

// 删除测流点信息
export function delPoint(id) {
  return request({
    url: '/tool/point/' + id,
    method: 'delete'
  })
}

export function getDict() {
  return request({
    url: '/tool/point/dict',
    method: 'get'
  })
}

export function getQuery1(deviceId) {
  return request({
    url: '/tool/point/query1/'+deviceId,
    method: 'get'
  })
}

export function getQuery2(deviceId) {
  return request({
    url: '/tool/point/query2/'+deviceId,
    method: 'get'
  })
}
export function getQuery3(deviceId) {
  return request({
    url: '/tool/point/query3/'+deviceId,
    method: 'get'
  })
}
export function getQuery4(deviceId) {
  return request({
    url: '/tool/point/query4/'+deviceId,
    method: 'get'
  })
}
export function getStatDetail() {
  return request({
    url: '/tool/point/statDetail/',
    method: 'get'
  })
}
export function getStatCount() {
  return request({
    url: '/tool/point/statCount/',
    method: 'get'
  })
}

export function getLast() {
  return request({
    url: '/tool/point/last/',
    method: 'get'
  })
}

