## 排序监听

筛选/子表 会默认进行子表监听，以便于后台排序无需自己写 `table.on(sort)` ，如下后台排序就无需自己监听

参数 `soulSort` ， 默认值为：`true`

### 后台排序，无需自己写监听语句

:::demo
```html
<table id="myTable" lay-filter="myTable" ></table>
<script>
    layui.use(['form', 'table','soulTable'], function () {
        var table = layui.table,
            soulTable = layui.soulTable;

        table.render({
            id: 'myTable'
            ,elem: '#myTable'
            ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
            ,height: 400 
            ,limit: 20
            ,page: true
            ,cols: [[
                {type: 'checkbox', fixed: 'left'},
                {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
                {field: 'dynasty', title: '朝代',fixed: 'left', width: 100, sort: true, filter: true},
                {field: 'author', title: '作者', width: 165 , sort: true, filter: true},
                {field: 'content', title: '内容', width: 123, sort: true, filter: true},
                {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                {field: 'createTime', title: '录入时间', width: 165,fixed:'right',  filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
            ]]
            ,filter: {
                clearFilter: true
            }
            ,done: function () {
                soulTable.render(this)
            }
        });
    })
</script>
```
:::

### 如果需要自己监听排序事件，则需要先关闭插件的监听
设置 `soulSort: false`

:::demo
```html
<table id="myTable2" lay-filter="myTable2" ></table>
<script>
    layui.use(['form', 'table','soulTable'], function () {
        var table = layui.table,
            soulTable = layui.soulTable;

        table.render({
            id: 'myTable2'
            ,elem: '#myTable2'
            ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
            ,height: 400 
            ,limit: 20
            ,soulSort: false
            ,page: true
            ,cols: [[
                {type: 'checkbox', fixed: 'left'},
                {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
                {field: 'dynasty', title: '朝代',fixed: 'left', width: 100, sort: true, filter: true},
                {field: 'author', title: '作者', width: 165 , sort: true, filter: true},
                {field: 'content', title: '内容', width: 123, sort: true, filter: true},
                {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                {field: 'createTime', title: '录入时间', width: 165,fixed:'right',  filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
            ]]
            ,filter: {
                clearFilter: true
            }
            ,done: function () {
                soulTable.render(this)
            }
        });
        
        table.on('sort(myTable2)', function() {
            layer.msg('自己监听排序事件')
        })
    })
</script>
```
:::
