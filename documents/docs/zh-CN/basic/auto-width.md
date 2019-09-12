## 自适应列宽

### 1. 默认开启
无需其他配置，只要引入 `soulTable.render(this)` 即可使用  
双击列头右边的边线，将会根据此列内容进行自适应调整（即按照最宽的那个为准）

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
        ,limit: 10
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', fixed: 'left', width: 200},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', fixed: 'right', width: 112},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::
