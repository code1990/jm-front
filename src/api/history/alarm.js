import request from '@/utils/request'

// 查询告警详情信息列表
export function listAlarm(query) {
  return request({
    url: '/tool/alarm/list',
    method: 'get',
    params: query
  })
}

// 查询告警详情信息详细
export function getAlarm(id) {
  return request({
    url: '/tool/alarm/' + id,
    method: 'get'
  })
}

// 新增告警详情信息
export function addAlarm(data) {
  return request({
    url: '/tool/alarm',
    method: 'post',
    data: data
  })
}

// 修改告警详情信息
export function updateAlarm(data) {
  return request({
    url: '/tool/alarm',
    method: 'put',
    data: data
  })
}

// 删除告警详情信息
export function delAlarm(id) {
  return request({
    url: '/tool/alarm/' + id,
    method: 'delete'
  })
}
export function getDict() {
  return request({
    url: '/tool/alarm/dict/',
    method: 'get'
  })
}
export function getCamera(siteId) {
  return request({
    url: '/tool/alarm/camera/'+siteId,
    method: 'get'
  })
}

export function getCameraBack(deviceId,startTime,endTime) {
  return request({
    url: '/tool/alarm/camera/back/'+deviceId+'?startTime='+startTime+'&endTime='+endTime,
    method: 'get'
  })
}

export function getCameraList(siteId,deviceType) {
  return request({
    url: '/tool/alarm/camera/list/'+siteId+"/"+deviceType,
    method: 'get'
  })
}

export function getPtControl(deviceId,direction,type) {
  return request({
    url: '/tool/alarm/control/'+deviceId+'/'+direction+'/'+type,
    method: 'get'
  })
}

export function getCameraTree() {
  return request({
    url: '/tool/alarm/camera/tree/',
    method: 'get'
  })
}

export function getCameraAll() {
  return request({
    url: '/tool/alarm/camera/all/',
    method: 'get'
  })
}

export function sendCommand(deviceId,code,siteType) {
  return request({
    url: '/tool/alarm/command/'+deviceId+'/'+code+'/'+siteType,
    method: 'get'
  })
}
