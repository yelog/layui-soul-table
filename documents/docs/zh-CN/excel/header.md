## 复杂表头导出

### 效果

:::demo 通过 `filter: true` 开启筛选
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
