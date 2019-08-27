## 子表数据来源

### url请求方式
- 1.设置子表 `url` 为子表请求链接
- 2.设置子表 `where` 为子表请求参数

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
            <td rowspan="2">url</td>
            <td>string</td>
            <td>请求地址</td>
            <td><code class="language-js hljs javascript" style='margin: 0;'>url: 'user/list.action'</code></td>
        </tr>
        <tr>
            <td>function</td>
            <td>方法返回请求地址 <small>（多用于路径参数）</small></td>
            <td><code class="language-js hljs javascript" style='margin: 0;'>url: function(row){<br><span class='hljs-comment'>//row 为当前行数据</span><br>console.log(row);<br>return 'user/list/'+row.id <br>}</code></td>
        </tr>
        <tr>
            <td rowspan="2">where</td>
            <td>object</td>
            <td>请求的参数</td>
            <td><code class="language-js hljs javascript" style='margin: 0;'>where: {<br>name:'小明'<br>}</code></td>
        </tr>
        <tr>
            <td>function</td>
            <td>方法返回请求参数</td>
            <td><code class="language-js hljs javascript" style='margin: 0;'>where: function(row){<br><span class='hljs-comment'>//row 为当前行数据</span><br>console.log(row);<br>return {name: row.name}<br>}</code></td>
        </tr>
    </tbody>
</table>

:::demo
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
            {title: '#', width: 50, children:[
                {
                    title: '子表'
                    ,url: 'data-1.json'
                    ,height: 300
                    ,where: function(row) {
                        var params = {
                            dynasty: row.dynasty
                        }
                        layer.msg('请求url为: data-1.json<br>请求参数为: ' + JSON.stringify(params))
                      return params
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
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true, excel:{cellType: 'n'}},
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

### data 数据注入方式
适用于子表数据藏在父表中，比如父表行数据中的某个字段 `children` 是一个数组，这时可用子表进行展示 
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
            <td rowspan="2">data</td>
            <td>object</td>
            <td>赋值子表格数据</td>
            <td><code class="language-js hljs javascript" style='margin: 0;'>data: []</code></td>
        </tr>
        <tr>
            <td>function</td>
            <td>方法返回表格数据，参数为父表当前行数据</td>
            <td><code class="language-js hljs javascript" style='margin: 0;'>data: function(row){<br><span class='hljs-comment'>//row 为当前行数据</span><br>console.log(row);<br>return row.children<br>}</code></td>
        </tr>
    </tbody>
</table>

:::demo
```html
<table id="myTable2" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'child.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {title: '#', width: 50, children:[
                {
                    title: '子表'
                    ,height: 300
                    ,data: function (row) {
                        // d 为当前行数据
                        console.log(row)
                        return row.children;
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
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true, excel:{cellType: 'n'}},
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
