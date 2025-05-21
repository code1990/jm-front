import request from '@/utils/request'

// 查询雨量信息按月统计天数列表
export function listRain(query) {
  return request({
    url: '/tool/rain/list',
    method: 'get',
    params: query
  })
}
//地图雨量详情
export function query4(query) {
  return request({
    url: '/tool/rain/query4',
    method: 'get',
    params: query
  })
}

export function query3(query) {
  return request({
    url: '/tool/rain/query3',
    method: 'get',
    params: query
  })
}

export function query2(query) {
  return request({
    url: '/tool/rain/query2',
    method: 'get',
    params: query
  })
}

export function query1(query) {
  return request({
    url: '/tool/rain/query1',
    method: 'get',
    params: query
  })
}

export function dict(query) {
  return request({
    url: '/tool/rain/dict',
    method: 'get',
    params: query
  })
}

// 查询雨量信息按月统计天数详细
export function getRain(id) {
  return request({
    url: '/tool/rain/' + id,
    method: 'get'
  })
}

// 新增雨量信息按月统计天数
export function addRain(data) {
  return request({
    url: '/tool/rain',
    method: 'post',
    data: data
  })
}

// 修改雨量信息按月统计天数
export function updateRain(data) {
  return request({
    url: '/tool/rain',
    method: 'put',
    data: data
  })
}

// 删除雨量信息按月统计天数
export function delRain(id) {
  return request({
    url: '/tool/rain/' + id,
    method: 'delete'
  })
}
