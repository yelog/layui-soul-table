## 记忆功能 - 由于会占用浏览器资源，大型项目不建议开启
将table配置写入浏览器缓存（`localStorage`），用于下次访问（刷新页面）后，仍可以保留上次的更改
### 1. 配置开启
配置 `filter.cache = true` 开启，并在下拉菜单（`filter.items`） 中配置 清除缓存（`clearCache`）功能  

如下，当**拖动列顺序**、**隐藏列**操作后，刷新页面，将会保留操作后的影响，通过 **下拉菜单>清除缓存** 恢复
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
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165, filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112, sort:true, filter: true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true},
        ]]
        ,filter: {
            items:['column','data','condition','editCondition','excel','clearCache'] // 加入了清除缓存按钮
            ,cache: true 
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::
