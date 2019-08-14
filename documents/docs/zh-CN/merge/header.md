## 复杂表头
只需在 **真实列** 使用 `merge` 参数
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
        ,height: 550
        ,url: 'merge.json'
        ,cols: [[
            {type: 'numbers', title: '序号', rowspan: 3, fixed: 'left'},
            {field: 'dynasty', merge: true, title: '朝代1', fixed:'left', width: 112, rowspan: 3, sort:true},
            {title: '1-1', colspan: 3, align: 'center'},
            {title: '1-2', colspan: 2},
            {field: 'dynasty', title: '朝代3', merge: ['name','type'], fixed: 'right', rowspan: 3, width: 165}
        ],[
            {title: '2-1', colspan: 2},
            {field: 'type', merge: true, title: '类型1', rowspan: 2, width: 165 },
            {title: '2-2', colspan: 2}
        ],[
            {field: 'poetry', title: '诗词', width: 188, sort: true},
            {field: 'name', merge: true, title: '诗人', width: 100, sort: true},
            {field: 'type', merge: ['name','type'], title: '类型2', width: 123},
            {field: 'dynasty', title: '朝代2', merge: ['name', 'type'], width: 112, sort:true}
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::
