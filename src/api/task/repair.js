import request from '@/utils/request'

// 查询任务维修详情列表
export function listRepair(query) {
  return request({
    url: '/tool/repair/list',
    method: 'get',
    params: query
  })
}

// 查询任务维修详情详细
export function getRepair(id) {
  return request({
    url: '/tool/repair/' + id,
    method: 'get'
  })
}

// 新增任务维修详情
export function addRepair(data) {
  return request({
    url: '/tool/repair',
    method: 'post',
    data: data
  })
}

// 修改任务维修详情
export function updateRepair(data) {
  return request({
    url: '/tool/repair',
    method: 'put',
    data: data
  })
}

// 删除任务维修详情
export function delRepair(id) {
  return request({
    url: '/tool/repair/' + id,
    method: 'delete'
  })
}
