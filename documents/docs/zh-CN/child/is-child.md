## 是否显示入口
通过设置 `isChild`来控制
```js
isChild: function(row){
    // row 为当前行数据，根据返回结果控制是否展示子表入口
    return row.dynasty === '宋代'
}
```
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
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {title: '#', width: 50, isChild: function(row){return row.dynasty === '宋代'}, children:[
                {
                    title: '表格一'
                    ,url: 'data-1.json'
                    ,height: 300
                    ,page: false
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                        {field: 'author', title: '作者', width: 165 , filter: true},
                        {field: 'content', title: '内容', width: 123, filter: true},
                        {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                        {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                        {field: 'createTime', title: '录入时间', width: 165, sort:true},
                        {title: '操作', width: 156, templet: '#childBar'}
                    ]]
                    ,done: function () {
                       soulTable.render(this);
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true, excel:{cellType: 'n'}},
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
