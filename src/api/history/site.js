import request from '@/utils/request'

// 查询站点监测信息列表
export function listSite(query) {
  return request({
    url: '/tool/site/list',
    method: 'get',
    params: query
  })
}

// 查询站点监测信息详细
export function getSite(id) {
  return request({
    url: '/tool/site/' + id,
    method: 'get'
  })
}

// 新增站点监测信息
export function addSite(data) {
  return request({
    url: '/tool/site',
    method: 'post',
    data: data
  })
}

// 修改站点监测信息
export function updateSite(data) {
  return request({
    url: '/tool/site',
    method: 'put',
    data: data
  })
}

// 删除站点监测信息
export function delSite(id) {
  return request({
    url: '/tool/site/' + id,
    method: 'delete'
  })
}

export function getSiteDay(query) {
  return request({
    url: '/tool/site/day',
    method: 'get',
    params: query
  })
}
export function getDict(siteType) {
  return request({
    url: '/tool/site/dict/'+siteType,
    method: 'get'
  })
}
export function getAllDevice() {
  return request({
    url: '/tool/site/device',
    method: 'get'
  })
}
