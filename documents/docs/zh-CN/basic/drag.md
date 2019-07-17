## 拖拽列

### 1. 默认开启
无需其他配置，只要引入 `soulTable.render(this)` 即可使用
-  1.调整列顺序：鼠标左键按住列头文字，左右拖动
-  2.快速隐藏列：鼠标左键按住列头文字，向上拖出表格区域，出现回收站图标后松开则可隐藏此列

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
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 2. 固定列禁止拖动，且不允许被交换
:::demo
```html
<table id="myTable2" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    table.render({
        elem: '#myTable2'
        ,url: 'data-1.json'
        ,height: 500
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', fixed: 'left', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 3. 关闭此功能
设置 `drag: false` 即可关闭
:::demo 设置 `drag: false` 即可关闭
```html
<table id="myTable3" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    table.render({
        elem: '#myTable3'
        ,url: 'data-1.json'
        ,height: 500
        ,drag: false // 关闭拖拽列功能
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::
