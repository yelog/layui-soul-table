## 基础子表
<table class='el-table el-table--border'>
    <thead>
        <tr>
            <th>参数</th>
            <th>类型</th>
            <th>说明</th>
            <th>示例值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">children</td>
            <td>array</td>
            <td>子表配置</td>
            <td><code class="language-js hljs javascript" style='margin: 0;'>children: [{子表1的配置}{子表2的配置}...]</code></td>
        </tr>
        <tr>
            <td>function</td>
            <td>方法返回子表配置</td>
            <td><code class="language-js hljs javascript" style='margin: 0;'>children: function(row){<br>&emsp;&emsp;<span class='hljs-comment'>//row 父表为当前行数据</span><br>&emsp;&emsp;console.log(row);<br>&emsp;&emsp;return [{子表1的配置}{子表2的配置}...] <br>}</code></td>
        </tr>
    </tbody>
</table>

### 1. 数组方式
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

### 2. 动态获取子表
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
            {title: '#', width: 50, children: function(row) {
                console.log(row)
              return [
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
                     ]
            }},
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
