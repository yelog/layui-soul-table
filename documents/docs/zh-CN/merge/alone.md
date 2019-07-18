## 独立使用

### 通过模块化引入项目
```js
layui.config({
    base: 'ext/'
}).extend({
    tableMerge: 'tableMerge'
});
```
### 使用
:::demo
```html
<table id="mergeTable"></table>
<script>
layui.use(['table','element','tableMerge'], function () {
    var table = layui.table,
        tableMerge = layui.tableMerge;

    /**
     * 自动合并表格
     */
    table.render({
        elem: '#mergeTable'
        ,height: 550
        ,url: 'merge.json'
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'poetry', title:'诗词', width:188, fixed: 'left'}
            ,{field:'name', merge: true, title:'诗人', width:100, fixed: 'left'}              // 根据 当前列 相同值 的自动合并
            ,{field:'type', merge: ['name','type'], title:'类型', width:100, fixed: 'left'}   // 根据 name 分组后，再以 type值 相同的合并对应行
            ,{field:'type', merge: true, title:'类型', width:100}                             // 根据 当前列 相同值 的自动合并
            ,{field:'dynasty', title:'朝代', merge: ['name', 'type'], width:150}              // 根据 name 分组后，再以 type值 相同的自动合并
            ,{field:'dynasty', title:'朝代', merge: 'name', width:150}                        // 根据 name值 相同的自动合并
            ,{field:'dynasty', title:'朝代', merge: true, width:150}                          // 根据 当前列 相同值 的自动合并
            ,{field:'sentences', title:'名句', width:400}
        ]]
        ,done: function () {
            tableMerge.render(this)
        }
    })

})
</script>

```
:::

