## 复杂表头筛选
只需在 **真实列** 加入`filter: true` 即可
### 效果

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
        ,height: 400
        ,page: false
        ,cols: [[
            {type: 'numbers', title: '序号', rowspan: 3, fixed: 'left'},
            {title: '1-1', colspan: 3, align: 'center'},
            {title: '1-2', colspan: 2},
            {field: 'heat', title: '点赞数', width: 112, rowspan: 3, filter: true, sort:true},
            {field: 'createTime', title: '录入时间', rowspan: 3, width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}}
        ],[
            {title: '2-1', colspan: 2},
            {field: 'author', title: '作者', rowspan: 2, width: 165 , filter: true},
            {title: '2-2', colspan: 2}
        ],[
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true}
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 后台分页
:::demo 通过 `filter: true` 开启筛选
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
<table id="myTable2" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        form = layui.form,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
        ,height: 400 
        ,limit: 20
        ,page: true
        ,cols: [[
            {type: 'numbers', title: '序号', rowspan: 3, fixed: 'left'},
            {title: '1-1', colspan: 3, align: 'center'},
            {title: '1-2', colspan: 2},
            {field: 'heat', title: '点赞数', width: 112, rowspan: 3, filter: true, sort:true},
            {field: 'createTime', title: '录入时间', rowspan: 3, width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}}
        ],[
            {title: '2-1', colspan: 2},
            {field: 'author', title: '作者', rowspan: 2, width: 165 , filter: true},
            {title: '2-2', colspan: 2}
        ],[
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true}
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    form.on('submit(search)', function (data) {
        table.reload('myTable2', {
            where: data.field
        })
    })
})
</script>
```
:::
