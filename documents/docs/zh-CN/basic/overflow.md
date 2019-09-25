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
>**宽度设置介绍**：默认最大宽度为300  
>但是可以通过配置 `minWidth/maxWidth`，实现以下效果
>1. 如果当前列宽在此范围内，则tips最大宽度为当前列宽。
>2. 如果当前列宽小于 `minWidth`，则tips最大宽度为 `minWidth`
>3. 如果当前列宽大于 `maxWidth`，则tips最大宽度为 `maxWidth`


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
            ,minWidth: 100 // 最小宽度
            ,maxWidth: 500 // 最大宽度
        }
        ,cols: [[
            {type: 'radio', title: '##', fixed: 'left'},
            {type: 'checkbox', title: '##', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'content', title: '内容', width: 400},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, totalRow: true},
            {field: 'createTime', title: '录入时间',width: 165},
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
