## 内容超出设置
除了官网给出的默认展开方式，可以通过设置 `overflow` 换其他方式
```js
,overflow: 'tips'

// 如果想要设置样式
,overflow: {
    type: 'tips'
    // ,hoverTime: 500 // 悬停时间，单位ms, 悬停 hoverTime 后才会显示，默认为 0
    // ,color: 'black' // 字体颜色
    // ,bgColor: 'white' // 背景色
}

```
### 1. tips
`overflow: 'tips'`
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
        ,totalRow: true
        ,overflow: 'tips' 
        ,cols: [[
            {type: 'radio', title: '##', fixed: 'left'},
            {type: 'checkbox', title: '##', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
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

### 2.修改样式，悬停 300ms 才会显示
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
        ,totalRow: true
        ,overflow: {
            type: 'tips'
            ,hoverTime: 300 // 悬停时间，单位ms, 悬停 hoverTime 后才会显示，默认为 0
            ,color: 'black' // 字体颜色
            ,bgColor: 'white' // 背景色
        }
        ,cols: [[
            {type: 'radio', title: '##', fixed: 'left'},
            {type: 'checkbox', title: '##', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
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

### 3. 浏览器 title 效果

悬停显示 `overflow: 'title'`

:::demo
```html
<table id="myTable3" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable3'
        ,url: 'data-1.json'
        ,toolbar: true
        ,height: 500
        ,totalRow: true
        ,overflow: 'title'
        ,cols: [[
            {type: 'radio', title: '##', fixed: 'left'},
            {type: 'checkbox', title: '##', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
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
