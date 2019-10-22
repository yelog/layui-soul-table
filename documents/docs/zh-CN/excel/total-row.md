## 合计行导出
开启合计行，默认导出也会有合计行

### 效果
:::demo 通过列的 `excel` 进行设置
```html
<table id="myTable" lay-filter="myTable"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    var myTable = table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,totalRow: true
        ,fixTotal: true
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="export"><i class="layui-icon layui-icon-download-circle"></i>导出所有数据（含合计行）</a><a class="layui-btn layui-btn-sm layui-btn-normal" lay-event="export2"><i class="layui-icon layui-icon-download-circle"></i>导出勾选数据（含合计行）</a><a class="layui-btn layui-btn-sm layui-btn-warm" lay-event="export3"><i class="layui-icon layui-icon-download-circle"></i>导出所有数据（不含合计行）</a></div>'
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, fixed: 'left', totalRowText: '合计行', sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, fixed: 'right', totalRow: true, sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right'},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    table.on('toolbar(myTable)', function(obj){
        if (obj.event === 'export') {
            soulTable.export(myTable, {
              filename: '导出所有数据（含合计行）.xlsx'
            });
        } else if (obj.event === 'export2') {
           if (table.checkStatus('myTable').data.length > 0) {
             soulTable.export(myTable, {
               filename: '导出勾选数据（含合计行）.xlsx',
               checked: true // 只导出勾选数据
             });
           } else {
             layer.msg('勾选数据不能为空！');
           }
       } if (obj.event === 'export3') {
           soulTable.export(myTable, {
             totalRow: false,
             filename: '导出所有数据（不含合计行）.xlsx'
           });
        }
    });
    
})
</script>
```
:::
