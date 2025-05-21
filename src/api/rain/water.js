import request from '@/utils/request'

// 查询水位监测信息列表
export function listWater(query) {
  return request({
    url: '/tool/water/list',
    method: 'get',
    params: query
  })
}

// 查询水位监测信息详细
export function getWater(id) {
  return request({
    url: '/tool/water/' + id,
    method: 'get'
  })
}

// 新增水位监测信息
export function addWater(data) {
  return request({
    url: '/tool/water',
    method: 'post',
    data: data
  })
}

// 修改水位监测信息
export function updateWater(data) {
  return request({
    url: '/tool/water',
    method: 'put',
    data: data
  })
}

// 删除水位监测信息
export function delWater(id) {
  return request({
    url: '/tool/water/' + id,
    method: 'delete'
  })
}

export function getYearStat(){
  return request({
    url: '/tool/water/year/stat',
    method: 'get'
  })
}

export function getYearMonth(){
  return request({
    url: '/tool/water/year/month',
    method: 'get'
  })
}
