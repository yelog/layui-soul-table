## 拖拽行

### 1. 开启效果

拖动行上下移动即可, `trigger` 缺省为 `row`, 即整行都能触发

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
        ,toolbar: true
        ,height: 500
        ,rowDrag: {/*trigger: 'row',*/ done: function(obj) {
            // 完成时（松开时）触发
            // 如果拖动前和拖动后无变化，则不会触发此方法
            console.log(obj.row) // 当前行数据
            console.log(obj.cache) // 改动后全表数据
            console.log(obj.oldIndex) // 原来的数据索引
            console.log(obj.newIndex) // 改动后数据索引
        }}
        ,totalRow: true
        ,cols: [[
            {type: 'radio', title: '##', fixed: 'left'},
            {type: 'checkbox', title: '##', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者-可编辑列', edit: 'text', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, fixed: 'right', totalRow: true},
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

### 2. 指定拖动元素
如下，只绑定到作者这列的这个图标上，`trigger: '.layui-icon-snowflake'`
:::demo
```html
<table id="myTable2" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'data-1.json'
        ,toolbar: true
        ,height: 500
        ,rowDrag: {trigger: '.layui-icon-snowflake', done: function(obj) {
            // 完成时（松开时）触发
            // 如果拖动前和拖动后无变化，则不会触发此方法
            console.log(obj.row) // 当前行数据
            console.log(obj.cache) // 改动后表格数据
            console.log(obj.oldIndex) // 原来的数据索引
            console.log(obj.newIndex) // 改动后数据索引
        }}
        ,totalRow: true
        ,cols: [[
            {field: 'author', title: '作者', width: 165, fixed: 'left', templet: '<div><i class="layui-icon layui-icon-snowflake" />{{d.author}}</div>'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, fixed: 'right', totalRow: true},
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
