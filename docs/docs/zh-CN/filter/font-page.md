## 前台分页

在前台分页的情况下，仍然可以直接使用筛选功能

:::demo
```html
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    table.render({
        elem: '#myTable'
        ,height: 500
        ,limit: 20
        ,page: true
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
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
                // myTable.reload({
                //     data: res.data
                // })
                table.reload('myTable', {
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
