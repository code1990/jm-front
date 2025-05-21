import request from '@/utils/request'

// 查询泵站监测信息列表
export function listGate(query) {
  return request({
    url: '/tool/gate/list',
    method: 'get',
    params: query
  })
}

// 查询泵站监测信息详细
export function getGate(id) {
  return request({
    url: '/tool/gate/' + id,
    method: 'get'
  })
}

// 新增泵站监测信息
export function addGate(data) {
  return request({
    url: '/tool/gate',
    method: 'post',
    data: data
  })
}

// 修改泵站监测信息
export function updateGate(data) {
  return request({
    url: '/tool/gate',
    method: 'put',
    data: data
  })
}

// 删除泵站监测信息
export function delGate(id) {
  return request({
    url: '/tool/gate/' + id,
    method: 'delete'
  })
}

export function queryGate() {
  return request({
    url: '/tool/gate/queryGate',
    method: 'get'
  })
}
export function queryLast(siteId) {
  return request({
    url: '/tool/gate/queryLast/'+siteId,
    method: 'get'
  })
}

export function queryLastInfo(deviceId) {
  return request({
    url: '/tool/gate/queryLastInfo/'+deviceId,
    method: 'get'
  })
}

export function getDict(siteId) {
  return request({
    url: '/tool/gate/dict/'+siteId,
    method: 'get'
  })
}

export function getCtrl(deviceId,code){
  return request({
    url: '/tool/command/ctrl/'+deviceId+"/"+code,
    method: 'get'
  })
}

export function getStatus(deviceId){
  return request({
    url: '/tool/command/device/status/'+deviceId,
    method: 'get'
  })
}
