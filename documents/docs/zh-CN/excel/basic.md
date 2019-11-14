## 基本效果
**所见即所得：**

1.拖拽调整列宽、双击自适应列宽后，导出也是调整后的列宽

2.左右列顺序调整后，导出也是调整后的顺序

3.layui 的 table 的对齐方式 `align` 也会作用于导出后的文件

4.条件筛选/表头筛选，导出是筛选过的结果

<el-divider></el-divider>

**参数设置优先级：** `soulTable.export()`(如果有) **>** 列参数 **>** 全局参数
### 一、效果
默认开启，下拉菜单默认有**excel导出**配置

可以通过配置 `excel.on: false` 关掉导出功能
:::demo 通过 `filter: true` 开启筛选
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
            {type: 'numbers', title: '序号', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right'},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 二、后台分页
导出时，会请求所有页的数据，然后进行导出。
:::demo
```html
<table id="myTable2" ></table>
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
            ,page: true
            ,cols: [[
                {type: 'numbers', title: '序号', fixed: 'left'},
                {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
                {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                {field: 'author', title: '作者', width: 165 , filter: true},
                {field: 'content', title: '内容', width: 123, filter: true},
                {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                {field: 'createTime', title: '录入时间', width: 165,fixed:'right',  filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
            ]]
            ,done: function () {
                soulTable.render(this)
            }
        });
    })
</script>
```
:::

### 三、前台分页

从缓存中拿到所有页的数据进行导出

:::demo
```html
<table id="myTable3" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    table.render({
        elem: '#myTable3'
        ,height: 500
        ,limit: 20
        ,page: true
        ,cols: [[
            {type: 'numbers', title: '序号', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, fixed:'left', sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    search({});
    function search(data) {
        var loading = layer.load(2);
        $.ajax({
            url: 'data.json',
            data: data,
            dataType: 'json',
            success: function (res) {
                table.reload('myTable3', {
                    data: res.data
                })
            },
            complete: function () {
                layer.close(loading)
            }
        })
    }
})
</script>
```
:::


### 四、分页情况下只导出当前页数据
配置 `excel.curPage = true` 即可
:::demo
```html
<table id="myTable4" ></table>
<script>
    layui.use(['form', 'table','soulTable'], function () {
        var table = layui.table,
            soulTable = layui.soulTable;

        table.render({
            id: 'myTable4'
            ,elem: '#myTable4'
            ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
            ,height: 400 
            ,limit: 20
            ,page: true
            ,cols: [[
                {type: 'numbers', title: '序号', fixed: 'left'},
                {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
                {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                {field: 'author', title: '作者', width: 165 , filter: true},
                {field: 'content', title: '内容', width: 123, filter: true},
                {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                {field: 'createTime', title: '录入时间', width: 165,fixed:'right',  filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
            ]]
            ,excel: {
                curPage: true
            }
            ,done: function () {
                soulTable.render(this)
            }
        });
    })
</script>
```
:::
