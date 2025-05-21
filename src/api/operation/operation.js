import request from '@/utils/request'

// 查询操作日志信息列表
export function listOperation(query) {
  return request({
    url: '/tool/operation/list',
    method: 'get',
    params: query
  })
}

// 查询操作日志信息详细
export function getOperation(id) {
  return request({
    url: '/tool/operation/' + id,
    method: 'get'
  })
}

// 新增操作日志信息
export function addOperation(data) {
  return request({
    url: '/tool/operation',
    method: 'post',
    data: data
  })
}

// 修改操作日志信息
export function updateOperation(data) {
  return request({
    url: '/tool/operation',
    method: 'put',
    data: data
  })
}

// 删除操作日志信息
export function delOperation(id) {
  return request({
    url: '/tool/operation/' + id,
    method: 'delete'
  })
}
