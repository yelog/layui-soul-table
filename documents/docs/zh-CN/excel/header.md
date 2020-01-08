## 复杂表头导出

### 效果

:::demo
```html
<button class="layui-btn" id="export"><i class="layui-icon layui-icon-download-circle"></i>导出</button>
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    var myTable = table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'numbers', title: '序号', rowspan: 3, fixed: 'left'},
            {title: '1-1', colspan: 3, align: 'center'},
            {title: '1-2', colspan: 2},
            {field: 'heat', title: '点赞数', width: 112, rowspan: 3, sort:true},
            {field: 'createTime', title: '录入时间', rowspan: 3, width: 165, fixed: 'right'}
        ],[
            {title: '2-1', colspan: 2},
            {field: 'author', title: '作者', rowspan: 2, width: 165},
            {title: '2-2', colspan: 2}
        ],[
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112}
        ]]
        ,excel: {filename: '复杂表头导出.xlsx'}
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    layui.$('#export').on('click', function() {
      soulTable.export(myTable);
    })
})
</script>
```
:::

### 后端分页 + 查询条件 + 表头筛选

:::demo
```html
<div class="layui-row layui-form">
    <div class="layui-col-sm4">
        <div class="layui-inline">
            <label class="layui-form-label">诗词</label>
            <div class="layui-input-inline" >
                <input type="text" name="title"
                       class="layui-input" placeholder="请输入诗词关键字">
            </div>
        </div>
    </div>
    <div class="layui-col-sm4">
        <div class="layui-inline">
            <label class="layui-form-label">内容</label>
            <div class="layui-input-inline">
                <input type="text" name="content"
                       class="layui-input" placeholder="请选择内容关键词">
            </div>
        </div>
    </div>
    <div class="layui-col-sm2" style="text-align: center">
        <button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="search"><i class="layui-icon">&#xe615;</i>查询</button>
    </div>
    <div class="layui-col-sm2" style="text-align: center">
        <button class="layui-btn" lay-submit="" lay-filter="export"><i class="layui-icon layui-icon-download-circle"></i>导出</button>
    </div>
</div>
<table id="myTable2" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        form = layui.form;

    var myTable2 = table.render({
        elem: '#myTable2'
        ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
        ,height: 500
        ,limit: 20
        ,page: true
        ,cols: [[
            {type: 'numbers', title: '序号', rowspan: 3, fixed: 'left'},
            {title: '1-1', colspan: 3, align: 'center'},
            {title: '1-2', colspan: 2},
            {field: 'heat', title: '点赞数', width: 112, rowspan: 3, sort:true},
            {field: 'createTime', title: '录入时间', rowspan: 3, width: 165, fixed: 'right'}
        ],[
            {title: '2-1', colspan: 2},
            {field: 'author', title: '作者', rowspan: 2, width: 165},
            {title: '2-2', colspan: 2}
        ],[
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112}
        ]]
        ,excel: {filename: '复杂表头导出.xlsx'}
        ,done: function () {
            soulTable.render(this)
        }
    });

    form.on('submit(search)', function (data) {
        table.reload('myTable2', {
            where: data.field
        })
    })
    form.on('submit(export)', function () {
        soulTable.export(myTable2);
    })
})
</script>
```
:::
