## 开发

```bash
# 克隆项目
git clone https://gitee.com/y_project/RuoYi-Vue

# 进入项目目录
cd ruoyi-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
## commit规则


- git commit -m 'feat: 增加 xxx 功能'

- git commit -m 'bug: 修复 xxx 功能'


## 前端开发计划

-  登录页面改造 + 添加背景 +扫描登录 (暂时没有小程序 无登录二维码)
-  菜单底部路由
-  菜单左侧路由
-  首页
  - 年度闸泵开启统计
  - 水位曲线图 
  - 流量曲线图
  - 右侧表头（水利数据信息）
  - 泵站实时信息
  - 测流点实时信息
  - 地图
  - 地图标记 hover 行政边界
-  大屏
  - 年度闸开启统
  - 年度水位曲线
  - 年度流量柱状 
  - 同比接口
  - 泵站实时信息
  - 水利数据信息
  - 测流点实时信息
- 泵站管理
  - 泵站基本信息查询
  - 视频接口
- 拦河闸管理
  - 拦河闸基本信息
  - 视频接口
- 雨情遥测
  - 降雨量监测 柱状图 + 汇总数据
  - 雨情日报表
  - 雨情月报表
  - 雨情年报表
- 水文信息
  - 列表接口+按照条件查询
- 监控总览
  - 单视图 四视图 九视图 切换画面
- 查询管理
  - 列表管理 + 查询接口



### 整个信息
