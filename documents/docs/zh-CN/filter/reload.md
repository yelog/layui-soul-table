## 表格重载
可以使用下面两种方法进行表格重载
```js
var myTable = table.render({id:'myTable'})
// 方法一
table.reload('myTable', {
    where: data.field
})
// 方法二
myTable.reload({
    where: data.field
})
```
### 默认不会清除表头筛选条件
:::demo
```html
<div class="layui-row layui-form">
    <div class="layui-col-sm5">
        <div class="layui-inline">
            <label class="layui-form-label">诗词</label>
            <div class="layui-input-inline" >
                <input type="text" name="title"
                       class="layui-input" placeholder="请输入诗词关键字">
            </div>
        </div>
    </div>
    <div class="layui-col-sm5">
        <div class="layui-inline">
            <label class="layui-form-label">内容</label>
            <div class="layui-input-inline">
                <input type="text" name="content"
                       class="layui-input" placeholder="请选择内容关键词">
            </div>
        </div>
    </div>
    <div class="layui-col-sm2">
        <button class="layui-btn mgl-20" lay-submit="" lay-filter="search"><i class="layui-icon">&#xe615;</i>查询</button>
    </div>
</div>
<table id="myTable" ></table>
<script>
    layui.use(['form', 'table','soulTable'], function () {
        var table = layui.table,
            soulTable = layui.soulTable,
            form = layui.form;

        var myTable = table.render({
            id: 'myTable'
            ,elem: '#myTable'
            ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
            ,height: 400 
            ,limit: 20
            ,page: true
            ,soulSort: true
            ,cols: [[
                {type: 'numbers', title: '序号', fixed: 'left'},
                {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
                {field: 'dynasty', title: '朝代',fixed: 'left', width: 100, sort: true, filter: true},
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
        form.on('submit(search)', function (data) {
            table.reload('myTable', {
                where: data.field
            })
            // 或者下面这种方式
            // myTable.reload({
            //     where: data.field
            // })
        })
    })
</script>
```
:::

### 重载时清除表头筛选条件
设置 `filter.clearFilter = true`
:::demo
```html
<div class="layui-row layui-form">
    <div class="layui-col-sm5">
        <div class="layui-inline">
            <label class="layui-form-label">诗词</label>
            <div class="layui-input-inline" >
                <input type="text" name="title"
                       class="layui-input" placeholder="请输入诗词关键字">
            </div>
        </div>
    </div>
    <div class="layui-col-sm5">
        <div class="layui-inline">
            <label class="layui-form-label">内容</label>
            <div class="layui-input-inline">
                <input type="text" name="content"
                       class="layui-input" placeholder="请选择内容关键词">
            </div>
        </div>
    </div>
    <div class="layui-col-sm2">
        <button class="layui-btn mgl-20" lay-submit="" lay-filter="search2"><i class="layui-icon">&#xe615;</i>查询</button>
    </div>
</div>
<table id="myTable2" lay-filter="myTable2" ></table>
<script>
    layui.use(['form', 'table','soulTable'], function () {
        var table = layui.table,
            soulTable = layui.soulTable,
            form = layui.form;

        var myTable2 = table.render({
            id: 'myTable2'
            ,elem: '#myTable2'
            ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
            ,height: 400 
            ,limit: 20
            ,page: true
            ,soulSort: true
            ,cols: [[
                {type: 'checkbox', fixed: 'left'},
                {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
                {field: 'dynasty', title: '朝代',fixed: 'left', width: 100, sort: true, filter: true},
                {field: 'author', title: '作者', width: 165 , filter: true},
                {field: 'content', title: '内容', width: 123, filter: true},
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
        form.on('submit(search2)', function (data) {
            myTable2.reload({
                where: data.field
            })
        })
    })
</script>
```
:::
