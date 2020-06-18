## 下拉菜单/底栏定制


### 1. 调整所有下拉菜单的顺序/显示/隐藏
通过 `filter.items` 控制，

默认为 `['column','data','condition','editCondition','excel']`

分别对应：表格列、筛选数据、筛选条件、编辑筛选条件、导出excel

>**注意：** 去掉 'data'(筛选数据) 时，后台筛选将不会发送第二条请求（表头数据请求）

下面示例配置  `['column', 'excel', 'condition']` 下拉菜单则应按顺序显示：表格列、导出excel、筛选条件
:::demo
```html
<table id="myTable" lay-filter="myTable"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable'
        ,id: 'myTable'
        ,url: 'data-1.json'
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="refresh">重载</a><a class="layui-btn layui-btn-sm" lay-event="clearFilter">清除所有筛选条件</a></div>'
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
            items:['column', 'excel', 'condition'] // 只显示表格列和导出excel两个菜单项
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    table.on('toolbar(myTable)', function(obj){
        if (obj.event === 'refresh') {
            table.reload('myTable')
        } else if (obj.event === 'clearFilter') {
           // 清除所有筛选条件并重载表格
           // 参数: tableId
           soulTable.clearFilter('myTable')
        }
    });
})
</script>
```
:::

### 2.单列菜单定制化
如果列 cols 中配置了 `filter.items` 则优先级高于 table 的 `filter.items` 如下

全局设置了 **表格列、导出excel、筛选条件**

而朝代列为 **表格列、筛选数据、筛选条件、导出excel**
:::demo
```html
<table id="myTable2" lay-filter="myTable2"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,id: 'myTable2'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="refresh">重载</a><a class="layui-btn layui-btn-sm" lay-event="clearFilter">清除所有筛选条件</a></div>'
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: { items:['column', 'data', 'condition', 'excel'] }},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,filter: {
            items:['column', 'excel', 'condition'] // 只显示表格列和导出excel两个菜单项
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    table.on('toolbar(myTable2)', function(obj){
        if (obj.event === 'refresh') {
            table.reload('myTable2')
        } else if (obj.event === 'clearFilter') {
           // 清除所有筛选条件并重载表格
           // 参数: tableId
           soulTable.clearFilter('myTable2')
        }
    });
})
</script>
```
:::

### 3.隐藏底部栏
通过设置 `filter.bottom = false` 来隐藏底部栏（不渲染底部栏）

:::demo 配置  `filter.bottom = false`
```html
<table id="myTable3" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable3'
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
