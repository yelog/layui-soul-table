## 复选框优化

### 一、前台分页 - 勾选数据默认不丢失
勾选几行后，切换到其他页码/筛选后，仍就可以获取所有勾选行数据

筛选后，即使勾选行不在筛选条件内，仍可以获取到，清除筛选条件后，勾选行的状态仍可以回显到界面上
:::demo
```html
<table id="myTable" lay-filter="myTable"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    table.render({
        elem: '#myTable'
        ,id: 'myTable'
        ,height: 500
        ,limit: 20
        ,page: true
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="checked">获取当前选中行</a></div>'
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

    table.on('toolbar(myTable)', function(obj){
        if (obj.event === 'checked') {
            var checkedRow = soulTable.cache['myTable'].filter(item=>item.LAY_CHECKED)
            console.table(checkedRow)
            layer.open({
                title: '当前选中行',
                shadeClose: true,
                content: '当前选中 '+checkedRow.length+' 行，具体看浏览器控制台'
            });
        } 
    });
})
</script>
```
:::
