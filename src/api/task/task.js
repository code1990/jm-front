import request from '@/utils/request'

// 查询任务分配详情列表
export function listTask(query) {
  return request({
    url: '/tool/task/list',
    method: 'get',
    params: query
  })
}

// 查询任务分配详情详细
export function getTask(id) {
  return request({
    url: '/tool/task/' + id,
    method: 'get'
  })
}

// 新增任务分配详情
export function addTask(data) {
  return request({
    url: '/tool/task',
    method: 'post',
    data: data
  })
}

// 修改任务分配详情
export function updateTask(data) {
  return request({
    url: '/tool/task',
    method: 'put',
    data: data
  })
}

// 删除任务分配详情
export function delTask(id) {
  return request({
    url: '/tool/task/' + id,
    method: 'delete'
  })
}

export function getSite() {
  return request({
    url: '/tool/task/site',
    method: 'get'
  })
}

export function getUser() {
  return request({
    url: '/tool/task/user',
    method: 'get'
  })
}
