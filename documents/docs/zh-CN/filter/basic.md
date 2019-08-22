## 基本筛选

### 效果
:::demo 通过 `filter: true` 开启筛选
```html
<table id="myTable" lay-filter="myTable"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable'
        ,id: 'myTable'
        ,url: 'data.json'
        ,height: 500
        ,toolbar: '<div><button class="layui-btn layui-btn-sm" lay-event="clearFilter">清除所有筛选条件</button></div>'
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    table.on('toolbar(myTable)', function(obj){
        if (obj.event === 'clearFilter') {
            // 清除所有筛选条件并重载表格
            // 参数: tableId
            soulTable.clearFilter('myTable')
        }
    });
})
</script>
```
:::

### API
<table class="el-table el-table--border"><thead><tr><th>参数</th><th>类型</th><th colspan=4>说明</th></tr></thead><tbody><tr><td rowspan="2">filter</td><td>boolean</td><td colspan="3">true</td><td rowspan=2>默认值：false</td></tr><tr><td>object</td><td>type</td><td>date[yyyy-mm-dd hh:mm:ss]</td><td>目前做了时间类型优化（可以筛选昨天、本周、本月等） ，中括号内的格式要按照实际的数据格式进行调整。其他类型有好的想法可以进行交流扩展</td></tr></tbody></table>
