## 全局配置
### 全局设置方法
```js
layui.use(['soulTable'], function () {
    layui.soulTable.config({
        drag: false, // 默认关闭表格的列拖拽，可单独开启
        overflow: { // 默认所有表格都超出
            type: 'tips',
            header: true, // 表头支持 overflow
            total: true // 合计行支持 overflow
        }
    })
})
```
### 全局的默认设置如下
```js
defaultConfig = { // 默认配置开关
    fixTotal: false, // 修复合计行固定列问题
    drag: true, // 列拖动
    rowDrag: false, // 行拖动
    autoColumnWidth: true, // 自动列宽
    contextmenu: false, // 右键菜单
    fixResize: true, // 修改有固定列的拖动列宽的位置为左边线
    overflow: false, // 自定义内容超出样式
    fixFixedScroll: true, // 固定列支持鼠标滚轮滚动
    filter: false  // 筛选及记忆相关
};
```