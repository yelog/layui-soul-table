## 下拉菜单/底栏定制


### 1. 只显示表格列和导出excel两个菜单项
通过 `filter.items` 控制，

默认为 `['column','data','condition','editCondition','excel']`

分别对应：表格列、筛选数据、筛选条件、编辑筛选条件、导出excel

**注意：** 去掉 'data'(筛选数据) 时，后台筛选将不会发送第二条请求（表头数据请求）

:::demo 配置  `items:['column', 'excel']`
```html
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,filter: {
            items:['column', 'excel'] // 只显示表格列和导出excel两个菜单项
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 2.隐藏底部栏
通过设置 `filter.bottom = false` 来隐藏底部栏（不渲染底部栏）

:::demo 配置  `filter.bottom = false`
```html
<table id="myTable2" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,filter: {
           bottom: false 
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::
