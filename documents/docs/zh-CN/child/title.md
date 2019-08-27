## title设置

### 1.同级两个子表不同title
通过 title 设置，定义不同标题：`表格一`、`表格二`
:::demo
```html
<table id="myTable" lay-filter="myTable"></table>
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
            {title: '#', width: 50, children:[
                {
                    title: '表格一'
                    ,url: 'data-1.json'
                    ,height: 300
                    ,page: false
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                        {field: 'author', title: '作者', width: 165 , filter: true},
                        {field: 'content', title: '内容', width: 123, filter: true},
                        {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                        {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                        {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                        {title: '操作', width: 156, templet: '#childBar'}
                    ]]
                    ,done: function () {
                       soulTable.render(this);
                    }
                },
                {
                    title: '表格二'
                    ,height: 300
                    ,limit: 1000000
                    ,data: function (d) {
                        // d 为当前行数据
                        console.log(d)
                        return [d];
                    }
                    ,page: false
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                        {field: 'author', title: '作者', width: 165 , filter: true},
                        {field: 'content', title: '内容', width: 123, filter: true},
                        {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                        {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                        {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                        {title: '操作', width: 156, templet: '#childBar'}
                    ]]
                    ,done: function () {
                       soulTable.render(this);
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 2.动态定义子表title
子表的 `title` 可以通过方法返回
:::demo
```html
<table id="myTable2" lay-filter="myTable2"></table>
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
            {title: '#', width: 50, children:[{
                title: function (row) { return '<span style="color: #FFB800">' + row.dynasty + '</span><span style="color: #FF5722">'+ row.author + '</span>'}
                ,url: 'data-1.json'
                ,height: 300
                ,page: false
                ,cols: [[
                    {type: 'checkbox', fixed: 'left'},
                    {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                    {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                    {field: 'author', title: '作者', width: 165 , filter: true},
                    {field: 'content', title: '内容', width: 123, filter: true},
                    {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                    {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                    {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                    {title: '操作', width: 156, templet: '#childBar'}
                ]]
                ,done: function () {
                   soulTable.render(this);
                }
            }]},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::


### 3.隐藏子表title
设置 `childTitle: false` 隐藏子表 title

**注意：由于隐藏了子表title后，不能切换(tab)多个同级子表，所以只能设置一个子表(children不能多条)**
:::demo
```html
<table id="myTable3" lay-filter="myTable3"></table>
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
            {title: '#', width: 50, childTitle: false, children:[{
                title: '表格一'
                ,url: 'data-1.json'
                ,height: 300
                ,page: false
                ,cols: [[
                    {type: 'checkbox', fixed: 'left'},
                    {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                    {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                    {field: 'author', title: '作者', width: 165 , filter: true},
                    {field: 'content', title: '内容', width: 123, filter: true},
                    {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                    {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                    {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                    {title: '操作', width: 156, templet: '#childBar'}
                ]]
                ,done: function () {
                   soulTable.render(this);
                }
            }]},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

