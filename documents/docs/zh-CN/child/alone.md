## 独立使用

### 通过模块化引入项目
```js
layui.config({
    base: 'ext/'
}).extend({
    tableChild: 'tableChild'
});
```

### 使用
:::demo
```html
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','tableChild'], function () {
    var table = layui.table,
        tableChild = layui.tableChild;

    table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {title: '#', width: 50, children:[
                {
                    title: '表格一'
                    ,url: 'data-1.json'
                    ,height: 300
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词', width: 200},
                        {field: 'dynasty', title: '朝代', width: 100},
                        {field: 'author', title: '作者', width: 165},
                        {field: 'content', title: '内容', width: 123},
                        {field: 'type', title: '类型', width: 112},
                        {field: 'heat', title: '点赞数', width: 112},
                        {field: 'createTime', title: '录入时间', width: 165}
                    ]]
                    ,done: function () {
                        
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 112}
        ]]
        ,done: function () {
            tableChild.render(this)
        }
    });
})
</script>
```
:::
