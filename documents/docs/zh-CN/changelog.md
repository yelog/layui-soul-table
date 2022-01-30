## 介绍
<el-card>

为 `layui table` 扩展的插件， 计划和目标（有好的想法/建议/BUG反馈，可以加入QQ群：<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=3cbfbd2169afc3f4d11732101388941b0db5330a64755e68f27740b604409629"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="layui-使用交流" title="layui-使用交流"></a>）

当前layui版本 `v2.6.7`
<el-divider >有用的话，帮忙点个 star 吧</el-divider>

开源地址: <el-link href="https://github.com/yelog/layui-soul-table" type="primary" target="_blank">[github]</el-link>      <el-link href="https://gitee.com/saodiyang/layui-soul-table" type="primary" style="margin-left: 20px;" target="_blank">[gitee]</el-link>

</el-card>

## 功能介绍

<el-card>

1. 表头筛选、自定义条件（支持前端筛选、后台筛选）
2. 拖动列调整顺序、隐藏显示列
3. excel导出（根据筛选条件和列顺序导出）
4. 子表（表中表、无限层级、子表同样支持前3个功能）
5. 拖动行
6. 右击快捷菜单
7. 合计栏支持固定列
8. 双击自适应列宽
9. 右侧固定列 列宽拖动改到单元格左侧
10. 固定列支持滚动

</el-card>



## 更新日志

### **1.6.4** <small>`2022-01-30`</small>

[文档] 修复在线运行不显示的问题

### **1.6.4** <small>`2022-01-26`</small>

[修复] excel导出 分页导出时，合计行计算错误的问题，引入参数 totalRow.type，详情请看 [按照 api 返回的 totalRow 导出](#/zh-CN/component/excel/total-row)

[新增] 行拖拽 新增 `before` 方法，如果返回 `false`，则还原拖拽操作

### **1.6.3** <small>`2022-01-15`</small>

[修复] excel导出 额外内容导出，支持调用 `export` 方法

[优化] excel导出 合计行直接读取 dom，防止使用 api 调用方式计算错误的问题

### **1.6.2** <small>`2021-06-09`</small>

[修复] 筛选 修复前端分页在开启筛选时，排序会造成数据重复的问题

### **1.6.1** <small>`2021-06-08`</small>

[修复] 子表 修复入口控制方法 `isChild` 在当前列 `fixed` 时，获取不到 `row` 的问题

### **1.6.0** <small>`2021-05-22`</small>

[文档] layui 升级到 `2.6.7`

[文档] 兼容修复新版 `layer.open` 调用 iframe 时 `layer.use` 不执行的问题


### **1.5.21** <small>`2020-12-11`</small>

[新增] 新增 `soulTable.suspend` 方法，用于暂停/恢复某个功能特性，参考[列拖拽](#/zh-CN/component/basic/drag)第一示例中的switch方法

### **1.5.20** <small>`2020-12-01`</small>

[修复] 右键菜单 设置 z-index 为最大值，修复被弹窗遮盖的问题

### **1.5.20** <small>`2020-11-27`</small>

[修复] excel导出 当 title 为 html 代码时，会抽取文本信息，进行 excel 的头部信息填充

### **1.5.19** <small>`2020-11-10`</small>

[文档] 文档 api 接口迁移服务器

### **1.5.18** <small>`2020-09-18`</small>

[新增] 子表 父表的绑定事件 `xxEvent` 扩充了所有事件，如 `row` 、 `tool` 、`toolbar` 等，详情请看[事件监听,第二点](#/zh-CN/component/child/event)

### **1.5.17** <small>`2020-07-28`</small>

[修复] 显示/隐藏列 layui显示/隐藏列 和 记忆功能 没有相互同步的问题

### **1.5.17** <small>`2020-07-28`</small>

[修复] excel导出 `checked: true` 前端分页会导出其他页勾选的数据 [调用方法导出](#/zh-CN/component/excel/func)

[新增] excel导出 支持自定义数据导出 `data: []` [调用方法导出](#/zh-CN/component/excel/func)

[修复] 子表 有固定列时自定义内容布局错乱的问题 [2.多入口 + 复杂表头 + 固定列](#/zh-CN/component/child/custom)


### **1.5.16** <small>`2020-07-19`</small>

[文档] 修复 layui 的 `tpl` 写法与 vue 渲染冲突的问题的

[新增] 子表 支持自定义展开内容 [自定义展开内容](#/zh-CN/component/child/custom)

[新增] 子表 新增了子表 展开/关闭 [事件监听](#/zh-CN/component/child/event)

### **1.5.16** <small>`2020-07-18`</small>

[修复] 显示/隐藏列 修复显示隐藏列时会递归到子表，导致子表相同 `field` 的列会被同步隐藏

[修复] 子表 修复子表在父表未铺满的情况下展开子表，会导致父表列头和内容错位的问题

[优化] 自适应列宽 标记 `unresize` 的列将不会自动适应列宽，也不能通过双击自适应列宽

### **1.5.15** <small>`2020-07-08`</small>

[修复] 自动列宽 没有 `field` 的列，通过自动列宽调整后，调用 `table.resize` 被还原的问题

### **1.5.15** <small>`2020-06-18`</small>

[新增] 筛选 支持单列配置筛选菜单 [下拉菜单/底栏定制 第二点](#/zh-CN/component/filter/menu)

### **1.5.15** <small>`2020-06-17`</small>

[修复] 记忆功能 修复拖拽列顺序后导致拖拽列宽记忆错误的问题

### **1.5.14** <small>`2020-06-15`</small>

[修复] 筛选 修复清除筛选方法bug

### **1.5.13** <small>`2020-06-14`</small>

[修复] 筛选 修复 `templet` 方式，下拉数据没有应用模版的问题

### **1.5.13** <small>`2020-06-13`</small>

[优化] 记忆功能 取消原来 reload 模式，采用动态修改，提升加载性能

[优化] 记忆功能 修改了列配置的代码后，缓存会自动更新

[添加] 记忆功能 支持 `soulTable.clearCache(tableId)` 手动执行清除 

[修复] 记忆功能 支持在子表中开启记忆功能

[修复] 筛选 修复底部筛选筛选错位问题 [基本筛选 注意](#/zh-CN/component/filter/basic)

[新增] 全局配置 支持修改默认配置 [全局配置](#/zh-CN/component/start/config)

### **1.5.12** <small>`2020-05-30`</small>

[修复] excel导出 复杂表头 `colspan` 为字符串时计算错误的问题

### **1.5.12** <small>`2020-05-26`</small>

[修复] 筛选 修复下拉选择列表中 false 值不显示的问题

[增强] overflow 支持表头和合计行 [内容超出设置 第四点](#/zh-CN/component/basic/overflow)

[增强] 自动列宽 支持同步合计行 [自适应列宽 第二点](#/zh-CN/component/basic/auto-width)

[修复] excel导出 修复日期等特殊格式类型的单元格如果值为空，引起文件打开报错的问题 [精确参数设置 第二点](#/zh-CN/component/excel/style)

[增强] 行拖动 默认支持索引列同步 [拖拽行 第二点](#/zh-CN/component/basic/row-drag)

### **1.5.11** <small>`2020-05-22`</small>

[增强] 筛选 前端分页筛选后，保留勾选状态[复选框优化](#/zh-CN/component/filter/checkbox)

[修复] 自动列宽 修复表格在隐藏时(如在 tab 页中)，计算列宽错误的问题

[增强] 自动列宽 新增参数 `autoWidth` 用于禁止某列自动适应列宽 [初始化表格时自动调整列宽](#/zh-CN/component/basic/auto-width)

[修复] 筛选 修复内置排序没有同步最新的分页信息，导致排序信息丢失的问题 [issue#91](https://github.com/yelog/layui-soul-table/issues/91)

[修复] excel导出 修复指定列导出没有无视 `hide` 参数的问题

### **1.5.10** <small>`2020-05-21`</small>

[修复] excel导出 支持重复列（field相同）

### **1.5.10** <small>`2020-05-17`</small>

[注释] 压缩版 js 保留头部版本信息

### **1.5.10** <small>`2020-05-13`</small>

[修复] 筛选 日期筛选昨天有逻辑错误 [Issue89](https://github.com/yelog/layui-soul-table/issues/89)

[修复] 拖拽 filed内有空格时定位不到dom的问题 [Issue87](https://github.com/yelog/layui-soul-table/issues/87)

### **1.5.10** <small>`2020-05-09`</small>

[修复] 自适应列宽 优化计算方法，兼容计算按钮等元素宽度

### **1.5.9** <small>`2020-05-07`</small>

[修复] 子表 修复子表三层及多层以上的 tab 切换无反应的问题

[文档] 在线运行 所有示例支持直接在线运行

### **1.5.8** <small>`2020-05-06`</small>

[新增] 新增 `soulTable.slim.js` 可以独立使用左侧菜单 **【基本功能】** 中的功能，[soulTable 独立使用](#/zh-CN/component/start/install#1.-soultable-du-li-shi-yong) 

[新增] 插件支持 `CDN` 访问 [安装/CDN](#/zh-CN/component/start/install#si-cdn)

### **1.5.6** <small>`2020-04-26`</small>

[修复] excel导出 合计行默认保留两位小数

### **1.5.5** <small>`2020-04-25`</small>

[PR] 右键菜单 合并 [陈培新](https://gitee.com/chanpeixin) 的 [修复右键菜单位置不正确问题](https://gitee.com/saodiyang/layui-soul-table/pulls/1)

[PR] 子表 合并 [半夏](https://gitee.com/2720851545banxia) 的 [支持子表弹窗的 title 支持 function 传入](https://gitee.com/saodiyang/layui-soul-table/pulls/2)
### **1.5.4** <small>`2020-04-22`</small>

[文档] 添加固定列滚动示例，并添加优化建议

### **1.5.3** <small>`2020-03-17`</small>

[修复] excel导出 修复复杂表头开启 checkbox/radio 时，导出头部乱掉的问题

### **1.5.2** <small>`2020-03-03`</small>

[新增] 自动列宽 新增 `初始化表格时自动调整列宽` 功能

[文档] 自动列宽 新增 `初始化表格时自动调整列宽`、`复杂表头`、`Tab页切换` 等示例

[修复] 筛选 修复编辑筛选条件中变量 `i` 被污染造成的显示错误/卡死等情况

### **1.5.1** <small>`2020-02-19`</small>

[修复] 子表 修复子表 `单元格编辑事件` 触发父表事件

### **1.5.0** <small>`2020-01-16`</small>

[文档] layui 升级到 `2.5.6`

### **1.4.5** <small>`2019-11-14`</small>

[修复] excel导出 修复数据 0 导出为空的问题

[增强] excel导出 支持导出当前页数据，配置 `excel.curPage = true` [四、分页情况下只导出当前页数据](#/zh-CN/component/excel/basic)

[修复] excel导出 修复右对其失效问题

[增强] 子表 子表宽度支持铺满父表 [7. 子表宽度铺满父表](#/zh-CN/component/child/show)

[增强] 子表 弹窗方式支持通过 `layerOption` 自定义弹窗的配置 [3.弹窗方式](#/zh-CN/component/child/show)

[修复] excel导出 修复 cols 中的事件上下问丢失问题

[修复] excel导出 兼容 table.render 使用 response 的情况

### **1.4.4** <small>`2019-11-12`</small>

[修复] excel导出 支持 `method`、`contentType` 参数

### **1.4.3** <small>`2019-11-07`</small>

[增强] 子表事件 `editEvent` 可以通过 `obj.oldValue` 获取修改前的数据

### **1.4.2** <small>`2019-10-23`</small>

[文档] 文档系统的 `layui` 版本升级到 `2.5.5`

[增强] excel导出 支持合计行导出 [合计行导出](#/zh-CN/component/excel/total-row)

[修复] 合计行 修复合计行固定时，点击页码UI错乱问题 

[修复] 固定列监听滚动 bug修复及默认开启

### **1.4.1** <small>`2019-10-16`</small>

[修复] 行拖动 修复行拖动时，滚动表格内容造成拖动行错位的问题

[新增] 工具方法 新增复制剪贴板功能 `soulTable.copy('待复制内容')`，可用于右键菜单等功能。

### **1.4.0** <small>`2019-09-30`</small>
[修复] excel导出/固定列上下滚动 兼容IE

### **1.3.29** <small>`2019-09-29`</small>

[新增] 固定列支持上下滚动

### **1.3.28** <small>`2019-09-26`</small>

[优化] 内容超出显示 tips 支持宽度设置-适应列宽 [内容超出设置](#/zh-CN/component/basic/overflow)

[优化] 右键菜单 支持自适应方向显示 需要更新 `soulTable.js soulTable.css`

[优化] 内容超出显示 兼容子表配置 [内容超出设置](#/zh-CN/component/basic/overflow) 第4点

[优化] 子表 移除 `box-shadow` 效果

### **1.3.27** <small>`2019-09-25`</small>

[文档] 修复后台分页的示例报错问题 

### **1.3.26** <small>`2019-09-24`</small>

[增强] 子表 子表事件的第二参数全部改为行对象pobj，原 pdata 由 pobj.data 获取<span class='layui-red'>（不兼容升级，如果有使用 pdata, 请注意修改）</span>

[修复] 行拖拽 兼容IE


### **1.3.26** <small>`2019-09-23`</small>
[修复] 子表 修复 固定列+自适应列宽 时，子表未铺满父表的问题

[新增] 内容超出显示 除了官网默认方式外，添加 tips/title 两种方式 [内容超出设置](#/zh-CN/component/basic/overflow)

[修复] excel导出 兼容 templet 以 script/function/string 方式的模版

### **1.3.25** <small>`2019-09-20`</small>
[修复] excel导出 修复关闭筛选时，后台分页的excel导出丢失查询条件的问题

### **1.3.24** <small>`2019-09-19`</small>
[新增] 单元格合并 支持多行显示 

### **1.3.23** <small>`2019-09-18`</small>

[样式] 子表 左右留出空隙，即根据主表是否有滚动条计算合适宽度

[新增] 子表 模拟树表-测试版 

### **1.3.22** <small>`2019-09-17`</small>

[修复] 合计行 修复合计行固定列css使用不当，造成列错乱。

### **1.3.21** <small>`2019-09-16`</small>

[新增] 拖动列宽 左侧固定列拖动列宽引入开关

[文档] 新增拖动列宽示例 [修复右侧固定列拖动列宽](#/zh-CN/component/basic/fixResize)


### **1.3.20** <small>`2019-09-11`</small>
[移除] 筛选 筛选菜单的右击呼出功能

[新增] 右键菜单 可配置 header/body/total [右键菜单](#/zh-CN/component/basic/contextmenu)

[修复] 拖动行 修复自适应宽度的列，在拖动后宽度异常的问题

[优化] 右键菜单 1.支持单独列设置 2.点击事件新增行对象 `trElem`

[优化] 拖动列宽 右固定列拖动列宽改到单元格左侧

### **1.3.20** <small>`2019-09-11`</small>

[新增] 子表 入口支持自定义图标 [展开方式](#/zh-CN/component/child/show) 第4点

[新增] 子表 支持入口图标和字段放在一起 [展开方式](#/zh-CN/component/child/show) 第5点

[新增] 子表 支持父表固定列 [展开方式](#/zh-CN/component/child/show)

### **1.3.19** <small>`2019-09-10`</small>

[添加] 合计行 合计行支持固定列

[修复] 列拖动 兼容固定的合计行

[修复] 行拖动 事件阻止冒泡的问题

### **1.3.18** <small>`2019-09-09`</small>

[新增] 子表 新增子表事件：`toolbar/edit/checkbox`

[新增] 拖拽行 [拖拽行](#/zh-CN/component/basic/row-drag)

### **1.3.17** <small>`2019-09-08`</small>

[修复] 筛选 修复 url+不分页时，筛选没有恢复url，造成 reload 时，没有重新请求数据的问题，同时此问题也会引起 checkbox 的多重绑定，导致报错。

[修复] 筛选 修复 非后台分页时，底部筛选栏清除条件，未同步 `myTable.where`，导致条件恢复的问题。 

### **1.3.16** <small>`2019-09-05`</small>

[修复] resize 修复有底部筛选栏时，table.resize 时，没有计算底部栏而造成高度增加的问题

### **1.3.15** <small>`2019-08-28`</small>

[新增] excel导出 支持指定列导出 [指定列导出](#/zh-CN/component/excel/columns)

### **1.3.14** <small>`2019-08-27`</small>

[修复] 子表 `where/url/data` 事件传递过程中丢失

[修复] 排序 即便没有设置 `lay-filter` 仍然可以使用内部监听

[新增] 子表 子表定义字段 `children` 支持传入 `function` 类型 [基础子表](#/zh-CN/component/child/basic)

### **1.3.13** <small>`2019-08-26`</small>
[优化] 语法 修复重复变量声明、类型判断不精确的问题

[新增] 新增压缩版插件，位置 `docs/ext`

[修复] 子表 修复子表方法上下文丢失的问题，包括 `rowEvent/rowDoubleEvent/toolEvent/done/data/where` 等方法

### **1.3.12** <small>`2019-08-23`</small>
[新增] 拖拽 新增 拖拽工具栏 ，支持动态修改固定列/非固定列

### **1.3.11** <small>`2019-08-22`</small>
[新增] 筛选 新增方法 `soulTable.clearFilter(tableId)` 用于清除所有筛选条件 [基本筛选](#/zh-CN/component/filter/basic)

<span class='layui-red'>[移除]</span> css 项目移除对于 `animate.min.css` 的依赖, 更新 `soulTable.css`

[新增] 拖拽 新增简易拖拽，拖拽过程只有头部移动，结束时，才会同步 body [2. 简易拖拽](#/zh-CN/component/basic/drag)

[增强] 拖拽 允许固定列之间进行拖拽交换，允许 `checkbox/radio` 特殊列进行拖拽交换 

### **1.3.10** <small>`2019-08-21`</small>
[修复] 拖拽 修复拖拽到左右两边时未判空出现的报错

[优化] 拖拽 拖拽到边缘时自动取消

### **1.3.9** <small>`2019-08-20`</small>
[修复] 筛选 split 参数列含有纯数字类型时不能调用 `split` 方法的问题

[修复] 筛选 空数据筛选判断错误的问题

### **1.3.8** <small>`2019-08-19`</small>
[增强] 前端分页排序 前端分页排序受插件默认监听，默认排序所有页数据

[修复] 筛选 条件"为空"时报错的问题

### **1.3.7** <small>`2019-08-14`</small>
[修复] 单元格合并 兼容只有一列合并时，高度不会被撑开的问题

### **1.3.6** <small>`2019-08-13`</small>
[修复] excel导出 兼容 `parseData`

### **1.3.5** <small>`2019-08-12`</small>
[修复] 拖拽 修复拖拽列快速隐藏时，固定列没有自适应宽度进行隐藏的问题

[新增] 拖拽 固定列支持向上拖动快速隐藏

[修复] 记忆 修复插件中的表格隐藏列记忆问题

[新增] 记忆 新增 工具栏列显示隐藏 的记忆方法 [记忆功能](#/zh-CN/component/basic/cache)

[新增] 单元格合并 兼容复杂表头 [复杂表头合并](#/zh-CN/component/merge/header)


### **1.3.4** <small>`2019-08-07`</small>
[修复] 子表 修复子表入口列宽计算bug，支持子表入口列可拖动列宽

### **1.3.3** <small>`2019-08-06`</small>
[升级] 子表 子表兼容复杂表头、多入口 [多入口/复杂表头](#/zh-CN/component/child/header)

### **1.3.2** <small>`2019-08-05`</small>
[新增] 子表 子表标题可以通过参数隐藏 [子表title设置](#/zh-CN/component/child/title)

[新增] 子表 支持tab切换懒加载 [懒加载](#/zh-CN/component/child/lazy)

[文档] 子表 新增**子表重载**示例

[优化] 子表 重写了layui table 的行hover样式，子表使用时，注意子表也要在 done 中写入 `soulTable.render`


### **1.3.1** <small>`2019-08-03`</small>
[文档] 路由懒加载，解决文档系统第一次访问较慢的问题

[文档] excel导出 添加了包含表单的示例

[新增] excel导出 支持直接传 tableId 如 soulTable.export('tableId')

[新增] 子表 新增手风琴展开方式 [2.手风琴方式（一次只能展开一个子表）](#/zh-CN/component/child/show)

### **1.3.0** <small>`2019-07-31`</small>
[修复] 筛选 表头请求/excel请求 添加 header/contentType 支持

[升级] layui 升级layui版本为 2.5.4

### **1.2.15** <small>`2019-07-30`</small>
[修复] 子表 添加排序默认事件，解决 layui table 默认排序不执行done造成的子表入口不渲染的问题

[修复] 筛选 修复 IE 不支持 `startsWith` 的问题
 
[修复] 拖拽 修复拖拽列顺序时，同页面表格树超过10个以上出现拖拽异常的问题

[文档] excel导出 添加分页示例

### **1.2.14** <small>`2019-07-29`</small>
[新增] excel导出 支持 仅导出勾选数据

### **1.2.13** <small>`2019-07-27`</small>
[修复] 修复子表冒泡事件影响tab使用的问题

### **1.2.12** <small>`2019-07-25`</small>
[新增] excel导出 支持头部、尾部添加内容

### **1.2.11** <small>`2019-07-24`</small>
[文档] excel导出 独立excel文档示例

[升级] excel导出 支持复杂表头导出

[升级] 筛选 支持复杂表头

### **1.2.10** <small>`2019-07-23`</small>
[优化] excel导出 修复excel列宽和表格列宽同步

[优化] excel导出 layui 的 table 的对齐方式 align 也会作用于导出后的文件

[新增] excel导出 新增边框样式参数

### **1.2.9** <small>`2019-07-18`</small>
[修复] 记忆 修复记忆的key添加了hash兼容单页应用使用

[修复] 筛选 修复 使用 myTable.reload 清除表头条件时未还原处理

[优化] 使用了新的文档系统

[优化] 子表 `tableChild.js`可以单独使用 通过 `tableChild.render(this)` 使用

[优化] 子表 阻止了子表冒泡事件，且增加了主表的行点击事件

[新增] 单元格合并 引入了作者很早实现的一个合并插件

### **1.2.8** <small>`2019-07-16`</small>
[新增] 子表 新增 isChild 字段，用于根据当前行数据是否显示子表入口

### **1.2.7** <small>`2019-07-12`</small>
[修复] 筛选 拼接筛选条件时，没有判空，导致空数据抛出异常的问题

### **1.2.6** <small>`2019-07-10`</small>
[新增] 离线字体包 项目中引入离线字体包，方便获取

### **1.2.5** <small>`2019-07-08`</small>
[修复] 滚动条 修复窗口大小变化时，fixed列高度计算错误，导致遮挡横向滚动条的问题

### **1.2.4** <small>`2019-07-03`</small>
[修复] 子表 修复子表展开模式下表头拖拽列宽的鼠标样式丢失问题

[修复] 子表 修复子表 tableId 获取不统一造成的cache数据查找失败的问题

[修复] 拖拽 修复拖拽 tableId 获取不统一造成列获取失败的问题

### **1.2.3** <small>`2019-07-02`</small>
[增加] 筛选 tableFilter 暴露变量 cache ，用于在页面可以方便获取 表格所有数据。 tableFilter.cache

### **1.2.2** <small>`2019-06-28`</small>
[修复] 筛选 修复使用 table.render ，保存筛选条件判断的bug

### **1.2.1** <small>`2019-06-26`</small>
[修复] 筛选 修复后台筛选时数据为空的判断

### **1.2.0** <small>`2019-06-25`</small>
[修复] 筛选 前端不分页时，不设置limit时，筛选条件去除后只会显示10条数据的问题（layui源码bug，但是通过此插件解决）

[修复] 筛选 后台筛选没有重载表头的问题

[修复] 隐藏列/调整列顺序 修复以移动列后，disabled的列计算错误的问题

[修复] 拖拽列 修复 firefox 下拖拽列出现的边框消失的问题

[增强] 子表 子表扩展了 单击行/双击行 事件，并给tool等事件引入父表当前行参数

[新增] 列宽 双击列自适应宽度

### **1.1.1** <small>`2019-06-24`</small>
[修复] 筛选 修复后端筛选丢失查询条件的问题

[修改] 筛选 默认 table.reload 不会清除"表头筛选"的条件。当然可以配置 clearFilter 为 true 来清除筛选条件

### **1.1.0** <small>`2019-06-19`</small>
[新增] 前端缓存配置，当前仅包含：列顺序、隐藏列。可以参考 基本功能->记忆功能，即便刷新页面也会保存列配置。

### **1.0.7** <small>`2019-05-05`</small>
[新增] excel导出，添加格式指定：单元格类型: b 布尔值, n 数字, e 错误, s 字符, d 日期

### **1.0.6** <small>`2019-04-17`</small>
[修复] 拖拽 修复事件未释放造成的ui错乱

[修复] 拖拽 禁止checkbox、radio列及右侧固定列移动

### **1.0.5** <small>`2019-04-15`</small>
[修复] 子表 由于dom选择bug造成的无限层级子表出现问题

[新增] 子表 新增 spread 参数，加载主表后自动加载子表

[新增] 子表 url 可传入方法，可以根据主表数据修改url，可用于 路径参数 请求

### **1.0.4** <small>`2019-04-12`</small>
[修复] 筛选 修复数字类型不兼容问题

[新增] 筛选 新增 bottom 参数，用于选择是否加载底部筛选行

### **1.0.3** <small>`2019-04-09`</small>
[修复] 拖动 禁止固定列移动

[修复] 子表 修复主表事件覆盖，导致主表tool事件失效的问题

[新增] 子表 添加参数 toolEvent 用于处理子表行事件

### **1.0.2** <small>`2019-04-08`</small>
[优化] 筛选 如果没有筛选列，则不渲染底部筛选

[修复] 筛选 修复固定列筛选问题

[新增] 子表 添加参数 data，可使用数组数据渲染子表

### **1.0.1** <small>`2019-04-04`</small>
[修复] 拖动 修复排序造成的拖动bug

### **1.0.0** <small>`2019-01-27`</small>
[新增] 创建项目
